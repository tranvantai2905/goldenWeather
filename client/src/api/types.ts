export interface FetchCurrentWeatherPayload {
  location: string;
}

export interface LocationInfo {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  uv: number;
}

export interface WeatherResponse {
  location: LocationInfo;
  current: CurrentWeather;
}