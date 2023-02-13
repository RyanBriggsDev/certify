export default function H4({ children, className }: any) {
  return (
    <h4
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
            text-2xl
            tracking-wide text-transparent
            md:text-4xl            
            lg:text-5xl
            ${className ? className : ""}`}
    >
      {children}
    </h4>
  );
}
