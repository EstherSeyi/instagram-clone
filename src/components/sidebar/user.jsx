import { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { useAuth } from "../../context/Auth";

const User = () => {
  const { state } = useAuth();

  return !state?.user?.username || !state?.user?.fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${state.user.username}`}
      className="flex mb-4 items-center text-14"
    >
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-12 h-12 flex mr-2"
          src={state.user.avatarSrc}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = `${process.env.PUBLIC_URL}/assets/images/avatars/dummy.png`;
          }}
          alt="My profile"
        />
      </div>
      <div>
        <p className="font-bold text-sm">{state.user.username}</p>
        <p className="text-sm">{state.user.fullName}</p>
      </div>
    </Link>
  );
};

export default memo(User);
