import { useState } from "react";
import SearchInput from "../../components/SearchInput";

export default {
  component: SearchInput,
  title: "components/Search Input",
};

const Template = (args) => {
  const [value, setValue] = useState("");
  return <SearchInput {...args} value={value} onChange={setValue} />;
};

export const Basic = Template.bind({});
