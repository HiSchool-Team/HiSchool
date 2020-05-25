PYTHON = python3.8

run-heroku:
	daphne drp.asgi:application --port ${PORT} --bind 0.0.0.0

run-production: drp-env
	source drp-env/bin/activate && \
	daphne drp.asgi:application --port ${PORT} --bind 0.0.0.0


run-dev: drp-env
	source drp-env/bin/activate && \
 	python manage.py runserver

drp-env:
	$(PYTHON) -m venv drp-env && \
	source drp-env/bin/activate && \
	python -m pip install -U pip && \
	python -m pip install -r requirements.txt


test:
	python manage.py makemigrations
	python manage.py migrate
	python manage.py migrate --database=testdb
	python manage.py test

clean:
	rm db.sqlite3