every 1.day, at: '7:00 am' do
  runner "DailyWeatherEmailJob.perform_async"
end