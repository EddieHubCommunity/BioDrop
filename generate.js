const path = require('path')
const fs = require('fs')

// load json files
const readDirectoryPath = path.join(__dirname, 'public', 'data')
const files = fs.readdirSync(readDirectoryPath)
const profiles = files.map((file) => {
  const data = JSON.parse(
    fs.readFileSync(`${path.join(__dirname, 'public', 'data', file)}`, 'utf8'),
  )
  return {
    username: file.split('.')[0],
    ...data,
  }
})

// generate list file
const writeDirectoryPath = path.join(__dirname, 'public', 'list.json')
const output = profiles.map((profile) => ({
  type: profile.type,
  name: profile.name,
  username: profile.username,
  avatar: profile.avatar,
  linkCount: profile.links ? profile.links.length : 0,
}))

fs.writeFileSync(writeDirectoryPath, JSON.stringify(output))
