import Popular from "../../pages/popular";
import profile from "../../data/eddiejaoude.json";

export default {
  component: Popular,
};

export const Basic = (args) => <Popular {...args} />;

Basic.args = {
  data: [profile],
};
