import { useState, useRef } from "react";

import Header from "./header";
import Comments from "./comments";
import Actions from "./actions";
import AddComment from "./add-comment";

const SinglePost = ({ content }) => {
  const [showForm, setShowForm] = useState(false);

  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="bg-white flex flex-col md:flex-row md:h-60vh">
      <Header small poster={content.user} />
      <div className="flex-60">
        <img
          className="w-2/3 mx-auto md:m-0 md:w-full h-full"
          src={content.imageSrc}
          alt={`${content.caption}`}
        />
      </div>
      <div className="flex-40 py-4 relative ">
        <Header poster={content.user} />
        <Comments content={content} />
        <div className="bg-white md:border-t md:border-mecury2 md:absolute right-0 left-0 bottom-0">
          <Actions
            setShowForm={setShowForm}
            handleFocus={handleFocus}
            content={content}
          />
          <AddComment
            showForm={showForm}
            commentInput={commentInput}
            postId={content._id}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
