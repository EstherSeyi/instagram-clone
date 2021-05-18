import { Link } from "react-router-dom";

export default function Header({ username, avatarSrc }) {
  return (
    <div className="flex justify-between px-4 py-2">
      <div className="flex">
        <img
          className="mr-4 h-10 w-10 rounded-full"
          src={avatarSrc}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = `${process.env.PUBLIC_URL}/assets/images/avatars/dummy.png`;
          }}
          alt={`${username ?? "user"}'s avatar`}
        />
        <Link className="block self-center" to={`/p/${username}`}>
          <p className=" font-bold">{username}</p>
        </Link>
      </div>
      <div>...</div>
    </div>
  );
}
