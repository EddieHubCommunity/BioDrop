const Heading = ({ children, id, fontSize = "text-4xl" }) => {
  return (
    <h1 id={id} className={fontSize}>
      {children}
    </h1>
  );
};

export default Heading;
