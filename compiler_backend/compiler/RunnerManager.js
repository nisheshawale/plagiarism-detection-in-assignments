const path = require("path");
const FileApi = require("../api/FileApi");
const CRunner = require("./CRunner");
const CppRunner = require("./CppRunner");
const JavaRunner = require("./JavaRunner");
const JavaScriptRunner = require("./JavaScriptRunner");
const PythonRunner = require("./PythonRunner");
const { stat } = require("fs");

class Factory {
  constructor() {
    this.createRunner = function createRunner(lan) {
      let runner;
      let lang = lan.toLowerCase();

      if (lang === "c") {
        runner = new CRunner();
      } else if (lang === "c++") {
        runner = new CppRunner();
      } else if (lang === "java") {
        runner = new JavaRunner();
      } else if (lang === "javascript") {
        runner = new JavaScriptRunner();
      } else if (lang === "python") {
        runner = new PythonRunner();
      }

      return runner;
    };
  }
}

module.exports = {
  run(lang, code, res) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());

    const directory = path.join(__dirname, "temp");
    const file = path.join(directory, runner.defaultFile());
    console.log(`file: ${file}`);
    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .java
    console.log(`filename: ${filename}`);
    console.log(`extension: ${extension}`);

    FileApi.saveFile(file, code, () => {
      runner.run(file, directory, filename, extension, (status, message) => {
        const result = {
          status,
          message,
        };
        console.log("The status is " + status);
        console.log("The message is " + message);

        res.end(JSON.stringify(result));
      });
    });
  },
};
