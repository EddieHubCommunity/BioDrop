"use client";

import { BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";

export const socials = [
  {
    SOCIAL_SHARE_LINK: "https://twitter.com/intent/tweet?url=",
    Icon: BsTwitter,
    includeText: true,
  },
  {
    SOCIAL_SHARE_LINK: "https://www.facebook.com/sharer/sharer.php?u=",
    Icon: BsFacebook,
    includeText: false,
  },
  {
    SOCIAL_SHARE_LINK: "https://www.linkedin.com/shareArticle?mini=true&url=",
    Icon: BsLinkedin,
    includeText: false,
  },
];
