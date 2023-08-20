json.set! :shoppingLists do
  json.array! @shopping_lists do |shopping_list|
    json.partial! 'api/v1/shopping_lists/shopping_list', shopping_list: shopping_list
  end
end
