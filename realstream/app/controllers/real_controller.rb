class RealController < ApplicationController
    require "juggernaut"
    def index
    end
    
    def new
      Juggernaut.publish("channel1", params[:url]) 
      redirect_to new_real_url
    end

    def show
    end
    
    def create
      Juggernaut.publish("channel1", params[:url]) 
      redirect_to new_real_url
      #render action: "new"
    end
end
