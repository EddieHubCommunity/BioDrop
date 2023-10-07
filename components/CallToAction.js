import Button from "./Button";

export default function CallToAction({
  title,
  description,
  button1Text,
  button1Link,
  button1OnClick,
  button2Text,
  button2Link,
}) {
  return (
    <div className="bg-primary-low dark:bg-primary-high">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-high dark:text-primary-low sm:text-4xl">
          <span className="block">{title}</span>
          <span className="block text-primary-medium dark:text-secondary-low">
            {description}
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          {button1Link && (
            <div className="inline-flex rounded-md shadow">
              <Button
                href={button1Link}
                primary={true}
                onClick={button1OnClick}
              >
                {button1Text}
              </Button>
            </div>
          )}
          {button2Link && (
            <div className="ml-3 inline-flex rounded-md shadow ">
              <Button href={button2Link}>{button2Text}</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
