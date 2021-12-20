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
} from 'react-icons/fa'
import { SiCodewars, SiHashnode } from 'react-icons/si'
import { RiSendPlaneFill } from 'react-icons/ri'

function GetIcons({ iconName }) {
  switch (iconName) {
    case 'facebook':
      return <FaFacebook />
    case 'link':
      return <FaLink />
    case 'android':
      return <FaAndroid />
    case 'apple':
      return <FaApple />
    case 'discord':
      return <FaDiscord />
    case 'github':
      return <FaGithub />
    case 'microsoft':
      return <FaMicrosoft />
    case 'paypal':
      return <FaPaypal />
    case 'slack':
      return <FaSlack />
    case 'twitter':
      return <FaTwitter />
    case 'vimeo':
      return <FaVimeo />
    case 'youtube':
      return <FaYoutube />
    case 'envelope':
      return <FaEnvelope />
    case 'instagram':
      return <FaInstagram />
    case 'linkedin':
      return <FaLinkedin />
    case 'twitch':
      return <FaTwitch />
    case 'dev.to':
      return <FaDev />
    case 'globe':
      return <FaGlobe />
    case 'book':
      return <FaBook />
    case 'send':
      return <RiSendPlaneFill />
    case 'codewars':
      return <SiCodewars />
    case 'hashnode':
      return <SiHashnode />
    case 'dollar':
      return <FaDollarSign />
    case 'graduation-hat':
      return <FaGraduationCap />
    case 'tiktok':
      return <FaTiktok />
    default:
      return <FaGlobe />
  }
}

GetIcons.propTypes = {
  iconName: PropTypes.string,
}

export default GetIcons
