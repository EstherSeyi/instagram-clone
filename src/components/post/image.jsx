export default function Image({ src, caption }) {
  return (
    <div className="post__img">
      <img
        className="h-618 w-full"
        src={`${process.env.PUBLIC_URL}/assets${src}`}
        alt={caption}
      />
    </div>
  );
}
