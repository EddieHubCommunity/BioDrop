[![Open in GitPod](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree) ![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FEddieHubCommunity%2Fmonitoring%2Fmaster%2Fapi%2Flink-free%2Fuptime.json) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/EddieHubCommunity/LinkFree) ![GitHub repo size](https://img.shields.io/github/repo-size/EddieHubCommunity/LinkFree)

# What is LinkFree?

LinkFree is the Open Source alternative to LinkTree. A platform where people in tech can have a single hub to showcase their content in order to accelerate their career, whilst contributing to an Open Source project and being part of a community which has a say in where the project is going.

Your profile will have links to your social media and content. You can also add your timeline, testimonials and upcoming events that you are participating in.

Here is an example of a LinkFree [Profile](https://linkfree.eddiehub.io/eddiejaoude)...

![Example profile on LinkFree](https://user-images.githubusercontent.com/624760/207048057-0f8cc74f-cc50-4cb3-b1a9-7e37f1a66d2c.png)

## 🙂 How to add YOUR Profile

In the `data` directory, create a `.json` file with the same name as your GitHub username. For example, if your GitHub username is `eddiehub`, create a file named `eddiehub.json`. This will ensure that your username is unique. 

**Optional fields: `milestones`, `type(personal | community)`, `socials`, `testimonials` and `events` **\
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
    { "platform": "twitter", "url": "https://twitter.com/YOUR_TWITTER_USERNAME" },
    { "platform": "github", "url": "https://github.com/YOUR_GITHUB_USERNAME" }
  ],
  "links": [
    {
      "name": "Follow me on GitHub",
      "url": "https://github.com/YOUR_GITHUB_USERNAME",
      "icon": "github"
    },
    {
      "name": "Follow me on Twitter",
      "url": "https://twitter.com/YOUR_TWITTER_USERNAME",
      "icon": "twitter"
    }
  ],
  "milestones": [
    {
      "title": "Started Freelancing",
      "date": "December 2021",
      "icon": "dollar",
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

### Available Icons:

Check [Icons.md](/icons.md) for all the supported icons.

## 🛠️ Quickstart for local development

### Prerequisites

Before contributing or adding a new feature, please make sure you have already installed the following tools:

- [NodeJs](https://nodejs.org/en/download/) (Works with Node LTS version v16.17.0)
- [MongoDB](https://www.mongodb.com/home)
- Optional [NVM](https://github.com/nvm-sh/nvm): Switch Node version by using `nvm use` (on Windows, use `nvm use v16.17.0`). If this is not installed, run `nvm install v16.17.0`.

### In the cloud (optional)

You can use Gitpod in the cloud [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree/)

### Local development 

You can set this up locally with the following steps

1. copy the `.env.example` file to `.env` and update any details required
1. mongodb is required, it is possible to use `docker-compose up` to start the mongodb service
1. `npm install`
1. `npm run dev`

## 📘 Storybook

We use [Storybook](https://storybook.js.org) to display what React components are available to use within our project. This also gives you the opportunity to play with the components' functionality and data it displays.

To see what components are available, do the following steps...

1. `npm run storybook`
1. navigate to http://localhost:6006

*note: not all components have been added, this is a great way to contribute to our project*

### Updating LinkFree's Storybooks' components

1. Create a story file in `stories/components` with the same filename as the component but append `.stories.js` to the filename
1. Import the component into the story file, see the existing [example](https://github.com/EddieHubCommunity/LinkFree/blob/main/stories/components/user/UserLink.stories.js)
1. Set the default arguments by looking at the requirements from the component itself
1. Run `npm run storybook` to see the added components and visit http://localhost:6006 to interact with them in the browser 

## 🧪 Tests

We use [Playwright](http://playwright.dev) for writing automated end to end (e2e) tests.

1. Install Playwright dependencies `npx playwright install --with-deps`
1. Run tests `npm run test`

```bash
npm run test

> linkfree@1.0.0 test
> npx playwright test


Running 18 tests using 4 workers

  10 skipped
  8 passed (13s)

To open last HTML report run:

  npx playwright show-report
```

### 🚲 Single user mode

If you wish to self-host this app for a single user, follow the same steps as above, but then in the file `config/user.json` add your username.

For example

```json
{
  "username": "eddiejaoude"
}
```

## 🛡️ License

LinkFree is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🧰 Contributing

- Contributions make the open source community such an amazing place to learn, inspire, and create.
- Any contributions you make are **truly appreciated**.
- Check out our [contribution guidelines](./docs/contributing/CONTRIBUTING.md) for more information.

## 🙏 Support

Don't forget to leave a star ⭐️
