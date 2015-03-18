"use strict";

/**
 * Module Dependencies
 */
const SandGrain = require('sand-grain');
const influx = require('influx');
const delegate = require('delegates');
const _ = require('lodash');

/**
 * Expose `Influx`
 */
class Influx extends SandGrain {
  constructor() {
    super();
    this.defaultConfig = require('./default');
    this.version = require('../package').version;
    this.influx = influx;
  }

  init(config, done) {
    super.init(config);

    this.influx = influx(this.config);
    done();
  }

  /**
   * Performs a query on influx, currently only supports
   * queries which return 1 series. Returns an array of row objects
   *
   * @param {string} query - the query
   * @param {function} cb - the callback
   */
  query(query, cb) {
    this.influx.query(query, function(err, results) {
      if (err) {
        return cb(err);
      }

      if (!results || results.length == 0) {
        return cb(null, []);
      }

      if (results.length > 2) {
        return cb(new Error('Sand-Influx Currently DOES not support multiple series, please use `queryRaw` for query: ' + query));
      }

      try {
        let res = [];
        let columns = results[0].columns;

        for (let row of results[0].points) {
          res.push(_.zipObject(columns, row));
        }

        cb(null, res);
      } catch(e) {
        cb(e);
      }

    }.bind(this));
  }

  /**
   * Performs a raw query with no transforms
   *
   * @param {string} query - the query
   * @param {function} cb - callback function when done
   */
  queryRaw(query, cb) {
    this.influx.query(query, cb);
  }
}

module.exports = Influx;

// Add Delegates
delegate(Influx.prototype, 'influx')
  .method('setRequestTimeout')
  .method('setFailoverTimeout')
  .method('getHostsAvailable')
  .method('getHostsDisabled')
  .method('createDatabase')
  .method('deleteDataBase')
  .method('getDatabaseNames')
  .method('getSeriesNames')
  .method('getUsers')
  .method('createUser')
  .method('updateUser')
  .method('writePoint')
  .method('writePoints')
  .method('writeSeries')
  .method('getContinuousQuery')
  .method('createShardSpace')
  .method('updateShardSpace')
  .method('deleteShardSpace')
  .method('dropSeries');