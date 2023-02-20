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
        tinted
          ? `duration-300 ease-in-out${
              tintedColor
                ? tintedColor
                : 'hover:bg-gray-400/[0.7] hover:dark:bg-dark-gray/[0.75]'
            }`
          : ''
      }
      ${padding ? padding : 'p-3'}
      ${!borderRadius ? 'rounded' : borderRadius}
      ${width ? width : 'w-full'}
      ${height ? height : 'h-full'}
      ${onClick ? 'cursor-pointer' : ''}
      ${className ? className : ''}
      ${color ? color : ''}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
