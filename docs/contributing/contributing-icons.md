# Contributing to the Icons

We're glad to know you've decided to contribute!
You can get started by forking the repo or cloning it locally.

Click on the "Fork" button at the top of the repository and that will take you to the fork creation page. You can select the owner, repo name etc there and create your fork.
Alternatively, you can start making changes to the original repo on the GitHub website and that will automatically create a fork and save changes to it.

You can run the following command to clone the forked repo locally (You must have [Git](https://git-scm.com/)):

```
git clone https://github.com/<your-github-username>/LinkFree
```

Replace `<your-github-username>` with your GitHub username.

## How to add icons

To add a new icon, you need to modify the following files: [`GetIcons.js`](https://github.com/EddieHubCommunity/LinkFree/blob/main/src/Components/Icons/GetIcons.js), [`icons.md`](https://github.com/EddieHubCommunity/LinkFree/blob/main/icons.md), and [`links.json`](https://github.com/EddieHubCommunity/LinkFree/blob/main/src/config/links.json).

The `GetIcons.js` file contains the main code that shows the icons on the page. It has a `GetIcons` component which takes a `iconName` prop and returns an icon according to that. You need to add another case inside the switch statement in the component for the new icon.

The `icons.md` file is the index of all available icons. If you add a new icon, be sure to update this index so that people can see what's the code of the icon and how does it look like.

The `links.json` file has `validIcons` object which specifies the color codes for the icons. Be sure to add the correct color for the new icon!

For example, if you want to add "Spotify" icon, you will need to add the following import statements at the top of the `GetIcons.js` file:

```js
import {
  FaAndroid,
  FaApple,
  FaArrowLeft,
  FaBook,
  // ...
  FaSpotify
} from 'react-icons/fa'
```

The react icons library provides you icons from some other libraries like Font Awesome, Heroicons, Material Icons, etc. If you want to use them, make sure to use the correct imports! More information about react icons library can be found [here](https://react-icons.github.io/react-icons/).

After adding imports, you need to add a new case to the switch statement inside of the `GetIcons` component:

```js
function GetIcons({ iconName, ...restProps }) {
  switch (iconName) {
    case 'android':
      return <FaAndroid {...restProps} />
    // ...

    // spotify icon
    // if `iconName` is "spotify", then it will return this icon
    case 'spotify':
      return <FaSpotify {...restProps} />
    // ...
  }
}
```

After that open `links.json` file and add a new property to the `validIcons` object. The property name must be same as the icon name (in this case, `spotify`).

```json
{
   "validIcons": {
      "android": "#3DDC84",
      "spotify": "#1DB954"
   }
}
```

Then open `icons.md` file and add the new icon name, usage and preview image to the icon table:

```markdown
# Icons

<!-- ... -->

|   Socials   |     Usage     | Icons                                                                                                                                                        |    Socials     |      Usage       | Icons                                                                                                                                   |
| :---------: | :-----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------: | :--------------: | --------------------------------------------------------------------------------------------------------------------------------------- |
|   Android   |   `android`   | <img src="https://user-images.githubusercontent.com/65664185/138502465-89cfadf2-6b54-4f3d-ac44-ceacdd4824ba.png" width=65% height=30%>                       |     Apple      |     `apple`      | <img src="https://user-images.githubusercontent.com/65664185/138502540-8e9b80bf-deae-4566-a41a-c63623e83c21.png" width=100% height=30%> |
|    Book     |    `book`     | <img src="https://user-images.githubusercontent.com/76985777/145391108-f8c08f8e-679f-45a3-ad58-83ef60aa28fe.png" width=65% height=30%>                       |   Codeforces   |   `codeforces`   | <img src="https://user-images.githubusercontent.com/91655303/148160942-870fdbb4-a57c-4861-afaa-241835390645.png" width=100% height=30%> |

<!-- ... -->

|   YouTube   |   `youtube`   | <img src="https://user-images.githubusercontent.com/65664185/138503305-ff60cf54-6b0b-4e18-9446-b4f6869b9511.png" width=65% height=30%>                       |    Spotify     |    `spotify`     | <img src="<icon_preview_url_here>" width="100%" height="30%">                                                                           |
```

And that's it! You can now commit, push, and [submit a PR](htttps://github.com/EddieHubCommunity/LinkFree/compare), and the maintainers will check your PR. 🙂

## Committing and pushing the changes

After you've finished making changes, you need to commit and push those first. 
If you've cloned the forked repo locally and working on it, run these commands:

```
git add <files_you_have_changed>
git commit -m "<commit_message>"
git push origin main
```

This will push changes to the forked repo.

Otherwise if you're working on GitHub website, then you can just save the changes and then it will commit changes for you. 

After all of these, you can go to your forked repo, and click on "Contribute" > "Create Pull Request". This will take you to the Pull Request creation page. Most of the things are automatically adjusted there so most of the times you don't need to change anything there. Then click "Create Pull Request".

This will create a Pull Request and the maintainers will review the changes and merge it if everything was good, otherwise they might request you to change some things. 
