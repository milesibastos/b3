const { format } = require("date-fns");
const datasource = require("../../_datasource");

module.exports = async (req, res) => {
  const { ticker, date } = req.query;
  const dt = format(new Date(date), "yyyyMMdd");
  const dataset = await datasource();
  const response = dataset.filter(
    (row) => row.slice(12, 12 + 12).trim() == ticker && row.slice(2, 10) === dt
  );
  console.log(dataset[dataset.length - 1]);
  res.json(response);
};
