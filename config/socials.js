"use client";

import { BsTwitterX, BsFacebook, BsLinkedin } from "react-icons/bs";

export const socials = [
  {
    SOCIAL_SHARE_LINK: "https://twitter.com/intent/tweet?url=",
    Icon: BsTwitterX,
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
