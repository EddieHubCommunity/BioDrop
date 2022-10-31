import NavLink from "../../../components/navbar/NavLink";

export default {
  component: NavLink,
};

export const Basic = <NavLink {...args} />;

Basic.args = {
  path: "",
  item: {
    url: "",
  },
  mode: "",
};
