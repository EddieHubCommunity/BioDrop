import Link from "./Link";

export default function Testimonials({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            What people are saying about LinkFree...
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root">
          <div className="-mt-8 sm:-mx-4">
            {data.map((testimonial) => (
              <div key={testimonial.username} className="pt-8">
                <figure className="rounded-2xl bg-gray-50 dark:bg-dark p-8 text-sm leading-6">
                  <blockquote className="text-gray-900 dark:text-gray-300 italic">
                    <p>{`“${testimonial.text}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.image}
                      alt={`Profile picture for ${testimonial.name}`}
                    />
                    <div>
                      <Link
                        className="font-semibold text-gray-900 dark:text-gray-300"
                        href={`/${testimonial.username}`}
                      >
                        {testimonial.name} ({`@${testimonial.username}`})
                      </Link>
                      <div className="text-gray-600 dark:text-gray-400">{testimonial.bio}</div>
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
