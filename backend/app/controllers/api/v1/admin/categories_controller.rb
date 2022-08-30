class Api::V1::Admin::CategoriesController < ApplicationController
  def index
    categories = Category.all.map{|category| {id: category.id, category: category.category, used: Book.where(category_id: category.id).present?}}
    render json: { categories: categories}
  end

  def create
    category = Category.new(category:params[:category])
    if category.save
      render json: {status:"SUCCESS"}
    else
      render json: category.errors
    end
  end
end
