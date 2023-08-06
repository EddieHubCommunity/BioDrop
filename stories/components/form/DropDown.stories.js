import Select from "@components/form/Select";

export default {
  component: Select
};

const options = [
  {name: 'one', value: 1},
  {name: 'two', value: 2},
  {name: 'three', value: 3},
  {name: 'four', value: 4}
];

export const Basic = {
  args: {
    value: 3,
    label: 'Test',
    options: options,
    onChange: (e) => console.log(e.target.value),
    className: ''
  }
};