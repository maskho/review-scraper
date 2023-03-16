const http = require("http");
var gplay = require("google-play-scraper");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;
const app_id = "com.suitmedia.nebengers";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, app_id, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  gplay.app({ appId: "com.suitmedia.nebengers" }).then((res) => {
    // var jsonObj = JSON.parse(res);
    var jsonString = JSON.stringify(res);

    fs.writeFile(
      `results/${app_id}-appdetails.json`,
      jsonString,
      "utf8",
      function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("JSON detail file has been saved");
      }
    );
  });

  gplay
    .reviews({
      appId: app_id,
      lang: ["id,en"],
      sort: gplay.sort.NEWEST,
      num: 5000,
    })
    .then((res) => {
      // var jsonObj = JSON.parse(res);
      var jsonString = JSON.stringify(res);

      fs.writeFile(
        `results/${app_id}-appreviews.json`,
        jsonString,
        "utf8",
        function (err) {
          if (err) {
            return console.log(err);
          }

          console.log("JSON review file has been saved");
        }
      );
    });
});
