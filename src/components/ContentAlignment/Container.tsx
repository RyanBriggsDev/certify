export default function Container({ children, className }: any) {
  return (
    <div
      className={`container mx-auto px-2 py-16 ${className ? className : ''}`}
    >
      {children}
    </div>
  )
}
