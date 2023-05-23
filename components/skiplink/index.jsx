export const SkipLink = () => (
  <div className={`flex w-screen justify-center`}>
    <a
      className={`absolute p-2 bg-primary-low text-primary-high border-2 border-primary-low-medium dark:bg-primary-high dark:text-primary-low dark:border-primary-low  -translate-y-full focus:translate-y-0 transition duration-400 ease-in-out`}
      href="#main"
      style={{ zIndex: 1000 }}
    >
      Skip to Main Content
    </a>
  </div>
);
