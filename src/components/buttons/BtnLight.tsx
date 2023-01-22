export default function Button (props) {

    if (!props.btnText) return <p>Add a btnText prop</p>

    return (
        <button className={`${props.btnFontSizeClass ? props.btnFontSizeClass : 'text-base'} outline outline-slate-200 shadow-lg outline-1 rounded p-1.5 px-3 bg-azure-blue text-black ease-in-out duration-300 active:bg-white hover:shadow-inner hover:outline-2 hover:outline-french-blue ${props.btnClassName ? props.btnClassName : ''}`} onClick={props.btnOnClick}>
            {props.btnText}
        </button>
    )
}