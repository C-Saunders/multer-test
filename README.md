This repository demonstrates an issue where the AsyncLocalStorage context is cleared when `multer` middleware is used and a request body is included.

You can see the issue by running the tests with `npm test`, or by making a request by
* Starting the server with `npm start`
* Watch the logs while running these
  * `curl --location --request POST 'localhost:5000/without-multer'` (context will be logged correctly)
  * `curl --location --request POST -H 'Content-type: multipart/form-data' 'localhost:5000/without-multer' --form 'foo="bar"'` (context will be logged correctly)
  * `curl --location --request POST -H 'Content-type: multipart/form-data' 'localhost:5000/with-busboy' --form 'foo="bar"'` (context will be logged correctly)
  * `curl --location --request POST 'localhost:5000/with-multer'` (context will be logged correctly)
  * `curl --location --request POST -H 'Content-type: multipart/form-data' 'localhost:5000/with-multer' --form 'foo="bar"'` (`undefined` will be logged)

The issue does not exist for multer 1.4.4, but does for 1.4.4-lts.1 and 1.4.5-lts.1.
