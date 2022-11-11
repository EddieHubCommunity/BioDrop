import React from "react";
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
  FaMoon,
  FaNodeJs,
  FaPaypal,
  FaSearch,
  FaSlack,
  FaSnapchat,
  FaSun,
  FaStackOverflow,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaVimeo,
  FaYoutube,
} from "react-icons/fa";
import {
  SiCodeforces,
  SiCodewars,
  SiHackerrank,
  SiHashnode,
  SiLeetcode,
  SiMedium,
  SiPolywork,
} from "react-icons/si";
import { RiSendPlaneFill } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";
import { DiOpensource } from "react-icons/di";

function Icon({ name }) {
  switch (name) {
    case "android":
      return <FaAndroid />;
    case "apple":
      return <FaApple />;
    case "arrowLeft":
      return <FaArrowLeft />;
    case "book":
      return <FaBook />;
    case "shareprofile":
      return <FiShare2 />;
    case "codeforces":
      return <SiCodeforces />;
    case "codewars":
      return <SiCodewars />;
    case "dev.to":
      return <FaDev />;
    case "discord":
      return <FaDiscord />;
    case "dollar":
      return <FaDollarSign />;
    case "envelope":
      return <FaEnvelope />;
    case "facebook":
      return <FaFacebook />;
    case "github":
      return <FaGithub />;
    case "gitlab":
      return <FaGitlab />;
    case "globe":
      return <FaGlobe />;
    case "Graduation Hat":
    case "graduation-hat":
      return <FaGraduationCap />;
    case "hackerrank":
      return <SiHackerrank />;
    case "hashnode":
      return <SiHashnode />;
    case "instagram":
      return <FaInstagram />;
    case "laravel":
      return <FaLaravel />;
    case "leetcode":
      return <SiLeetcode />;
    case "link":
      return <FaLink />;
    case "linkedin":
      return <FaLinkedin />;
    case "medium":
      return <SiMedium />;
    case "microsoft":
      return <FaMicrosoft />;
    case "moon":
      return <FaMoon />;
    case "node-js":
      return <FaNodeJs />;
    case "open-source":
      return <DiOpensource />;
    case "paypal":
      return <FaPaypal />;
    case "polywork":
      return <SiPolywork />;
    case "search":
      return <FaSearch />;
    case "send":
      return <RiSendPlaneFill />;
    case "slack":
      return <FaSlack />;
    case "snapchat":
      return <FaSnapchat />;
    case "stackoverflow":
      return <FaStackOverflow />;
    case "sun":
      return <FaSun />;
    case "telegram":
      return <FaTelegram />;
    case "tiktok":
      return <FaTiktok />;
    case "twitch":
      return <FaTwitch />;
    case "twitter":
      return <FaTwitter />;
    case "vimeo":
      return <FaVimeo />;
    case "youtube":
      return <FaYoutube />;
    default:
      return <FaGlobe />;
  }
}

export default Icon;
