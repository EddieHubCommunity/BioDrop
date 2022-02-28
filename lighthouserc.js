module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:recommended',
    },
    collect: {
      staticDistDir: './build',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
