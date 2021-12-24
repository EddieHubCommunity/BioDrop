export default {
  setDefaultSVG: function(name, error) {
    const url = `https://avatars.dicebear.com/api/initials/${name}.svg`
    error.target.onerror = null
    error.target.src = url
  },
}
