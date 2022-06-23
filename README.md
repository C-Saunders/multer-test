This repository demonstrates an issue where the AsyncLocalStorage context is cleared when multer middleware is used and a request body is included.

You can see the issue by running the tests with `npm test`, or by making a request by
* Starting the server with `npm start`
* Watch the logs while running these
  * `curl --location --request POST 'localhost:5000/without-multer' --form 'foo="bar"'`
  * `curl --location --request POST 'localhost:5000/with-multer' --form 'foo="bar"'`
