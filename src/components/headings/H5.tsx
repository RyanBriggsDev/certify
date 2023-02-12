export default function H5({ children, className }: any) {
  return (
    <h5
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
            text-xl
            tracking-wide
            text-french-blue text-transparent
            md:text-3xl            
            lg:text-4xl
            ${className ? className : ""}`}
    >
      {children}
    </h5>
  );
}
