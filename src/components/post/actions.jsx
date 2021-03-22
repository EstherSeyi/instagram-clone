import { useState, useContext } from "react";

import { FirebaseContext } from "../../context/firebase";
import { useAuth } from "../../context/user";

import Heart from "../icons/heart";
import Chat from "../icons/chat";

export default function Actions({
  docId,
  totalLikes,
  likedPhoto,
  handleFocus,
}) {
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [likes, setLikes] = useState(totalLikes);
  const { auth } = useAuth();

  const userId = auth?.user?.uid ?? "";

  const handleToggleLiked = async () => {
    setToggleLiked((prevState) => !prevState);
    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="flex mt-2">
        <Heart
          handleToggleLiked={handleToggleLiked}
          toggleLiked={toggleLiked}
        />
        <Chat cssClasses="ml-4" onClick={handleFocus} />
      </div>
      <div className="p-4 py-0">
        <p>
          Liked by <span className="font-bold">{likes}</span>
        </p>
      </div>
    </>
  );
}
