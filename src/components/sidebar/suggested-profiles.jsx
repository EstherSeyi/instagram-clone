import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import { useAppMutation, useAppQuery } from "../../hooks/use-query-helpers";
import { useAuth } from "../../context/Auth";

const SuggestedProfile = ({ profile, userId }) => {
  const { state } = useAuth();
  const { data: isFollowing } = useAppQuery(
    `user-isfollowing_${profile?._id}`,
    {
      url: `v1/user/following/${profile?._id}`,
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
          `user-isfollowing_${profile?._id}`,
          {
            refetchInactive: true,
          }
        );
        await queryClient.invalidateQueries(
          `user-profile_${profile?.username}`,
          {
            refetchInactive: true,
          }
        );
        await queryClient.invalidateQueries(
          `user-profile_${state?.user?.username}`,
          {
            refetchInactive: true,
          }
        );
        await queryClient.invalidateQueries(`user-data_${userId}`, {
          refetchInactive: true,
        });
      },
    }
  );

  const handleFollowUser = async () => {
    await mutate({
      id: profile?._id,
      action: isFollowing?.payload ? "unfollow" : "follow",
    });
  };

  return (
    <>
      {!isFollowing?.payload ? (
        <div className="flex justify-between text-12 mb-2 w-full">
          <div className="flex">
            <img
              className="mr-4 rounded-full w-8 h-8"
              src={profile?.avatarSrc}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `${process.env.PUBLIC_URL}/assets/images/avatars/dummy.png`;
              }}
              alt={`Follow ${profile?.username}`}
            />
            <div>
              <Link to={`/p/${profile?.username}`}>
                <p className="font-bold">{profile?.username}</p>
              </Link>
              <p className="text-quickSilver3 ">Suggested for you.</p>
            </div>
          </div>
          <button
            onClick={handleFollowUser}
            className={`text-azureRadiance font-bold focus:outline-none hover:opacity-30 ${
              isLoading ? "opacity-30 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Follow"}
          </button>
        </div>
      ) : null}
    </>
  );
};

export default SuggestedProfile;
