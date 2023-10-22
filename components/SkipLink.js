export default function SkipLink() {
  return (
    <div className="flex w-screen justify-center">
      <a
        className="absolute p-2 bg-primary-low text-primary-high border-2 border-primary-low-medium dark:bg-primary-high dark:text-primary-low dark:border-primary-low  -translate-y-full focus:translate-y-0 transition duration-400 ease-in-out z-[1000]"
        href="#main"
      >
        Skip to Main Content
      </a>
    </div>
  );
}
