[![Open in GitPod](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree)  ![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FEddieHubCommunity%2Fmonitoring%2Fmaster%2Fapi%2Flink-free%2Fuptime.json) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/EddieHubCommunity/LinkFree?style=for-the-badge)


> **Note**
>
> - To add your profile use the `main` branch
> - To add new features use `nextjs` as we are migrating from React to NextJS

> **Warning** (2)
>
> In order for your profile to appear, it must be deployed. We try to collect a few profiles before we begin to deploy.
>
> ### A note for Hacktoberfest participants:
> 
> - Pull requests which add or edit your information in a `public/data/${yourname}.json` file will NOT be counted for Hacktoberfest.
> - Pull requests which improve the codebase, documentation, or other aspects of the project and are in line with the core values of the event will count. Maintainers will opt-in these PRs by applying the `hacktoberfest-accepted` label.

# LinkFree by EddieHub

- LinkFree connects audiences to all of your content with just one link. It is an open-source alternative to [Linktree](https://linktr.ee/) implemented in JavaScript.
- It was initially created on a YouTube [live stream](https://www.youtube.com/watch?v=Jorl_vcp-Ew).

![Eddie Jaoude's LinkFree profile GIF](https://user-images.githubusercontent.com/106697681/176986263-b8c278f1-41a8-4b85-80e6-be46e9cc9a00.gif)

## Example using Gitpod, ephemeral dev environment in the cloud (free)

![Gitpod GIF with progress bar](https://user-images.githubusercontent.com/46727048/146048451-ed4ff31a-c178-4713-a9e0-95118be742dc.gif)

## 👨‍💻 Demo

Check out the website: https://linkfree.eddiehub.io

## 👇 Prerequisites

Before contributing or adding a new feature, please make sure you have already installed the following tools:

- [Git](https://git-scm.com/downloads)
- [NodeJs](https://nodejs.org/en/download/) (Works with Node LTS version v16.17.0)
- Optional [NVM](https://github.com/nvm-sh/nvm): Switch Node version by using `nvm use` (on Windows, use `nvm use v16.17.0`). If this is not installed, run `nvm install v16.17.0`.

## 🛠️ Installation Steps

1. Fork the project
2. Clone the project by running `git clone https://github.com/<your-username>/LinkFree.git`
3. Navigate to the project directory `cd LinkFree`
4. Install dependencies with `npm ci`
5. Run `npm start`
6. Optional: Run the tests with `npm run cypress:run`

> **Warning**: After adding your profile, you'll not see it on the home page; you can see your profile in the main menu by running the command `npm run generate`.

Alternatively, skip all the steps by using [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree/)

## 👨‍💻 Contributing

- Contributions make the open source community such an amazing place to learn, inspire, and create.
- Any contributions you make are **truly appreciated**.
- Check out our [contribution guidelines](./docs/contributing/CONTRIBUTING.md) for more information.

## 🎭 To Add Your Profile

Create a file named using your GitHub username `username.json` in the directory `public/data`, this will ensure it is unique.

**Optional fields: `links`, `milestones` and `type(personal | community)`**\
Looking for inspiration? You can view the following profiles for an example:

- [Eddie Jaoude](https://github.com/EddieHubCommunity/LinkFree/blob/main/public/data/eddiejaoude.json)
- [Naomi Carrigan](https://github.com/EddieHubCommunity/LinkFree/blob/main/public/data/nhcarrigan.json)
- [Kaiwalya Koparkar](https://github.com/EddieHubCommunity/LinkFree/blob/main/public/data/kaiwalyakoparkar.json)

Your brand new file should look something similar to this one:
> **Note**: add/remove `links` objects to customise your profile, `milestones` are optional

```json
{
  "name": "YOUR NAME",
  "type": "personal",
  "bio": "Open Source Enthusiast!",
  "avatar": "https://github.com/YOUR_GITHUB_USERNAME.png",
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

Note: after your PR gets merged, the project still needs to be deployed for your profile to be displayed

### A simple gif version of adding your profile

![Linkfree adding profile GIF](https://user-images.githubusercontent.com/51878265/165113896-35d34c1d-c95e-4bb4-b658-df1afb9ab658.gif)

### Available Icons:

Check [Icons.md](/icons.md) for all the supported icons.

### Single user mode

If you wish to self-host this app for a single user, follow the same steps as above, but then in the file `src/config/user.json` add your username.

For example

```json
{
  "username": ""
}
```

## 🛡️ License

LinkFree is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💪 Thanks to all Contributors

Thanks a lot for spending your time helping LinkFree grow. Thanks a lot! Keep rocking 🍻

[![Contributors](https://contrib.rocks/image?repo=EddieHubCommunity/LinkFree)](https://github.com/EddieHubCommunity/LinkFree/graphs/contributors)

## 🙏 Support

This project needs a ⭐️ from you. Don't forget to leave a star ⭐️
