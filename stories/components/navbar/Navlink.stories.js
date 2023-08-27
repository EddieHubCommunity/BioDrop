import NavLink from "@components/navbar/NavLink";

export default {
  component: NavLink,
};

export const Basic = {
  args: {
    path: "https://biodrop.io/docs",
    item: {
      url: "https://biodrop.io/docs",
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
