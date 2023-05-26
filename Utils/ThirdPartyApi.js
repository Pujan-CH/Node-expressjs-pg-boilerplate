const axios = require('axios')
const { logger } = require('../Config/logger')

async function invokeThirdPartyApi (method, url, data, headers) {
  try {
    logger.info({ message: 'Initiating External API Request', method, url, data, headers })
    let apiResponseTemp
    await axios({ method, url, data, headers })
      .then(apiResponse => {
        apiResponseTemp = apiResponse.data
        logger.info({ message: 'External API Request Successful', data: apiResponse.data })
      })
      .catch(error => logger.error({ message: 'External API Request Failed', error }))
    return apiResponseTemp
  } catch (error) {
    logger.info(error)
  }
}

module.exports = {
  invokeThirdPartyApi
}
