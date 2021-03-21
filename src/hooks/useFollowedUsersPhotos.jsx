import { useEffect, useState } from "react";

import { useAuth } from "../context/user";
import { getUserFollowedPhotos, getUserByUserId } from "../services/firebase";

export default function useFollowedUsersPhotos() {
  const { auth } = useAuth();

  const userId = auth?.user?.uid ?? "";
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const user = await getUserByUserId(userId);

      if (user?.length && user[0]?.following) {
        const followedUserPhotos = await getUserFollowedPhotos(
          userId,
          user[0].following
        );

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    };
    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
