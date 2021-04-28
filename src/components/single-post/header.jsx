import { useState, useEffect } from "react";

import useUser from "../../hooks/useUser";
import {
  toggleFollow,
  isUserFollowingProfile,
  getUserByUserId,
} from "../../services/firebase";

const Header = ({ small, poster }) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        poster.id
      );
      setIsFollowingProfile(isFollowing);
    };

    if (user.username && poster.id) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, poster.id]);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((prevState) => !prevState);

    const [posterData] = await getUserByUserId(poster.id);

    await toggleFollow(
      isFollowingProfile,
      user.docId,
      posterData.docId,
      poster.id,
      user.userId
    );
  };

  const userAvatar = `${process.env.PUBLIC_URL}/assets/images/avatars/${user?.username}.jpg`;

  return (
    <div
      className={`${
        !small
          ? "hidden md:flex px-4"
          : "flex md:hidden pt-4 w-2/3 mx-auto px-0"
      } text-14  font-bold md:border-b border-mecury2 pb-3 items-center`}
    >
      <img
        src={userAvatar}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = `${process.env.PUBLIC_URL}/assets/images/avatars/dummy.png`;
        }}
        alt="avatar"
        className="h-8 w-8 rounded-full mr-4"
      />
      <p className="mr-4">{poster.username}</p>
      {isFollowingProfile ? (
        <p className="ml-auto">Following</p>
      ) : (
        <button
          className="ml-auto focus:outline-none font-bold text-azureRadiance"
          type="button"
          onClick={handleToggleFollow}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default Header;
