## A simple step by step guide with explanation for beginners to add their profile:

- Fork it to your accont.
- Now your repo name looks like this GITHUB_YOURUSERNAME/LinkFree.
- Then in the top right corner you will get a Code option, click it. Then copy the SSH link.
  [NOTE: If you haven't set your SSH key yet, Checkout this video.](https://www.youtube.com/watch?v=lV5mrUYsucU&t=4s)

- Now turn on Git, choose your own folder/directory to proceed ahead. In my case i choosed Desktop.

- Then type `git clone *The SSH link you copied*`, Press Enter.

- Then get into the project folder through Git CLI. For that type `cd LinkFree` , press Enter.

- Now you are into the LinkFree folder. Now type `git remote -v`, press enter it will show your origin url.

- Then open VS code by using this command `code .` hit enter.

- Then select the LinkFree folder -> go to the Public folder -> then go to the Data folder -> Inside this folder create a JSON file, put your all details & stuff. Save it.

- Then come to git and type `git status -s`. You will able to see the changes you made.

- Now you are in the main branch, but before commit you have to change the branch. For that you have to enter `git checkout -b branchname`. In my case I have named it patch3. So, it is looks like this `git checkout -b patch3`. Now you are in the new branch.

- Now before commiting go to that specific folder by this command `cd public/data/` then Press Enter.

- Now type `git add YOURFILENAME.json`  press enter. Now you are ready to commit.

- For commiting type this `git commit -m "Your messeage"` press enter.

- Next thing is to push this to your github repo for that you have to type this git push origin branchname, for my case it is `git push origin patch3`.

- Now you go to the main project that is https://github.com/EddieHubCommunity/LinkFree . Then go to pull request section.

- Click the new pull request option. Then click compare across forks link in the upper section.

- The left side is the base repository of linkFree & left side is your forked repository. Then click the compare option at the top right & select your branch name which you have just pushed to your repo. For me it is patch3.

- Then click create the pull request option.

- Then hit the pull request option down there.

- Now some checks are going to run & wait for you request to be merged & accepted by the maintainers.
- Now you have to set something that any change/update happened in the main repo of LinkFree project, it will automatically updated on your forked repo. Now your forked repo that is YOURUSERNAME/LinkFree. Then in the top right corner you will get a Code option, click it. Then copy the SSH link.
- Then open git & type `git remote add upstream *the link you copied*` press enter. That is it Good Job.