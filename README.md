Scaling the Testing Pyramid in TypeScript
=========================================

[![Build and Test](https://github.com/robrich/web-test-everything/actions/workflows/build-and-test.yaml/badge.svg)](https://github.com/robrich/web-test-everything/actions/workflows/build-and-test.yaml)

This is the companion code to the talk at https://robrich.org/slides/web-test-all-the-things/

In this talk we look at testing TypeScript Web Apps (PWA / SPA). We examine tests in these categories:

- hello testing typescript
- unit test a function
  - without mocks
  - mock dependencies
  - mock parameters
- unit test a component
  - assert rendering
  - assert behaviors
- integration testing (from here down)
- external API validation
- end-to-end UI tests
  - custom commands
  - mock network requests
- smoke tests

We explore these NPM packages:

- [vue](https://npmjs.org/vue)
- [typescript](https://npmjs.org/typescript)
- [jest](https://npmjs.org/jest)
- [supertest](https://npmjs.org/supertest)
- [cypress](https://npmjs.org/cypress)
- [ts-auto-mock](https://npmjs.org/ts-auto-mock)
- [ts-mock-imports](https://npmjs.org/ts-mock-imports)
- [start-server-and-test](https://npmjs.org/start-server-and-test)

Usage
-----

### Run the website:

1. Start redis in docker by running `docker-compose up`

2. Start api by running this from a terminal:

   ```sh
   cd api
   npm install
   npm start
   ```

3. Start the vue app by running this from a terminal:

   ```sh
   cd app
   npm install
   npm run serve
   ```

### Run all the tests:

1. Start redis in docker by running `docker-compose up`

2. Don't start the app or api, and kill them if they're running

3. From a terminal run this:

   ```js
   cd api
   npm run test
   cd ..
   cd app
   npm run test
   cd ..
   ```

See also the GitHub Actions build file in `.github/workflows/build-and-test.yaml`

License
-------

MIT
