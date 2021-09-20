# EddieHub Members

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree)

![Screenshot](https://user-images.githubusercontent.com/60853067/133296120-dbdb1799-4cca-4708-81ce-05edc65e59c9.png)

Initially created on a YouTube live stream https://www.youtube.com/watch?v=Jorl_vcp-Ew

## Quickstart

1. Fork project
2. Clone project
3. Navigate to project directory `cd LinkFree`
4. Install dependencies with `npm install`
5. Run `npm start`

### To add your profile

Create a file `public/data/<your-username>.json` with the following structure:

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
    }
  ]
}
```

Your url will be `http://linkfree.eddiehub.org/<yourusername>`, for example http://linkfree.eddiehub.org/eddiejaoude

Your `avatar` URL should take the format of `https://github.com/<yourusername>.png`.

### Home page profiles

Your profile will automatically appear on the home page.
