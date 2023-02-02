export default function Button (props: any) {

    if (!props.btnText) return <p className="bg-red-500 text-white p-2 text-center rounded inline-block">Add btnText prop</p>

    return (
        <button className={`${props.btnFontSizeClass ? props.btnFontSizeClass : 'text-base'} ${props.width ? props.width : 'w-fit'} shadow-lg rounded p-1.5 px-3 bg-azure-blue text-black ease-in-out duration-300 hover:shadow-inner hover:bg-sky-100 hover:dark:bg-sky-200 ${props.btnClassName ? props.btnClassName : ''}`} onClick={props.btnOnClick}>
            {props.btnText}
        </button>
    )
}