# EddieHub Members

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree)

![Screenshot](https://user-images.githubusercontent.com/624760/132914060-a1ce5f13-d2df-4dac-8fad-345a71da7edd.png)

Initially created on a YouTube live stream https://www.youtube.com/watch?v=Jorl_vcp-Ew

## Quickstart

1. fork project
2. clone project
3. navigate to project directory `cd LinkFree`
4. install dependencies with `npm install`
5. run `npm start`

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
      "url": "http://github.com/eddiejaoude",
      "icon": "github"
    },
    {
      "name": "Follow me on Twitter",
      "url": "http://twitter.com/eddiejaoude",
      "icon": "twitter"
    }
  ]
}
```

Your url will be `http://linkfree.eddiehub.org/<yourusername>`, for example http://linkfree.eddiehub.org/eddiejaoude

### Add your profile to the home page

Update the file `public/data/_list.json` with the following object to the collection:

```json
{ "username": "eddiejaoude", "avatar": "https://github.com/eddiejaoude.png" },
```
