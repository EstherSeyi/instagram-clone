import { useState, useRef } from "react";

import Header from "./header";
import Comments from "./comments";
import Actions from "./actions";
import AddComment from "./add-comment";

// import useFollowedUsersPhotos from "../../hooks/useFollowedUsersPhotos";

const SinglePost = ({ comments: allComments, poster, likeDetails }) => {
  // const { photos } = useFollowedUsersPhotos();
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState(allComments);
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="bg-white flex flex-col md:flex-row">
      <Header small poster={poster} />
      <div className="flex-60">
        <img
          className="w-2/3 mx-auto md:m-0 md:w-full h-full"
          src={`${process.env.PUBLIC_URL}/assets/images/avatars/karl.jpg`}
          alt="post"
        />
      </div>
      <div className="flex-40 py-4 relative ">
        <Header poster={poster} />
        <Comments comments={comments} poster={poster} />
        <div className="bg-white md:border-t md:border-mecury2 md:absolute right-0 left-0 bottom-0">
          <Actions
            setShowForm={setShowForm}
            handleFocus={handleFocus}
            likeDetails={likeDetails}
          />
          <AddComment
            showForm={showForm}
            commentInput={commentInput}
            docId={likeDetails.docId}
            setComments={setComments}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
