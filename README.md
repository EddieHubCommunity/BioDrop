# LinkFree - EddieHub

An open-source alternative to [Linktree](https://linktr.ee/) implemented in JavaScript - built by the [EddieHub](https://www.eddiehub.org)\
Initially created on a YouTube live stream <https://www.youtube.com/watch?v=Jorl_vcp-Ew>

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree)

![Screenshot](https://user-images.githubusercontent.com/60853067/133296120-dbdb1799-4cca-4708-81ce-05edc65e59c9.png)

## Quickstart

1. Fork the project.
2. Clone the project.
3. Navigate to the project directory `cd LinkFree`.
4. Install dependencies with `npm install`.
5. Run `npm start`.

Alternatively, skip all the steps by using the [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree/) system.

### How can I add my profile?

Create a file named `your-username.json` in the directory `public/data` with the following content:

Optional fields: `links` and `milestones`

```json
{
  "name": "Eddie Jaoude",
  "bio": "Founder of EddieHub",
  "avatar": "https://github.com/eddiejaoude.png",
  "links": [
    {
      "name": "Follow me on GitHub",
      "url": "https://github.com/eddiejaoude",
      "icon": "github"
    },
    {
      "name": "Follow me on Twitter",
      "url": "https://twitter.com/eddiejaoude",
      "icon": "twitter"
    },
    {
      "name": "Learn more about Open Source on my YouTube channel",
      "url": "http://youtube.com/eddiejaoude",
      "icon": "youtube"
    }
  ],
  "milestones": [
    {
      "title": "Started Freelancing",
      "date": "May 2010",
      "icon": "dollar",
      "color": "grey",
      "description": "Started freelancing again",
      "url": "http://eddiejaoude.io"
    },
    {
      "title": "Started YouTube",
      "image": "http://github.com/eddiejaoude.png",
      "date": "June 2019",
      "icon": "youtube",
      "color": "red",
      "description": "First real video",
      "url": "http://youtube.com/eddiejaoude"
    },
    {
      "title": "GitHub Star",
      "date": "2020",
      "icon": "github",
      "color": "green",
      "description": "Became a GitHub Star with 30 other people",
      "url": "http://github.com/eddiejaoude"
    },
    {
      "title": "GitHub Star of the Year",
      "date": "2020",
      "icon": "github",
      "color": "green",
      "description": "Won GitHub Star of the Year out of 55+ million people",
      "url": "http://github.com/eddiejaoude"
    }
  ]
}
```

Your URL will be `http://linkfree.eddiehub.org/<yourusername>`. For example: <http://linkfree.eddiehub.org/eddiejaoude>\
Your `avatar` URL should take the format of `https://github.com/<yourusername>.png`.

### Home page profiles

Your profile will automatically appear on the home page.
