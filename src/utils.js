import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-initials-sprites'

export default {
  setDefaultSVG: function(name, error) {
    const defaultSVG = createAvatar(style, {
      seed: name,
      dataUri: true,
    })
    error.target.onerror = null
    error.target.src = defaultSVG
  },
  getInitials: function(name) {
    const trimmedName = name.trim()
    const spaceIndex = trimmedName.lastIndexOf(' ')

    if (spaceIndex === -1) {
      return trimmedName.slice(0, 2).toUpperCase()
    }
    const initials = trimmedName[0] + trimmedName[spaceIndex + 1]
    return initials.toUpperCase()
  },
}
