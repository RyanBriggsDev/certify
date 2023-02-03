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
}: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      id={id}
      value={value}
      required={required}
      className={`${
        width ? width : 'w-full'
      } rounded bg-slate-100 p-1.5 px-3 text-black shadow-lg outline outline-1 outline-slate-400 duration-300 ease-in-out focus:outline-2 focus:outline-french-blue ${
        className ? className : ''
      }`}
    />
  )
}
