import Select from "@components/form/Select";

export default {
  component: Select
};

export const Basic = {
  args: {
    name: 'test',
    value: 'three',
    label: 'Test',
    options: ['one', 'two', 'three', 'four'],
  }
};