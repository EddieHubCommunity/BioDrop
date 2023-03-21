import UserMilestone from "../../../components/user/UserMilestone";

export default {
  component: UserMilestone,
  decorators: [
    (Story) => (
      <ul role="list">
        <Story />
      </ul>
    ),
  ],
};

export const BasicMilestone = {
  args: {
    milestone: {
      title: "My first Storybook",
      date: "October 2022",
      description: "My first Storybook for the LinkFree project",
      icon: "FaGlobe",
      color: "black",
    },
  },
};

export const MilestoneWithImage = {
  args: {
    milestone: {
      ...BasicMilestone.args.milestone,
      image: "https://github.com/eddiejaoude.png",
    },
  },
};

export const BasicGoal = {
  args: {
    milestone: {
      title: "Get a full time software developer role",
      date: "October 2023",
      description:
        "I'm currently building projects and learning new skills and hope to start applying for jobs in summer",
      icon: "FaGlobe",
    },
    isGoal: true,
  },
};
