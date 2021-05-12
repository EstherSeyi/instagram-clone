import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

import AddComment from "./add-comment";
import SinglePost from "../single-post";

import { useModal } from "../../context/modal";

export default function Comments({ content, commentInput }) {
  const { open } = useModal();

  return (
    <>
      <div className="pl-4 pt-1 pb-4 text-14">
        {content.comments.length >= 3 && (
          <Link
            to="#"
            onClick={() => open(<SinglePost content={content} />)}
            className="text-quickSilver2 font-bold"
          >
            View all {content.comments.length} comments
          </Link>
        )}

        {content.comments.slice(0, 2).map((item) => (
          <p key={`${item.comment}-${item.user.username}`}>
            <Link to={`/p/${item.user.username}`} className="font-bold mr-1">
              {item.user.username}
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-quickSilver2 uppercase mt-2 text-10">
          {formatDistance(new Date(content.createdAt), new Date())} ago
        </p>
      </div>
      <AddComment photoId={content._id} commentInput={commentInput} />
    </>
  );
}
