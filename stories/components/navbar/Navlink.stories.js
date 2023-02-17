import NavLink from "../../../components/navbar/NavLink";

export default {
  component: NavLink,
};

export const Basic = {
  args: {
    path: "https://linkfree.eddiehub.io/docs",
    item: {
      url: "https://linkfree.eddiehub.io/docs",
      name: "Docs"
    },
    mode: "",
  }
};

export const Mobile = {
  args: {
    ...Basic.args,
    mode: "mobile"
  }
}
