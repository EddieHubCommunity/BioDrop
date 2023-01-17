import NavLink from "../../../components/navbar/NavLink";

export default {
  component: NavLink,
};

export const Basic = (args) => <NavLink {...args} />;

Basic.args = {
  path: "https://linkfree.eddiehub.io/docs",
  item: {
    url: "https://linkfree.eddiehub.io/docs",
    name: "Docs"
  },
  mode: "",
};
