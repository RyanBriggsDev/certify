

export default function H2 ({ children, className }: any) {
    return (
        <h1 className={`
            text-4xl
            md:text-6xl
            lg:text-7xl
            font-newake
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
    )
}