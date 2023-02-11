export default function Youtube({ url, title }) {
  return (
    <div className="relative">
      <iframe
        src={url}
        title={title}
        className="aspect-video w-full"
        allow="accelerometer; autoplay;"
        allowFullScreen
      ></iframe>
    </div>
  );
}
