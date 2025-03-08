class Api::V1::CoursesController < ApplicationController
  def index
    page = params[:page] || 1
    per_page = params[:per_page] || 20
    courses = Course.order(created_at: :desc).page(page).per(per_page)
    serialize_courses = serialize_resource(courses, CourseSerializer)
    render_success({ courses: serialize_courses, meta: pagination_meta(courses) }, "All courses have been fetch successfully")
  end
  def show
    course = Course.find(params[:id])
    serialize_course = serialize_resource(course, CourseSerializer)
    render_success({ course: serialize_course }, "Course ID##{params[:id]} has been fetch successfully")
  end
  def create
    course = Course.new(course_params)
    if course.save
      render_success({ course: }, "Course ID##{params[:id]} has been created successfully")
    else
      render_error("Course could not be created", :unprocessable_entity)
    end
  end
  def update
    course = Course.find(params[:id])
    if course.update(course_params)
      render_success({ data: course }, "Course #{params[:id]} has been updated successfully")
    else
      render_error("Course could not be updated", :unprocessable_entity)
    end
  end
  def destroy
    course = Course.find(params[:id])
    if course.destroy
      render_success({ data: course }, "Course #{params[:id]} has been deleted successfully")
    else
      render_error("Course could not be deleted", :unprocessable_entity)
    end
  end

  private
  def course_params
    params.require(:course).permit(:title, :description, :price, :duration, :cover_photo).tap do |whitelisted|
      whitelisted[:status] = params[:course][:status].to_i if params[:course][:status].present?
    end
  end

end
