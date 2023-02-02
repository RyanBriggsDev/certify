

export default function H3 ({ children, className }: any) {
    return (
        <h1 className={`
            text-3xl
            md:text-5xl
            lg:text-6xl
            font-newake
            py-2
            font-newake 
            bg-clip-text 
            webkit-bg-clip-text
            text-transparent 
            bg-gradient-to-r
            tracking-wide
            from-french-blue to-cyan-500
            w-fit            
            dark:font-outline-1
            ${className ? className : ''}`}
        >
            {children}
        </h1>
    )
}