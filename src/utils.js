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
}
