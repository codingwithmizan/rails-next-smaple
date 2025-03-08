class ProductService
  def search_products(products, params)
    query = "%#{params[:query].downcase}%"
    products.where("LOWER(title) LIKE ? OR LOWER(description) LIKE ?", query, query)
  end

end
