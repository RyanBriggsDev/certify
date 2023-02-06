export default function H3({ children, className }: any) {
  return (
    <h1
      className={`
            font-newake
            font-newake
            webkit-bg-clip-text
            dark:font-outline-1
            w-fit 
            bg-gradient-to-r 
            from-french-blue
            to-cyan-500 
            bg-clip-text
            text-3xl
            tracking-wide text-transparent
            md:text-5xl            
            lg:text-6xl
            ${className ? className : ''}`}
    >
      {children}
    </h1>
  )
}
