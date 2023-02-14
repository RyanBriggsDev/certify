export default function Container({ children, className, padding }: any) {
  return (
    <div
      className={`container mx-auto px-2 ${padding ? padding : 'py-16'} ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  )
}
