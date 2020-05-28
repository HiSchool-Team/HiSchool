PYTHON = python3.8

run-heroku:
	cd backend && \
	daphne drp.asgi:application --port ${PORT} --bind 0.0.0.0


run-dev:
	cd backend && \
	python manage.py runserver

drp-env:
	cd backend && \
	$(PYTHON) -m venv drp-env && \
	source drp-env/bin/activate && \
	python -m pip install -U pip && \
	python -m pip install -r requirements.txt


test:
	cd backend && \
	python manage.py makemigrations && \
	python manage.py migrate && \
	python manage.py migrate --database=testdb && \
	python manage.py test

clean:
	cd backend && \
	rm db.sqlite3