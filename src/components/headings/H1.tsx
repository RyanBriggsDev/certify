export default function H1({ children, className }: any) {
  return (
    <h1
      className={`
    font-newake
    webkit-bg-clip-text
    dark:font-outline-1
    w-fit 
    bg-gradient-to-r 
    from-french-blue 
    to-cyan-500
    bg-clip-text 
    text-5xl text-transparent
    md:text-7xl
    lg:text-8xl
    ${className ? className : ''}`}
    >
      {children}
    </h1>
  )
}
