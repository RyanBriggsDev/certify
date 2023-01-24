export default function Button (props: any) {

    if (!props.btnText) return <p className="bg-red-500 text-white p-2 text-center rounded inline-block">Add btnText prop</p>

    return (
        <button 
            onClick={props.btnOnClick}
            className={`${props.btnFontSizeClass ? props.btnFontSizeClass : 'text-base'} ${props.width ? props.width : 'w-fit'} outline outline-white outline-1 rounded p-1.5 px-3 bg-french-blue shadow-lg hover:outline-2 hover:outline-sapph-blue hover:shadow-inner active:bg-sapph-blue text-white ease-in-out duration-300 ${props.btnClassName ? props.btnClassName : ''}`} 
        >
            {props.btnText}
        </button>
    )
}