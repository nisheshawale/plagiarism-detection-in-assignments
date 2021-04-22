const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const FileApi = require("./api/FileApi");
const RunnerManager = require("./compiler/RunnerManager");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use(express.static("dist"));

// test to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get("/api", (req, res) => {
  res.json({ message: "Hello! welcome to our api!" });
});

app.get("/api/file/:lang", (req, res) => {
  const language = req.params.lang;
  // console.log(language);
  FileApi.getFile(language, (content) => {
    const file = {
      lang: language,
      code: content,
    };
    res.send(JSON.stringify(file));
  });
});

app.post("/api/run", (req, res) => {
  const file = req.body;
  console.log(file);
  RunnerManager.run(file.lang, file.code, res);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
