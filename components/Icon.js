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
      return <FaAndroid className="w-full h-full" />;
    case "apple":
      return <FaApple className="w-full h-full" />;
    case "arrowLeft":
      return <FaArrowLeft className="w-full h-full" />;
    case "book":
      return <FaBook className="w-full h-full" />;
    case "shareprofile":
      return <FiShare2 className="w-full h-full" />;
    case "codeforces":
      return <SiCodeforces className="w-full h-full" />;
    case "codewars":
      return <SiCodewars className="w-full h-full" />;
    case "dev.to":
      return <FaDev className="w-full h-full" />;
    case "discord":
      return <FaDiscord className="w-full h-full" />;
    case "dollar":
      return <FaDollarSign className="w-full h-full" />;
    case "envelope":
      return <FaEnvelope className="w-full h-full" />;
    case "facebook":
      return <FaFacebook className="w-full h-full" />;
    case "github":
      return <FaGithub className="w-full h-full" />;
    case "gitlab":
      return <FaGitlab className="w-full h-full" />;
    case "globe":
      return <FaGlobe className="w-full h-full" />;
    case "Graduation Hat":
    case "graduation-hat":
      return <FaGraduationCap className="w-full h-full" />;
    case "hackerrank":
      return <SiHackerrank className="w-full h-full" />;
    case "hashnode":
      return <SiHashnode className="w-full h-full" />;
    case "instagram":
      return <FaInstagram className="w-full h-full" />;
    case "laravel":
      return <FaLaravel className="w-full h-full" />;
    case "leetcode":
      return <SiLeetcode className="w-full h-full" />;
    case "link":
      return <FaLink className="w-full h-full" />;
    case "linkedin":
      return <FaLinkedin className="w-full h-full" />;
    case "medium":
      return <SiMedium className="w-full h-full" />;
    case "microsoft":
      return <FaMicrosoft className="w-full h-full" />;
    case "moon":
      return <FaMoon className="w-full h-full" />;
    case "node-js":
      return <FaNodeJs className="w-full h-full" />;
    case "open-source":
      return <DiOpensource className="w-full h-full" />;
    case "paypal":
      return <FaPaypal className="w-full h-full" />;
    case "polywork":
      return <SiPolywork className="w-full h-full" />;
    case "search":
      return <FaSearch className="w-full h-full" />;
    case "send":
      return <RiSendPlaneFill className="w-full h-full" />;
    case "slack":
      return <FaSlack className="w-full h-full" />;
    case "snapchat":
      return <FaSnapchat className="w-full h-full" />;
    case "stackoverflow":
      return <FaStackOverflow className="w-full h-full" />;
    case "sun":
      return <FaSun className="w-full h-full" />;
    case "telegram":
      return <FaTelegram className="w-full h-full" />;
    case "tiktok":
      return <FaTiktok className="w-full h-full" />;
    case "twitch":
      return <FaTwitch className="w-full h-full" />;
    case "twitter":
      return <FaTwitter className="w-full h-full" />;
    case "vimeo":
      return <FaVimeo className="w-full h-full" />;
    case "youtube":
      return <FaYoutube className="w-full h-full" />;
    default:
      return <FaGlobe className="w-full h-full" />;
  }
}

export default Icon;
