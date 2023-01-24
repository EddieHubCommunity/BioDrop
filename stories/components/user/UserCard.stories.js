import UserCard from "../../../components/user/UserCard";
import data from "../../../data/eddiejaoude.json";

export default {
  component: UserCard,
};

export const Basic = {
  args: {
    profile: {
      ...data,
    },
  }
};
