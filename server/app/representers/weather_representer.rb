class WeatherRepresenter
  def initialize(weather)
    @weather = weather
  end

  def as_json
    {
      current: current_data
    }
  end

  private

  attr_reader :weather

  def current_data
    current_info = weather['current']
    return nil unless current_info

    current_info.slice(
      'temp_c',
      'condition',
      'wind_mph',
      'wind_kph',
      'humidity',
      'cloud',
      'feelslike_c',
      'uv'
    )
  end
end
