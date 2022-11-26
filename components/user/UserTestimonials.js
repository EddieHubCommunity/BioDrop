import Alert from "../Alert";

export default function UserTestimonials({ data }) {
  return (
    <>
      {!data.testimonials && (
        <Alert type="info" message="No testimonials found" />
      )}
      {data.testimonials.map((testimonial, key) => (
        <div
          className="flex text-sm text-gray-500 border-2 my-4 px-4 rounded-xl shadow-xl"
          key={key}
        >
          <div className="flex-none p-6">
            <img
              src={`https://github.com/${testimonial.username}.png`}
              alt={testimonial.username}
              className="h-20 w-20 rounded-full bg-gray-100"
            />
          </div>
          <div className="flex-1 p-6">
            <h3 className="font-medium text-gray-900">{testimonial.title}</h3>
            <a
              href={`https://github.com/${testimonial.username}`}
              target="_blank"
              rel="noreferrer"
            >
              {testimonial.username}
            </a>

            <div className="prose prose-sm mt-4 max-w-none text-gray-500">
              <p>{testimonial.description}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
