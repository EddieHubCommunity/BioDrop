import Image from "next/image";

import Link from "./Link";

export default function Testimonials({ data }) {
  return (
    <div className="bg-white dark:bg-primary-high pt-0 pb-24 mt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-semibold text-secondary-high dark:text-secondary-low text-3xl">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-primary-high dark:text-primary-low">
            What people are saying about LinkFree...
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root">
          <div className="-mt-8 sm:-mx-4">
            {data.map((testimonial) => (
              <div key={testimonial.username} className="pt-8">
                <figure className="rounded-2xl bg-primary-low dark:bg-primary-medium p-8 text-sm leading-6">
                  <blockquote className="text-primary-high dark:text-primary-low italic">
                    <p>{`“${testimonial.text}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image
                      className="h-10 w-10 rounded-full bg-primary-low"
                      src={testimonial.image}
                      alt={`Profile picture for ${testimonial.name}`}
                      width={100}
                      height={100}
                    />
                    <div>
                      <Link
                        className="font-semibold text-primary-high dark:text-white"
                        href={`/${testimonial.username}`}
                      >
                        {testimonial.name} ({`@${testimonial.username}`})
                      </Link>
                      <div className="text-primary-medium dark:text-primary-low-medium">
                        {testimonial.bio}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
