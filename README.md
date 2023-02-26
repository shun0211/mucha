## Port
server: 4434
client: 3100


# Data Check
```
$ bundle exec rake verify_line_message_job_and_scheduled_job:exec RAILS_ENV=production
```

# Refresh Job
```
$ bundle exec rails runner 'load "script/data_patch/20230213_refresh_job.rb"; DataPatch::RefreshJob.new.execute! RAILS_ENV=production'
```
