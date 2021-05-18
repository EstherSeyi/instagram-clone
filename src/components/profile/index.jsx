import Header from "./header";
import Photos from "./photos";

import { useAppQuery } from "../../hooks/use-query-helpers";

const Profile = ({ profileData }) => {
  const { data: posts, isLoading } = useAppQuery(
    `user-posts_${profileData._id}`,
    {
      url: `v1/post/profile/${profileData._id}`,
    }
  );

  return (
    <div className="w-11/12 mx-auto max-w-900 pt-20">
      <Header profileData={profileData} posts={posts?.payload} />
      <Photos loading={isLoading} posts={posts?.payload} />
    </div>
  );
};
export default Profile;
