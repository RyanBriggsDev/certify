export default function Button(props: any) {
  if (!props.btnText)
    return (
      <p className="inline-block rounded bg-red-500 p-2 text-center text-white">
        Add btnText prop
      </p>
    )

  return (
    <button
      onClick={props.btnOnClick}
      className={`${
        props.btnFontSizeClass
          ? props.btnFontSizeClass
          : 'text-base'
      } ${
        props.width ? props.width : 'w-fit'
      } rounded bg-french-blue p-1.5 px-3 text-white shadow-lg duration-300 ease-in-out hover:bg-sapph-blue hover:shadow-inner ${
        props.btnClassName
          ? props.btnClassName
          : ''
      }`}
      style={props.style}
    >
      {props.btnText}
    </button>
  )
}
