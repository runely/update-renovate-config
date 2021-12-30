(async () => {
  const { red, green, yellow } = require('colors')
  const { writeFileSync } = require('fs')
  const repos = require('../data/repos.json') // TODO: Change this with ../lib/get-repos.js to fetch all repos (handling pagination)
  const getRepoContent = require('../lib/get-repo-content')
  const { RENOVATE_FILENAME } = require('../config')

  const archived = false

  console.log('Total    repos:', repos.length)
  const filtered = repos.filter(repo => repo.archived === archived)
  console.log('Filtered repos:', filtered.length)

  const missingRenovate = []
  const hasRenovate = []

  for (const repo of filtered) {
    console.log(repo.name)
    try {
      const content = await getRepoContent(repo.contents_url.replace('/{+path}', ''))
      const cloneUrl = repo['clone_url']
      const repoItem = { name: repo.name, cloneUrl }
      if (content.find(item => item.name === RENOVATE_FILENAME)) {
        hasRenovate.push(repoItem)
        console.log(green(`\tGot ${content.length} items and "${RENOVATE_FILENAME}" was one of them!`))
      } else {
        missingRenovate.push(repo.name)
        console.log(yellow(`\tGot ${content.length} items but "${RENOVATE_FILENAME}" was not one of them!`))
      }
    } catch (error) {
      console.log(red('\tFailed to retrieve content'))
    }
  }

  writeFileSync('./data/repos_missing_renovate.json', JSON.stringify(missingRenovate, null, 2), 'utf8')
  writeFileSync('./data/repos_with_renovate.json', JSON.stringify(hasRenovate, null, 2), 'utf8')
})()
