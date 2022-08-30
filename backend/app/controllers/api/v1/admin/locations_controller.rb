class Api::V1::Admin::LocationsController < ApplicationController
  def index
    locations = Location.all.map{|location| {id: location.id, location: location.location, used: Book.where(location_id: location.id).present?}}
    render json: { locations: locations}
  end

  def create
    location = Location.new(location:params[:location])
    if location.save
      render json: {status:"SUCCESS"}
    else
      render json: location.errors
    end
  end

  def destroy
    location = Location.find_by(id: params[:id])
    if location.destroy
      render json: {status:"SUCCESS"}
    else
      render json: location.errors
    end
  end

  def search
    locations = Location.all
    .search_with_id(params[:id])
    .search_with_location(params[:location])
    .map{|location| {id: location.id, location: location.location, used: Book.where(location_id: location.id).present?}}
    render json: { locations: locations }
  end
end
