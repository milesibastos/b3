const fs = require("fs");
const path = require("path");
const unzip = require("unzip-stream");
const readline = require("readline");

const dataset = [];

module.exports = () =>
  new Promise((resolve, reject) => {
    if (dataset.length > 0) {
      resolve(dataset);
    } else {
      const file = path.resolve(`COTAHIST_A${process.env.YEAR}.ZIP`);

      fs.createReadStream(file)
        .pipe(unzip.Parse())
        .on("entry", function (entry) {
          const rl = readline.createInterface({
            input: entry,
            crlfDelay: Infinity,
          });
          rl.on("line", (line) => {
            dataset.push(line);
          });

          rl.on("close", () => resolve(dataset));
        });
    }
  });
