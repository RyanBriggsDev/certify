export default function H6({ children, className }: any) {
  return (
    <h6
      className={`
            font-newake
            webkit-bg-clip-text
            w-fit
            bg-clip-text 
            text-lg
            tracking-wide
            ${className ? className : ""}`}
    >
      {children}
    </h6>
  );
}
