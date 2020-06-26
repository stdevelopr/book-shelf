const express = require("express");
const http = require("http");
const path = require("path");
let app = express();
app.use(express.static(path.join(__dirname, "build")));
app.get("/[^.]+$", function(req, res) {
  res
    .set("Content-Type", "text/html")
    .sendFile(__dirname + "/build/index.html");
});
const port = process.env.PORT || "8080";
app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
