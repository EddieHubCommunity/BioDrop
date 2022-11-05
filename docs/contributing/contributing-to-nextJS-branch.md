
## 👨‍💻 Prerequisite Skills to Contribute

### Contribute in public/Profile

- [Git](https://git-scm.com/) 
- [JSON](https://www.json.org/json-en.html)

### Contribute in Documents

- [Markdown](https://www.markdownguide.org/basic-syntax/)

### Contribute in Components/CSS

- [React](https://reactjs.org/)
- [Next](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)



---

## ⭐ HOW TO MAKE A PULL REQUEST:

**1.** Start by making a Fork of the [**LinkFree**](https://github.com/EddieHubCommunity/LinkFree) repository. Click on the <a href="https://github.com/EddieHubCommunity/LinkFree/fork"><img src="https://i.imgur.com/G4z1kEe.png" height="21" width="21"></a>Fork symbol at the top right corner.

Dont forget to uncheck the 'Copy the main branch only' option when forking the repo.

![Screenshot 2022-10-05 235606](https://user-images.githubusercontent.com/32553276/194235257-5b53c801-514f-48d9-ba22-31352c24373c.png)

**2.** Clone your new fork of the repository in the terminal/CLI on your computer with the following command:

```bash
git clone https://github.com/<your-github-username>/LinkFree
```

**3.** Navigate to the newly created LinkFree project directory:

```bash
cd LinkFree
```

**4.** Set upstream command:

```bash
git remote add upstream https://github.com/EddieHubCommunity/LinkFree.git
```

**5.** Create a new branch:

Switch to the nextjs branch first,

```bash
git checkout  nextjs
```

then make a new branch from the nextjs branch.

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
git merge upstream/nextjs
```

### [Github Docs](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for Syncing

**7.** Make your changes to the source code.

**8.** Stage your changes:

⚠️ **Make sure** not to commit `package.json` or `package-lock.json` file

⚠️ **Make sure** not to run the commands `git add .` or `git add *`

> Instead, stage your changes for each file/folder
>


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


Before making a pull request,make sure to check the base branch is Linkfree/nextjs and not the main branch.


![github2](https://user-images.githubusercontent.com/32553276/194803029-4d458b07-f4a0-44cc-b349-1d0b407d361d.png)



**12.** **Congratulations!** You've made your first contribution to [**LinkFree**](https://github.com/EddieHubCommunity/LinkFree/graphs/contributors)! 🙌🏼

**_:trophy: After this, the maintainers will review the PR and will merge it if it helps move the LinkFree project forward. Otherwise, it will be given constructive feedback and suggestions for the changes needed to add the PR to the codebase._**

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
