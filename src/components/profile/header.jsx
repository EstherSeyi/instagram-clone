import { useQueryClient } from "react-query";

import { useAuth } from "../../context/Auth";
import { useAppQuery, useAppMutation } from "../../hooks/use-query-helpers";

const Header = ({ profileData, posts }) => {
  const { state } = useAuth();

  const { data: isFollowing } = useAppQuery(
    `user-isfollowing_${profileData._id}`,
    {
      url: `v1/user/following/${profileData._id}`,
    }
  );

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAppMutation(
    {
      url: "v1/user/follow_unfollow",
      method: "patch",
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          `user-isfollowing_${profileData._id}`,
          {
            refetchInactive: true,
          }
        );
        await queryClient.invalidateQueries(
          `user-profile_${profileData?.username}`,
          {
            refetchInactive: true,
          }
        );
        await queryClient.invalidateQueries(`user-data_${state?.user?.id}`, {
          refetchInactive: true,
        });
      },
    }
  );

  const activeBtnFollowState =
    state?.user?.username && state?.user?.username !== profileData?.username;

  const handleToggleFollow = async () => {
    await mutate({
      id: profileData?._id,
      action: isFollowing?.payload ? "unfollow" : "follow",
    });
  };

  return (
    <>
      <div className="flex mb-4 sm:mb-10">
        <div className="hidden sm:block sm:flex-30">
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${profileData?.username} profile avatar`}
            src={profileData?.avatarSrc}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = `${process.env.PUBLIC_URL}/assets/images/avatars/dummy.png`;
            }}
          />
        </div>
        <div className="self-center sm:flex-60">
          <div className="flex sm:block">
            <img
              className="rounded-full h-20 w-20 mr-8 flex sm:hidden"
              alt={`${profileData?.username} profile avatar`}
              src={profileData?.avatarSrc}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `${process.env.PUBLIC_URL}/assets/images/avatars/dummy.png`;
              }}
            />
            <div className="flex flex-col sm:flex-row mb-5 sm:items-center">
              <p className="text-24 mb-4 sm:mb-0  mr-8 self-center">
                {profileData?.username}
              </p>
              {state?.user?.username === profileData?.username && (
                <button
                  className="block bg-azureRadiance text-white rounded-sm text-14 py-1 px-4 font-bold focus:outline-none"
                  // onClick={handleToggleFollow}
                >
                  Edit Profile
                </button>
              )}
              {activeBtnFollowState && (
                <button
                  className={`w-20 sm:block px-0 bg-azureRadiance text-white rounded-sm text-14 py-1 font-bold focus:outline-none
                  ${isLoading ? "opacity-30 cursor-not-allowed" : ""}
                  
                  `}
                  onClick={handleToggleFollow}
                  disabled={isLoading}
                >
                  {isFollowing?.payload ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
          <div className="hidden sm:flex w-6/12 justify-between mb-5">
            <p>
              <span className="font-bold">{posts?.length}</span> posts
            </p>
            <p>
              <span className="font-bold">
                {profileData?.followers?.length}
              </span>{" "}
              follower
              {`${profileData?.followers?.length > 1 ? "s" : ""}`}
            </p>
            <p>
              <span className="font-bold">
                {profileData?.following?.length ?? 0}
              </span>{" "}
              following
            </p>
          </div>
          <div>
            <p className="font-bold">{profileData?.fullName ?? ""}</p>
            <p className="text-quickSilver2">Followed by dali and karl</p>
          </div>
        </div>
      </div>
      <div className="flex pt-4 border-t border-gray justify-between sm:hidden">
        <p className="flex flex-col items-center">
          <span className="font-bold">{posts?.length}</span>
          <span>post{`${posts?.length > 1 ? "s" : ""}`}</span>
        </p>
        <p className="flex flex-col items-center">
          <span className="font-bold">{profileData?.followers?.length}</span>
          <span>
            follower{`${profileData?.followers?.length > 1 ? "s" : ""}`}
          </span>
        </p>
        <p className="flex flex-col items-center">
          <span className="font-bold">
            {profileData?.following?.length ?? 0}
          </span>
          <span>following</span>
        </p>
      </div>
    </>
  );
};

export default Header;
