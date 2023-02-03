

export default function H1 ({ children, className }: any) {
    return <h1 
    className={`
    text-5xl
    md:text-7xl
    lg:text-8xl
    py-3 
    font-newake 
    bg-clip-text 
    webkit-bg-clip-text
    text-transparent 
    bg-gradient-to-r
    from-french-blue to-cyan-500
    w-fit
    dark:font-outline-1
    ${className ? className : ''}`}
    >
        {children}
    </h1>
}