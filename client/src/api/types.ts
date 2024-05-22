export type FetchCurrentWeatherPayload = {
  location: string;
}

export type LocationInfo = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export type Condition = {
  text: string;
  icon: string;
  code: number;
}

export type CurrentWeather = {
  temp_c: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  uv: number;
}

export type WeatherResponse = {
  location: LocationInfo;
  current: CurrentWeather;
}
