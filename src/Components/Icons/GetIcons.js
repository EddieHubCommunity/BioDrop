import React from 'react'
import PropTypes from 'prop-types'
import {
  FaFacebook,
  FaLink,
  FaAndroid,
  FaApple,
  FaDiscord,
  FaGithub,
  FaMicrosoft,
  FaPaypal,
  FaSlack,
  FaTwitter,
  FaVimeo,
  FaYoutube,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaTwitch,
  FaDev,
  FaGlobe,
  FaBook,
  FaDollarSign,
  FaGraduationCap,
  FaTiktok,
  FaArrowLeft,
  FaSearch,
  FaPaperPlane,
  FaTelegram,
} from 'react-icons/fa'

import { SiCodewars, SiHashnode } from 'react-icons/si'

function GetIcons({ iconName, ...restProps }) {
  const lowerIconName = iconName.toLowerCase()

  switch (lowerIconName) {
    case 'facebook':
      return <FaFacebook {...restProps} />
    case 'link':
      return <FaLink {...restProps} />
    case 'android':
      return <FaAndroid {...restProps} />
    case 'apple':
      return <FaApple {...restProps} />
    case 'discord':
      return <FaDiscord {...restProps} />
    case 'github':
      return <FaGithub {...restProps} />
    case 'microsoft':
      return <FaMicrosoft {...restProps} />
    case 'paypal':
      return <FaPaypal {...restProps} />
    case 'slack':
      return <FaSlack {...restProps} />
    case 'twitter':
      return <FaTwitter {...restProps} />
    case 'vimeo':
      return <FaVimeo {...restProps} />
    case 'youtube':
      return <FaYoutube {...restProps} />
    case 'envelope':
      return <FaEnvelope {...restProps} />
    case 'instagram':
      return <FaInstagram {...restProps} />
    case 'linkedin':
      return <FaLinkedin {...restProps} />
    case 'twitch':
      return <FaTwitch {...restProps} />
    case 'dev.to':
      return <FaDev {...restProps} />
    case 'globe':
      return <FaGlobe {...restProps} />
    case 'book':
      return <FaBook {...restProps} />
    case 'send':
      return <FaPaperPlane {...restProps} />
    case 'codewars':
      return <SiCodewars {...restProps} />
    case 'hashnode':
      return <SiHashnode {...restProps} />
    case 'dollar':
      return <FaDollarSign {...restProps} />
    case 'graduation-hat':
      return <FaGraduationCap {...restProps} />
    case 'tiktok':
      return <FaTiktok {...restProps} />
    case 'arrowLeft':
      return <FaArrowLeft {...restProps} />
    case 'search':
      return <FaSearch {...restProps} />
    case 'telegram':
      return <FaTelegram {...restProps} />
    default:
      return <FaGlobe {...restProps} />
  }
}

GetIcons.propTypes = {
  iconName: PropTypes.string,
}

export default GetIcons
