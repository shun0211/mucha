user = User.last
ShoppingList.create!(name: '買い物リスト1', disp_order: 1, user_id: user.id)
ShoppingList.create!(name: '買い物リスト2', disp_order: 2, user_id: user.id)
ShoppingList.create!(name: '買い物リスト3', disp_order: 3, user_id: user.id)
