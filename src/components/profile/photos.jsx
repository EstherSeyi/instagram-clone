// import { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";

// future task: add onhover with the comments length & add the likes
// future future task: add a lightbox where you can add comments!

const Photos = ({ photos }) => {
  return (
    <div className="h-16 border-t border-gray mt-4 pt-4">
      {!photos ? (
        <Skeleton
          width={300}
          height={320}
          count={photos.length ?? 9}
          className="mr-4 mb-4 "
        />
      ) : photos.length > 0 ? (
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
          }}
          className="w-full grid gap-4  mx-auto"
        >
          {photos.map((photo) => (
            <img
              key={photo.docId}
              className="h-275 w-full"
              src={`${process.env.PUBLIC_URL}/assets/${photo.imageSrc}`}
              alt={photo.caption}
            />
          ))}
        </div>
      ) : (
        <p>No Photos Yet</p>
      )}
    </div>
  );
};

export default Photos;
