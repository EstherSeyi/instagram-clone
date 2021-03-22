import { useEffect } from "react";

import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar/";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="bg-alabaster">
      <Header />
      <div className="md:grid grid-cols-3 gap-4 justify-between mx-auto  w-11/12 max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
