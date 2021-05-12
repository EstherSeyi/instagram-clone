import { useAuth } from "../../context/Auth";

import User from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
  const {
    user: { userId = "", username = "", fullName = "" } = {},
  } = useAuth();

  return (
    <aside className="hidden md:block">
      <User fullName={fullName} username={username} />
      <Suggestions userId={userId} />
    </aside>
  );
}
