import React from 'react'
import PropTypes from 'prop-types'
import {
  FaAndroid,
  FaApple,
  FaArrowLeft,
  FaBook,
  FaDev,
  FaDiscord,
  FaDollarSign,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaGraduationCap,
  FaInstagram,
  FaLaravel,
  FaLink,
  FaLinkedin,
  FaMicrosoft,
  FaNodeJs,
  FaPaypal,
  FaSearch,
  FaSlack,
  FaSnapchat,
  FaStackOverflow,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaVimeo,
  FaYoutube,
} from 'react-icons/fa'
import {
  SiCodeforces,
  SiCodewars,
  SiHackerrank,
  SiHashnode,
  SiLeetcode,
  SiMedium,
  SiPolywork,
} from 'react-icons/si'
import { RiSendPlaneFill } from 'react-icons/ri'
import { FiShare2 } from 'react-icons/fi'
import { DiOpensource } from 'react-icons/di'

function GetIcons({ iconName, ...restProps }) {
  switch (iconName) {
    case 'android':
      return <FaAndroid {...restProps} />
    case 'apple':
      return <FaApple {...restProps} />
    case 'arrowLeft':
      return <FaArrowLeft {...restProps} />
    case 'book':
      return <FaBook {...restProps} />
    case 'shareprofile':
      return <FiShare2 {...restProps} />
    case 'codeforces':
      return <SiCodeforces {...restProps} />
    case 'codewars':
      return <SiCodewars {...restProps} />
    case 'dev.to':
      return <FaDev {...restProps} />
    case 'discord':
      return <FaDiscord {...restProps} />
    case 'dollar':
      return <FaDollarSign {...restProps} />
    case 'envelope':
      return <FaEnvelope {...restProps} />
    case 'facebook':
      return <FaFacebook {...restProps} />
    case 'github':
      return <FaGithub {...restProps} />
    case 'gitlab':
      return <FaGitlab {...restProps} />
    case 'globe':
      return <FaGlobe {...restProps} />
    case 'graduation-hat':
      return <FaGraduationCap {...restProps} />
    case 'hackerrank':
      return <SiHackerrank {...restProps} />
    case 'hashnode':
      return <SiHashnode {...restProps} />
    case 'instagram':
      return <FaInstagram {...restProps} />
    case 'laravel':
      return <FaLaravel {...restProps} />
    case 'leetcode':
      return <SiLeetcode {...restProps} />
    case 'link':
      return <FaLink {...restProps} />
    case 'linkedin':
      return <FaLinkedin {...restProps} />
    case 'medium':
      return <SiMedium {...restProps} />
    case 'microsoft':
      return <FaMicrosoft {...restProps} />
    case 'node-js':
      return <FaNodeJs {...restProps} />
    case 'open-source':
      return <DiOpensource {...restProps} />
    case 'paypal':
      return <FaPaypal {...restProps} />
    case 'polywork':
      return <SiPolywork {...restProps} />
    case 'search':
      return <FaSearch {...restProps} />
    case 'send':
      return <RiSendPlaneFill {...restProps} />
    case 'slack':
      return <FaSlack {...restProps} />
    case 'snapchat':
      return <FaSnapchat {...restProps} />
    case 'stackoverflow':
      return <FaStackOverflow {...restProps} />
    case 'telegram':
      return <FaTelegram {...restProps} />
    case 'tiktok':
      return <FaTiktok {...restProps} />
    case 'twitch':
      return <FaTwitch {...restProps} />
    case 'twitter':
      return <FaTwitter {...restProps} />
    case 'vimeo':
      return <FaVimeo {...restProps} />
    case 'youtube':
      return <FaYoutube {...restProps} />
    default:
      return <FaGlobe {...restProps} />
  }
}

GetIcons.propTypes = {
  iconName: PropTypes.string,
}

export default GetIcons
