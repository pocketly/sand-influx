"use strict";

/**
 * Module Dependencies
 */
const SandGrain = require('sand-grain');
const influx = require('influx');
const delegate = require('delegates');

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
  .method('query')
  .method('getContinuousQuery')
  .method('createShardSpace')
  .method('updateShardSpace')
  .method('deleteShardSpace')
  .method('dropSeries');