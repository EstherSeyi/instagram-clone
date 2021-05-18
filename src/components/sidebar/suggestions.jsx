import { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import SuggestedProfile from "./suggested-profiles.jsx";

import { useAuth } from "../../context/Auth";
import { useAppQuery } from "../../hooks/use-query-helpers.jsx";

const Suggestions = () => {
  const { state } = useAuth();

  const { data } = useAppQuery(`user-suggestions_${state?.user?.id}`, {
    url: "v1/user/suggestions",
  });

  return (
    <>
      {!data?.payload ? (
        <Skeleton count={1} height={150} className="mt-5" />
      ) : data?.payload?.length ? (
        <>
          <div className="flex justify-between text-14 mb-4 text-quickSilver3 font-bold">
            <p>Suggested for you</p>
            {data?.payload?.length < 5 ? null : (
              <Link className="block" to="/">
                See All
              </Link>
            )}
          </div>

          {data?.payload?.map((profile) => (
            <SuggestedProfile
              key={profile._id}
              profile={profile}
              userId={state?.user?.id}
            />
          ))}
        </>
      ) : null}
    </>
  );
};

export default memo(Suggestions);
