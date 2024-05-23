import instance from "./instance";
import { FetchCurrentWeatherPayload, FetchWeatherForecastPayload, ForecastResponse, SignUpPayload, SignUpResponse, SubscribePayload, SubscribeResponse, UnSubscribePayload, UnSubscribeResponse, WeatherHistoryParam, WeatherHistoryResponse, WeatherResponse } from "./types";

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
    throw Error('Error fetching Citys');
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
    throw Error('Error fetching current weather');
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
    throw Error('Error fetching weather forecast');
  }
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponse | null> {
  try {
      const response = await instance.post<SignUpResponse>('/signup', payload);
      return response.data;
  } catch (error) {
      console.error('Error signing up:', error);
      throw Error('Error signing up');
  }
}

export async function subscribe(payload: SubscribePayload): Promise<SubscribeResponse | null> {
  try {
      const response = await instance.post<SubscribeResponse>('/subscriptions/subscribe', payload);
      return response.data;
  } catch (error) {
      console.error('Error subscribing:', error);
      throw Error('Error subscribing');
  }
}

export async function unsubscribe(payload: UnSubscribePayload): Promise<UnSubscribeResponse | null> {
  try {
      const response = await instance.post<SubscribeResponse>('/subscriptions/unsubscribe', payload);
      return response.data;
  } catch (error) {
      console.error('Error subscribing:', error);
      throw Error('Error subscribing');
  }
}

export async function getWeatherHistory(param: WeatherHistoryParam): Promise<WeatherHistoryResponse[] | null> {
  try {
      const response = await instance.get<WeatherHistoryResponse[]>('weathers/weather_history', param);
      
      return response.data;
  } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw new Error('Error fetching weather forecast');
  }
}