# Coding sprint.

This is a static file app that renders HTML from markdown.

Libraries used for this project are: Showdown, Express, fs.
for dev/testing I am using Jest + Supertest with Nodemon.

# Instructions.

To run, simply ensure node and npm is installed. with `npm i` and use `npm run devStart` in order to run the server in with nodemon.

# Testing.

As per the spec, there are three tests in the `__tests__` folder.

tests can be completed by first ensuring the required libraries are installed (running `npm i` in the project directory.)

You can then run `npm run test` to execute Jest.

- Test 1: Checks for statuscode 200. It generates a random valid file to GET.
- Test 2: Checks for status code 404. It generates a random string to GET. (hopefully it is invalid ;)

- Test 3: Parses a uses the random md selected by the helper, converts the md to HTML using showdown, and compares it against the output. (it attempts to GET the appropriate URL.)

# Hosted versions

I will host on Heroku, it is available for online testing. [Click Here to Access](https://statmd.netlify.app/)

URL: `https://statmd.netlify.app/`

# Other Notes.

I did consider using a rendering engine such as Handlebars.js. but as the project is quite small, I chose not to.
