[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree)

# LinkFree by EddieHub

- LinkFree connects audiences to all of your content with just one link. It is an open-source alternative to [Linktree](https://linktr.ee/) implemented in JavaScript.
- It was initially created on a YouTube [live stream](https://www.youtube.com/watch?v=Jorl_vcp-Ew).

![Eddie Jaoude's LinkFree profile GIF](https://user-images.githubusercontent.com/82458069/145549448-b1feb5df-78aa-4286-a709-6985f0dade4c.gif)

<details close>
  <summary><span style="font-size: 24px; font-weight: 700;"> Note for Hacktoberfest </span></summary>
  <br>

> A note for Hacktoberfest participants:
>
> Pull requests which add or edit your information in a `public/data/${yourname}.json` file will NOT be counted for Hacktoberfest.
>
> Pull requests which improve the codebase, documentation, or other aspects of the project and are in line with the core values of the event will count. Maintainers will opt-in these PRs by applying the `hacktoberfest-accepted` label.

</details>

## Example using Gitpod, ephemeral dev environment in the cloud (free)

![Gitpod GIF with progress bar](https://user-images.githubusercontent.com/46727048/146048451-ed4ff31a-c178-4713-a9e0-95118be742dc.gif)

## 👨‍💻 Demo

Check out the website: [LinkFree](http://linkfree.eddiehub.org/)

## 👇 Prerequisites

Before installation, please make sure you have already installed the following tools:

- [Git](https://git-scm.com/downloads)
- [NodeJs](https://nodejs.org/en/download/)

## 🛠️ Installation Steps

1. Fork the project
2. Clone the project
3. Navigate to the project directory `cd LinkFree`
4. Install dependencies with `npm install`
5. Run `npm start`
6. Optional: Run the tests with `npm run cypress:run`

> **Warning**: After adding your profile, you'll not see it on the home page; you can see your profile in the main menu by running the command `npm run generate`.

Alternatively, skip all the steps by using [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/EddieHubCommunity/LinkFree/)

## 👨‍💻 Contributing

- Contributions make the open source community such an amazing place to learn, inspire, and create.
- Any contributions you make are **greatly appreciated**.
- Check out our [contribution guidelines](https://github.com/EddieHubCommunity/LinkFree/blob/main/Contributing.md) for more information.

## 🎭 To Add Your Profile

Create a file named `your-username.json` in the directory `public/data`.

**Optional fields: `links`, `milestones` and `type(personal | community)`**\
Looking for inspiration? You can view the following profiles for an example:

- [Eddie Jaoude](https://github.com/EddieHubCommunity/LinkFree/blob/main/public/data/eddiejaoude.json)
- [nhcarrigan](https://github.com/EddieHubCommunity/LinkFree/blob/main/public/data/nhcarrigan.json)
- [Kaiwalya Koparkar](https://github.com/EddieHubCommunity/LinkFree/blob/main/public/data/kaiwalyakoparkar.json)

Your brand new file should look something similar to this one:

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
      "description": "Started freelancing"
    }
  ]
}
```

Your URL will be `http://linkfree.eddiehub.org/<yourusername>`

For example: <http://linkfree.eddiehub.org/eddiejaoude>

To include your `avatar`, You just have to replace `<yourusername>` with your **github username** in the format of `https://github.com/<yourusername>.png` and it will automatically be fetched from github account. 

For example: <http://github.com/eddiejaoude.png>

### Available Icons:

|  Socials   | Icons                                                                                                                                    |  Socials  | Icons                                                                                                                                    |    Socials     | Icons                                                                                                                                   |
| :--------: | ---------------------------------------------------------------------------------------------------------------------------------------- | :-------: | ---------------------------------------------------------------------------------------------------------------------------------------- | :------------: | --------------------------------------------------------------------------------------------------------------------------------------- |
|  Android   | <img src="https://user-images.githubusercontent.com/65664185/138502465-89cfadf2-6b54-4f3d-ac44-ceacdd4824ba.png" width=100% height=30%>  | Microsoft | <img src="https://user-images.githubusercontent.com/65664185/138503027-7395af2c-e6c5-45ac-96ac-3af3d252df3b.png" width=100% height=30%>  |     Apple      | <img src="https://user-images.githubusercontent.com/65664185/138502540-8e9b80bf-deae-4566-a41a-c63623e83c21.png" width=100% height=30%> |
|   PayPal   | <img src="https://user-images.githubusercontent.com/65664185/138503083-7dc6ab6f-9c0e-40ca-b2b7-d5377f6b2981.png" width=100% height=30%>  |  Discord  | <img src="https://user-images.githubusercontent.com/65664185/138502295-d82d98cf-2b42-4926-ab68-e45b2cfe8605.png" width=100% height=30%>  |     Slack      | <img src="https://user-images.githubusercontent.com/65664185/138503148-791f88ac-01ac-4d11-9a63-1ffaaf649b21.png" width=100% height=30%> |
|  Envelope  | <img src="https://user-images.githubusercontent.com/65664185/138503382-fc1db10b-0ddc-435a-8fe0-7ba4b91f1bd3.png" width=100% height=30%>  | Telegram  | <img src="https://user-images.githubusercontent.com/65664185/138503468-8f27e3a9-d9ad-4348-85a4-d2c1761cd81f.png" width=100% height=30%>  |    Facebook    | <img src="https://user-images.githubusercontent.com/65664185/138502603-e5db457f-576a-478b-8f58-391135cfff74.png" width=100% height=30%> |
|  Twitter   | <img src="https://user-images.githubusercontent.com/65664185/138503209-1ce0ebbc-5590-4940-8cd0-2dadacbf09ed.png" width=100% height=30%>  |  GitHub   | <img src="https://user-images.githubusercontent.com/65664185/138502964-488bfe15-d6c4-4f0c-8221-9ef0d50bfb92.png" width=100% height=30%>  |     Vimeo      | <img src="https://user-images.githubusercontent.com/65664185/138503257-6af44a9c-c81a-4657-b182-6a991157810f.png" width=100% height=30%> |
|   Globe    | <img src="https://user-images.githubusercontent.com/32780232/143367620-5fe98cfa-7a18-4db7-95e4-0cd496acce7b.png" width=100% height=30%>  |  YouTube  | <img src="https://user-images.githubusercontent.com/65664185/138503305-ff60cf54-6b0b-4e18-9446-b4f6869b9511.png" width=100% height=30%>  |      Link      | <img src="https://user-images.githubusercontent.com/65664185/138502383-35db30af-8f5a-4037-9dfb-125cdf6374fe.png" width=100% height=30%> |
|    Book    | <img src="https://user-images.githubusercontent.com/76985777/145391108-f8c08f8e-679f-45a3-ad58-83ef60aa28fe.png" width=100% height=30%>  |  Dollar   | <img src="https://user-images.githubusercontent.com/76985777/145393429-c03c5c3e-0416-4d28-be21-8a01a0c3dff5.png" width=100% height=30%>  |   Instagram    | <img src="https://user-images.githubusercontent.com/76241195/147094225-202bb79d-5e06-4169-a0aa-712646f1159a.png" width=100% height=30%> |
|  LinkedIn  | <img src="https://user-images.githubusercontent.com/76241195/147094289-252d533d-aeae-493c-a21a-21538162cea6.png" width=100% height=30%>  |  Twitch   | <img src="https://user-images.githubusercontent.com/76241195/147094354-12d3b38d-bb87-4c52-a3b7-4d934498da31.png" width=100% height=30%>  |     DEV.to     | <img src="https://user-images.githubusercontent.com/76241195/147094431-b194a188-0a63-4ce3-89c9-1d7578405318.png" width=100% height=30%> |
|  Hashnode  | <img src="https://user-images.githubusercontent.com/76241195/147095015-e009e115-c7d6-4bc9-b330-66b29629a2dc.png"  width=100% height=30%> | Codewars  | <img src="https://user-images.githubusercontent.com/76241195/147094572-962f911f-9ebd-4615-b72f-ff076f4033e8.png"  width=100% height=30%> | Graduation Hat | <img src="https://user-images.githubusercontent.com/76241195/147094631-50f94887-db14-4b6a-ab41-938e41be00e4.png" width=100% height=30%> |
|   TikTok   | <img src="https://user-images.githubusercontent.com/76241195/147094674-a0b67f90-c62e-4162-93b5-dd313611ff28.png" width=100% height=30%>  |   Send    | <img src="https://user-images.githubusercontent.com/76241195/147096133-20e75d9a-0f96-4881-a165-5e7edf1bfe96.png"  width=100% height=30%> |     Search     | <img src="https://user-images.githubusercontent.com/76241195/147102645-0d50ba65-5f21-4245-9275-6c3aec7d193c.png" width=100% height=30%> |
| Left Arrow | <img src="https://user-images.githubusercontent.com/76241195/147102920-8bf2b8c2-ad45-456e-9e5b-fe748f41214b.png" width=100% height=30%>  |Snapchat|<img src="https://user-images.githubusercontent.com/91655303/148160774-755adc38-e089-4a20-910f-292b890e2c63.png" width=100% height=30%>|Codeforces|<img src="https://user-images.githubusercontent.com/91655303/148160942-870fdbb4-a57c-4861-afaa-241835390645.png" width=100% height=30%>| HackerRank |<img src="https://user-images.githubusercontent.com/91655303/148160942-870fdbb4-a57c-4861-afaa-241835390645.png" width=100% height=30%>|
| Medium | <img src="https://user-images.githubusercontent.com/96095830/149390066-b230f63b-3af9-4bc6-9e57-ff1b0b7298fa.png" width=100% height=30%> | Polywork | <img src="https://user-images.githubusercontent.com/97835800/150699213-6b6d1a56-dcfd-41c8-9ff4-eb02c57dbecf.png" width=100% height=30%>


## 🛡️ License

LinkFree is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## 💪 Thanks to all Contributors

Thanks a lot for spending your time helping LinkFree grow. Thanks a lot! Keep rocking 🍻

[![Contributors](https://contrib.rocks/image?repo=EddieHubCommunity/LinkFree)](https://github.com/EddieHubCommunity/LinkFree/graphs/contributors)

## 🙏 Support

This project needs a ⭐️ from you. Don't forget to leave a star ⭐️
