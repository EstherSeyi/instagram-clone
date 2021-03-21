import { useState, useEffect } from "react";
import { getUserByUserId } from "../services/firebase";
import { useAuth } from "../context/user";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const {
    auth: { user },
  } = useAuth();

  useEffect(() => {
    async function getUserObjByUserId() {
      // in here we need to query for the user data in the firestore
      const [response] = await getUserByUserId(user.uid);
      setActiveUser({ ...response }); // pass the user response to the state of activeUser
    }
    if (user && user.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser }; // return activeUser as user to the hook when called
}
