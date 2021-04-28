import { Link } from "react-router-dom";

import { useModal } from "../../context/modal";

const Comments = ({ comments, poster }) => {
  return (
    <div className="hidden md:block px-4 overflow-scroll flex-40 h-448">
      {poster.caption && (
        <Comment username={poster.username} comment={poster.caption} />
      )}

      {comments?.length &&
        comments.map(({ comment, displayName }, index) => (
          <Comment
            key={`${displayName}_${comment}_${index}`}
            username={displayName}
            comment={comment}
          />
        ))}
    </div>
  );
};

const Comment = ({ username, comment }) => {
  const { close } = useModal();
  const userAvatar = `${process.env.PUBLIC_URL}/assets/images/avatars/${username}.jpg`;

  return (
    <div className="flex text-14 my-4">
      <img
        src={userAvatar}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = `${process.env.PUBLIC_URL}/assets/images/avatars/dummy.png`;
        }}
        alt={`${username ?? "user"}'s avatar`}
        className="h-8 w-8 rounded-full mr-4"
      />
      <div className="w-9/12">
        <Link
          to={`/p/${username}`}
          onClick={() => close()}
          className="mr-1 font-bold"
        >
          {username}
        </Link>
        <span>{comment}</span>
      </div>
    </div>
  );
};

export default Comments;
