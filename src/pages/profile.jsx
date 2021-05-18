import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";

import Header from "../components/header";
import UserProfile from "../components/profile";
import * as ROUTES from "../constants/routes";

import { useAppQuery } from "../hooks/use-query-helpers";

export default function Profile() {
  const { username } = useParams();
  const { data: profileData, isLoading } = useAppQuery(
    `user-profile_${username}`,
    {
      url: `v1/user/${username}/data`,
    }
  );

  useEffect(() => {
    document.title = `${username} - Instagram`;
  }, [username]);

  return isLoading ? (
    <p>Loading...</p>
  ) : profileData?.payload ? (
    <>
      <Header />
      <UserProfile username={username} profileData={profileData?.payload} />
    </>
  ) : (
    <Redirect
      to={{
        pathname: ROUTES.NOT_FOUND,
      }}
    />
  );
}
