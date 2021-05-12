import { Link } from "react-router-dom";

import { useModal } from "../../context/modal";

const Comments = ({ content }) => {
  return (
    <div className="hidden md:block px-4 overflow-scroll flex-40 h-448">
      {content?.caption && (
        <Comment
          username={content?.user?.username}
          comment={content?.caption}
          userAvatar={content?.user?.avatarSrc}
        />
      )}

      {content?.comments?.length &&
        content?.comments.map(({ comment, user, _id }) => (
          <Comment
            key={_id}
            username={user?.username}
            comment={comment}
            userAvatar={user?.avatarSrc}
          />
        ))}
    </div>
  );
};

const Comment = ({ username, comment, userAvatar }) => {
  const { close } = useModal();

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
