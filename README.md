# Market Data | B3

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