const Button = ({ onClick, children }) => (
  <button
    className="block m-4 min-w-[200px] mx-auto bg-yellow-500 text-black font-bold p-4 rounded-md"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
