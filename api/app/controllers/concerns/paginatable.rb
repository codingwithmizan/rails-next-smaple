module Paginatable
  extend ActiveSupport::Concern

  # included do
  #   before_action :set_pagination_defaults, only: [:index]
  # end
  def pagination_meta(collection)
    {
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      total_count: collection.total_count,
      per_page: collection.limit_value,
      next_page: collection.next_page,
      prev_page: collection.prev_page
    }
  end

  # private
  # def set_pagination_defaults
  #   params[:page] ||= 1
  #   params[:per_page] ||= 20
  # end
end
