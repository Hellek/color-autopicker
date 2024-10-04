const dotenv = require('dotenv')

function setDotenvConfig(mode) {
  dotenv.config({ path: '../env/.env.defaults' })
  dotenv.config({ path: `../env/.env.${mode}` })
}

module.exports = {
  setDotenvConfig,
}
