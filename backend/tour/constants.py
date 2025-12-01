import os
from dotenv import load_dotenv
import json
load_dotenv()

MOCK_MODE = True

# logic.py
VISIT_TIME_MEAL = 60  # minutes
VISIT_TIME_OTHER = 45  # minutes
APPROXIMATE_TRAVEL_TIME = 15

# search_nearby.py
GOOGLE_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
SCRAPING_DOG_API_KEY = os.getenv("SCRAPING_DOG_API_KEY")
DEFAULT_FILTER_PARAM = "!3m1!4b1!4m4!2m3!5m1!4e8!6e5"  # Filter: 3.5+ stars, Open Anytime, Reverse engineered from Google Maps URL

# filter.py
DASH = "\u2013"
WHITESPACE = "\u202f"

FOOD_TYPES = ["acai_shop",
"bagel_shop",
"bakery",
"bar",
"bar_and_grill",
"cafe",
"cafeteria",
"candy_store",
"cat_cafe",
"chocolate_factory",
"chocolate_shop",
"coffee_shop",
"confectionery",
"deli",
"dessert_restaurant",
"dessert_shop",
"diner",
"dog_cafe",
"donut_shop",
"fast_food_restaurant",
"fine_dining_restaurant",
"food_court",
"ice_cream_shop",
"juice_shop",
"meal_delivery",
"meal_takeaway",
"pizza_restaurant",
"pub",
"restaurant",
"sandwich_shop",
"steak_house",
"sushi_restaurant",
"tea_house",
"vegan_restaurant",
"vegetarian_restaurant",
"vietnamese_restaurant",
"wine_bar",
"food"]

TYPE_BY_TIME = {
    "breakfast": ["cafe", "cafeteria", "bakery", "deli"],
    "lunch": ["restaurant", "pub", "vegan_restaurant", "vegetarian_restaurant", "sushi_restaurant", "pizza_restaurant", "sandwich_shop"],
    "dinner": ["restaurant", "pub", "bar", "fine_dining_restaurant"],
    "other": [food_type for food_type in FOOD_TYPES if "restaurant" not in food_type]
}

def dump_response(name, data):
    os.makedirs("backend/tour/api_dumps", exist_ok=True)
    with open(f"backend/tour/api_dumps/{name}.json", "w") as f:
        json.dump(data, f, indent=2)