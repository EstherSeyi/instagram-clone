import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import SuggestedProfile from "./suggested-profiles.jsx";

import { useAuth } from "../../context/Auth";

const Suggestions = ({ userId }) => {
  const { state } = useAuth();
  const [profiles, setProfiles] = useState(null);

  return (
    <>
      {!profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
      ) : profiles?.length ? (
        <>
          <div className="flex justify-between text-14 mb-4 text-quickSilver3 font-bold">
            <p>Suggested for you</p>
            <Link className="block" to="/">
              See All
            </Link>
          </div>

          {profiles.map((profile) => (
            <SuggestedProfile
              key={profile.docId}
              userDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
            />
          ))}
        </>
      ) : null}
    </>
  );
};

export default memo(Suggestions);
