import User from "../../pages/[username]";
import data from "../../data/eddiejaoude.json";

export default {
  component: User,
};

export const Basic = (args) => <User {...args} />;

Basic.args = {
  data,
};
