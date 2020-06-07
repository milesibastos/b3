# Market Data | B3

- [Market Data \| B3](http://www.b3.com.br/en_us/market-data-and-indices/data-services/market-data/)
- [FILE LAYOUT – HISTORICAL QUOTATIONS](http://www.b3.com.br/data/files/65/50/AD/26/29C8B51095EE46B5790D8AA8/HistoricalQuotations_B3.pdf)

## Historical Quotations

- YEAR: 2020
  - https://b3-2020.now.sh
  - http://bvmf.bmfbovespa.com.br/InstDados/SerHist/COTAHIST_A2020.ZIP
- YEAR: 2019
  - https://b3-2019.now.sh
  - http://bvmf.bmfbovespa.com.br/InstDados/SerHist/COTAHIST_A2019.ZIP
- YEAR: 2018
  - https://b3-2018.now.sh
  - http://bvmf.bmfbovespa.com.br/InstDados/SerHist/COTAHIST_A2018.ZIP

## The purpose of this API is to return a result as:

```bash
$ wget -nc -O - http://bvmf.bmfbovespa.com.br/InstDados/SerHist/COTAHIST_A2020.ZIP | gunzip - | gzip - > COTAHIST_A2020.gz
$ zgrep -E [0-9]+PETR4[[:space:]]+ COTAHIST_A2020.gz
012020010202PETR4       010PETROBRAS   PN  EJ  N2   R$  000000000305100000000030700000000003031000000000305700000000030700000000003069000000000307064405000000000037774500000000115477749300000000000000009999123100000010000000000000BRPETRACNPR6196
...
012020060502PETR4       010PETROBRAS   PN      N2   R$  000000000222900000000023030000000002206000000000223200000000022100000000002210000000000221327382000000000114137700000000254771647800000000000000009999123100000010000000000000BRPETRACNPR6196
```

## GET: `/api/ticker/:ticker`

```bash
$ curl https://b3-2020.now.sh/api/ticker/PETR4
[
  "012020010202PETR4       010PETROBRAS   PN  EJ  N2   R$  000000000305100000000030700000000003031000000000305700000000030700000000003069000000000307064405000000000037774500000000115477749300000000000000009999123100000010000000000000BRPETRACNPR6196",
  ...
  "012020060502PETR4       010PETROBRAS   PN      N2   R$  000000000222900000000023030000000002206000000000223200000000022100000000002210000000000221327382000000000114137700000000254771647800000000000000009999123100000010000000000000BRPETRACNPR6196"
]
```

## GET: `/api/ticker/:ticker/:iso-date`

```bash
$ curl https://b3-2020.now.sh/api/ticker/PETR4/2020-06-01
[
  "012020060102PETR4       010PETROBRAS   PN      N2   R$  000000000201500000000020560000000002000000000000203500000000020330000000002033000000000203402047000000000086579500000000176231966700000000000000009999123100000010000000000000BRPETRACNPR6196"
]
```

## Mapping values sample

How to mapping text to object is beyond the scope of this project. But here's an example doing it based on [file layout](http://www.b3.com.br/data/files/65/50/AD/26/29C8B51095EE46B5790D8AA8/HistoricalQuotations_B3.pdf)

```js
const fetch = require("node-fetch");

test("map row to object", async () => {
  const data = await fetch(
    "https://b3-2020.now.sh/api/ticker/PETR4/2020-06-01"
  ).then((response) => response.json());

  const dataset = data.map((row) => ({
    date: new Date(`${row.slice(2, 6)}-${row.slice(6, 8)}-${row.slice(8, 10)}`),
    ticker: row.slice(12, 12 + 12).trim(),
    open: Number(`${row.slice(56, 67)}.${row.slice(67, 69)}`),
    high: Number(`${row.slice(69, 80)}.${row.slice(80, 82)}`),
    low: Number(`${row.slice(82, 93)}.${row.slice(93, 95)}`),
    close: Number(`${row.slice(108, 119)}.${row.slice(119, 121)}`),
  }));

  const expected = [
    {
      date: new Date("2020-06-01"),
      ticker: "PETR4",
      open: 20.15,
      high: 20.56,
      low: 20,
      close: 20.33,
    },
  ];

  expect(dataset).toEqual(expect.arrayContaining(expected));
});
```
