import Select from "@components/form/Select";

export default {
  component: Select,
};

const options = [
  { label: "one", value: 1 },
  { label: "two", value: 2 },
  { label: "three", value: 3 },
  { label: "four", value: 4 },
];

export const Basic = {
  args: {
    value: 3,
    label: "Test",
    name: "test",
    options: options,
    onChange: (e) => console.log(e.target.value),
    className: "",
  },
};
