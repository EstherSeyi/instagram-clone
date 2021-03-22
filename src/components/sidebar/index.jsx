import useUser from "../../hooks/useUser";

import User from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
  const { user: { userId, username, fullName } = {} } = useUser();

  return (
    <aside className="hidden md:block">
      <User fullName={fullName} username={username} />
      <Suggestions userId={userId} />
    </aside>
  );
}
