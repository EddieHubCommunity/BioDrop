import Profile from "../../../components/profile/ProfilePage";
import profile from "./profile.json";

export default {
  component: Profile,
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
