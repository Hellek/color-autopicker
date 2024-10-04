const childProcess = require('child_process')

const parseDescribe = gitDescribeOutput => {
  const gIndex = gitDescribeOutput.indexOf('-g')

  if (gIndex === -1) return { releaseTag: gitDescribeOutput }

  const items = gitDescribeOutput.split('-')
  const commitsAfterTag = items[items.length - 2]
  const releaseTag = items.splice(0, items.length - 2).join('-')

  return {
    releaseTag,
    commitsAfterTag,
  }
}

const getGitInfo = () => {
  const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace('\n', '')
  const hash = childProcess.execSync('git rev-parse --short HEAD').toString().replace('\n', '')

  let releaseTag = ''
  let commitsAfterTag = ''
  let APP_VERSION = branch

  try {
    const output = childProcess.execSync('git describe --tags').toString().replace('\n', '')
    const describe = parseDescribe(output)

    releaseTag = describe.releaseTag
    commitsAfterTag = describe.commitsAfterTag
    APP_VERSION = `${branch}-${releaseTag}.${commitsAfterTag || 0}`
  } catch (error) {
    if (error.message.indexOf('cannot describe anything') === -1) throw error
    const errorMessage = `Custom webpack feature "getGitInfo" catch "${error.message}"`.replaceAll('\n', ' ')
    // eslint-disable-next-line no-console
    console.log('\x1b[44m%s\x1b[0m', errorMessage)
  }

  return {
    APP_VERSION,
    branch,
    hash,
    releaseTag,
    commitsAfterTag,
  }
}

module.exports = {
  getGitInfo,
}
