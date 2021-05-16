import { useEffect } from "react";

import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar/";

import { useAuth } from "../context/Auth";
import { useModal } from "../context/modal";

export default function Dashboard() {
  const { modalState } = useModal();
  const { state } = useAuth();
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div
      className={`bg-alabaster ${modalState.isModalOpen ? "fixed w-full" : ""}`}
    >
      <Header />
      <div className="md:grid grid-cols-3 gap-4 justify-between mx-auto  w-11/12 max-w-screen-lg pt-20">
        <Timeline userId={state?.user?.id} />
        <Sidebar />
      </div>
    </div>
  );
}
