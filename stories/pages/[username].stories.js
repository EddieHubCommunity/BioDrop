import User from "../../pages/[username]";
import profile from "../../data/eddiejaoude.json";

export default {
  component: User,
};

export const Basic = {
  args: {
    data: {
      ...profile
    },
    BASE_URL: "https://linkfree.eddiehub.io/"
  }
};
