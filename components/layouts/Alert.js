export default function Alert() {
  return (
    <div className="flex items-center gap-x-6 bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <p className="text-sm leading-6 text-white whitespace-nowrap">
        <a
          href="https://repo-rater.eddiehub.io"
          target="_blank"
          className="hover:text-primary-low text-tertiary-medium flex items-center gap-x-1"
        >
          Please rate us on the RepoRater platform
          <span aria-hidden="true">&rarr;</span>
        </a>
      </p>
      <div className="flex flex-1 justify-end"></div>
    </div>
  );
}
