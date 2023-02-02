export default function Container ({ children, className }: any) {

    return (
        <div className={`px-2 container ${className ? className : ''}`}>{children}</div>
    )
}