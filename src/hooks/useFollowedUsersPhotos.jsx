import { useEffect, useState } from "react";

import { useAuth } from "../context/user";
import { getUserFollowedPhotos, getUserByUserId } from "../services/firebase";

export default function useFollowedUsersPhotos() {
  const { auth } = useAuth();

  const userId = auth?.user?.uid ?? "";
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      setLoading(true);
      const user = await getUserByUserId(userId);

      if (user?.length && user[0]?.following && user[0]?.following?.length) {
        const followedUserPhotos = await getUserFollowedPhotos(
          userId,
          user[0].following
        );

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
      setLoading(false);
    };
    getTimelinePhotos();
  }, [userId]);

  return { photos, loading };
}
