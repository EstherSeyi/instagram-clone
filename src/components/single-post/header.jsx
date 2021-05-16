import { useQueryClient } from "react-query";

import { useAppQuery, useAppMutation } from "../../hooks/use-query-helpers";

const Header = ({ small, poster }) => {
  const { data: isFollowing } = useAppQuery(`user-isfollowing_${poster?._id}`, {
    url: `v1/user/following/${poster?._id}`,
  });

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAppMutation(
    {
      url: "v1/user/follow_unfollow",
      method: "patch",
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(`user-isfollowing_${poster?._id}`, {
          refetchInactive: true,
        });
      },
    }
  );

  const handleToggleFollow = async () => {
    await mutate({
      id: poster?._id,
      action: isFollowing?.payload ? "unfollow" : "follow",
    });
  };

  return (
    <div
      className={`${
        !small
          ? "hidden md:flex px-4"
          : "flex md:hidden pt-4 w-2/3 mx-auto px-0"
      } text-14  font-bold md:border-b border-mecury2 pb-3 items-center`}
    >
      <img
        src={poster.avatarSrc}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = `${process.env.PUBLIC_URL}/assets/images/avatars/dummy.png`;
        }}
        alt="avatar"
        className="h-8 w-8 rounded-full mr-4"
      />
      <p className="mr-4">{poster.username}</p>
      {isFollowing?.payload ? (
        <p className="ml-auto">Following</p>
      ) : (
        <button
          className={`ml-auto focus:outline-none font-bold text-azureRadiance ${
            isLoading ? "opacity-30 cursor-not-allowed" : ""
          }`}
          type="button"
          onClick={handleToggleFollow}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Follow"}
        </button>
      )}
    </div>
  );
};

export default Header;
