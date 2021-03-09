const Input = ({ placeholder, arialLabel, name, type, onChange, value }) => {
  return (
    <>
      <input
        placeholder={placeholder}
        aria-label={arialLabel}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        className="w-full bg-alabaster border border-mecury rounded-sm pt-2 pr-0 pb-1.5 pl-2 placeholder-quickSilver mb-2 focus:outline-none focus:border-quickSilver"
      />
    </>
  );
};

export default Input;
