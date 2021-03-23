import { useState, useEffect } from "react";

import useUser from "../../hooks/useUser";

const Header = ({
  photosCount,
  followerCount,
  setFollowerCount,
  profile,
  username,
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollowState = user.username && user.username !== username;

  return (
    <>
      <div className="flex mb-4 sm:mb-10">
        <div className="hidden sm:block sm:flex-30">
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${username} profile avatar`}
            src={`${process.env.PUBLIC_URL}/assets/images/avatars/${username}.jpg`}
          />
        </div>
        <div className="self-center sm:flex-60">
          <div className="flex sm:block">
            <img
              className="rounded-full h-20 w-20 mr-8 flex sm:hidden"
              alt={`${username} profile avatar`}
              src={`${process.env.PUBLIC_URL}/assets/images/avatars/${username}.jpg`}
            />
            <div className="flex flex-col sm:flex-row mb-5 sm:items-center">
              <p className="text-24 mb-4 sm:mb-0  mr-8 self-center">
                {username}
              </p>
              {activeBtnFollowState && (
                <button className="block bg-azureRadiance text-white rounded-sm text-14 py-1 px-6 font-bold focus:outline-none">
                  {isFollowingProfile ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
          <div className="hidden sm:flex w-6/12 justify-between mb-5">
            <p>
              <span className="font-bold">{photosCount}</span> posts
            </p>
            <p>
              <span className="font-bold">{followerCount}</span> follower
              {`${followerCount > 1 ? "s" : ""}`}
            </p>
            <p>
              <span className="font-bold">{profile.following.length}</span>{" "}
              following
            </p>
          </div>
          <div>
            <p className="font-bold">{profile.fullName}</p>
            <p className="text-quickSilver2">Followed by dali and karl</p>
          </div>
        </div>
      </div>
      <div className="flex pt-4 border-t border-gray justify-between sm:hidden">
        <p className="flex flex-col items-center">
          <span className="font-bold">{photosCount}</span>
          <span>posts</span>
        </p>
        <p className="flex flex-col items-center">
          <span className="font-bold">{followerCount}</span>
          <span>follower{`${followerCount > 1 ? "s" : ""}`}</span>
        </p>
        <p className="flex flex-col items-center">
          <span className="font-bold">{profile.following.length}</span>
          <span>following</span>
        </p>
      </div>
    </>
  );
};

export default Header;
