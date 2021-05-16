import User from "./user";
// import Suggestions from "./suggestions";

export default function Sidebar() {
  return (
    <aside className="hidden md:block fixed left-65%">
      <User />
      {/* <Suggestions /> */}
    </aside>
  );
}
