import DropDown from "@components/form/DropDown";

export default {
  component: DropDown
};

const options = [
  {name: 'one', value: 1},
  {name: 'two', value: 2},
  {name: 'three', value: 3},
  {name: 'four', value: 4}
];

export const Basic = {
  args: {
    eventType: 3,
    label: 'Test',
    options: options,
    handleEventTypeChange: (e) => console.log(e.target.value),
    className: ''
  }
};