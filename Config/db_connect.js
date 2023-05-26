const Promise = require('bluebird')
const logger = require('./logger').logger

const env = require('./env')

const _DB_USERNAME = env.dbUsername
const _DB_PASSWORD = env.dbPassword
const _DB_PORT = env.dbPort
const _DB_HOST = env.dbHost
const _DB_NAME = env.dbName

const initOptions = {
  promiseLib: Promise,
  connect (client, dc, useCount) {
    const cp = client.connectionParameters
    // logger.info('Connected to database:', cp.database)
  },
  disconnect (client, dc) {
    const cp = client.connectionParameters
    // logger.info('Disconnecting from database:', cp.database)
  },
  error (err, e) {
    logger.error(err)
    if (e.cn) {
      logger.error('\nError occured while connecting to db ', e.cn)
    }
    if (e.query) {
      logger.error('\nError in following query string ', e.query)
      if (e.params) {
        logger.error('\nError in following query string params ', e.params)
      }
    }
    if (e.ctx) {
      logger.error('\nError in following transaction ', e.ctx)
    }
  },
  receive (data, result, e) {
    camelizeColumns(data)
  },
  query (e) {
    logger.debug('QUERY:', e.query)
  },
  transact (e) {
    if (e.ctx.finish) {
      // this is a transaction->finish event;
      logger.info('QUERY End Time:', e.ctx.finish, ' Duration: ', e.ctx.duration, 'ms')
    } else {
      // this is a transaction->start event;
      logger.info('QUERY Start Time:', e.ctx.start)
    }
  }
}

// for deleting unwanted props
const unwantedProps = [
  'createdBy',
  'modifiedAt',
  'modifiedBy',
  'deletedAt',
  'deletedBy'
]

// for parsing into integer
const ids = [
  'id',
  'userId'
]

function camelizeObjects (obj) {
  for (const prop in obj) {
    const camel = pgp.utils.camelize(prop)
    if (typeof obj[prop] === 'object' && obj[prop] != null) {
      obj[camel] = camelizeObjects(obj[prop])
    } else {
      if (ids.includes(camel)) {
        obj[camel] = parseInt(obj[prop])
      } else {
        obj[camel] = obj[prop]
      }
    }
    if (camel !== prop) {
      delete obj[prop]
      /* delete unwanted props */
      if (unwantedProps.includes(camel)) {
        delete obj[camel]
      }
    }
  }
  return obj
}

function camelizeColumns (data) {
  data.forEach((elem) => {
    elem = camelizeObjects(elem)
  })
}

const pgp = require('pg-promise')(initOptions)

const cn = {
  connectionString: getCn(),
  max: 50
}

/* Preparing the connection details */
function getCn () {
  // logger.info('Starting db server')
  return `postgres://${_DB_USERNAME}:${_DB_PASSWORD}@${_DB_HOST}:${_DB_PORT}/${_DB_NAME}`
}

/* Creating a new database instance from the connection details: */
const db = pgp(cn)

/* Exporting the database object for shared use: */
module.exports = db
