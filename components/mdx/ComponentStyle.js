export const ComponentStyle = {
  table: (props) => (
    <div className="w-full overflow-auto">
      <table {...props}></table>
    </div>
  ),
  li: (props) => <li className="w-full break-all" {...props}></li>,
};
