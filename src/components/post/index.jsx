import { useRef } from "react";

import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Footer from "./footer";
import Comments from "./comments";
const Post = ({ content }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded col-span-4 border border-mecury mb-16 bg-white">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
        poster={{
          id: content.userId,
          username: content.username,
          image: content.imageSrc,
        }}
        likeDetails={{
          totalLikes: content.likes.length,
          likedPhoto: content.userLikedPhoto,
        }}
      />
    </div>
  );
};

export default Post;
