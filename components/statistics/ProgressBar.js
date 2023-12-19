const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-primary-low rounded-full h-2.5">
      <div
        className="bg-tertiary-medium h-2.5 my-4 rounded-full"
        style={{ width: `${progress.percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
