const jwt = require('jsonwebtoken')
const env = require('../Config/env')

async function createJwtToken (data) {
  const tokenData = {
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data
  }

  return jwt.sign(tokenData, env.jwtSecretKey)
}

async function verifyJwtToken (token) {
  try {
    return jwt.verify(token, env.jwtSecretKey, (err, decoded) => err || decoded)
  } catch (exception) {
    console.log(exception)
    return false
  }
}

module.exports = {
  createJwtToken,
  verifyJwtToken
}
