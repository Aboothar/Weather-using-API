# Weather-using-API
Weather

Weather Dashboard with Slider
A web application that displays current and tomorrow's weather forecasts for any city, along with an auto-updating slider showing weather for major world capitals.

Features
Current Weather Forecast: Get real-time weather data for any city

Tomorrow's Weather: View forecast for the next day

Capital Cities Slider: Auto-rotating display showing weather for 5 major world capitals

Visual Weather Indicators: Emoji representations of weather conditions

Responsive Design: Works on various screen sizes

Technologies Used
HTML5

CSS3 (with animations)

JavaScript (ES6)

OpenWeatherMap API

Installation
Clone this repository or download the files

Open index.html in any modern web browser

No server required - works directly from local files

How to Use
Enter a city name in the input field

Click "Get weather" for current conditions

Click "Get tomorrow's weather" for the next day's forecast

View the auto-updating slider showing weather for major capitals

API Key Note
YOU will need to get your own API key from OpenWeatherMap. For production use:

Sign up for a free API key at OpenWeatherMap

Replace the APIkey variable in index.js with your own key

File Structure
index.html - Main HTML structure

styles.css - All styling and animations

index.js - JavaScript functionality including:

Weather data fetching

Slider functionality

DOM manipulation

Customization Options
Add more capital cities by expanding the capitals array in index.js

Modify the slider timing by changing the interval in startSlideShow()

Adjust colors and styling in styles.css

Known Issues
The "Tomorrow's weather" button currently shows the same data as current weather (API limitation in free tier)

Slider may show errors if API calls fail

No error handling for misspelled city names

Future Improvements
Implement proper forecast API for tomorrow's weather

Add location detection for automatic weather display

Include more detailed weather information (wind, pressure, etc.)

Add temperature unit toggle (Celsius/Fahrenheit)

Improve mobile responsiveness

License
This project is open source and available under the MIT License.
