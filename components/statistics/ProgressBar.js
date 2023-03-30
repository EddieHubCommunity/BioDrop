const ProgressBar = ({ progress }) => {
  return (
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div
        class="bg-indigo-600 h-2.5 my-4 rounded-full"
        style={{ width: `${progress.percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
