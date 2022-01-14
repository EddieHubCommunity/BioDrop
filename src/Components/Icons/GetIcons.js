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
  FaTelegram,
  FaSnapchat,
} from 'react-icons/fa'
import { SiCodeforces, SiCodewars, SiHashnode, SiMedium } from 'react-icons/si'
import { RiSendPlaneFill } from 'react-icons/ri'

function GetIcons({ iconName, ...restProps }) {
  switch (iconName) {
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
      return <RiSendPlaneFill {...restProps} />
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
    case 'snapchat':
      return <FaSnapchat {...restProps} />
    case 'codeforces':
      return <SiCodeforces {...restProps} />
    case 'medium':
      return <SiMedium {...restProps} />
    default:
      return <FaGlobe {...restProps} />
  }
}

GetIcons.propTypes = {
  iconName: PropTypes.string,
}

export default GetIcons
