install:
	npm ci
lint:
	npm run lint
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
serve:
	npm serve