export default function Container({
  children,
  className,
}: any) {
  return (
    <div
      className={`container mx-auto px-2 ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  )
}
