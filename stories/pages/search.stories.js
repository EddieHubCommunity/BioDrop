import Search from "../../pages/search";
import data from "../../data/eddiejaoude.json";

export default {
  component: Search,
};

export const Basic = (args) => <Search {...args} />;

Basic.args = {
  data,
};
