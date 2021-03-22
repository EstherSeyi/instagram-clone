import { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const User = ({ username, fullName }) => {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="flex mb-4 items-center text-14">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-12 h-12 flex mr-2"
          src={`${process.env.PUBLIC_URL}/assets/images/avatars/${username}.jpg`}
          alt="My profile"
        />
      </div>
      <div>
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
};

export default memo(User);
