export default function Button (props: any) {

    if (!props.btnText) return <p className="bg-red-500 text-white p-2 text-center rounded inline-block">Add btnText prop</p>

    return (
        <button className={`${props.btnFontSizeClass ? props.btnFontSizeClass : 'text-base'} ${props.width ? props.width : 'w-fit'} outline outline-slate-200 shadow-lg outline-1 rounded p-1.5 px-3 bg-azure-blue text-black ease-in-out duration-300 active:bg-french-blue active:text-white hover:shadow-inner hover:outline-2 hover:outline-french-blue ${props.btnClassName ? props.btnClassName : ''}`} onClick={props.btnOnClick}>
            {props.btnText}
        </button>
    )
}