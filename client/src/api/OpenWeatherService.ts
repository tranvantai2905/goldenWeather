import instance from "./instance";
import { FetchCurrentWeatherPayload, FetchWeatherForecastPayload, ForecastResponse, SignUpPayload, SignUpResponse, SubscribePayload, SubscribeResponse, WeatherResponse } from "./types";

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

export async function fetchWeatherForecast(payload: FetchWeatherForecastPayload): Promise<ForecastResponse | null> {
  try {
    const response = await instance.get<ForecastResponse>('/weathers/forecast', {
      params: {
        location: payload.location,
        days: payload.days,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return null;
  }
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponse | null> {
  try {
      const response = await instance.post<SignUpResponse>('http://localhost:3000/api/v1/signup', payload);
      return response.data;
  } catch (error) {
      console.error('Error signing up:', error);
      return null;
  }
}

export async function subscribe(payload: SubscribePayload): Promise<SubscribeResponse | null> {
  try {
      const response = await instance.post<SubscribeResponse>('http://localhost:3000/api/v1/subscriptions/subscribe', payload);
      return response.data;
  } catch (error) {
      console.error('Error subscribing:', error);
      return null;
  }
}