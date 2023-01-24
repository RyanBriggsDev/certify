

export default function H3 ({ children, className }: any) {
    return (
        <h1 className={`
            text-xl
            text-french-blue
            md:text-3xl
            lg:text-4xl
            font-newake
            py-1
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