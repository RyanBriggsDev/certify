export default function PageSpacing ({ children, padding }: any) {

    return  <div className={`${padding ? padding : 'py-24'} page-spacing flex flex-col gap-16`}>{children}</div>
}