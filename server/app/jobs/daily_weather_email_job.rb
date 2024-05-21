class DailyWeatherEmailJob
  include Sidekiq::Job

  def perform
    users = User.where(confirmed: true)
    weather_service = WeatherService.new

    users.each do |user|
      city = user.city.presence || 'Hanoi'
      weather_data = weather_service.current_weather(city)
      UserMailer.daily_forecast_email(user, weather_data).deliver_now
    end
  end
end