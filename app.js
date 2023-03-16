const http = require("http");
var gplay = require("google-play-scraper");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  gplay.app({ appId: "com.suitmedia.nebengers" }).then((res) => {
    // var jsonObj = JSON.parse(res);
    var jsonString = JSON.stringify(res);

    fs.writeFile("output.json", jsonString, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("JSON file has been saved");
    });
  });
});
