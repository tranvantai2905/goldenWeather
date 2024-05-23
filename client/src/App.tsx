import "./App.css";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Logo from "./assets/logo.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import Search from "./component/Search";
import React, { useEffect, useState } from "react";
import ErrorBox from "./component/Reusable/ErrorBox";
import LoadingBox from "./component/Reusable/LoadingBox";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
  getWeatherHistory,
} from "./api/WeatherService";
import {
  CurrentWeather,
  ForecastDay,
  LocationInfo,
  WeatherHistoryResponse,
} from "./api/types";
import TodayWeather from "./component/TodayWeather";
import WeeklyForecast from "./component/WeeklyForecast";
import SubscriptionPopover from "./component/SubscriptionPopover";
import { Bounce, toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import WeatherHistory from "./component/WeatherHistory";

export const notify_success = (message: string) =>
  toast.success(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

export const notify_error = () =>
  toast.error("Something wrong", {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [weatherHistory, setWeatherHistory] = useState<
    WeatherHistoryResponse[] | null
  >(null);

  const [limit, setLimit] = useState(5);
  const [historyLimit, setHistoryLimit] = useState(2);

  useEffect(() => {
    if (location) {
      getForcast(location.name, limit);
    }
  }, [location, limit]);

  useEffect(() => {
    if (location) {
      getHistory(location.name, historyLimit);
    }
  }, [location, historyLimit]);

  const getHistory = async (location: string, limit: number) => {
    setIsLoading(true);
    const res = await getWeatherHistory({ params: { location, limit } });
    if (res) {
      setIsLoading(false);
      setWeatherHistory(res?.reverse());
    } else {
      notify_error();
      setError(true);
      console.error("Failed to fetch weather history data.");
    }
  };

  const getForcast = async (location: string, limit: number) => {
    setIsLoading(true);
    const forecastRes = await fetchWeatherForecast({
      location: location,
      days: limit,
    });
    if (forecastRes) {
      setIsLoading(false);
      notify_success("Update forecast successfully");
      setForecast(forecastRes.forecast.forecastday);
    } else {
      notify_error();
      setError(true);
      console.error("Failed to fetch current weather data.");
    }
  };

  const searchChangeHandler = async (
    enteredData: { value: string; label: string } | null
  ) => {
    const location = enteredData?.label ? enteredData?.label : "";
    console.log(location);
    setIsLoading(true);

    const res = await fetchCurrentWeather({ location });
    if (res) {
      notify_success("Update weather successfully");
      setLocation(res.location);
      setCurrentWeather(res.current);
    } else {
      notify_error();
      setError(true);
      console.error("Failed to fetch current weather data.");
    }
    setIsLoading(false);
  };

  const handleSeemore = () => {
    setLimit((pre) => pre + 2);
  };
  const handleSeeless = () => {
    if (limit > 2) setLimit((pre) => pre - 2);
  };

  const handleHistorySeemore = () => {
    setHistoryLimit((pre) => pre + 2);
  };
  const handleHistorySeeless = () => {
    if (historyLimit > 2) setHistoryLimit((pre) => pre - 2);
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
        Explore current weather data and 4-day forecast of more than 200,000
        cities (Hanoi, Danang, Ho Chi Minh City, ...)!
      </Typography>
    </Box>
  );

  if (location && currentWeather) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={currentWeather ? 6 : 12}>
          <Grid item xs={12} sx={{ height: "100%" }}>
            <TodayWeather
              location={location}
              currentWeather={currentWeather}
              forcecaseDay={forecast?.[0]}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WeeklyForecast forecast={forecast} />
          <Stack
            direction={{ xs: "column", md: "row" }}
            marginBlock={{ xs: "5px", md: "10px" }}
          >
            <Button
              sx={{ color: "white", fontWeight: { sm: 500, md: 800 } }}
              variant="contained"
              onClick={() => handleSeemore()}
            >
              See more
            </Button>
            <Button
              sx={{ color: "red", fontWeight: { sm: 400, md: 600 } }}
              onClick={() => handleSeeless()}
            >
              See less
            </Button>
          </Stack>

          <WeatherHistory weatherHistory={weatherHistory} />
          <Stack
            direction={{ xs: "column", md: "row" }}
            marginBlock={{ xs: "5px", md: "10px" }}
          >
            <Button
              sx={{ color: "white", fontWeight: { sm: 500, md: 800 } }}
              variant="contained"
              onClick={() => handleHistorySeemore()}
            >
              See more
            </Button>
            <Button
              sx={{ color: "red", fontWeight: { sm: 400, md: 600 } }}
              onClick={() => handleHistorySeeless()}
            >
              See less
            </Button>
          </Stack>
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
    <div className="flex justify-center items-center">
      <Stack
        direction={{ sm: "column", lg: "row" }}
        spacing={2}
        alignItems={{ sm: "center", md: "flex-end" }}
        justifyContent={{ sm: "center", md: "center" }}
        maxWidth={{ xs: "95%", sm: "80%", md: "2000px" }}
        minWidth={{ xl: "1700px" }}
      >
        <Container
          sx={{
            maxWidth: { xs: "95%", sm: "80%", md: "1400px" },
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
                    height: { xs: "16px", sm: "40px", md: "56px" },
                    width: "auto",
                  }}
                  alt="logo"
                  src={Logo}
                />
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
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
