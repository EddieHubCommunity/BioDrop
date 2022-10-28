import UserPreview from "../../../components/user/UserPreview";
import data from "../../../data/eddiejaoude.json";

export default {
  component: UserPreview,
};

export const Basic = (args) => <UserPreview {...args} />;

Basic.args = {
  profile: {
    ...data,
  },
};
