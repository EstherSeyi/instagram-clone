import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";

import Heart from "../icons/heart";
import Chat from "../icons/chat";

import { useAppMutation, useAppQuery } from "../../hooks/use-query-helpers";
import { useAuth } from "../../context/Auth";

const Actions = ({ handleFocus, setShowForm, content }) => {
  const { state } = useAuth();
  const { data } = useAppQuery(`user-likes-post_${content._id}`, {
    url: `v1/user/likes/${state?.user?.id}/${content?._id}`,
  });
  const [liked, setLiked] = useState(data?.payload);
  const [totalLikes, setTotalLikes] = useState(content?.likes?.length);

  useEffect(() => {
    setLiked(data?.payload);
  }, [data?.payload]);

  const queryClient = useQueryClient();
  const { mutate } = useAppMutation(
    {
      url: `v1/photo/like_unlike/${content?._id}`,
      method: "patch",
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(`user-likes-post_${content._id}`, {
          refetchInactive: true,
        });
        await queryClient.invalidateQueries(
          `users-timeline_${state?.user?.id}`,
          {
            refetchInactive: true,
          }
        );
      },
    }
  );
  const handleToggleLiked = async () => {
    setLiked((prevState) => !prevState);
    setTotalLikes((prevState) => (liked ? prevState - 1 : prevState + 1));

    await mutate({
      id: state?.user?.id,
      action: liked ? "unlike" : "like",
    });
  };

  return (
    <div className="w-2/3 mx-auto  md:mx-0 md:w-auto">
      <div className="flex mt-2">
        <Heart
          handleToggleLiked={handleToggleLiked}
          toggleLiked={liked}
          cssClasses="ml-0 md:ml-4"
        />
        <Chat
          cssClasses="ml-4"
          onClick={() => {
            handleFocus();
            setShowForm((prevState) => !prevState);
          }}
        />
      </div>
      <div className="pl-0 md:p-4 md:py-0">
        <p>
          Liked by <span className="font-bold">{totalLikes}</span>
        </p>
      </div>
    </div>
  );
};

export default Actions;
