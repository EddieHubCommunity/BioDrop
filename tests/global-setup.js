const { chromium } = require("@playwright/test");
const fs = require("fs");

const user = (username) => {
  return {
    name: username.toUpperCase(),
    displayStatsPublic: true,
    type: "personal",
    bio: `Bio for ${username}`,
    avatar: "https://github.com/eddiejaoude.png",
    links: [
      {
        name: "Link 1",
        url: "http://eddiejaoude.io",
        icon: "link",
      },
      {
        name: "Link 2",
        url: "http://eddiehub.org",
        icon: "link",
      },
    ],
  };
};

module.exports = async (config) => {
  const users = [
    "_test-profile-user-1",
    "_test-profile-user-2",
    "_test-profile-user-3",
  ];

  users.forEach((username) => {
    const data = user(username);

    try {
      fs.writeFileSync(`./data/${username}.json`, JSON.stringify(data));
    } catch (e) {
      console.log(e);
      throw new Error(`Test data "${username}" not created`);
    }
  });
};
