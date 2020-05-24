PYTHON = python3.8

run-production:
	source drp-env/bin/activate && \
 	cd drp && \
 	echo "TODO"

run-dev:
	source drp-env/bin/activate && \
 	cd drp && \
 	python manage.py runserver

venv:
	run $(PYTHON) -m venv drp-env
