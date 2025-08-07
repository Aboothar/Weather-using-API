// Select DOM elements
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const card2 = document.querySelector(".card2");
const APIkey = ""; //include your API key here
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");

// Slider elements
const slides = document.querySelectorAll(".c1, .c2, .c3, .c4, .c5");

// Famous world capitals
const capitals = [
    "Tokyo", 
    "Delhi", 
    "Beijing", 
    "Washington", 
    "London"
];

let currentSlide = 0;
let slideInterval;

// Initialize the slider with weather data
async function initSlider() {
    // Fetch weather data for all capitals
    for (let i = 0; i < capitals.length; i++) {
        try {
            const weatherData = await getWeatherData(capitals[i]);
            updateSlide(i, weatherData);
        } catch (error) {
            console.error(`Error fetching data for ${capitals[i]}:`, error);
            slides[i].textContent = `Failed to load weather for ${capitals[i]}`;
        }
    }
    
    // Show first slide
    showSlide(currentSlide);
    
    // Start auto-sliding
    startSlideShow();
}

// Update a slide with weather data
function updateSlide(index, weatherData) {
    const slide = slides[index];
    slide.innerHTML = ""; // Clear previous content
    
    // Destructure weather data
    const {name: city,
           main: {temp, humidity, feels_like},
           weather: [{description, id}]} = weatherData;

    const cityDisplay = document.createElement("h2");
    const tempDisplay = document.createElement("p");
    const feelsLikeDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    // Set content
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    feelsLikeDisplay.textContent = `Feels like: ${(feels_like - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    
    // Add classes
    cityDisplay.classList.add("slide-city");
    tempDisplay.classList.add("slide-temp");
    feelsLikeDisplay.classList.add("slide-feels-like");
    humidityDisplay.classList.add("slide-humidity");
    descDisplay.classList.add("slide-desc");
    weatherEmoji.classList.add("slide-emoji");
    
    // Append to slide
    slide.appendChild(cityDisplay);
    slide.appendChild(tempDisplay);
    slide.appendChild(feelsLikeDisplay);
    slide.appendChild(humidityDisplay);
    slide.appendChild(descDisplay);
    slide.appendChild(weatherEmoji);
}

// Show a specific slide
function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = "none";
    });
    
    // Show the selected slide with animation
    slides[index].style.display = "flex";
    slides[index].style.animation = "fadeIn 1s";
    
    currentSlide = index;
}


// Start auto-sliding
function startSlideShow() {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Initialize the slider when the page loads
window.addEventListener("DOMContentLoaded", initSlider);


// Your existing weather functions...

// Event listener for current weather button
btn1.addEventListener("click", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a valid city");
    }
});

// Fetch current weather data from API
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    
    return response.json();
}

// Display error message
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

// Display current weather information
function displayWeatherInfo(weatherData){
    const {name: city,
           main: {temp, humidity, feels_like},
           weather: [{description, id}]} = weatherData;
    
    card.textContent = "";
    card.style.display = "flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const feels_likeDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} °C`;
    feels_likeDisplay.textContent = `Feels like: ${(feels_like - 273.15).toFixed(1)} °C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    
    cityDisplay.classList.add("cityName");
    tempDisplay.classList.add("temperature");
    feels_likeDisplay.classList.add("feelsLikeDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("discDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feels_likeDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Get weather emoji based on weather condition code
function getWeatherEmoji(id) {
    switch(true){
        case (id >= 200 && id < 300): return "🌩️";
        case (id >= 300 && id < 400): return "🌧️";
        case (id >= 500 && id < 600): return "🌧️";
        case (id >= 600 && id < 700): return "❄️";
        case (id >= 700 && id < 800): return "🌫️";
        case (id === 800):            return "☀️";
        case (id >= 801 && id < 810): return "☁️️";
        default:                      return "❓";
    }
}

// Event listener for tomorrow's weather button
btn2.addEventListener("click", async event =>{
    event.preventDefault();
    const city2 = cityInput.value;

    if(city2){
        try{
            const weatherData2 = await getTomorrowWeatherData(city2);
            displayTomorrowWeatherInfo(weatherData2);
        }
        catch(error){
            displayError(error);
        }
    }
    else{
        displayError("Please enter a valid city for tomorrow's weather");
    }
})

// Fetch tomorrow's weather data from API
async function getTomorrowWeatherData(city2){
    const apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=${APIkey}`; // Note: OpenWeatherMap does not provide a direct endpoint for tomorrow's weather, so this is a placeholder
    // You will need to use a different API or mostly you will need to use a paid subscription for it to get tomorrow's weather data.
    const response2 = await fetch(apiUrl2);
    if(!response2.ok){
        throw new Error("Could not fetch tomorrow's weather data");
    }
    return response2.json();
}

// Display tomorrow's weather information
function displayTomorrowWeatherInfo(weatherData2){
    const {name: city2,
           main: {temp, humidity},
           weather: [{description, id}]} = weatherData2;

    card2.textContent = "";
    card2.style.display = "flex";

    const title2 = document.createElement("h2");
    const city2Display = document.createElement("h1");
    const temp2Display = document.createElement("p");
    const humidity2Display = document.createElement("P");
    const desc2Display = document.createElement("P");
    const weatherEmoji2 = document.createElement("P");

    title2.textContent = "Tomorrow's Weather";
    city2Display.textContent = city2;
    temp2Display.textContent = `${(temp - 273.15).toFixed(1)} °C`;
    humidity2Display.textContent = `Humidity: ${humidity}%`;
    desc2Display.textContent = description;
    weatherEmoji2.textContent = getWeatherEmoji(id);

    title2.classList.add("title");
    city2Display.classList.add("cityName");
    temp2Display.classList.add("temperature");
    humidity2Display.classList.add("humidityDisplay");
    desc2Display.classList.add("discDisplay");
    weatherEmoji2.classList.add("weatherEmoji");
    
    card2.appendChild(title2);
    card2.appendChild(city2Display);
    card2.appendChild(temp2Display);
    card2.appendChild(humidity2Display);
    card2.appendChild(desc2Display);
    card2.appendChild(weatherEmoji2);
}