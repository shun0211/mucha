# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_13_111541) do
  create_table "google_calendar_tokens", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "google_calendar_id", null: false
    t.string "refresh_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_google_calendar_tokens_on_user_id"
  end

  create_table "group_talk_rooms", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "line_name", null: false
    t.string "line_profile_image_url", null: false
    t.string "line_group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_group_talk_rooms_on_user_id"
  end

  create_table "line_message_jobs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "notice_id", null: false
    t.string "job_id", null: false
    t.datetime "scheduled_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["notice_id"], name: "index_line_message_jobs_on_notice_id"
  end

  create_table "notices", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title", null: false
    t.text "message", null: false
    t.integer "status", null: false
    t.datetime "sent_at"
    t.datetime "scheduled_at", null: false
    t.boolean "repeat", null: false
    t.boolean "monday", default: false, null: false
    t.boolean "tuesday", default: false, null: false
    t.boolean "wednesday", default: false, null: false
    t.boolean "thursday", default: false, null: false
    t.boolean "friday", default: false, null: false
    t.boolean "saturday", default: false, null: false
    t.boolean "sunday", default: false, null: false
    t.string "to_line_id", null: false
    t.integer "talk_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "job_id"
    t.bigint "schedule_id"
    t.integer "source", default: 0, null: false
    t.index ["schedule_id"], name: "index_notices_on_schedule_id"
    t.index ["user_id"], name: "index_notices_on_user_id"
  end

  create_table "schedules", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.string "title", null: false
    t.text "description"
    t.string "uid", null: false
    t.bigint "user_id", null: false
    t.integer "source", null: false
    t.boolean "all_day", default: false, null: false
    t.string "source_url", null: false
    t.integer "notice_minutes_ago"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uid"], name: "index_schedules_on_uid", unique: true
    t.index ["user_id"], name: "index_schedules_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "line_user_id"
    t.string "line_nonce"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "line_name"
    t.string "line_profile_image_url"
    t.string "auth0_user_id"
    t.string "firebase_user_id", null: false
    t.boolean "is_friend", default: false, null: false
    t.index ["firebase_user_id"], name: "index_users_on_firebase_user_id", unique: true
    t.index ["line_user_id"], name: "index_users_on_line_user_id", unique: true
  end

  add_foreign_key "notices", "schedules"
end
