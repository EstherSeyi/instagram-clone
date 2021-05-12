import React from "react";
import Skeleton from "react-loading-skeleton";

import Post from "./post";

import { useAppQuery } from "../hooks/use-query-helpers";

export default function Timeline({ userId }) {
  const { data, isLoading: loading } = useAppQuery(`users-timeline_${userId}`, {
    url: `v1/photo/${userId}`,
  });

  return (
    <section className="max-w-600 mx-auto md:mx-0 col-span-2">
      {loading && !data?.payload ? (
        <Skeleton count={4} width={600} height={500} className="mb-5" />
      ) : data?.payload?.length ? (
        data?.payload?.map((photo) => {
          return (
            <React.Fragment key={photo._id}>
              <Post content={photo} userId={userId} />
            </React.Fragment>
          );
        })
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </section>
  );
}
