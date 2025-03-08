module Api
  module V1
    class EmployeesController < ApplicationController
      before_action :authenticate_request!
      def index
        employees = Employee.all
        render json: employees, status: 200
      rescue StandardError => ex
        render json: { error: ex.message }, status: 500
      end

      def show
        employee = Employee.find(params[:id])
        render json: employee, status: 200
      rescue StandardError => ex
        render json: { error: ex.message }, status: 500
      end

      def create
        employee = Employee.new(employee_params)
        if employee.save
          render json: employee, status: 201
        else
          render json: { error: employee.errors.full_messages }, status: 422
        end
      rescue StandardError => ex
        render json: { error: ex.message }, status: 500
      end

      def update
        employee = Employee.find(params[:id])
        if employee.update(employee_params)
          render json: employee, status: 200
        else
          render json: { error: employee.errors.full_messages }, status: 422
        end
      rescue StandardError => ex
        render json: { error: ex.message }, status: 500
      end

      def destroy
        employee = Employee.find(params[:id])
        if employee.destroy
        render json: employee, status: 200
        else
          render json: { error: employee.errors.full_messages }, status: 422
        end

      rescue StandardError => ex
        render json: { error: ex.message }, status: 500
      end

      private
      def employee_params
        params.require(:employee).permit(
          :name, :email, :designation, :age, :dob
        )
      end
    end
  end
end
