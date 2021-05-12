import { useEffect } from "react";
import { useAppQuery } from "../hooks/use-query-helpers";

import Header from "../components/header";
import Timeline from "../components/timeline";
// import Sidebar from "../components/sidebar/";

import { useAuth } from "../context/Auth";

export default function Dashboard() {
  const { state, addUser } = useAuth();
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  useAppQuery(
    `user-data_${state?.user?.id}`,
    {
      url: `v1/user/${state?.user?.id}`,
    },
    {
      enabled: state.isLoggedIn,
      onSuccess: (data) => {
        addUser({ ...data?.payload, id: data?.payload?._id });
      },
    }
  );

  return (
    <div className="bg-alabaster">
      <Header />
      <div className="md:grid grid-cols-3 gap-4 justify-between mx-auto  w-11/12 max-w-screen-lg">
        <Timeline userId={state?.user?.id} />
        {/* <Sidebar /> */}
      </div>
    </div>
  );
}
