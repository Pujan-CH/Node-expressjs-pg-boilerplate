const db = require('../Config/db_connect')
const { logger } = require('../Config/logger')
const { createJwtToken } = require('../Utils/UserAuthUtilities')
const { invokeThirdPartyApi } = require('../Utils/ThirdPartyApi')
const env = require('../Config/env')

class userLogin {
  async Authenticate (loginName, password) {
    try {
      //put your login stuff here
      } catch (exception) {
      logger.info(exception)
      return {
        status: 0,
        message: 'ERROR',
        data: {}
      }
    }
  }
}

module.exports = userLogin
