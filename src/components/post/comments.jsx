import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

import AddComment from "./add-comment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);

  return (
    <>
      <div className="pl-4 pt-1 pb-4 text-14">
        {comments.length >= 3 && (
          <Link to="/" className="text-quickSilver2 font-bold">
            View all {comments.length} comments
          </Link>
        )}

        {comments.slice(0, 2).map((item) => (
          <p key={`${item.comment}-${item.displayName}`}>
            <Link to={`/p/${item.displayName}`} className="font-bold mr-1">
              {item.displayName}
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-quickSilver2 uppercase mt-2 text-10">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}
