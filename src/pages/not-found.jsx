import { useEffect } from "react";
import { Link } from "react-router-dom";

import scareCrow from "../images/Scarecrow.png";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Not Found";
  }, []);

  return (
    <section className="w-11/12 mx-auto my-0 max-h-screen relative">
      <h1 className="text-dark uppercase font-medium text-24 mt-2.5 font-inconsolata mb-16 sm:mb-48">
        404 not found
      </h1>
      <div className="sm:flex justify-between">
        <div className=" mb-10 flex-35 sm:mr-28">
          <img className="w-full" src={scareCrow} alt="scarecrow" />
        </div>
        <div className="flex-35">
          <p className="font-spaceMono text-38 font-bold leading-50 mb-6 lg:w-9/12">
            I have bad news for you
          </p>
          <p className="text-18 mb-8 lg:w-8/12">
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
          <Link
            to="/"
            className="bg-dark text-white py-3 px-5 text-bold uppercase sm:text-14"
          >
            Back to homepage
          </Link>
        </div>
      </div>

      <p className="absolute top-full sm:top-95% text-14 w-full text-center font-bold">
        Esther @ DevChallenges.io
      </p>
    </section>
  );
};

export default NotFound;
