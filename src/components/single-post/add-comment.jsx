import { useState } from "react";

const AddComment = ({ commentInput, showForm }) => {
  const [values, setValues] = useState({
    comment: "",
    loading: false,
  });

  const isValid = values?.comment && values.comment?.length > 3;

  const handleSubmit = () => {};
  const handleChange = () => {};

  return (
    <div
      className={`${
        showForm ? "" : "hidden"
      }  md:block border-t border-lynxWhite`}
    >
      <form
        className="flex w-full justify-between border-gray"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          ref={commentInput}
          aria-label="Add a comment"
          autoComplete="off"
          className=" blocktext-14 text-gray w-10/12 mr-3 py-3 px-4 focus:outline-none"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={values.comment}
          onChange={handleChange}
        />
        <button
          className={`block w-2/12 text-14 text-azureRadiance ${
            values.loading ? "" : "font-bold"
          } focus:outline-none ${
            !isValid ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={!isValid}
          type="submit"
        >
          {values.loading ? "Loading..." : " Post"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;
