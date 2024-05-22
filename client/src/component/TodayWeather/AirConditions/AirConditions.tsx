
import ErrorBox from '../../Reusable/ErrorBox';
import AirConditionsItem from './AirConditionsItem';
import Layout from '../../Reusable/Layout';
import { CurrentWeather } from '../../../api/types';

interface TodayWeatherAirConditionsProps {
  currentWeather: CurrentWeather;
}

const TodayWeatherAirConditions : React.FC<TodayWeatherAirConditionsProps> = ({ currentWeather }) => {
  const noDataProvided =
    !currentWeather

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided)
    content = (
      <>
        <AirConditionsItem
          title="Real Feel"
          value={`${Math.round(currentWeather.feelslike_c)} °C`}
          type="temperature"
        />
        <AirConditionsItem
          title="Wind"
          value={`${currentWeather.wind_mph} mph`}
          type="wind"
        />
        <AirConditionsItem
          title="Clouds"
          value={`${Math.round(currentWeather.cloud)} %`}
          type="clouds"
        />
        <AirConditionsItem
          title="Humidity"
          value={`${Math.round(currentWeather.humidity)} %`}
          type="humidity"
        />
      </>
    );
  return (
    <Layout
      title="AIR CONDITIONS"
      content={content}
      mb="1rem"
      sx={{ marginTop: '2.9rem' }}
    />
  );
};

export default TodayWeatherAirConditions;
