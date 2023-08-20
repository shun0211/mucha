class Api::V1::ShoppingListsController < SecuredController
  def index
    @shopping_lists = current_user
      .shopping_lists
      .where(is_done: false)
      .order(disp_order: :asc)
      .limit(10)
    render :index, status: :ok
  end

  def create
    @shopping_list = ShoppingList.new(
      user_id: current_user.id,
      name: params[:name],
      disp_order: current_user.shopping_lists.maximum(:disp_order) + 1,
      is_done: false,
    )
    if @shopping_list.save
      render :show, status: :created
    else
      render_not_acceptable_error(@shopping_list.errors.full_messages, '')
    end
  end

  def update
    @shopping_list = current_user
      .shopping_lists
      .find(params[:id])
    if @shopping_list.update(name: params[:name])
      render :show, status: :ok
    else
      render_not_acceptable_error(@shopping_list.errors.full_messages, '')
    end
  end

  def done
    @shopping_list = current_user
      .shopping_lists
      .find(params[:id])
    @shopping_list.update(is_done: true, done_at: Time.current)
    render :show, status: :ok
  end

  def bulk_destroy
    @shopping_lists = current_user
      .shopping_lists
      .where(id: params[:ids])
    @shopping_lists.destroy_all
    render json: {}, status: :ok
  end
end
