"use client";

import { BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";

export const socialShareLinks = [
  {
    href: "https://twitter.com/intent/tweet?url=",
    Icon: BsTwitter,
    includeText: true,
  },
  {
    href: "https://www.facebook.com/sharer/sharer.php?u=",
    Icon: BsFacebook,
    includeText: false,
  },
  {
    href: "https://www.linkedin.com/shareArticle?mini=true&url=",
    Icon: BsLinkedin,
    includeText: false,
  },
];
