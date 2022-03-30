const path = require('path')
const fs = require('fs')

// Generate global app config
const config = {
  selected_user: null,
}

const externalConfigFile = path.join(__dirname, 'linkfree.json')

if (fs.statSync(externalConfigFile).isFile()) {
  const appConfig = require(externalConfigFile)

  if (appConfig.selected_user) config.selected_user = appConfig.selected_user
}

// load json files
const readDirectoryPath = path.join(__dirname, 'public', 'data')
const files = fs.readdirSync(readDirectoryPath).filter((file) => {
  const basename = path.basename(file, path.extname(file))
  return (
    !config.selected_user ||
     (config.selected_user && basename === config.selected_user)
  )
})
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
  linkCount: profile.links.length,
}))

fs.writeFileSync(writeDirectoryPath, JSON.stringify(output))
