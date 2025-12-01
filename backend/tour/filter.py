import re
import math
from tour.constants import TYPE_BY_TIME
from datetime import datetime

def normalize_string(hours_str):
    """Normalize Unicode spacing and dashes to standard formats."""
    return (
        hours_str
        .replace('\u202f', ' ')   # narrow no-break space → space
        .replace('\u2013', '-')   # en dash → hyphen
        .strip()
    )

# Get Places based on keyword and time of day
def get_meal_type(time: int):
    hour = time // 60
    if 7 <= hour < 11:
        return "breakfast"
    elif 11 <= hour < 15:
        return "lunch"
    elif 17 <= hour <= 21:
        return "dinner"
    else:
        return "other"
    
def parse_hours(hours_str):
    match = re.match(r"(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?\s*[--]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?", hours_str, re.IGNORECASE)
    if not match:
        return None, None
    
    start_hour = int(match[1])
    start_min = int(match[2]) if match[2] else 0
    start_ampm = match[3].upper() if match[3] else "AM"
    
    end_hour = int(match[4])
    end_min = int(match[5]) if match[5] else 0
    end_ampm = match[6].upper() if match[6] else "PM"

    if start_ampm == "PM" and start_hour != 12:
        start_hour += 12
    elif start_ampm == "AM" and start_hour == 12:
        start_hour = 0

    if end_ampm == "PM" and end_hour != 12:
        end_hour += 12
    elif end_ampm == "AM" and end_hour == 12:
        end_hour = 0

    return (start_hour, start_min), (end_hour, end_min)

def is_open_at(time, hours_str):
    if not hours_str or hours_str.strip().lower() == "closed":
        return False

    periods = hours_str.split(',')
    for period in periods:
        normalized = normalize_string(period)
        start, end = parse_hours(normalized)
        if not start or not end:
            continue

        start_time = start[0] * 60 + start[1]
        end_time = end[0] * 60 + end[1]

        if start_time <= time <= end_time:
            return True

    return False

def parse_price(price_str):
    if price_str in ["$", "$$", "$$$", "$$$$"]: return price_str
    cleaned = re.sub(r'^[^\d$]*', '', price_str).strip()
    return {
        "$1-20": "$",
        "$20-40": "$$",
        "$40-60": "$$$"
    }.get(cleaned, "$$$$")
    
def filter_places_by_price(places_by_keyword, allowed_prices):
    """
    Removes places outside the allowed price ranges from each keyword group.
    
    places_by_keyword: dict[str, list[dict]]

    Returns a cleaned dictionary.
    """
    cleaned = {}

    for keyword, places in places_by_keyword.items():
        filtered = []
        for place in places:
            raw_price = normalize_string(place.get("price", ""))
            parsed_price = parse_price(raw_price)
            if [parsed_price, True] in allowed_prices:
                filtered.append(place)
        cleaned[keyword] = filtered

    return cleaned

def get_places_by_time(places_by_keyword, time: int, keyword: str | None = None):
    meal_type = get_meal_type(time)
    accepted_types = TYPE_BY_TIME.get(meal_type, [])

    day_of_week = datetime.today().strftime("%A").lower()

    keywords = [keyword] if keyword else list(places_by_keyword.keys())
    results = []

    # not filtering correctly
    for kw in keywords:
        for place in places_by_keyword.get(kw, []):
            place_types = [t.lower() for t in place.get("types", [])]
            if not any(t in accepted_types for t in place_types) and not any(t.endswith("restaurant") for t in place_types):
                continue
            today_hours = place.get("operating_hours", {}).get(day_of_week)
            if today_hours and is_open_at(time, today_hours):
                results.append(place)

    return results

def preprocess_places(places):
    """
    Filters and scores place results based on popularity and rating.
    Returns a sorted list (descending).
    """

    def score(place):
        rating = place.get("rating", 0)
        reviews = place.get("reviews", 0)

        if reviews < 10:
            return -1  # filtered out

        # Penalize light review count, reward both rating and popularity
        confidence_boost = math.log(reviews) if reviews >= 20 else math.log(reviews) * 0.7
        return rating * confidence_boost

    # Filter + score
    filtered_scored = [
        (place, score(place))
        for place in places
        if place.get("reviews", 0) >= 10
    ]

    # Remove filtered out
    filtered_scored = [item for item in filtered_scored if item[1] > 0]

    # Sort by descending score
    sorted_places = [p for p, _ in sorted(filtered_scored, key=lambda x: x[1], reverse=True)]
    return sorted_places

"""
Sample response from ScrapingDog API:
{
  "search_results": [
    {
      "title": "Matcha Cafe Maiko",
      "place_id": "ChIJyxnN7YFZwokRCxFHN_H8az0",
      "data_id": "0x89c25981edcd19cb:0x3d6bfcf13747110b",
      "data_cid": "4425909171766366475",
      "reviews_link": "https://api.scrapingdog.com/google_maps/reviews?api_key=6868fbce200dfed6419b66de&data_id=0x89c25981edcd19cb:0x3d6bfcf13747110b",
      "photos_link": "https://api.scrapingdog.com/google_maps/photos?api_key=6868fbce200dfed6419b66de&data_id=0x89c25981edcd19cb:0x3d6bfcf13747110b",
      "posts_link": "https://api.scrapingdog.com/google_maps/posts?api_key=6868fbce200dfed6419b66de&data_id=0x89c25981edcd19cb:0x3d6bfcf13747110b",
      "gps_coordinates": {
        "latitude": 40.719025699999996,
        "longitude": -73.9948345
      },
      "provider_id": "/g/11sd_fc3x3",
      "rating": 4.7,
      "reviews": 558,
      "price": "$1-10",
      "type": "Cafe",
      "types": [
        "Cafe"
      ],
      "address": "132 Bowery,New York, NY 10013",
      "open_state": "Open ⋅ Closes 10:30 PM",
      "hours": "Open ⋅ Closes 10:30 PM",
      "operating_hours": {
        "saturday": "12-10:30 PM",
        "sunday": "12-10 PM",
        "monday": "12-10 PM",
        "tuesday": "12-10 PM",
        "wednesday": "12-10 PM",
        "thursday": "12-10 PM",
        "friday": "12-10:30 PM"
      },
      "phone": "+19176883166",
      "website": "https://www.matchacafe-maiko.com/eng/",
      "thumbnail": "https://lh3.googleusercontent.com/gps-proxy/ALd4DhEBOsCTWWErekuDQZn75y9w3s6xzsSB-BUGRQDmlk0gPKvYcLveOOxDx_KcK0xrLqpzfZhnp9o2HazeVZqVlcccmFCDuTmsiNjDq-A-lFYweRXoEgOGQaQTPT_Iz02lz0pMZQgjAudbLE5EDUqMuabBxfeAb2fP_TAilIpkL2kgbbOChv4u2iMXsg=w86-h86-k-no",
      "image": "https://lh3.googleusercontent.com/gps-proxy/ALd4DhEBOsCTWWErekuDQZn75y9w3s6xzsSB-BUGRQDmlk0gPKvYcLveOOxDx_KcK0xrLqpzfZhnp9o2HazeVZqVlcccmFCDuTmsiNjDq-A-lFYweRXoEgOGQaQTPT_Iz02lz0pMZQgjAudbLE5EDUqMuabBxfeAb2fP_TAilIpkL2kgbbOChv4u2iMXsg=w751-h751-k-no",
      "google_maps_url": "https://www.google.com/maps/place/Matcha+Cafe+Maiko/@40.719025699999996,-73.9948345,NaN/data=!3m1!1e3!4m6!3m5!1s0x89c25981edcd19cb:0x3d6bfcf13747110b!8m2!3d40.719025699999996!4d-73.9948345!16s"
    }
}
"""

"""
def get_places_by_keyword_and_time(places_by_keyword, time: str, keyword: str):
    meal_type = get_meal_type(time)
    accepted_types = TYPE_BY_TIME.get(meal_type, [])

    from datetime import datetime
    day_of_week = datetime.today().strftime("%A").lower()  # e.g., 'monday'

    results = []
    for place in places_by_keyword.get(keyword, []):
        place_types = [t.lower() for t in place.get("types", [])]
        if not any(t in accepted_types for t in place_types):
            continue
        
        operating_hours = place.get("operating_hours", {})
        today_hours = operating_hours.get(day_of_week)
        if not today_hours:
            continue

        if not is_open_at(time, today_hours):
            continue
        
        results.append(place)

    return results

def get_places_by_time(places_by_keyword, time: str):
    meal_type = get_meal_type(time)
    accepted_types = TYPE_BY_TIME.get(meal_type, [])

    from datetime import datetime
    day_of_week = datetime.today().strftime("%A").lower()

    results = []
    for keyword, places in places_by_keyword.items():
        results.extend(get_places_by_keyword_and_time(places_by_keyword, time, keyword))

    return results
"""
