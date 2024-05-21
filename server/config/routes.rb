Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'authenticate', to: 'authentication#create'
      post 'signup', to: "authentication#signup"

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

      resources :my_profile, only: [] do
        collection do
          get '/', to: 'my_profile#index'
          put '/', to: 'my_profile#update'
          # delete '/', to: 'my_profile#destroy'
        end
      end

      resources :users, only: %i[index update destroy]
    end
  end
end
