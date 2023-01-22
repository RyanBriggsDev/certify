export default function Button (props) {

    if (!props.btnText) return <p>Add a btnText prop</p>

    return (
        <button className={`${props.btnFontSizeClass ? props.btnFontSizeClass : 'text-base'} outline outline-white outline-1 rounded p-1.5 px-3 bg-french-blue shadow-lg hover:outline-2 hover:outline-sapph-blue hover:shadow-inner active:bg-sapph-blue text-white ease-in-out duration-300 ${props.btnClassName ? props.btnClassName : ''}`} onClick={props.btnOnClick}>
            {props.btnText}
        </button>
    )
}