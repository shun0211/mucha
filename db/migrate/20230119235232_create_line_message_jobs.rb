class CreateLineMessageJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :line_message_jobs do |t|
      t.references :notice, null: false
      t.string :job_id, null: false
      t.datetime :scheduled_at, null: false
      t.timestamps
    end
  end
end
