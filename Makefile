server_start:
	docker-compose run --rm --service-ports mucha

sidekiq_start:
	docker-compose run --rm mucha bundle exec sidekiq -C config/sidekiq.yml

firebase_function_deploy:
	cd frontend && firebase deploy --only functions
