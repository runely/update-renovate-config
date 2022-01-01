const { green, red } = require('colors')
const { GITHUB_REPO_USERNAME, GITHUB_REPO_ORGNAME } = require('../config')
const getRepos = require('./get-github-data')

const getNextLink = headers => {
  if (!headers || !headers.link) return false
  const links = headers.link.split(',')
  let url = false
  links.forEach(link => {
    const linkSplit = link.split(';')
    if (linkSplit[1].includes('next')) {
      url = linkSplit[0].replace('<', '').replace('>', '').trim()
    }
  })
  return url
}

module.exports = async () => {
  const isOrg = !!GITHUB_REPO_ORGNAME
  const isUsername = !!GITHUB_REPO_USERNAME
  const url = isOrg ? `https://api.github.com/orgs/${GITHUB_REPO_ORGNAME}/repos` : `https://api.github.com/users/${GITHUB_REPO_USERNAME}/repos`

  if (!isOrg && !isUsername) {
    console.log(red('Please add "GITHUB_REPO_USERNAME" or "GITHUB_REPO_ORGNAME" to your ".env" file'))
    return []
  }
  if (isOrg) {
    console.log(green('Fetching repos for organization', GITHUB_REPO_ORGNAME))
  } else {
    console.log(green('Fetching repos for user', GITHUB_REPO_USERNAME))
  }

  let nextUrl = url
  const repos = []
  do {
    try {
      const { headers, data } = await getRepos(nextUrl)
      nextUrl = getNextLink(headers)
      repos.push(...data)
    } catch (error) {
      nextUrl = false
    }
  } while (nextUrl)

  return repos
}
