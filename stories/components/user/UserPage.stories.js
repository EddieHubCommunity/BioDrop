import User from "../../../components/user/UserPage";
import profile from "./profile.json";

export default {
  component: User,
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: "2rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Basic = {
  args: {
    data: {
      ...profile,
    },
    BASE_URL: "https://biodrop.io",
  },
};
