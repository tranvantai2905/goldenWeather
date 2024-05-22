import React from 'react';
import { Grid } from '@mui/material';

// import WeeklyForecastItem from './WeeklyForecastItem';
import ErrorBox from '../Reusable/ErrorBox';
// import UnfedForecastItem from './UnfedForecastItem';
import DayWeatherDetails from './DayWeatherDetails';
import Layout from '../Reusable/Layout';
import { ForecastDay } from '../../api/types';
import WeeklyForecastItem from './WeeklyForecastItem';

interface WeeklyForecastProps{
  forecast: ForecastDay[] | null
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast }) => {

  const noDataProvided = !forecast

  let content = (
    <div style={{ width: '100%' }}>
      <ErrorBox type="error" />
    </div>
  );

  if (!noDataProvided)
    content = (
      <Grid
        item
        container
        display="flex"
        flexDirection="column"
        xs={12}
        gap="4px"
      >
        {forecast.map((forcecastDay, idx) => {
          return (
            <Grid
              item
              key={idx}
              xs={12}
              display="flex"
              alignItems="center"
              sx={{
                padding: '2px 0 2px',
                background:
                  'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                borderRadius: '8px',
              }}
            >
              <DayWeatherDetails
                day={forcecastDay.date}
                src={forcecastDay.day.condition.icon}
                description={forcecastDay.day.condition.text}
              />

              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WeeklyForecastItem
                  type="temperature"
                  value={Math.round(forcecastDay.day.avgtemp_c) + ' °C'}
                />
                <WeeklyForecastItem
                  type="clouds"
                  value={forcecastDay.day.daily_chance_of_rain + ' %'}
                />
              </Grid>

              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WeeklyForecastItem
                  type="wind"
                  value={forcecastDay.day.maxwind_kph + ' mph'}
                />
                <WeeklyForecastItem
                  type="humidity"
                  value={forcecastDay.day.avghumidity + ' %'}
                />
              </Grid>
            </Grid>
          );
        })}
        {/* {data.list.length === 5 && (
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            sx={{
              padding: '2px 0 2px',
              background:
                'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
              boxShadow:
                'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
              borderRadius: '8px',
            }}
          >
            <UnfedForecastItem
              day={forecastDays[5]}
              value="NaN"
              src={weatherIcon('unknown.png')}
            />
          </Grid>
        )} */}
      </Grid>
    );

  return (
    <Layout
      title="WEEKLY FORECAST"
      content={content}
      mb=".8rem"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 0 0',
      }}
    />
  );
};

export default WeeklyForecast;
