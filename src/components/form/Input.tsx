export default function Input ({ type, placeholder, className, onChange, name, value, required, width }: any) {

    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            value={value}
            required={required}
            className={`${width ? width : 'w-full'} outline outline-1 outline-slate-400 rounded p-1.5 px-3 shadow-lg ease-in-out duration-300 focus:outline-2 focus:outline-french-blue ${className ? className : ''}`}
        />
    )
}