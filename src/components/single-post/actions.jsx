import { useEffect } from "react";

import Heart from "../icons/heart";
import Chat from "../icons/chat";

import { useAction } from "../../context/actions";
import { useFirebase } from "../../context/firebase";
import { useAuth } from "../../context/user";

const Actions = ({ handleFocus, setShowForm, likeDetails }) => {
  const { state, setToggleLiked, setLikes } = useAction();
  const { firebase, FieldValue } = useFirebase();

  const { totalLikes, likedPhoto, docId } = likeDetails;

  const { noOfLikes, toggleLiked } = state;

  useEffect(() => {
    setToggleLiked(likedPhoto);
    setLikes(totalLikes);
    // eslint-disable-next-line
  }, [likedPhoto, totalLikes]);

  const { auth } = useAuth();

  const userId = auth?.user?.uid ?? "";

  const handleToggleLiked = async () => {
    setToggleLiked(!toggleLiked);
    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
    setLikes(!toggleLiked ? noOfLikes + 1 : noOfLikes - 1);
  };

  return (
    <div className="w-2/3 mx-auto  md:mx-0 md:w-auto">
      <div className="flex mt-2">
        <Heart
          handleToggleLiked={handleToggleLiked}
          toggleLiked={toggleLiked}
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
          Liked by <span className="font-bold">{noOfLikes}</span>
        </p>
      </div>
    </div>
  );
};

export default Actions;
