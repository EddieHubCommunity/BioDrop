# Contributing to the Icons

We're glad to know you've decided to contribute!
You can get started by forking the repo or cloning it locally.

You can fork the repo by [clicking here](https://github.com/EddieHubCommunity/LinkFree/fork). Then create a branch for the issue that you're working on. After that, commit your changes. For more detailed information, see the [Contribution Guidelines](https://github.com/EddieHubCommunity/LinkFree/blob/main/docs/contributing/CONTRIBUTING.md).

## How to add icons

To add a new icon, you need to modify the following files: [`GetIcons.js`](https://github.com/EddieHubCommunity/LinkFree/blob/main/src/Components/Icons/GetIcons.js), [`icons.md`](https://github.com/EddieHubCommunity/LinkFree/blob/main/icons.md), and [`links.json`](https://github.com/EddieHubCommunity/LinkFree/blob/main/src/config/links.json).

### What to add in `GetIcons.js`

The `GetIcons.js` file contains the main code that shows the icons on the page. It has a `GetIcons` component which takes a `iconName` prop and returns an icon according to that. You need to add another case inside the switch statement in the component for the new icon.

### What to add in `icons.md`

The `icons.md` file is the index of all available icons. If you add a new icon, be sure to update this index so that people can see what's the code of the icon and how does it look like.

### What to add in `links.json`

The `links.json` file has `validIcons` object which specifies the color codes for the icons. Be sure to add the correct color for the new icon!

## Example of adding an icon

1. To add the "Spotify" icon, add the following import statements at the top of the `GetIcons.js` file:

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

The react icons library provides access to icons from several libraries like Font Awesome, Heroicons, Material Icons, etc. To use them, make sure to use the correct imports! More information about react icons library can be found [here](https://react-icons.github.io/react-icons/).

2. Add a new case to the switch statement in alphabetical order inside of the `GetIcons` component:

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

3. Open `links.json` file and add a new property to the `validIcons` object. The property name must be same as the icon name (in this case, `spotify`).

```json
{
   "validIcons": {
      "android": "#3DDC84",
      "spotify": "#1DB954"
   }
}
```

4. Open `icons.md` file and add the new icon name, usage and preview image to the icon table in alphabetical order:

```markdown
# Icons

<!-- ... -->

|   Socials   |     Usage     | Icons                                                                                                                                                        |    Socials     |      Usage       | Icons                                                                                                                                   |
| :---------: | :-----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------: | :--------------: | --------------------------------------------------------------------------------------------------------------------------------------- |
|   Android   |   `android`   | <img src="https://user-images.githubusercontent.com/65664185/138502465-89cfadf2-6b54-4f3d-ac44-ceacdd4824ba.png" width=65% height=30%>                       |     Apple      |     `apple`      | <img src="https://user-images.githubusercontent.com/65664185/138502540-8e9b80bf-deae-4566-a41a-c63623e83c21.png" width=100% height=30%> |
|    Book     |    `book`     | <img src="https://user-images.githubusercontent.com/76985777/145391108-f8c08f8e-679f-45a3-ad58-83ef60aa28fe.png" width=65% height=30%>                       |   Codeforces   |   `codeforces`   | <img src="https://user-images.githubusercontent.com/91655303/148160942-870fdbb4-a57c-4861-afaa-241835390645.png" width=100% height=30%> |

<!-- ... -->


|  Snapchat   |  `snapchat`   | <img src="https://user-images.githubusercontent.com/91655303/148160774-755adc38-e089-4a20-910f-292b890e2c63.png" width=65% height=30%>                       |    Spotify     |   `spotify`      | <img src="<icon_preview_url_here>" width="100%" height="30%">                                                                           |      


<!-- ... -->
```

## Committing and pushing the changes

After you've finished making changes, you need to commit and push those first. 
If you've cloned the forked repo locally and are working on it, run these commands:

```
git add src/config/links.json src/Components/Icons/GetIcons.js icons.md
git commit -m "<commit_message>"
git push origin main
```

This will push changes to the forked repo.

Otherwise, if you're working on the GitHub website, make sure that you're on the correct branch. If you don't have one, you can create it while you commit the changes.

After that, do the following:

1. Scroll down to the "Commit changes" section at the bottom of the page.
2. Check if you have the correct branch selected. Otherwise, you can click on "Create a new branch and start a pull request" option. This will create a new branch with the changes when you make the commit.
3. Adjust the commit message.
4. Click the "Commit Changes" button at the bottom of the page and it will commit the changes for you.

After all of these, do the following:

1. Go to your forked repo.
2. Click on "Contribute" > "Create Pull Request". This will take you to the Pull Request creation page. 
3. Set the "base" branch to "main" and "compare" branch to the branch you're working on. You'll be able to select those branches. These things are automatically adjusted most of the times so you don't need to change anything there. 
4. Click "Create Pull Request".

This will create a Pull Request and the maintainers will review the changes and merge it if everything was good. Otherwise they might request you to 
make some changes.
