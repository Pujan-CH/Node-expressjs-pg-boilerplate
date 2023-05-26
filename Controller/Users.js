const OUsers = require('../Model/Login')
const { logger } = require('../Config/logger')
const env = require('../Config/env')

const userAuthenticate = async (req, res) => {
  try {
    const Username = req.body.userName
    const Pswd = req.body.password
    const ousers = new OUsers()

    const isAuthenticated = await ousers.Authenticate(Username, Pswd)


    if (isAuthenticated.status) {
      logger.info({ message: 'User Login successful', data: isAuthenticated.data })
      res.status(200).send(isAuthenticated)
    } else {
      logger.info({ message: 'User Authentication FAILED', data: req.body })
      res.status(401).send(isAuthenticated)
    }
  } catch (exception) {
    console.log(exception)
  }
}

module.exports = {
  userAuthenticate
}
