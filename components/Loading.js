import getIcon from "@components/Icon";

function Loading() {
  const SpinnerIcon = getIcon('FaSpinner');

  return (
    <div className="flex justify-center items-center h-full" role="progressbar" aria-valuetext="Loading..." aria-busy="true" aria-live="polite">
      <SpinnerIcon className="animate-spin h-12 w-12" />
    </div>
  )
}

export default Loading;
