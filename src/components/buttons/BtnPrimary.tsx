export default function Button (props: any) {

    if (!props.btnText) return <p className="bg-red-500 text-white p-2 text-center rounded inline-block">Add btnText prop</p>

    return (
        <button 
            onClick={props.btnOnClick}
            className={`${props.btnFontSizeClass ? props.btnFontSizeClass : 'text-base'} ${props.width ? props.width : 'w-fit'} rounded p-1.5 px-3 bg-french-blue shadow-lg hover:shadow-inner hover:bg-sapph-blue text-white ease-in-out duration-300 ${props.btnClassName ? props.btnClassName : ''}`} 
            style={props.style}
        >
            {props.btnText}
        </button>
    )
}