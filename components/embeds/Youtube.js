export default function Youtube({ url, title }) {
  return (
    <div className="relative">
      <iframe
        src={url}
        title={title}
        className="aspect-video w-full h-40 sm:h-80 md:h-[32rem] lg:h-[30rem]"
        allow="accelerometer; autoplay;"
        allowFullScreen
      ></iframe>
    </div>
  );
}
