
# frozen_string_literal: true
module Api
  module V1
    # Weather
    class WeathersController < ApplicationController
      before_action :validate_days, only: [:forecast]
      def index
        weather_service = WeatherService.new
        current_weather = weather_service.current_weather(params[:location])
        forecast = weather_service.forecast(params[:location], params[:days])
        render json: { current: current_weather, forecast: forecast }
      end

      def current_weather
        weather_service = WeatherService.new
        current_weather = weather_service.current_weather(params[:location])
        render json: { current: current_weather }
      end

      def forecast
        weather_service = WeatherService.new
        forecast = weather_service.forecast(params[:location], params[:days])
        render json: { forecast: forecast }
      end

      def save_weather
        weather = Weather.new(weather_params)
        if weather.save
          render json: { status: 'Weather data saved' }, status: :ok
        else
          render json: { errors: weather.errors }, status: :unprocessable_entity
        end
      end

      def weather_history
        weather_data = Weather.where(created_at: Date.today.all_day)
        render json: weather_data
      end

      private

      def weather_params
        params.require(:weather).permit(:location, :temperature, :wind_speed, :humidity, :forecast)
      end
      
      def validate_days
        days = params[:days].to_i
        unless days.between?(1, 14)
          render json: { error: 'Days parameter must be between 1 and 14' }, status: :unprocessable_entity
        end
      end
    end
  end
end
