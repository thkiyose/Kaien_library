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

  def destroy
    category = Category.find_by(id: params[:id])
    if category.destroy
      render json: {status:"SUCCESS"}
    else
      render json: category.errors
    end
  end

  def search
    categories = Category.all.order(created_at: :desc)
    .search_with_id(params[:id])
    .search_with_category(params[:category])
    .map{|category| {id: category.id, category: category.category, used: Book.where(category_id: category.id).present?}}
    render json: { categories: categories }
  end
end
