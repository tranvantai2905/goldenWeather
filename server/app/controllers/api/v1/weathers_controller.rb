
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
        render json: { current: WeatherRepresenter.new(current_weather).as_json, forecast: forecast }
      end

      def current_weather
        weather_service = WeatherService.new
        current_weather = weather_service.current_weather(params[:location])
        
        save_weather(current_weather)

        # render json: current_weather
        render json: WeatherRepresenter.new(current_weather).as_json
      end

      def forecast
        weather_service = WeatherService.new
        forecast = weather_service.forecast(params[:location], params[:days])
        
        # render json: forecast
        render json: ForcecastRepresenter.new(forecast).as_json
      end


      def weather_history
        location = params[:location]
        limit = params[:limit].to_i.nonzero? || 10
    
        weather_data = Weather.where(location: location).limit(limit)
        render json: weather_data
      end

      private

      def save_weather(current_weather)
        location = current_weather.dig('location', 'name')
        date = Date.parse(current_weather.dig('location', 'localtime'))
        
        existing_weather = Weather.where(location: location, created_at: date.all_day).first
    
        unless existing_weather
          weather = Weather.new(
            location: location,
            temperature: current_weather.dig('current', 'temp_c'),
            wind_speed: current_weather.dig('current', 'wind_kph'),
            humidity: current_weather.dig('current', 'humidity'),
            forecast: current_weather.dig('current', 'condition')
          )
    
          if weather.save
            # Do nothing
          else
            render json: { errors: weather.errors }, status: :unprocessable_entity
          end
        end
      end

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
