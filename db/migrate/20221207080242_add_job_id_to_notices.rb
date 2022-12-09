class AddJobIdToNotices < ActiveRecord::Migration[7.0]
  def change
    add_column :notices, :job_id, :string
    add_column :users, :line_name, :string
    add_column :users, :line_profile_image_url, :string
  end
end
