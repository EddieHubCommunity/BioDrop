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
} from 'react-icons/fa'
import { Si500Px, SiAboutdotme, SiAdobe, SiAngellist, SiApple, SiAppstore, SiAskubuntu, SiAudible, SiBehance, SiBinance, SiBlogger, SiCodechef, SiCodeforces, SiCodepen, SiCodersrank, SiCodesandbox, SiCodewars, SiDevdotto, SiDeviantart, SiDevpost, SiDevrant, SiDiscord, SiDribbble, SiElement, SiFacebook, SiFigma, SiFiverr, SiFreelancer, SiGithub, SiGitlab, SiGlitch, SiGmail, SiGofundme, SiGravatar, SiGuilded, SiGumroad, SiHackernoon, SiHashnode, SiInstagram, SiKeybase, SiKofi, SiLeetcode, SiLinkedin, SiLivejournal, SiMedium, SiMessenger, SiMeteor, SiNpm, SiOpencollective, SiPatreon, SiPolywork, SiProducthunt, SiQuora, SiReddit, SiReplit, SiRevue, SiSlack, SiStackexchange, SiStackoverflow, SiTiktok, SiTumblr, SiTwitch, SiTwitter, SiYoutube } from 'react-icons/si'
import { RiSendPlaneFill } from 'react-icons/ri'

function GetIcons({ iconName, ...restProps }) {
  switch (iconName) {
    /** Logos */
    case '500px':
      return <Si500Px {...restProps} />
    case 'aboutdotme':
      return <SiAboutdotme {...restProps} />
    case 'adobe':
      return <SiAdobe {...restProps} />
    case 'apple':
      return <SiApple {...restProps} />
    case 'appstore':
      return <SiAppstore {...restProps} />
    case 'askubuntu':
      return <SiAskubuntu {...restProps} />
    case 'audible':
      return <SiAudible {...restProps} />
    case 'behance':
      return <SiBehance {...restProps} />
    case 'binance':
      return <SiBinance {...restProps} />
    case 'blogger':
      return <SiBlogger {...restProps} />
    case 'codechef':
      return <SiCodechef {...restProps} />
    case 'codeforces':
      return <SiCodeforces {...restProps} />
    case 'codersrank':
      return <SiCodersrank {...restProps} />
    case 'codepen':
      return <SiCodepen {...restProps} />
    case 'codesandbo':
      return <SiCodesandbox {...restProps} />
    case 'codewars':
      return <SiCodewars {...restProps} />
    case 'devdotto':
      return <SiDevdotto {...restProps} />
    case 'deviantart':
      return <SiDeviantart {...restProps} />
    case 'devpost':
      return <SiDevpost {...restProps} />
    case 'devrant':
      return <SiDevrant {...restProps} />
    case 'discord':
      return <SiDiscord {...restProps} />
    case 'dribble':
      return <SiDribbble {...restProps} />
    case 'angelist':
      return <SiAngellist {...restProps} />
    case 'element':
      return <SiElement {...restProps} />
    case 'facebook':
      return <SiFacebook {...restProps} />
    case 'figma':
      return <SiFigma {...restProps} />
    case 'fiverr':
      return <SiFiverr {...restProps} />
    case 'freecodecamp':
      return <SiFiverr {...restProps} />
    case 'freelancer':
      return <SiFreelancer {...restProps} />
    case 'github':
      return <SiGithub {...restProps} />
    case 'gitlab':
      return <SiGitlab {...restProps} />
    case 'glitch':
      return <SiGlitch {...restProps} />
    case 'gmail':
      return <SiGmail {...restProps} />
    case 'gofundme':
      return <SiGofundme {...restProps} />
    case 'guild':
      return <SiGravatar {...restProps} />
    case 'guilded':
      return <SiGuilded {...restProps} />
    case 'gumroad':
      return <SiGumroad {...restProps} />
    case 'hackernoon':
      return <SiHackernoon {...restProps} />
    case 'hashnode':
      return <SiHashnode {...restProps} />
    case 'instagram':
      return <SiInstagram {...restProps} />
    case 'keybase':
      return <SiKeybase {...restProps} />
    case 'kofi':
      return <SiKofi {...restProps} />
    case 'leetcode':
      return <SiLeetcode {...restProps} />
    case 'linkedin':
      return <SiLinkedin {...restProps} />
    case 'livejournal':
      return <SiLivejournal {...restProps} />
    case 'medium':
      return <SiMedium {...restProps} />
    case 'messenger':
      return <SiMessenger {...restProps} />
    case 'meteor':
      return <SiMeteor {...restProps} />
    case 'npm':
      return <SiNpm {...restProps} />
    case 'opencollective':
      return <SiOpencollective {...restProps} />
    case 'patron':
      return <SiPatreon {...restProps} />
    case 'polywork':
      return <SiPolywork {...restProps} />
    case 'producthunt':
      return <SiProducthunt {...restProps} />
    case 'quore':
      return <SiQuora {...restProps} />
    case 'replit':
      return <SiReplit {...restProps} />
    case 'reddit':
      return <SiReddit {...restProps} />
    case 'revue':
      return <SiRevue {...restProps} />
    case 'slack':
      return <SiSlack {...restProps} />
    case 'stackexchange':
      return <SiStackexchange {...restProps} />
    case 'stackoverflow':
      return <SiStackoverflow {...restProps} />
    case 'tiktok':
      return <SiTiktok {...restProps} />
    case 'tumblr':
      return <SiTumblr {...restProps} />
    case 'twitter':
      return <SiTwitter {...restProps} />
    case 'twitch':
      return <SiTwitch {...restProps} />
    case 'youtube':
      return <SiYoutube {...restProps} />
    /** Other Icons */
    case 'send':
      return <FaPaperPlane {...restProps} />
    case 'globe':
      return <FaGlobe {...restProps} />
    case 'dollar':
      return <FaDollarSign {...restProps} />
    case 'search':
      return <FaSearch {...restProps} />
    case 'arrowleft':
      return <FaArrowLeft {...restProps} />
    case 'book':
      return <FaBook {...restProps} />
    case 'envelope' || 'mail':
      return <FaEnvelope {...restProps} />
    default:
      return <FaLink {...restProps} />
  }
}

GetIcons.propTypes = {
  iconName: PropTypes.string,
}

export default GetIcons
