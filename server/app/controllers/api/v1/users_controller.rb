class Api::V1::UsersController < ApplicationController
  include ActionController::HttpAuthentication::Token
  before_action :authenticate_user

  def index
    users = User.all
    render json: UsersRepresenter.new(users).as_json, status: :ok
  end

  def update
    if @user.update(user_params)
      render json: UserRepresenter.new(@user).as_json, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    head :no_content
  end

  private

  def authenticate_user
    token, _options = token_and_options(request)
    user_id = AuthenticationTokenService.decode(token)
    
    @current_user = User.find_by(id: user_id)
  rescue ActiveRecord::RecordNotFound
    render status: :unauthorized
  end

  def current_user
    @current_user
  end

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def user_params
    params.require(:user).permit(:email, :password, :username, :city)
  end
end
