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
  }

  init(config, done) {
    super.init(config);

    this.influx = new influx.InfluxDB(this.config);
    done();
  }
}

module.exports = Influx;

// Add Delegates
delegate(Influx.prototype, 'influx')
  .method('createDatabase')
  .method('dropDataBase')
  .method('getDatabaseNames')
  .method('getSeries')
  .method('getUsers')
  .method('createUser')
  .method('dropUser')
  .method('query')
  .method('queryRaw')
  .method('writePoints')
  .method('writeMeasurement')
  .method('createContinuousQuery')
  .method('dropContinuousQuery')
  .method('dropDatabase')
  .method('dropSeries');
