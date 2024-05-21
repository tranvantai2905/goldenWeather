class ForcecastRepresenter
  def initialize(forecast)
    @forecast = forecast
  end

  def as_json
    {
      location: location_data,
      forecast: forecast_data
    }
  end

  private 

  def location_data
    forecast['location']
  end
  def forecast_data
    forecast_info = forecast['forecast']
    return nil unless forecast_info

    {
      forecastday: forecast_info['forecastday'].map { |day| represent_day(day) }
    }
  end

  def represent_day(day)
    {
      date: day['date'],
      day: day['day'],
      hour: day['hour'].map { |hour| represent_hour(hour) }
    }
  end

  def represent_hour(hour)
    {
      temp_c: hour['temp_c'],
      condition: hour['condition'],
      wind_mph: hour['wind_mph'],
      wind_kph: hour['wind_kph'],
      humidity: hour['humidity'],
      cloud: hour['cloud'],
      feelslike_c: hour['feelslike_c'],
      uv: hour['uv']
    }
  end

  attr_reader :forecast
end
