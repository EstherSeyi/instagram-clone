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
      <Header
        username={content.user.username}
        avatarSrc={content.user.avatarSrc}
      />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions handleFocus={handleFocus} content={content} />
      <Footer username={content.user.username} caption={content.caption} />
      <Comments content={content} commentInput={commentInput} />
    </div>
  );
};

export default Post;
