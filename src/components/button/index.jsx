const Button = ({ isValid, loading, children }) => {
  return (
    <button
      type="submit"
      disabled={!isValid || loading}
      className={`bg-azureRadiance w-full text-white rounded py-1 mt-6 focus:outline-none ${
        !isValid || loading ? "opacity-30 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
