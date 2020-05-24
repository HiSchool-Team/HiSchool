PYTHON = python3.8

run-production:
	source drp-env/bin/activate && \
 	echo "TODO"

run-dev:
	source drp-env/bin/activate && \
 	python manage.py runserver

drp-env:
	run $(PYTHON) -m venv drp-env
