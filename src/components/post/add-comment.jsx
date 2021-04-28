import { useState } from "react";

import { useFirebase } from "../../context/firebase";
import useUser from "../../hooks/useUser";

export default function AddComment({ docId, setComments, commentInput }) {
  const [values, setValues] = useState({
    comment: "",
    loading: false,
  });
  const { firebase, FieldValue } = useFirebase();
  const { user } = useUser();

  const handleChange = ({ target }) => {
    setValues((prevState) => ({
      ...prevState,
      comment: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setValues((prevState) => ({
        ...prevState,
        loading: true,
      }));
      await firebase
        .firestore()
        .collection("photos")
        .doc(docId)
        .update({
          comments: FieldValue.arrayUnion({
            displayName: user.username,
            comment: values.comment,
          }),
        });
      setComments((prevState) => [
        { displayName: user.username, comment: values.comment },
        ...prevState,
      ]);
      setValues((prevState) => ({
        ...prevState,
        comment: "",
        loading: false,
      }));
    } catch (error) {
      setValues((prevState) => ({
        ...prevState,
        comment: "",
        loading: false,
      }));
    }
  };

  const isValid = values?.comment && values.comment?.length > 3;

  return (
    <div className="border-t border-lynxWhite">
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
            !isValid || values.loading ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={!isValid || values.loading}
          type="submit"
        >
          {values.loading ? "Loading..." : " Post"}
        </button>
      </form>
    </div>
  );
}
