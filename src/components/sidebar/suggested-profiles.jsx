import { useState } from "react";
import { Link } from "react-router-dom";

import {
  getUserByUserId,
  updateUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

const SuggestedProfile = ({ userDocId, username, profileId, userId }) => {
  const [followed, setFollowed] = useState(false);
  const handleFollowUser = async () => {
    setFollowed(true);
    const [{ docId }] = await getUserByUserId(userId);
    await updateUserFollowing(docId, profileId);
    await updateFollowedUserFollowers(userDocId, userId);
  };

  return (
    <>
      {!followed ? (
        <div className="flex justify-between text-12 mb-2">
          <div className="flex">
            <img
              className="mr-4 rounded-full w-8 h-8"
              src={`${process.env.PUBLIC_URL}/assets/images/avatars/${
                username ? username + ".jpg" : "dummy.png"
              }`}
              alt={`Follow ${username}`}
            />
            <div>
              <Link to={`/p/${username}`}>
                <p className="font-bold">{username}</p>
              </Link>
              <p className="text-quickSilver3 ">Suggested for you.</p>
            </div>
          </div>
          <button
            onClick={handleFollowUser}
            className="text-azureRadiance font-bold focus:outline-none hover:opacity-30"
          >
            Follow
          </button>
        </div>
      ) : null}
    </>
  );
};

export default SuggestedProfile;
