export default function Image({ src, caption }) {
  return (
    <div className="post__img">
      <img className="h-618 w-full" src={src} alt={caption} />
    </div>
  );
}
