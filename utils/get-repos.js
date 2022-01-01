(async () => {
  const { writeFileSync } = require('fs')
  const { green, yellow } = require('colors')
  const getRepos = require('../lib/get-repos')

  const repos = await getRepos()
  if (repos.length === 0) {
    console.log(yellow('No repos found. Check for any previously logged error messages'))
    return false
  }

  console.log(green('Found a total of', repos.length, 'repos'))
  writeFileSync('./data/repos.json', JSON.stringify(repos, null, 2), 'utf8')
})()
