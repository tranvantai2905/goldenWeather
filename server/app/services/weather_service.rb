require 'httparty'

class WeatherService
  include HTTParty
  base_uri 'https://api.weatherapi.com/v1'

  def initialize
    @api_key = ENV['WEATHER_API_KEY']
  end
  
  def current_weather(location)
    self.class.get("/current.json?q=#{location}&key=#{@api_key}")
  end

  def forecast(location, days)
    self.class.get("/forecast.json?q=#{location}&days=#{days}&key=#{@api_key}")
  end
end