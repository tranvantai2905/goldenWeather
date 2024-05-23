class UserMailer < ApplicationMailer
  include Rails.application.routes.url_helpers
  default from: 'weathermailer2905@gmail.com'

  def confirmation_email(user)
    @user = user
    p user.email
    @url  = "#{ENV['SERVER_URL']}/subscriptions/confirm?token=#{@user.confirmation_token}"
    mail(to: @user.email, subject: 'Please confirm your email address')
  end

  def confirmation_unsubscribe_email(user)
    @user = user
    p user.email
    @url  = "#{ENV['SERVER_URL']}/subscriptions/unsubscribe_confirm?token=#{@user.confirmation_token}"
    mail(to: @user.email, subject: 'Please confirm your email address')
  end

  def daily_forecast_email(user, weather_data)
    @user = user
    @weather_data = weather_data
    mail(to: @user.email, subject: 'Your Daily Weather Forecast')
  end
end
