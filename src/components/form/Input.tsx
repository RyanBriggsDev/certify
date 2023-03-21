export default function Input({
  type,
  placeholder,
  className,
  onChange,
  name,
  value,
  id,
  required,
  width,
  labelText,
  defaultValue,
}: any) {
  return (
    <>
      <label>{labelText}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        id={id}
        value={value}
        defaultValue={defaultValue}
        required={required}
        className={`${
          width ? width : "w-full"
        } rounded border border-zinc-700 bg-transparent p-1.5 px-3 text-black duration-300 ease-in-out focus:border-french-blue dark:text-white ${
          className ? className : ""
        }`}
      />
    </>
  );
}
