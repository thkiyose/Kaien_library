class Api::V1::Admin::LendingsController < ApplicationController
  def index
    lendings = Lending.all
    render json: { lendings: lendings }
  end
end
