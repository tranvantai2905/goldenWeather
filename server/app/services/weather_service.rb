require 'httparty'

class WeatherService
  include HTTParty
  base_uri ENV['WEATHER_API_URL']
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