Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'authenticate', to: 'authentication#create'
      resources :weathers, only: [:index] do
        collection do
          get 'current_weather'
          get 'forecast'
          post 'save_weather'
          get 'weather_history'
        end
      end

      resources :subscriptions, only: [] do
        collection do
          post 'subscribe'
          get 'confirm'
          post 'unsubscribe'
        end
      end
    end
  end
end
