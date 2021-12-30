const { execFileSync: exec } = require('child_process')
const { join, resolve } = require('path')
const { readdirSync, writeFileSync } = require('fs')
const { green } = require('colors')
const { RENOVATE_FILENAME, RENOVATE_CONFIG, RENOVATE_COMMIT_MESSAGE } = require('../config')

const readBuffer = array => new Buffer.from(array).toString()

const reposPath = resolve(join(__dirname, '../repos'))
const repos = readdirSync(reposPath)

let index = 1
for (const repo of repos) {
  const repoPath = join(reposPath, repo)
  const renovatePath = join(repoPath, RENOVATE_FILENAME)
  console.log(green(`[${index} / ${repos.length}] - Updating '${renovatePath}'`))
  writeFileSync(renovatePath, RENOVATE_CONFIG, 'utf8')
  const status = readBuffer(exec('git', ['status', '-s'], { cwd: repoPath }))
  if (status) {
    exec('git', ['add', '.'], { cwd: repoPath })
    exec('git', ['commit', '-m', RENOVATE_COMMIT_MESSAGE], { cwd: repoPath })
    exec('git', ['push'], { cwd: repoPath })
    console.log(green(`\tUpdated`))
  } else {
    console.log(`\tNo need to update`)
  }
  index++
}
