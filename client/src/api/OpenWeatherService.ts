import instance from "./instance";
import { FetchCurrentWeatherPayload, WeatherResponse } from "./types";

const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

// const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
// const WEATHER_API_KEY = '29bdd2b8de0e52ef8e41d6307ad986cd';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export async function fetchCities(input :string) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function fetchCurrentWeather(payload: FetchCurrentWeatherPayload): Promise<WeatherResponse | null> {
  try {
    const response = await instance.get<WeatherResponse>("/weathers/current_weather", {
      params: payload,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    return null;
  }
}