const datasource = require("../_datasource");

module.exports = async (req, res) => {
  const { ticker } = req.query;
  const dataset = await datasource();
  const response = dataset.filter(
    (row) => row.slice(12, 12 + 12).trim() == ticker
  );
  console.log(dataset[dataset.length - 1]);
  res.json(response);
};
