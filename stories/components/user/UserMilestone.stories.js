import UserMilestone from "../../../components/user/UserMilestone";

export default {
  component: UserMilestone,
};

export const Basic = (args) => <UserMilestone {...args} />;

Basic.args = {
  milestone: {
    title: "My first Storybook",
    date: "October 2022",
    description: "My first Storybook for the LinkFree project",
  },
};
