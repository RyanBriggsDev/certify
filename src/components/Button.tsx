export default function Button({
  children,
  onClick,
  type,
  borderRadius,
  width,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`card px- p-1.5 duration-300 ease-in-out
    ${borderRadius ? borderRadius : 'rounded'}
    ${width ? width : 'w-full'}
    ${type === 'primary' && 'bg-french-blue text-white hover:bg-sapph-blue'}
    ${type === 'orange' && 'bg-pallete-orange text-black hover:bg-orange-400'}
    ${type === 'light' && 'bg-azure-blue text-black hover:bg-blue-200'}
    `}
    >
      {children}
    </button>
  )
}
