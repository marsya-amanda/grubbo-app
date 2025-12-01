from tour.search_nearby import search_nearby_places, get_place
from tour.filter import get_places_by_time
from tour.route import get_route, get_rfc3339_timestamp
from tour.constants import VISIT_TIME_MEAL, VISIT_TIME_OTHER, APPROXIMATE_TRAVEL_TIME, dump_response, MOCK_MODE
from tour.utils import time_to_minutes, parse_time_str, min_to_time_str, is_meal
from datetime import date
import json

def generate_tour_plan(data):
    if MOCK_MODE:
        try:
            with open(f"backend/tour/api_dumps/tour_plan.json") as f:
                return json.load(f)
        except FileNotFoundError:
            pass

    today = date.today()  # e.g., "2023-10-01"
    meals_bool = [0, 0, 0]
    start_min = time_to_minutes(data['startTime'])
    end_min = time_to_minutes(data['endTime'])
    travel_mode = data.get('travelMode', 'TRANSIT').strip().upper()

    nearby_places = search_nearby_places(data) # already grouped by keyword, filtered by user's price preferences
    if not nearby_places:
        raise ValueError("No places found within the specified radius.")

    curr_time = start_min
    curr_place = get_place(data['startPlace'])
    end_place = get_place(data['endPlace'])
    end_place_id = end_place['place_id']

    route = {}
    visited_places = set()
    visited_places.add(curr_place['place_id'])

    keyword_pool = list(nearby_places.keys())
    keyword_allocation = {kw: 0 for kw in keyword_pool}
    stops = 1

    while curr_time < end_min - VISIT_TIME_OTHER - APPROXIMATE_TRAVEL_TIME:  # buffer for travel time
        curr_place_id = curr_place['place_id']
        lat, lng = curr_place['gps_coordinates']['latitude'], curr_place['gps_coordinates']['longitude']
        departure_time = get_rfc3339_timestamp(lat, lng, curr_time, today)

        route_to_end = get_route(curr_place_id, end_place_id, travel_mode, departure_time)
        route_to_end_duration = parse_time_str(route_to_end.get("duration", None))
        if route_to_end_duration >= end_min - curr_time + VISIT_TIME_OTHER:
            # No more room for travel to end place
            route[f"stop_{stops}"] = {
                "place": end_place,
                "arrival": min_to_time_str(curr_time + route_to_end_duration),
                "departure": None,
                "polyline": route_to_end.get("polyline", None).get("encodedPolyline", None)
            }
            visited_places.add(end_place_id)
            break

        meal_type = is_meal(curr_time)
        if meal_type != -1:
            if meals_bool[meal_type] != 1:
                # choose optimal
                candidates = get_places_by_time(nearby_places, curr_time)
                best, travel_time, polyline = get_optimal_place(visited_places, candidates, curr_place_id, travel_mode, departure_time)
                arrival = curr_time + travel_time
                departure = arrival + VISIT_TIME_MEAL

                route[f"stop_{stops}"] = {
                    "place": best,
                    "arrival": min_to_time_str(arrival),
                    "departure": min_to_time_str(departure),
                    "polyline": polyline
                }
                
                visited_places.add(best["place_id"])

                curr_time += travel_time + VISIT_TIME_MEAL
                meals_bool[meal_type] = 1
                stops += 1
                curr_place = best
                continue

        for kw in keyword_pool:
            candidates = nearby_places[kw]
            candidates = [p for p in candidates if p["place_id"] not in visited_places]
            if not candidates:
                continue

            # Choose the one with least travel time
            best_place, travel_time, polyline = get_optimal_place(visited_places, candidates, curr_place_id, travel_mode, departure_time)

            arrival = curr_time + travel_time
            departure = arrival + VISIT_TIME_OTHER

            if departure > end_min:
                break  # no more room

            route[f"stop_{stops}"] = {
                "place": best_place,
                "arrival": min_to_time_str(arrival),
                "departure": min_to_time_str(departure),
                "polyline": polyline
            }

            curr_time = departure
            curr_place_id = best_place["place_id"]
            keyword_allocation[kw] += 1
            stops += 1
            visited_places.add(curr_place_id)

    # fallback
    if end_place_id not in visited_places:
        curr_place_id = curr_place['place_id']
        lat, lng = curr_place['gps_coordinates']['latitude'], curr_place['gps_coordinates']['longitude']
        departure_time = get_rfc3339_timestamp(lat, lng, curr_time, today)

        route_to_end = get_route(curr_place_id, end_place_id, travel_mode, departure_time)
        route_to_end_duration = parse_time_str(route_to_end.get("duration", None))

        arrival = curr_time + route_to_end_duration
        route[f"stop_{stops}"] = {
            "place": end_place,
            "arrival": min_to_time_str(arrival),
            "departure": None,
            "polyline": route_to_end.get("polyline", None).get("encodedPolyline", None)
        }

    dump_response(f"tour_plan", route)
    return route

def get_optimal_place(visited_places, candidates, start_place_id, travel_mode='TRANSIT', departure_time=None):
    """
    Given a list of places, find the one with the least travel time from the current time.
    """
    best_place = None
    min_travel_time = float('inf')
    min_polyline = None
    min_ratio = float('inf')  # ratio of ratings to travel time

    for place in candidates:
        if place["place_id"] in visited_places:
            continue
        route = get_route(start_place_id, place["place_id"], travel_mode, departure_time)
        if not route:
            continue

        travel_time = parse_time_str(route.get("duration", None))
        polyline = route.get("polyline", {}).get("encodedPolyline", None)
        if not polyline or not travel_time:
            continue

        ratio = travel_time / place.get("rating", 3.5)  # Avoid division by zero
        if ratio < min_ratio or (ratio == min_ratio and travel_time < min_travel_time):
            best_place = place
            min_travel_time = travel_time
            min_polyline = polyline
            min_ratio = ratio

    return best_place, min_travel_time, min_polyline
