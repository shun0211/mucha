# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

set :output, 'log/crontab.log'

every 1.day, at: '7:00 am' do
  command "bundle exec rake verify_line_message_job_and_scheduled_job:exec RAILS_ENV=production"
end
