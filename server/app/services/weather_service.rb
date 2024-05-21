require 'httparty'

class WeatherService
  include HTTParty
  base_uri 'https://api.weatherapi.com/v1'

  def initialize(location)
    @location = location
    @api_key = '55801912c4de4b3489b64027242105'
  end
  
  def current_weather
    self.class.get("/current.json?q=#{@location}&key=#{@api_key}")
  end

  def forecast(days)
    self.class.get("/forecast.json?q=#{@location}&days=#{days}&key=#{@api_key}")
  end
end