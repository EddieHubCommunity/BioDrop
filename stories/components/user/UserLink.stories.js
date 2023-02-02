import UserLink from "../../../components/user/UserLink";

export default {
  component: UserLink,
};

export const Basic = {
  args: {
    link: {
      url: "https://www.youtube.com",
      clicks: 2,
      name: "My youtube channel",
    },
    username: "test",
    displayStatsPublic: true,
  }
};
