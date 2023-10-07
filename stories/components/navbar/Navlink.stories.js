import NavLink from "@components/navbar/NavLink";

export default {
  component: NavLink,
};

export const Basic = {
  args: {
    path: "https://biodrop.eddiehub.io/docs",
    item: {
      url: "https://biodrop.eddiehub.io/docs",
      name: "Docs",
    },
    mode: "",
  },
};

export const Mobile = {
  args: {
    ...Basic.args,
    mode: "mobile",
  },
};
