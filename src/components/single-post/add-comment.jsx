import { useState } from "react";
import { useQueryClient } from "react-query";

import { useAppMutation } from "../../hooks/use-query-helpers";
import { useAuth } from "../../context/Auth";

const AddComment = ({ commentInput, showForm, photoId }) => {
  const { state } = useAuth();

  const queryClient = useQueryClient();
  const { mutate, isLoading: loading } = useAppMutation(
    {
      url: "v1/comment",
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          `users-timeline_${state?.user?.id}`,
          {
            refetchInactive: true,
          }
        );
        setValues((prevState) => ({
          ...prevState,
          comment: "",
        }));
      },
    }
  );
  const [values, setValues] = useState({
    comment: "",
  });

  const isValid = values?.comment && values.comment?.length > 3;

  const handleChange = ({ target }) => {
    setValues((prevState) => ({
      ...prevState,
      comment: target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({
      user: state?.user?.id,
      comment: values.comment,
      photoId: photoId,
    });
  };

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
          name="comment"
          placeholder="Add a comment..."
          value={values.comment}
          onChange={handleChange}
        />
        <button
          className={`block w-2/12 text-14 text-azureRadiance ${
            loading ? "" : "font-bold"
          } focus:outline-none ${
            !isValid ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={!isValid || loading}
          type="submit"
        >
          {loading ? "Loading..." : " Post"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;
