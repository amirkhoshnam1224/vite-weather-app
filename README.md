# Weather App

A fully responsive, React-based weather application that provides current weather information and a 5-day weather forecast using the OpenWeather API. This app allows users to retrieve weather details for their current location via geolocation or manually select a city from a predefined list of cities. The application is designed with modern UI/UX principles using Tailwind CSS and offers a smooth, intuitive experience.

## Features

- **Current Weather:** Fetches real-time weather information including temperature, humidity, wind speed, and general conditions (e.g., sunny, cloudy).
- **5-Day Forecast:** Provides a 5-day weather forecast with detailed data for each day, including temperature, condition, and wind speed.
- **Geolocation Support:** Automatically fetches weather data for the user's current location using browser geolocation.
- **Manual City Selection:** Allows users to select a city from a predefined list in case geolocation is unavailable or disabled.
- **Weather Icons:** Displays weather-specific icons (e.g., sunny, cloudy, rainy) based on the weather conditions.
- **Responsive Design:** Fully responsive UI using Tailwind CSS for mobile, tablet, and desktop views.
- **Error Handling:** Graceful error handling for scenarios where geolocation fails or weather data cannot be retrieved.
- **Testing:** Comprehensive unit and integration tests with Jest and Cypress to ensure the app’s functionality.
- **Built-in Loader:** Displays a loading animation while fetching data from the API.

## Technologies Used

- **React:** The main framework used to build the application and manage components.
- **Redux Toolkit:** For managing global state and efficiently handling API requests and data.
- **Axios:** To fetch data from the OpenWeather API.
- **Tailwind CSS:** For fast and flexible styling of the user interface.
- **OpenWeather API:** The external API used to fetch real-time weather and forecast data.
- **Jest:** Unit testing framework to test individual components and functions.
- **Cypress:** End-to-end testing tool to simulate user interaction and test the app’s behavior.
- **Vite:** For fast and optimized bundling of the React application during development and production.
- **ESLint & Prettier:** For code formatting and enforcing coding standards (using Airbnb ESLint configuration).

## Installation

### Step 1: Clone the repository
To get a local copy up and running, first clone this repository to your machine:
   ```bash
   git clone https://github.com/amirkhoshnam1224/vite-weather-app
   cd weather-app 
   npm install
   npm run dev
   npm run test
   npm run cy:run
