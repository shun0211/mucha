class RemoveUnnecessaryColumns < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :auth0_user_id, :string
    remove_column :notices, :job_id, :string
  end
end
