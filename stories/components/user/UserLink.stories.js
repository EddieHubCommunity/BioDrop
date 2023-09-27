import ProfileLink from "@components/profile/ProfileLink";

export default {
  component: ProfileLink,
};

export const Basic = {
  args: {
    link: {
      url: "https://www.youtube.com",
      clicks: 2,
      name: "My youtube channel",
      icon: "FaYoutube",
    },
    username: "test",
  },
};
