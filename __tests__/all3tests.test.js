const request = require("supertest");
const app = require("../app");
const getAllFiles = require("../helpers/getFiles");
const showdown = require("showdown");
const fs = require("fs"); //for reading files
const converter = new showdown.Converter();

// grabbing random valid file from function defined in helper.
const files = getAllFiles("./content");
let randvfile = files[Math.floor(Math.random() * files.length)]
  .split("\\")
  .join("/")
  .replace("content/", "");

// * one that verifies that requests to valid URLs return a 200 HTTP status code
describe("Select a random index.md page, and check for 200 response", () => {
  it("should return 200.", async () => {
    const response = await request(app).get(
      "/" + randvfile.replace("index.md", "")
    );
    expect(response.status).toBe(200);
  });
});

// * one that verifies that requests to URLs that do not match content folders return a 404 HTTP status code

describe("Should Verify invalid URLS generate 404", () => {
  it("should send an invalid URL and verify 404.", async () => {
    // generates random string
    const response = await request(app).get(
      "/" + Math.random().toString(36).substring(7)
    );
    expect(response.status).toBe(404);
  });
});

//converting random valid file to html
let readfile = fs.readFileSync("./content/" + randvfile, "utf-8");

let convertedfile = converter.makeHtml(readfile);
// * one that verifies that requests to valid URLs return a body that contains the HTML generated from the relevant `index.md` markdown file
describe("Should Verify Valid HTML from Folder .md body", () => {
  it("should scan folder to find valid urls, convert to html, and compare body of response to verify it.", async () => {
    const response = await request(app).get(
      "/" + randvfile.replace("index.md", "")
    );
    expect(response.text).toContain(convertedfile);
  });
});
