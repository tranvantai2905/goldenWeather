# frozen_string_literal: true

module Api
  module V1
    class MyProfileController < ApplicationController
      include ActionController::HttpAuthentication::Token

      before_action :authenticate_user

      # GET /api/v1/my_profile
      def index
        render json: UserRepresenter.new(current_user).as_json, status: :ok
      end

      # PATCH/PUT /api/v1/my_profile
      def update
        if current_user.update(user_params)
          render json: UserRepresenter.new(current_user).as_json, status: :ok
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/my_profile
      def destroy
        current_user.destroy
        head :no_content
      end

      private

      def authenticate_user
        token, _options = token_and_options(request)
        user_id = AuthenticationTokenService.decode(token)
        
        @current_user = User.find_by(id: user_id)
        render status: :unauthorized unless @current_user
      rescue ActiveRecord::RecordNotFound, JWT::DecodeError
        render status: :not_found
      end

      def current_user
        @current_user
      end

      def user_params
        params.require(:user).permit(:email, :password, :city)
      end
    end
  end
end
