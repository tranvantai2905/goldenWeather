import "./App.css";
import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";
import Logo from "./assets/logo.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import Search from "./component/Search";
import React, { useState } from "react";
import ErrorBox from "./component/Reusable/ErrorBox";
import LoadingBox from "./component/Reusable/LoadingBox";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "./api/OpenWeatherService";
import { CurrentWeather, ForecastDay, LocationInfo } from "./api/types";
import TodayWeather from "./component/TodayWeather/TodayWeather";
import WeeklyForecast from "./component/WeeklyForecast/WeeklyForecast";
import SubscriptionPopover from "./component/SubscriptionPopover/SubscriptionPopover";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);

  const searchChangeHandler = async (
    enteredData: { value: string; label: string } | null
  ) => {
    const location = enteredData?.label ? enteredData?.label : "";
    console.log(location);
    setIsLoading(true);

    const res = await fetchCurrentWeather({ location });
    if (res) {
      setLocation(res.location);
      setCurrentWeather(res.current);
    } else {
      setError(true);
      console.error("Failed to fetch current weather data.");
    }

    const forecastRes = await fetchWeatherForecast({
      location: location,
      days: 4,
    });
    if (forecastRes) {
      setForecast(forecastRes.forecast.forecastday);
    } else {
      setError(true);
      console.error("Failed to fetch current weather data.");
    }

    setIsLoading(false);
  };

  console.log({ location }, { currentWeather }, { forecast });

  let appContent = (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        minHeight: "500px",
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: "12px", sm: "14px" },
          color: "rgba(255,255,255, .85)",
          fontFamily: "Poppins",
          textAlign: "center",
          margin: "2rem 0",
          maxWidth: "80%",
          lineHeight: "22px",
        }}
      >
        Explore current weather data and 6-day forecast of more than 200,000
        cities!
      </Typography>
    </Box>
  );

  if (location && currentWeather) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={currentWeather ? 6 : 12}>
          <Grid item xs={12}>
            <TodayWeather
              location={location}
              currentWeather={currentWeather}
              forcecaseDay={forecast?.[0]}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <WeeklyForecast forecast={forecast} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "500px",
        }}
      >
        <LoadingBox>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "10px", sm: "12px" },
              color: "rgba(255, 255, 255, .8)",
              lineHeight: 1,
              fontFamily: "Poppins",
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <Stack direction="row" spacing={2} alignItems={"flex-start"}>
      <Container
        sx={{
          maxWidth: { xs: "95%", sm: "80%", md: "1100px" },
          width: "100%",
          height: "100%",
          margin: "0 auto",
          padding: "1rem 0 3rem",
          marginBottom: "1rem",
          borderRadius: {
            xs: "none",
            sm: "0 0 1rem 1rem",
          },
          boxShadow: {
            xs: "none",
            sm: "rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px",
          },
        }}
      >
        <Grid container columnSpacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: { xs: "16px", sm: "22px", md: "26px" },
                  width: "auto",
                }}
                alt="logo"
                src={Logo}
              />

              {/* <UTCDatetime /> */}
              <Link
                href="https://github.com/tranvantai2905"
                target="_blank"
                underline="none"
                sx={{ display: "flex" }}
              >
                <GitHubIcon
                  sx={{
                    fontSize: { xs: "20px", sm: "22px", md: "26px" },
                    color: "white",
                    "&:hover": { color: "#2d95bd" },
                  }}
                />
              </Link>
            </Box>
            <Search onSearchChange={searchChangeHandler} />
          </Grid>
          {appContent}
        </Grid>
      </Container>

      <SubscriptionPopover />
    </Stack>
  );
}

export default App;
