install:
	docker volume create customer_nodemodules
	docker-compose -f docker-compose.builder.yml run --rm install
up:
	docker-compose up --build
down:
	docker-compose down
