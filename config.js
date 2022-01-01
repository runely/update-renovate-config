require('dotenv').config()
const { readFileSync } = require('fs')

const getRenovateConfig = path => {
  try {
    return readFileSync(path, 'utf8')
  } catch (error) {
    if (path) throw new Error('Please create a "renovate_preset.json" file in root of the project containing your new renovate config. Check "README.md" for instructions')
    else throw new Error('Please add full path for "renovate_preset.json" file to your ".env" file. Check "README.md" for instructions')
  }
}

module.exports = {
  GITHUB_USERNAME: process.env.GITHUB_USERNAME,
  GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  GITHUB_REPO_USERNAME: process.env.GITHUB_REPO_USERNAME || false,
  GITHUB_REPO_ORGNAME: process.env.GITHUB_REPO_ORGNAME || false,
  RENOVATE_FILENAME: process.env.RENOVATE_FILENAME || 'renovate.json',
  RENOVATE_CONFIG: getRenovateConfig(process.env.RENOVATE_CONFIG),
  RENOVATE_COMMIT_MESSAGE: process.env.RENOVATE_COMMIT_MESSAGE || 'Updated config'
}
