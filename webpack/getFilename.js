const getFilename = (isServing, ext) => `static/${ext}/[${isServing ? 'name' : 'contenthash'}].${ext}`

module.exports = {
  getFilename,
}
