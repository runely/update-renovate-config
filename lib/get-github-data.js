const axios = require('axios').default
const { red } = require('colors')
const { GITHUB_USERNAME, GITHUB_PERSONAL_ACCESS_TOKEN } = require('../config')

module.exports = async url => {
  const options = {
    headers: {
      'User-Agent': GITHUB_USERNAME
    },
    auth: {
      username: GITHUB_USERNAME,
      password: GITHUB_PERSONAL_ACCESS_TOKEN
    }
  }

  try {
    const github = await axios.get(url, options)
    return github
  } catch (error) {
    console.log(red((error.response && error.response.data) || `Error fetching repo content for '${url}'`))
    throw error
  }
}
