import UserMilestone from "../../../components/user/UserMilestone";

export default {
  component: UserMilestone,
  decorators: [(story) => <ul role="list">{story()}</ul>],
};

export const Basic = {
  args: {
    milestone: {
      title: "My first Storybook",
      date: "October 2022",
      description: "My first Storybook for the LinkFree project",
    },
  },
};
