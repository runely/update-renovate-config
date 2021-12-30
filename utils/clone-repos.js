const { execFileSync: exec } = require('child_process')
const { join, resolve } = require('path')
const { green } = require('colors')
const repos = require('../data/repos_with_renovate.json')

let index = 1
for (const repo of repos) {
  const repoPath = resolve(join(__dirname, `../repos/${repo.name}`))
  console.log(green(`[${index} / ${repos.length}] - Cloning '${repo.name}'`))
  exec('git', ['clone', repo.cloneUrl, repoPath])
  index++
}
