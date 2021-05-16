// import { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";

// future task: add onhover with the comments length & add the likes
// future future task: add a lightbox where you can add comments!

const Photos = (profileData) => {
  return (
    <div className="h-16 border-t border-gray mt-4 pt-4">
      {!profileData?.posts ? (
        <Skeleton
          width={300}
          height={320}
          count={profileData?.posts?.length ?? 9}
          className="mr-4 mb-4 "
        />
      ) : profileData?.posts?.length > 0 ? (
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
          }}
          className="w-full grid gap-4  mx-auto"
        >
          {profileData?.posts?.map((post) => (
            <img
              key={post._id}
              className="h-275 w-full"
              src={post?.imageSrc}
              alt={post.caption}
            />
          ))}
        </div>
      ) : (
        <p>No Posts Yet</p>
      )}
    </div>
  );
};

export default Photos;
