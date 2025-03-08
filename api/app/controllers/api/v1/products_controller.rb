module Api
  module V1
    class ProductsController < ApplicationController
      def index
        page = params[:page] || 1
        per_page = params[:per_page] || 20
        products = Product.order(created_at: :desc)
        if params[:query].present?
          service = ProductService.new
          products = service.search_products(products, params)
        end
        products = products.page(page).per(per_page)
        render_success(
          { products:, meta: pagination_meta(products) },
          "All products has been successfully fetched."
        )
      end

      def show
        product = Product.find(params[:id])
        render_success({ product: }, "A product details has been successfully fetched")
      end

      def create
        product = Product.new(product_params)
        if product.save
          render_success({ product: }, "A product has been successfully created", :created)
        else
          render_error("#{product.errors.full_messages.join(" ")}", 422)
        end
      end

      def update
        product = Product.find(params[:id])
        if product.update(product_params)
          render_success({ product: }, "A product has been successfully updated")
        else
          render_error("#{product.errors.full_messages}", 422)
        end
      end

      def destroy
        product = Product.find(params[:id])
        if product.destroy
          render_success({ product: }, "A product has been successfully deleted")
        else
          render_error("#{product.errors.full_messages}", 422)
        end
      end

      private
      def product_params
        params.require(:product).permit(:title, :description, :price)
      end
    end
  end
end
