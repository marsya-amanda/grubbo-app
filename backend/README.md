# GRUBBO Backend

Flask backend API for the GRUBBO tour planning application.

## Structure

```
backend/
├── app.py              # Main Flask application and routes
├── run.py              # Application entry point
├── requirements.txt    # Python dependencies
├── tour/               # Tour planning module
│   ├── logic.py       # Core tour planning algorithm
│   ├── route.py       # Route calculation (Google Routes API)
│   ├── search_nearby.py # Place search (ScrapingDog API)
│   ├── filter.py      # Place filtering logic
│   ├── utils.py       # Utility functions (time, string)
│   ├── constants.py   # Configuration constants
│   └── api_dumps/     # Mock API responses (for development)
└── tests/             # Unit tests
```

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install additional dependencies:**
   ```bash
   pip install timezonefinder googlemaps
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend/` directory:
   ```env
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   SCRAPING_DOG_API_KEY=your_scraping_dog_api_key
   ```

4. **Run the server:**
   ```bash
   python run.py
   # or
   python app.py
   ```
   
   Server will run on `http://127.0.0.1:5000`

## API Endpoints

### POST /plan-tour
Generate a tour plan based on user inputs.

**Request Body:**
```json
{
  "date": "2025-07-20",
  "startPlace": "245 Bridge Road, Forest Lodge NSW 2037, Australia",
  "startTime": "12:00",
  "endPlace": "Pier Pavilion, Barangaroo Avenue, Barangaroo NSW 2000, Australia",
  "endTime": "17:00",
  "numPlaces": 5,
  "keywords": ["matcha", "dessert", "thai"],
  "priceRating": [["$", true], ["$$", false], ["$$$", false]],
  "travelMode": "transit"
}
```

**Response:**
```json
{
  "stop_1": {
    "place": { ... },
    "arrival": "12:15",
    "departure": "13:15",
    "polyline": "..."
  },
  "stop_2": { ... }
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-20T12:00:00.000000"
}
```

## Development

- **Mock Mode:** Set `MOCK_MODE = True` in `tour/constants.py` to use cached API responses
- **CORS:** Enabled for cross-origin requests from mobile app
- **Debug Mode:** Enabled by default in `app.py`

## Future Endpoints

### POST /nlp/parse (To be implemented)
Parse natural language tour requests using LLM.

**Request Body:**
```json
{
  "query": "I want to visit matcha cafes and dessert shops from Central Station to Circular Quay between 12pm and 5pm",
  "context": {
    "currentLocation": "Sydney, Australia",
    "date": "2025-07-20"
  }
}
```

**Response:**
```json
{
  "startPlace": "Central Station, Sydney",
  "endPlace": "Circular Quay, Sydney",
  "startTime": "12:00",
  "endTime": "17:00",
  "keywords": ["matcha", "dessert"],
  "priceRating": [["$", true], ["$$", true], ["$$$", false]],
  "travelMode": "transit",
  "confidence": 0.95
}
```

## Testing

Run tests:
```bash
python -m pytest tests/
```

## Notes

- The backend is designed to work with the React Native mobile app
- All API responses are JSON
- Error responses follow the format: `{"error": "Error message", "details": "..."}`
- The mobile app connects to this backend via HTTP requests (see `grubbo/app/services/api/`)

