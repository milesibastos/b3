const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const unzip = require("unzip-stream");

module.exports = (req, res) => {
  const { ticker } = req.query;
  const file = path.resolve("COTAHIST_A2020.ZIP");

  const grep = spawn("grep", ["-E", `[0-9]+${ticker}[[:space:]]+`]);

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-control": "no-cache",
  });

  grep.stdout.pipe(res);

  fs.createReadStream(file)
    .pipe(unzip.Parse())
    .on("entry", function (entry) {
      entry.on("data", (data) => grep.stdin.write(data));
      entry.on("end", () => grep.stdin.end());
    });
};
