# frozen_string_literal: true

module Api
  module V1
    # Authentication
    class AuthenticationController < ApplicationController
      class AuthenticationError < StandardError
      end
      rescue_from ActionController::ParameterMissing, with: :parameter_missing
      rescue_from AuthenticationError, with: :handle_unathencitated

      def create
        raise AuthenticationError unless user.authenticate(params.require(:password))

        token = AuthenticationTokenService.call(user.id)

        render json: { token: token }, status: :created
      end

      def signup
        user = User.new(user_params)

        if user.save
          token = AuthenticationTokenService.call(user.id)
          render json: { token: token }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end


      private

      def user
        @user ||= User.find_by(username: params.require(:username)) 
      end

      def user_params
        params.require(:user).permit(:username, :password, :email , :city)
      end

      def parameter_missing(e)
        render json: { error: e.message }, status: :unprocessable_entity
      end

      def handle_unathencitated
        head :unauthorized
      end
    end
  end
end