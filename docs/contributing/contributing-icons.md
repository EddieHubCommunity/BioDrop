# Contributing to the Icons

We're glad to know you've decided to contribute!
You can get started by forking the repo or cloning it locally.

Click on the "Fork" button at the top of the repository and that will take you to the fork creation page. You can select the owner, repo name etc there and create your fork.
Alternatively, you can start making changes to the original repo on the GitHub website and that will automatically create a fork and save changes to it.

You can run the following command to clone the repo locally (You must have [Git](https://git-scm.com/) installed, and note that you will not have write access, create a fork to push changes):

```
git clone https://github.com/EddieHubCommunity/LinkFree
```

## How to add icons

To add icons, you need to modify three files: [GetIcons.js](https://github.com/EddieHubCommunity/LinkFree/blob/main/src/Components/Icons/GetIcons.js), [icons.md](https://github.com/EddieHubCommunity/LinkFree/blob/main/icons.md), [links.json](https://github.com/EddieHubCommunity/LinkFree/blob/main/src/config/links.json).
The `GetIcons.js` file contains the main code that shows the icons on the page. It has a `GetIcons` component which takes a `iconName` prop and returns an icon according to that. You need to add another case inside the switch statement in the component for the new icon.

The `icons.md` file is the index of all available icons. If you add a new icon, be sure to update this index so that people can see what's the code of the icon and how does it look like.
The `links.json` file has `validIcons` object which specifies the color codes for the icons. Be sure to add the correct color for the new icon!

## Commiting and pushing the changes

After you've finished making changes, you need to commit and push those first. 
If you've cloned the forked repo locally and working on it, run these commands:

```
git add --all
git commit -m "feat(icons): new icon"
git push origin main
```

This will push changes to the forked repo.

You can of course change the commit message `feat(icons): new icon`.
Otherwise if you're working on GitHub website, then you can just save the changes and then it will commit changes for you. 

After all of these, you can go to your forked repo, and click on "Contribute" > "Create Pull Request". This will take you to the Pull Request creation page. Most of the things are automatically adjusted there so most of the times you don't need to change anything there. Then click "Create Pull Request".

This will create a Pull Request and the maintainers will review the changes and merge it if everything was good, otherwise they might request you to change some things. 
