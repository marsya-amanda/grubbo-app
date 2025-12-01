import requests
from timezonefinder import TimezoneFinder
from datetime import datetime, timedelta, date
from zoneinfo import ZoneInfo
import json
from tour.constants import GOOGLE_API_KEY, MOCK_MODE, dump_response

tf = TimezoneFinder()
route_cache_non_transit = {}

def cached_route(start_id, end_id, mode, route_obj):
    if mode == 'TRANSIT': return
    key = (start_id, end_id, mode)
    if key not in route_cache_non_transit and route_obj:
        route_cache_non_transit[key] = route_obj
    return route_cache_non_transit[key]

def get_route(start_id, end_id, travel_mode='DRIVE', departure_time=None):
    if MOCK_MODE:
        try:
            with open(f"backend/tour/api_dumps/route_{start_id}_{end_id}_{travel_mode}.json") as f:
                return json.load(f)
        except FileNotFoundError:
            pass

    url = "https://routes.googleapis.com/directions/v2:computeRoutes"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask": "routes.duration,routes.polyline.encodedPolyline"
    }
    params = {
        "origin": {"placeId": start_id},
        "destination": {"placeId": end_id},
        "travelMode": travel_mode,
        "departureTime": departure_time if departure_time else None
    }
    response = requests.post(url, headers=headers, json=params)
    if not response.ok:
        raise RuntimeError(f"Route API failed: {response.status_code} {response.text}")

    data = response.json()
    if not data.get("routes"):
        raise ValueError(f"No route found between {start_id} and {end_id}.")

    route = data["routes"][0]
    cached_route(start_id, end_id, travel_mode, route)
    dump_response(f"route_{start_id}_{end_id}_{travel_mode}", route)
    return route

def get_rfc3339_timestamp(lat, lng, minutes_from_midnight: int, date_: date) -> str:
    """
    Given lat/lng and a date + time in minutes from midnight,
    return the RFC 3339 timestamp with timezone offset.
    """
    # Step 1: Get timezone name
    timezone_str = tf.timezone_at(lat=lat, lng=lng)
    if not timezone_str:
        raise ValueError("Could not determine timezone for given coordinates.")

    # Step 2: Construct naive datetime and localize it
    local_time = datetime.combine(date_, datetime.min.time()) + timedelta(minutes=minutes_from_midnight)
    local_time = local_time.replace(tzinfo=ZoneInfo(timezone_str))

    # Step 3: Format to RFC 3339
    rfc3339_timestamp = local_time.isoformat()

    return rfc3339_timestamp