module Api
  module V1
    class UsersController < ApplicationController
      def index
        page = params[:page] || 1
        per_page = params[:per_page] || 20
        users = User.order(created_at: :desc).page(page).per(per_page)
        serialize_users = serialize_resource(users, UserSerializer)
        render_success({ users: serialize_users, meta: pagination_meta(users) }, "Fetch all user successfully.")
      end

      def show
        user = User.find(params[:id])
        serialize_user = serialize_resource(user, UserSerializer)
        render_success({ user: serialize_user }, "A user details has been successfully fetched")
      end

      def update
        user = User.find(params[:id])
        if user.update(update_user_params)
          serialize_user = serialize_resource(user, UserSerializer)
          render_success({ user: serialize_user }, "A user  has been successfully updated")
        else
          render_error("#{user.errors.full_messages}", 422)
        end
      end

      def destroy
        user = User.find(params[:id])
        if user.destroy
          serialize_user = serialize_resource(user, UserSerializer)
          render_success({ user: serialize_user }, "A user has been successfully deleted")
        else
          render_error("#{user.errors.full_messages}", 422)
        end
      rescue StandardError => ex
        render_error("#{ex.message}")
      end

      private
      def update_user_params
        params.require(:user).permit(
          :email, :password, :first_name, :last_name, :username,
          :age, :gender, :dob, :phone
        )
      end

    end
  end
end
