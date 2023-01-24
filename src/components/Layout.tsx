

export default function Layout ({children}: any) {
    
    return (
        <div className="min-h-screen flex justify-between items-center flex-col dark:bg-black dark:text-white">
            <p>Nav</p>
            {children}
            <p>Footer</p>
        </div>
    )
}