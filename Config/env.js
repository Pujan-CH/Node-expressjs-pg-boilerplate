const dotenv = require('dotenv')

dotenv.config()

let env, version, port, dbPort, dbUsername, dbPassword, dbHost, dbName, jwtSecretKey, expemtedAuthenticationApi

if (process.env.NODE_ENV === 'PROD') {
  version = process.env.NODE_VERSION
  port = process.env.APP_PORT
  dbPort = process.env.DB_PORT
  dbUsername = process.env.DB_USERNAME
  dbPassword = process.env.DB_PASSWORD
  dbHost = process.env.DB_HOST
  dbName = process.env.DB_NAME
  jwtSecretKey = process.env.JWT_SECRET_KEY
  expemtedAuthenticationApi = process.env.EXEMPTED_AUTHENTICATION_API
} else if (process.env.NODE_ENV === 'DEV') {
  version = process.env.NODE_VERSION
  port = process.env.APP_PORT
  dbPort = process.env.DB_PORT
  dbUsername = process.env.DB_USERNAME
  dbPassword = process.env.DB_PASSWORD
  dbHost = process.env.DB_HOST
  dbName = process.env.DB_NAME
  jwtSecretKey = process.env.JWT_SECRET_KEY
  expemtedAuthenticationApi = process.env.EXEMPTED_AUTHENTICATION_API
} else if (process.env.NODE_ENV === 'LOCAL') {
  version = process.env.NODE_VERSION
  port = process.env.APP_PORT
  dbPort = process.env.DB_PORT
  dbUsername = process.env.DB_USERNAME
  dbPassword = process.env.DB_PASSWORD
  dbHost = process.env.DB_HOST
  dbName = process.env.DB_NAME
  jwtSecretKey = process.env.JWT_SECRET_KEY
  expemtedAuthenticationApi = process.env.EXEMPTED_AUTHENTICATION_API
}

module.exports = {
  env,
  version,
  port,
  dbPort,
  dbUsername,
  dbPassword,
  dbHost,
  dbName,
  jwtSecretKey,
  expemtedAuthenticationApi
}
