import Heart from "../icons/heart";
import Chat from "../icons/chat";

import { useFirebase } from "../../context/firebase";

const Actions = ({ handleFocus, setShowForm }) => {
  const actions = {
    toggleLiked: 0,
    docId: "ghgj",
    likes: 0,
    userId: "11",
  };

  const { firebase, FieldValue } = useFirebase();
  const { toggleLiked, docId, likes, userId } = actions;

  const handleToggleLiked = async () => {
    // setToggleLiked((prevState) => !prevState);
    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
    // setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
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
          Liked by <span className="font-bold">{likes}</span>
        </p>
      </div>
    </div>
  );
};

export default Actions;
