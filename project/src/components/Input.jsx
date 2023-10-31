import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Input = ({ id, label, value, type, placeholder, onChange, onVisible, name, visibility, register, error, ...props }) => {
  return (
    <div className="w-full h-full grid grid-cols-1 gap-y-1">
      <label className="font-semibold">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...(register ? register(name) : {})}
        {...props}
        className={`w-full h-full rounded-md shadow-sm focus:outline-none p-3 bg-white border border-[#DDDDDD] ${error && "border-red-500"}`}
      />
      {error && (
        <label className="label">
          <p className="text-red-500 break-words text-md">{error}</p>
        </label>
      )}
      {/* {name === "password" &&
        (visibility === true ? (
          <div className="cursor-pointer" onClick={onVisible}>
            <EyeIcon width={30} height={30} />
          </div>
        ) : (
          <div className="cursor-pointer" onClick={onVisible}>
            <EyeSlashIcon width={30} height={30} />
          </div>
        ))} */}
    </div>
  );
};

export default Input;
