export default function Input ({ type, placeholder, className, onChange, name, value, id, required, width }: any) {

    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            id={id}
            value={value}
            required={required}
            className={`${width ? width : 'w-full'} outline outline-1 outline-slate-400 bg-slate-100 rounded p-1.5 px-3 shadow-lg text-black ease-in-out duration-300 focus:outline-2 focus:outline-french-blue ${className ? className : ''}`}
        />
    )
}