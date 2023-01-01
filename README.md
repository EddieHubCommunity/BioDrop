[![Open in GitPod](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree) ![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FEddieHubCommunity%2Fmonitoring%2Fmaster%2Fapi%2Flink-free%2Fuptime.json) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/EddieHubCommunity/LinkFree) ![GitHub repo size](https://img.shields.io/github/repo-size/EddieHubCommunity/LinkFree)

# What is LinkFree?

LinkFree is the Open Source alternative to LinkTree. A platform where people in tech can have a single hub to showcase their content in order to accelerate their career, whilst contributing to an Open Source project and being part of a community which has a say in where the project is going.

Your profile will have links to your social media and content. You can also add your timeline, testimonials and upcoming events that you are participating in.

Here is an example of a LinkFree [Profile](https://linkfree.eddiehub.io/eddiejaoude)...

![Example profile on LinkFree](https://user-images.githubusercontent.com/624760/207048057-0f8cc74f-cc50-4cb3-b1a9-7e37f1a66d2c.png)

## 🛠️ Quickstart

You have 4 options to contribute to the repo, please pick your favourite from:

1. GitHub UI
2. Gitpod
3. Local development
4. Local development with Docker Compose

Brief documentation below, but full documentation can be found here https://linkfree.eddiehub.io/docs

### GitHub UI

This is great if you only want to add your Profile or make changes to it.

*note: give extra attention to json formatting and the GitHub Action after you create the Pull Request*

### Gitpod

In the cloud free development environment which will have all the dependencies you need (for example MongoDB).

You can use Gitpod in the cloud [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree/)

### Local development

This environment is fully on computer, and requires each dependency (for example MongoDB) to be installed and setup, but gives you the most flexiblity for customisation.

#### Prerequisites

Before contributing or adding a new feature, please make sure you have already installed the following tools:

- [NodeJs](https://nodejs.org/en/download/) (Works with Node LTS version v16.17.0)
- [MongoDB](https://www.mongodb.com/home)
- Optional [NVM](https://github.com/nvm-sh/nvm): Switch Node version by using `nvm use` (on Windows, use `nvm use v16.17.0`). If this is not installed, run `nvm install v16.17.0`.

#### Commands

You can set this up locally with the following steps:

1. copy the `.env.example` file to `.env` and update any details required
1. mongodb is required, it is possible to use `docker-compose up` to start the mongodb service
1. `npm install`
1. `npm run dev`

### 🙂 How to add YOUR Profile

Step by step quickstart guide can be found in the full docs here https://linkfree.eddiehub.io/docs/quickstart

1. Fork the repository in your profile which lets you do the changes in the project without affecting the main repository
2. Create a new branch
3. In the `data` directory, create a `.json` file with the same name as your GitHub username. For example, if your GitHub username is `eddiehub`, create a file named `eddiehub.json`. This will ensure that your username is unique. 

**Optional fields: `milestones`, `type(personal | community)`, `socials`, `testimonials` and `events`**

Looking for inspiration? You can view the following profiles for an example:

- [Eddie Jaoude](https://github.com/EddieHubCommunity/LinkFree/blob/main/data/eddiejaoude.json)
- [Krupali Trivedi || Chai](https://github.com/EddieHubCommunity/LinkFree/blob/main/data/krupalitrivedi.json)
- [Pradumna Saraf](https://github.com/EddieHubCommunity/LinkFree/blob/main/data/Pradumnasaraf.json)

Your brand new file should look something similar to this one:

> **Note**: add/remove `links` objects to customise your Profile, `milestones` are optional

```json
{
  "name": "YOUR NAME",
  "displayStatsPublic": true,
  "type": "personal",
  "bio": "Open Source Enthusiast!",
  "avatar": "https://github.com/YOUR_GITHUB_USERNAME.png",
  "tags": ["javascript", "typescript"],
  "socials": [
    { "icon": "FaTwitter", "url": "https://twitter.com/YOUR_TWITTER_USERNAME" },
    { "icon": "FaGithub", "url": "https://github.com/YOUR_GITHUB_USERNAME" }
  ],
  "links": [
    {
      "name": "Follow me on GitHub",
      "url": "https://github.com/YOUR_GITHUB_USERNAME",
      "icon": "FaGithub"
    },
    {
      "name": "Follow me on Twitter",
      "url": "https://twitter.com/YOUR_TWITTER_USERNAME",
      "icon": "FaTwitter"
    }
  ],
  "milestones": [
    {
      "title": "Started Freelancing",
      "date": "December 2021",
      "icon": "FaDollarSign",
      "color": "grey",
      "description": "Started freelancing",
      "url": "https://www.eddiejaoude.io/"
    }
  ]
}
```

Your URL will be `https://linkfree.eddiehub.io/<yourusername>`

For example: <https://linkfree.eddiehub.io/eddiejaoude>

To include your `avatar`, you have to replace `<yourusername>` with your **GitHub username** in the format of `https://github.com/<yourusername>.png` and it will automatically be fetched from your GitHub account.

For example: <http://github.com/eddiejaoude.png>

Note: After your PR gets merged, the project still needs to be deployed for your Profile to be displayed.

## 🛡️ License

LinkFree is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🧰 Contributing

- Contributions make the open source community such an amazing place to learn, inspire, and create.
- Any contributions you make are **truly appreciated**.

## 🙏 Support

Don't forget to leave a star ⭐️
