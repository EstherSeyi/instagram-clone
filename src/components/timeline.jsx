import Skeleton from "react-loading-skeleton";

import Post from "./post";

import useFollowedUsersPhotos from "../hooks/useFollowedUsersPhotos";
import React from "react";

export default function Timeline() {
  const { photos } = useFollowedUsersPhotos();

  return (
    <section className="max-w-600 mx-auto md:mx-0 col-span-2">
      {!photos ? (
        <Skeleton count={4} width={600} height={500} className="mb-5" />
      ) : photos?.length ? (
        photos.map((photo) => {
          return (
            <React.Fragment key={photo.docId}>
              <Post content={photo} />
            </React.Fragment>
          );
        })
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </section>
  );
}
