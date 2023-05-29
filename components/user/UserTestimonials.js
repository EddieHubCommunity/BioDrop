import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import Link from "@components/Link";
import Alert from "@components/Alert";
import FallbackImage from "@components/FallbackImage";

export default function UserTestimonials({ testimonials }) {
  return (
    <>
      {!testimonials && <Alert type="info" message="No testimonials found" />}
      {testimonials &&
        testimonials.map((testimonial, key) => (
          <div
            className="flex flex-col sm:flex-row sm:gap-8 gap-2 sm:items-center text-sm dark:text-primary-low dark:bg-primary-medium text-primary-medium-low dark:border-none border-2 my-4 px-5 p-6 rounded-xl shadow-xl"
            key={key}
          >
            <div className="flex items-center sm:px-4">
              <div className="w-20 h-20">
                <FallbackImage
                  width={100} // just to pass nextjs error
                  height={100}
                  src={`https://github.com/${testimonial.username}.png`}
                  alt={testimonial.username}
                  className="rounded-full bg-primary-low"
                />
              </div>
              <div className="flex-1 p-6 sm:hidden">
                <h3 className="font-medium dark:text-primary-medium-low text-primary-high">
                  {testimonial.title}
                </h3>
                <Link href={testimonial.url} target="_blank">
                  @{testimonial.username}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex-1 hidden sm:block">
                <h3 className="font-medium dark:text-primary-low text-primary-high">
                  {testimonial.title}
                </h3>
                <Link href={testimonial.url} target="_blank">
                  @{testimonial.username}
                </Link>
              </div>
              <div className="prose prose-sm max-w-none w-fit text-primary-medium dark:text-primary-medium-low ">
                <ReactMarkdown>{testimonial.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
