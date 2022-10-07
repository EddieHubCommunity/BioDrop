import User from "../../pages/[username]";

export default {
  component: User,
};

export const Basic = (args) => <User {...args} />;

Basic.args = {
  data: {
    name: "John",
    bio: "I'm  a developer",
    avatar: require("./person-placeholder.png"),
    views: 2,
    displayStatsPublic: true,
    username: "john",
    links: [
      {
        url: "<https://www.youtube.com>",
        clicks: 2,
        name: "My Youtube",
      },
      {
        url: "<https://www.instagram.com>",
        clicks: 2,
        name: "My Instagram",
      },
    ],
  },
};
