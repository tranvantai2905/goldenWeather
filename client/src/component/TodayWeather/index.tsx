import { Grid } from '@mui/material';
import React from 'react';
import AirConditions from './AirConditions';
import DailyForecast from './Forecast/DailyForecast';
import Details from './Details/Details';
import { CurrentWeather, ForecastDay, LocationInfo } from '../../api/types';

interface TodayWeatherProps {
  location:  LocationInfo;
  currentWeather: CurrentWeather;
  forcecaseDay?: ForecastDay
}

const TodayWeather :React.FC<TodayWeatherProps> = ({ location, currentWeather, forcecaseDay }) => {
  return (
    <Grid container sx={{ padding: '3rem 0rem 0rem', display:"flex", flexDirection:"column", justifyContent:"space-between",height:"100%" }}>
      <Details location={location} currentWeather={currentWeather} />
      <AirConditions currentWeather={currentWeather} />
      <DailyForecast forcecaseDay={forcecaseDay} />
    </Grid>
  );
};

export default TodayWeather;
