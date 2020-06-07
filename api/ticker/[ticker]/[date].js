const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const unzip = require("unzip-stream");
const { format } = require("date-fns");

module.exports = (req, res) => {
  const { ticker, date } = req.query;
  const dt = format(new Date(date), "yyyyMMdd");
  const file = path.resolve("COTAHIST_A2020.ZIP");

  const grep = spawn("grep", ["-E", `${dt}[0-9]{2}${ticker}[[:space:]]+`]);

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
