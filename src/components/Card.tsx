export default function Card({
  className,
  width,
  height,
  borderRadius,
  bg,
  padding,
  tinted,
  tintedColor,
  children,
  color,
  onClick,
}: any) {
  return (
    <div
      className={`card 
      ${bg ? bg : 'bg-gray-300 dark:bg-dark-gray'}
      ${
        tinted &&
        `duration-300 ease-in-out ${
          tintedColor
            ? tintedColor
            : 'hover:bg-gray-400/[0.7] hover:dark:bg-dark-gray/[0.75]'
        }`
      }
      ${padding ? padding : 'p-3'}
      ${!borderRadius ? 'rounded' : borderRadius}
      ${width ? width : 'w-full'}
      ${height ? height : 'h-full'}
      ${onClick && 'cursor-pointer'}
      ${className && className}
      ${color && color}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// <div
//   className={`card
//   ${width ? width : 'w-full'}
//   ${height ? height : 'h-full'}
//   ${rounded ? rounded : 'rounded'}
//   ${bg ? bg : 'dark:bg-dark-gray'}
//   ${
//     color
//       ? `text-${color}`
//       : 'text-black dark:text-white'
//   }
//   ${className ? className : ''}
//   ${padding ? padding : 'p-3'}
//   `}
//   onClick={onClick}
// >
//   {tinted ? (
//     <div
//       className={`h-full w-full cursor-pointer bg-gray-300 text-black duration-300 ease-in-out dark:bg-black/[.85] dark:text-white
//       ${rounded ? rounded : 'rounded'}
//       ${
//         tintColorHover
//           ? tintColorHover
//           : 'hover:bg-gray-300/[0.6] dark:hover:bg-black/[0.7]'
//       } ${
//         tintedPadding ? tintedPadding : ''
//       }`}
//     >
//       {children}
//     </div>
//   ) : (
//     <div>{children}</div>
//   )}
// </div>
