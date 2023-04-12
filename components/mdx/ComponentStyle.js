import { Li } from "./Li";
export const ComponentStyle = {
  table: (props) => (
    <div className="w-full overflow-auto">
      <table {...props}></table>
    </div>
  ),
  li: (props) => <Li {...props}></Li>,
};
