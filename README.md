# Weather Forecast Project - Golden Weather

Welcome to the Golden Weather project! This application is designed to provide accurate and up-to-date weather forecasts using a modern tech stack comprising React.js for the front-end and Ruby on Rails for the back-end.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Project Description

Golden Weather is a weather forecasting application that allows users to get the latest weather updates for their location or any other city in the world. The app provides detailed weather information, including temperature, humidity, wind speed, and a 7-day forecast.

## Features

- Real-time weather updates
- 4-day weather forecast
- Search weather by city
- Responsive and user-friendly UI
- Detailed weather information including temperature, humidity, wind speed, and more

## Technology Stack

- **Front-end:** React.js
- **Back-end:** Ruby on Rails
- **APIs:** OpenWeatherMap API for fetching weather data

## Installation

To get a local copy of the project up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed on your machine
- Ruby and Rails installed on your machine
- PostgreSQL (or any preferred database)

### Front-end Setup (React.js)

1. Clone the repository:
   ```sh
   git clone https://github.com/tranvantai2905/goldenWeather.git
   cd golden-weather/client
   ```

2. Install NPM packages:
   ```sh
   yarn install
   ```

3. Create a `.env` file in the `server` directory and add your OpenWeatherMap API key:
   ```sh
   VITE_SERVER_URL=your_openweathermap_api_key
   ```

4. Start the React development server:
   ```sh
   yarn run dev
   ```

### Back-end Setup (Ruby on Rails)

1. Navigate to the `backend` directory:
   ```sh
   cd ../server
   ```
2. Switch to Sqlite3 (optional):
   ```sh
   rails db:system:change --to=sqlite3
   ``` 

2. Install required gems:
   ```sh
   bundle install
   ```
3. Create a `.env` file in the `server` directory and add your OpenWeatherMap API key:
   ```sh
   WEATHER_API_URL=https://api.weatherapi.com/v1
   WEATHER_API_KEY=55801912c4de4b3489b64027242105
   GMAIL_USERNAME=your_gmail_username
   GMAIL_PASSWORD=your_application_gmail_password
   CLIENT_URL=http://localhost:5173
   SERVER_URL=http://localhost:3000/api/v1
   ```
   
5. Set up the database:
   ```sh
   rails db:create
   rails db:migrate
   ```

6. Start the Rails server:
   ```sh
   rails server
   ```

## Usage

After completing the installation steps, you should have both the React and Rails servers running. 

1. Open your browser and navigate to `http://localhost:5173` for the React front-end.
2. Use the search functionality to find weather information for your desired city.
3. Explore the 4-day forecast and detailed weather data.

## Demo

- Front-end: https://golden-weather-intern-pro.netlify.app
- Back-end: https://goldenweather.onrender.com/api/v1
- Swagger: upcome
   
## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Thank you for visiting Golden Weather! If you have any questions or feedback, please don't hesitate to reach out.

Happy coding!
