# sand-influx
An [InfluxDB](http://influxdb.com) sand grain. This module is a wrapper for [node-influx](https://github.com/bencevans/node-influx).

## Installation
`npm install sand-influx`

## Usage
Add influx to your sand config

```js
const sand = require('sand');
const influx = require('influx');

new sand()
    .use(influx)
    .start();
```

A list of configuration values can be found below

### Configuration Options

| Option | Description |
|--------|-------------|
| username | username |
| password | password |
| database | database name |
| hostname | hostname, e.g. 'localhost' |
| port [optional] | influx db port, defult: 8086 |
| requestTimeout [optional] | number of ms to wait before request times out. defaults to 'null' (waits until connection is closed). Use with caution ! |
| maxRetries[optional] | max number of retries until a request raises an error (e.g 'no hosts available'), default: 2 |

## Functions

### writePoint

Writes a point to a series

```js
let point = {value: 100};
sand.influx.writePoint(seriesName, point, options, callback);
```

### writePoints

Write multiple points to a series

```js
let points = [{value: 100}, {value: 200}];
sand.influx.writePoints(seriesName, points, options, callback);
```

*Please note that there's a POST limit at about 2MB per request. Do not submit too many points at once*

### query

Queries the database, This function manipulates the data that comes back and returns an array of series rows with columns and values mapped automatically.

```js
let query = 'SELECT mean(column) FROM my_series WHERE time > now() - 24h';
sand.influx.query(query, function(err, rows) {
    // Rows should be an array of objects
});
```

### queryRaw

Queries the database using raw influx

```js
let query = 'SELECT mean(column) FROM my_series WHERE time > now() - 24h';
sand.influx.queryRaw(query, callback);
```