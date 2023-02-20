export default function Content({ children }) {
  return (
    <div className="flex h-full flex-col justify-center" id="content">
      {children}
    </div>
  )
}
