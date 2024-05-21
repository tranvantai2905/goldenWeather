module Api
  module V1
    class SubscriptionsController < ApplicationController
    
      def subscribe
        user = User.find_by(email: params[:email])
        if user
          user.confirmation_token = SecureRandom.hex(10)
          user.save
          UserMailer.confirmation_email(user).deliver_now
          render json: { status: 'Confirmation email sent' }, status: :ok
        else
          render json: { error: 'Email not found' }, status: :not_found
        end
      end
    
      def confirm
        user = User.find_by(confirmation_token: params[:token])
        if user
          user.confirmed = true
          user.confirmation_token = nil
          user.save
          render json: { status: 'Email confirmed' }, status: :ok
        else
          render json: { error: 'Invalid token' }, status: :unprocessable_entity
        end
      end
    
      def unsubscribe
        user = User.find_by(email: params[:email])
        user.update(confirmed: false)
        render json: { status: 'Unsubscribed' }, status: :ok
      end
    end
  end
end