export default function Button (props: any) {

    if (!props.btnText) return <p className="bg-red-500 text-white p-2 text-center rounded inline-block">Add btnText prop</p>

    return (
        <button className={`${props.btnFontSizeClass ? props.btnFontSizeClass : 'text-base'} ${props.width ? props.width : 'w-fit'} outline outline-white outline-1 shadow-lg rounded p-1.5 px-3 bg-pallete-orange text-white ease-in-out duration-300 hover:outline-2 hover:outline-[#D09021] hover:shadow-inner active:bg-[#D09021] ${props.btnClassName ? props.btnClassName : ''}`} onClick={props.btnOnClick}>
            {props.btnText}
        </button>
    )
}