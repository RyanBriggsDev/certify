export default function Button (props) {

    if (!props.btnText) return <p>Add a btnText prop</p>

    return (
        <button className={`${props.btnFontSizeClass ? props.btnFontSizeClass : 'text-base'} outline outline-white outline-1 shadow-lg rounded p-1.5 px-3 bg-pallete-orange text-white ease-in-out duration-300 hover:outline-2 hover:outline-[#D09021] hover:shadow-inner active:bg-[#D09021] ${props.btnClassName ? props.btnClassName : ''}`} onClick={props.btnOnClick}>
            {props.btnText}
        </button>
    )
}