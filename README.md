[![Open in GitPod](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree) ![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FEddieHubCommunity%2Fmonitoring%2Fmaster%2Fapi%2Flink-free%2Fuptime.json) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/EddieHubCommunity/LinkFree) ![GitHub repo size](https://img.shields.io/github/repo-size/EddieHubCommunity/LinkFree)

# What is LinkFree?

LinkFree is the Open Source alternative to LinkTree. A platform where people in tech can have a single hub to showcase their content in order to accelerate their career, whilst contributing to an Open Source project and being part of a community that has a say in where the project is going.

Your profile will have links to your social media and content. You can also add your timeline, testimonials, and upcoming events that you are participating in.

Here is an example of a LinkFree Profile https://linkfree.eddiehub.io/eddiejaoude

![Example profile on LinkFree](https://user-images.githubusercontent.com/51878265/211527055-d90f94f5-f6a9-44a7-be0f-905f5e45429e.png)

## Tech Stack

LinkFree was built using the following technologies:

- [Next.js](https://nextjs.org/) - a framework for building server-rendered React applications
- [MongoDB](https://www.mongodb.com/) - a NoSQL database
- [Tailwind CSS](https://tailwindcss.com/) - a utility-first CSS framework      
 

## 🛠️ Quickstart

You have 4 options to contribute to the repo, please pick your favourite from:

1. GitHub UI (recommended for adding/editing your profile)
2. Gitpod
3. Local development
4. Local development with Docker Compose

Brief documentation is below, but full documentation can be found here https://linkfree.eddiehub.io/docs

### GitHub UI

This is great if you only want to add your Profile or make changes to it.

Here is the **QuickStart** guide to add your profile https://linkfree.eddiehub.io/docs/quickstart

*note: give extra attention to JSON formatting and the GitHub Action after you create the Pull Request*

### Gitpod

In the cloud-free development environment which will have all the dependencies you need (for example MongoDB).

You can use Gitpod in the cloud [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree/)

### Local development

This environment is fully on computer and requires each dependency (for example MongoDB) to be installed and set up, but gives you the most flexibility for customisation.

#### Prerequisites

Before contributing or adding a new feature, please make sure you have already installed the following tools:

- [NodeJs](https://nodejs.org/en/download/) (Works with Node LTS version v16.17.0)
- [MongoDB](https://www.mongodb.com/home)
- Optional [NVM](https://github.com/nvm-sh/nvm): Switch Node version by using `nvm use` (on Windows, use `nvm use v16.17.0`). If this is not installed, run `nvm install v16.17.0`.

#### Commands

You can set this up locally with the following steps:

1. copy the `.env.example` file to `.env` and update any details required
1. MongoDB is required, it is possible to use `docker-compose up` to start the MongoDB service
1. `npm ci`
1. `npm run dev`

### Local development with Docker Compose

This will allow you to run your favourite IDE but not have to install any dependencies on your computer like NodeJS and MongoDB.

#### Prerequisites

- Docker
- [Docker Compose](https://github.com/docker/compose) V2.

#### Commands

1. `docker compose up` 

### 🙂 How to add YOUR Profile

Step by step quickstart guide can be found in the full docs here https://linkfree.eddiehub.io/docs/quickstart

---

Looking for inspiration? You can view the following profiles for an example:

- [Eddie Jaoude](https://github.com/EddieHubCommunity/LinkFree/blob/main/data/eddiejaoude.json)
- [Krupali Trivedi || Chai](https://github.com/EddieHubCommunity/LinkFree/blob/main/data/krupalitrivedi.json)
- [Pradumna Saraf](https://github.com/EddieHubCommunity/LinkFree/blob/main/data/Pradumnasaraf.json)

## 🛡️ License

LinkFree is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🧰 Contributing

- Contributions make the open source community an amazing place to learn, inspire, and create.
- Any contributions you make are **truly appreciated**.
- Let's continue contributing to keep the community active and growing.

## 🙏 Support

Don't forget to leave a star ⭐️
