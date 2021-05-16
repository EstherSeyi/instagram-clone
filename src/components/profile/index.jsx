import { useParams } from "react-router-dom";

import Header from "./header";
import Photos from "./photos";

import { useAppQuery } from "../../hooks/use-query-helpers";

// /:username/data

// const reducer = (state, newState) => ({ ...state, ...newState });
// const initialState = {
//   profile: {},
//   photosCollection: [],
//   followerCount: 0,
// };

const Profile = ({ username, profileData }) => {
  console.log({ username });

  return (
    <div className="w-11/12 mx-auto max-w-900 pt-20">
      <Header profileData={profileData} />
      {/* <Photos profileData={profileData} /> */}
    </div>
  );
};
export default Profile;
