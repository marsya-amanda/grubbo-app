import json
import math
import requests
from dotenv import load_dotenv
from tour.filter import filter_places_by_price
from tour.constants import GOOGLE_API_KEY, SCRAPING_DOG_API_KEY, DEFAULT_FILTER_PARAM, MOCK_MODE, dump_response
import googlemaps

gmaps = googlemaps.Client(key=GOOGLE_API_KEY)

def get_place(address: str):
    # get place given its name and address in string format
    if MOCK_MODE:
        try:
            with open(f"backend/tour/api_dumps/place_{address}.json") as f:
                return json.load(f)
        except FileNotFoundError:
                pass

    url = "https://api.scrapingdog.com/google_maps"
    params = {
        "api_key": SCRAPING_DOG_API_KEY,
        "query": address,
        "type": "search"
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        print(f"Failed to get place ID for '{address}':", response.status_code)
        return None
    results = response.json().get("search_results", [])
    if not results:
        print(f"No results found for '{address}'")
        return None
    # Assuming the first result is the most relevant
    dump_response(f"place_{address}", results[0])
    return results[0]

# fine
def geocode_address(address):
    if MOCK_MODE:
        try:
            with open(f"backend/tour/api_dumps/geocode_{address}.json") as f:
                data = json.load(f)
                return (data["lat"], data["lng"])
        except FileNotFoundError:
            pass
        try:
            with open(f"backend/tour/api_dumps/place_{address}_error.json") as f:
                data = json.load(f).get('gps_coordinates', {})
                return (data.get("latitude"), data.get("longitude"))
        except FileNotFoundError:
            pass
    gmaps_result = gmaps.geocode(address)
    if not gmaps_result:
        print(f"Geocoding failed for address: {address}")
        return None
    location = gmaps_result[0]["geometry"]["location"]
    dump_response(f"geocode_{address}", location)
    return (location["lat"], location["lng"])

def haversine(coord1, coord2):
    R = 6371000  # Radius of the Earth in meters
    lat1, lon1 = map(math.radians, coord1)
    lat2, lon2 = map(math.radians, coord2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c  # Distance in meters

def get_search_center_and_radius(start_location, end_location):
    start_coord = geocode_address(start_location)
    end_coord = geocode_address(end_location)
    if not start_coord or not end_coord:
        raise ValueError("Invalid start or end location")
    
    radius = haversine(start_coord, end_coord) / 2 + 500  # 500m wiggle room
    center = (
        (start_coord[0] + end_coord[0]) / 2,
        (start_coord[1] + end_coord[1]) / 2
    )
    return center, int(radius)

def radius_to_zoom(radius):
    """
    Convert radius in meters to Google Maps zoom level.
    
    :param radius: Radius in meters.
    :return: Zoom level (0-21).
    """
    if radius <= 0:
        return 21  # Maximum zoom
    zoom = 21 - math.log2(radius / 500)  # 500m per zoom level
    return max(0, min(zoom, 21))  # Clamp between 0 and 21

def deduplicate_places(results_per_keyword):
    unique_places = {}

    for place in results_per_keyword:
        # Try primary key: place_id
        place_key = place.get("place_id")

        # Fallback if missing
        if not place_key:
            place_key = f"{place.get('title', '')}_{place.get('address', '')}"

        # Store or replace (dict ensures uniqueness)
        unique_places[place_key] = place

    # Return list of unique values
    return list(unique_places.values())

def search_nearby_places(inputs):
    """
    output example: 
    {
        "keyword1": [{place1_data}, {place2_data}, ...],
        "keyword2": [{place1_data}, {place2_data}, ...]
    }
    """
    center, radius = get_search_center_and_radius(inputs['startPlace'], inputs['endPlace'])
    zoom = radius_to_zoom(radius)

    if MOCK_MODE:
        try:
            with open(f"backend/tour/api_dumps/nearby_places_cleaned_{inputs['startPlace']}_{inputs['endPlace']}.json") as f:
                return json.load(f)
        except FileNotFoundError:
            pass
        try:
            with open(f"backend/tour/api_dumps/nearby_places_{inputs['startPlace']}_{inputs['endPlace']}.json") as f:
                places_by_keyword = json.load(f)
                places_by_keyword = filter_places_by_price(places_by_keyword, inputs["priceRating"])
                dump_response(f"nearby_places_cleaned_{inputs['startPlace']}_{inputs['endPlace']}", places_by_keyword)
                return places_by_keyword
        except FileNotFoundError:
            pass

    url = "https://api.scrapingdog.com/google_maps"
    place_by_keyword = {}
    for keyword in inputs["keywords"]:
        keyword = keyword.strip().lower()
        place_by_keyword[keyword] = [] # start at page 0

        params = {
            "api_key": SCRAPING_DOG_API_KEY,
            "query": keyword,
            "ll": f"@{center[0]},{center[1]},{zoom}z",
            "data": DEFAULT_FILTER_PARAM, # Filter: 3.5+ stars, Open Anytime
            "type": "search",
        }
        
        response = requests.get(url, params=params)
        
        if response.status_code != 200:
            print(f"Failed search for '{keyword}':", response.status_code)
            continue
        
        results = response.json().get("search_results", [])
        place_by_keyword[keyword].extend(results)

    # Filter places by price
    dump_response(f"nearby_places_{inputs['startPlace']}_{inputs['endPlace']}", place_by_keyword)
    place_by_keyword = filter_places_by_price(place_by_keyword, inputs["priceRating"])

    dump_response(f"nearby_places_cleaned_{inputs['startPlace']}_{inputs['endPlace']}", place_by_keyword)
    return place_by_keyword