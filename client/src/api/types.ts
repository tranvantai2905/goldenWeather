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

///FetchWeatherForecastType
export type FetchWeatherForecastPayload = {
  location: string;
  days: number;
};

export type ForecastCondition = {
  text: string;
  icon: string;
  code: number;
};

export type HourForecast = {
  time: string,
  temp_c: number;
  condition: ForecastCondition;
  wind_mph: number;
  wind_kph: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  uv: number;
};

export type DayForecast = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: ForecastCondition;
  uv: number;
};

export type ForecastDay = {
  date: string;
  day: DayForecast;
  hour: HourForecast[];
};

export type ForcecastLocationInfo = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

export type ForecastResponse = {
  location: ForcecastLocationInfo;
  forecast: {
    forecastday: ForecastDay[];
  };
};

//Signup

export type SignUpPayload = {
  user: {
      email: string;
      username: string;
      password: string;
      city: string;
  };
};

export type SignUpResponse = {
  token: string;
};

//Subscrible

export type SubscribePayload = {
  email: string;
};

export type SubscribeResponse = {
  status: string;
};