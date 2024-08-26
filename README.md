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

# 環境構築
## バックエンド

## データベース
```bash
$ docker-compose run --rm mucha bundle exec rails db:migrate
```

## サーバー立ち上げ
```bash
$ make server_start
```

## フロントエンド
ngrok の立ち上げ

```bash
$ make ngrok_start
```

http://localhost:4434 の URL をコピーして、.env.development.local の NEXT_PUBLIC_API_URL のドメイン部分に設定する

# Google Calendar 連携をローカルで動かす場合
ngrok を立ち上げ、フロントエンドの URL を確認する。

```
ngrok                                                                               (Ctrl+C to quit)

Policy Management Examples http://ngrok.com/apigwexamples

Session Status                online
Account                       さかい (Plan: Free)
Version                       3.14.1
Region                        United States (us)
Latency                       181ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://2cc1-59-166-112-184.ngrok-free.app -> http://localhost:9222
Forwarding                    https://875f-59-166-112-184.ngrok-free.app -> http://localhost:3100
Forwarding                    https://9f4c-59-166-112-184.ngrok-free.app -> http://localhost:4434
```

バックエンドの .env の FRONT_URI を ngrok の URL に変更する。
この場合、https://875f-59-166-112-184.ngrok-free.app になる。

フロントエンド

以下のページの承認済みのリダイレクト URI に、ngrok の URL を設定する。
https://console.cloud.google.com/apis/credentials/oauthclient/880306272200-mpgc69rqgrkbj3egesainjdsfoel1kmb.apps.googleusercontent.com?project=mucha-dev-39f76

LINE Developers でコールバック URL を設定する。
https://developers.line.biz/console/channel/1657798495/line-login
