const express = require("express"); // server.
const app = express();
const fs = require("fs"); //for reading files
const port = process.env.PORT || 3000;
const template = "template.html"; // template filename.

module.exports = app;

// loads md converter module (showdown) - converts markdown to HTML for us.
const showdown = require("showdown");
const converter = new showdown.Converter();

app.use(express.static(__dirname + "/public")); // for css /images

app.get("/*", (req, res) => {
  // wildcard. (with checks)
  res.type("html");
  // parse request URL and see if available
  fs.readFile(
    __dirname + "/content/" + req.url + "/index.md",
    "utf-8",
    function (err, data) {
      // error sending 404.
      if (err) {
        res.statusCode = "404";
        data = "<h1>404 Error</h1><p>404 Error, Sorry File Not Found.</p>";
      }
      //all good, seek md and convert to html.
      else {
        res.statusCode = "200";
        data = converter.makeHtml(data);
      }

      // source template file.
      fs.readFile(__dirname + "/" + template, "utf-8", function (
        err,
        template
      ) {
        if (err) throw err;
        // all good parsing template, modifying html @anchor.
        res.write(template.replace("{{content}}", data));
        // sending payload.
        res.end();
      });
    }
  );
});

// listeing to PORT for get.
app.listen(port, () =>
  console.log("Server Started listening to port: " + port.toString())
);
