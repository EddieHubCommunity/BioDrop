import Image from "next/image";
import Link from "../Link"
import Alert from "../Alert";
import FallbackImage from "../FallbackImage";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function UserTestimonials({ data }) {
  return (
    <>
      {!data.testimonials && (
        <Alert type="info" message="No testimonials found" />
      )}
      {data.testimonials &&
        data.testimonials.map((testimonial, key) => (
          <div
            className="flex flex-col sm:flex-row sm:gap-8 gap-2 sm:items-center text-sm text-gray-500 border-2 my-4 px-5 p-6 rounded-xl shadow-xl"
            key={key}
          >
            <div className="flex items-center sm:px-4">
              <div className="w-20 h-20">
                <Image
                  width={100} // just to pass nextjs error
                  height={100}
                  src={`https://github.com/${testimonial.username}.png`}
                  alt={testimonial.username}
                  className="rounded-full bg-gray-100"
                />
              </div>
              <div className="flex-1 p-6 sm:hidden">
                <h3 className="font-medium text-gray-900">
                  {testimonial.title}
                </h3>
                <Link href={testimonial.url} target="_blank">
                  {testimonial.username}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex-1 hidden sm:block">
                <h3 className="font-medium text-gray-900">
                  {testimonial.title}
                </h3>
                <Link href={testimonial.url} target="_blank">
                  {testimonial.username}
                </Link>
              </div>
              <div className="prose prose-sm max-w-none w-fit text-gray-500">
                <ReactMarkdown>{testimonial.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
