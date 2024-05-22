import React from 'react';
import { Grid } from '@mui/material';
import { getDayMonthFromDate } from '../../../utilities/DatetimeUtils';
// import { weatherIcon } from '../../../utilities/IconsUtils';
import ErrorBox from '../../Reusable/ErrorBox';
import CityDateDetail from './CityDateDetail';
import TemperatureWeatherDetail from './TemperatureWeatherDetail';
// import WeatherIconDetail from './WeatherIconDetail';
import Layout from '../../Reusable/Layout';
import { CurrentWeather, LocationInfo } from '../../../api/types';
import WeatherIconDetail from './WeatherIconDetail';

const dayMonth = getDayMonthFromDate();

interface DetailsProps {
  location:  LocationInfo;
  currentWeather: CurrentWeather;
}
const Details: React.FC<DetailsProps> = ({ location, currentWeather }) => {
  const noDataProvided = !currentWeather;

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided) {
    content = (
      <>
        <Grid
          item
          xs={4}
          sx={{
            height: '80px',
          }}
        >
          <CityDateDetail city={location.name} date={dayMonth} />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            height: '80px',
          }}
        >
          <TemperatureWeatherDetail
            temperature={currentWeather.temp_c}
            description={currentWeather.condition.text}
          />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80px',
          }}
        >
          <WeatherIconDetail src={currentWeather.condition.icon} />
        </Grid>
      </>
    );
  }

  return <Layout title="CURRENT WEATHER" content={content} />;
};

export default Details;
