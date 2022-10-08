- To add new features or to make Pull Requests use nextjs as we are migrating from React to NextJS with tailwind css

## 👨‍💻 Prerequisite Skills to Contribute

### Contribute in public/Profile

- [Git](https://git-scm.com/)
- [JSON](https://www.json.org/json-en.html)

### Contribute in Documents

- [Markdown](https://www.markdownguide.org/basic-syntax/)

### Contribute in Components/CSS

- [Next-js](https://nextjs.org/)
- [Tailwind Css](https://tailwindcss.com/)

## 💥 How to Contribute

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/EddieHubCommunity/LinkFree/pulls)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/EddieHubCommunity/)

- Take a look at the existing [Issues](https://github.com/EddieHubCommunity/LinkFree/issues) or [create a new issue](https://github.com/EddieHubCommunity/LinkFree/issues/new/choose)!
- [Fork the Repo](https://github.com/EddieHubCommunity/LinkFree/fork). Make sure that you fork the nextjs branch not the main(default) branch.

  ![Fork nextjs branch](./assets/fork.png)

- Clone your new fork of the repository in the terminal on your computer with the following command:

```bash
git clone https://github.com/<your-github-username>/LinkFree.git
```

---

## ⭐ HOW TO MAKE A PULL REQUEST:

**1.** Open your newly cloned Linkfree repo in your favourite code-editor.

**2.** Open the terminal and install the dependencies by the following command.

```bash
npm install
```

**3.** Run the following command to start the development server.

```bash
npm run dev
```

**4.** Set upstream command:

```bash
git remote add upstream https://github.com/EddieHubCommunity/LinkFree.git
```

**5.** Create a new branch:

```bash
git checkout -b YourBranchName
```

**6.** Sync your fork or your local repository with the origin repository:

- In your forked repository, click on "Fetch upstream"
- Click "Fetch and merge"

### Alternatively, Git CLI way to Sync forked repository with origin repository:

```bash
git fetch upstream
```

```bash
git merge upstream/main
```

### [Github Docs](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for Syncing

**7.** Make your changes to the source code.

**8.** Stage your changes:

⚠️ **Make sure** not to commit `package.json` or `package-lock.json` file

⚠️ **Make sure** not to run the commands `git add .` or `git add *`

> Instead, stage your changes for each file/folder
>
> By using public path it means it will add all files and folders under that folder, it is better to be specific

```bash
git add public
```

_or_

```bash
git add "<files_you_have_changed>"
```

**9.** Commit your changes:

```bash
git commit -m "<your_commit_message>"
```

**10.** Push your local commits to the remote repository:

```bash
git push origin YourBranchName
```

**11.** Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

**12.** **Congratulations!** You've made your first contribution to [**LinkFree**](https://github.com/EddieHubCommunity/LinkFree/graphs/contributors)! 🙌🏼

**_:trophy: After this, the maintainers will review the PR and will merge it if it helps move the LinkFree project forward. Otherwise, it will be given constructive feedback and suggestions for the changes needed to add the PR to the codebase._**

---

## Run automated tests

After making changes make sure that tests passes

**1.** Start the LinkFree application by typing this command:

```bash
npm run dev
```

**2.** Perform the tests by typing this command:

```bash
npm run cypress:run
```

---

## Style Guide for Git Commit Messages :memo:

**How you can add more value to your contribution logs:**

- Use the present tense. (Example: "Add feature" instead of "Added feature")
- Use the imperative mood. (Example: "Move item to...", instead of "Moves item to...")
- Limit the first line (also called the Subject Line) to _50 characters or less_.
- Capitalize the Subject Line.
- Separate subject from body with a blank line.
- Do not end the subject line with a period.
- Wrap the body at _72 characters_.
- Use the body to explain the _what_, _why_, _vs_, and _how_.
- Reference [Issues](https://github.com/EddieHubCommunity/LinkFree/issues) and [Pull Requests](https://github.com/EddieHubCommunity/LinkFree/pulls) liberally after the first line.

---

## 💥 Issues

In order to discuss changes, you are welcome to [open an issue](https://github.com/EddieHubCommunity/LinkFree/issues/new/choose) about what you would like to contribute. Enhancements are always encouraged and appreciated.

## All the best! 🥇

[![built with love](https://forthebadge.com/images/badges/built-with-love.svg)](https://www.eddiehub.org/)
