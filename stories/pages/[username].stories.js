import User from "../../pages/[username]";
import profile from "../../data/eddiejaoude.json";

export default {
  component: User,
  decorators: [
    (Story) => (
      <div style={{paddingBottom: '2rem'}}>
        <Story />
      </div>
    ),
  ],
};

export const Basic = {
  args: {
    data: {
      ...profile,
      views: 1,
      username: "eddiejaoude"
    },
    BASE_URL: "https://linkfree.eddiehub.io/"
  }
};
