import React from "react";
import { Grid } from "@mui/material";

// import WeeklyForecastItem from './WeeklyForecastItem';
import ErrorBox from "../Reusable/ErrorBox";
// import UnfedForecastItem from './UnfedForecastItem';
import Layout from "../Reusable/Layout";
import { WeatherHistoryResponse } from "../../api/types";
import DayWeatherHistoryDetails from "./DayWeatherHistoryDetails";
import WeatherHistoryItem from "./WeatherHistoryItem";

interface WeatherHistoryProps {
  weatherHistory: WeatherHistoryResponse[] | null;
}

const WeatherHistory: React.FC<WeatherHistoryProps> = ({ weatherHistory }) => {
  const noDataProvided = !weatherHistory;

  let content = (
    <div style={{ width: "100%" }}>
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
        {weatherHistory.map((history, idx) => {
          return (
            <Grid
              item
              key={idx}
              xs={12}
              display="flex"
              alignItems="center"
              sx={{
                padding: "2px 0 2px",
                background:
                  "linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                borderRadius: "8px",
              }}
            >
              <DayWeatherHistoryDetails
                day={history.created_at}
                src={JSON.parse(history.forecast.replace(/=>/g, ":")).icon}
                description={
                  JSON.parse(history.forecast.replace(/=>/g, ":")).text
                }
              />

              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WeatherHistoryItem
                  type="temperature"
                  value={Math.round(history.temperature) + " °C"}
                />
                
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WeatherHistoryItem
                  type="wind"
                  value={history.wind_speed + " mph"}
                />
                <WeatherHistoryItem
                  type="humidity"
                  value={history.temperature + " %"}
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
      title="HISTORY WEATHER"
      content={content}
      mb=".8rem"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3rem 0 0",
      }}
    />
  );
};

export default WeatherHistory;
