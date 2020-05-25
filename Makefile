PYTHON = python3.8

run-production:
	source drp-env/bin/activate && \
 	echo "TODO"

run-dev:
	source drp-env/bin/activate && \
 	python manage.py runserver

drp-env:
	run $(PYTHON) -m venv drp-env

test:
	python manage.py makemigrations
	python manage.py migrate
	python manage.py migrate --database=testdb
	python manage.py test

clean:
	rm db.sqlite3