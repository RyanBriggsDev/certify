export default function H2({ children, className }: any) {
  return (
    <h2
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
            text-4xl text-transparent
            md:text-6xl
            lg:text-7xl
            ${className ? className : ""}`}
    >
      {children}
    </h2>
  );
}
