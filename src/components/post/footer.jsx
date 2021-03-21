import { Link } from "react-router-dom";

import { PROFILE } from "../../constants/routes";

export default function Footer({ caption, username }) {
  return (
    <div className="p-4 pt-2 pb-0 text-14">
      <Link to={`/p/${username}`} className="mr-1 font-bold">
        {username}
      </Link>
      <span>{caption}</span>
    </div>
  );
}
