import { useEffect, useReducer } from "react";

import Header from "./header";
import Photos from "./photos";

import {
  getUserByUsername,
  getUserPhotosByUsername,
} from "../../services/firebase";

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
};

const Profile = ({ username }) => {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const [{ ...user }] = await getUserByUsername(username);

      const photos = await getUserPhotosByUsername(username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [username]);
  return (
    <div className="w-11/12 mx-auto max-w-900">
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        username={username}
      />
      <Photos photos={photosCollection} />
    </div>
  );
};
export default Profile;
