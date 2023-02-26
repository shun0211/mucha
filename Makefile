server_start:
	docker-compose run --rm --service-ports mucha

sidekiq_start:
	docker-compose run --rm mucha bundle exec sidekiq -C config/sidekiq.yml

firebase_function_deploy:
	cd frontend && firebase deploy --only functions

ngrok_start:
	ngrok start --all

liff_debug:
	npx @line/liff-inspector

rspec:
	docker-compose run --rm mucha bundle exec rspec ${testfile}

mysql_prod:
	pscale auth login
	pscale shell mucha_production main
