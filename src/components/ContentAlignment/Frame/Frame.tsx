import Nav from './Nav'
import Sidebar from './Sidebar'
import Content from './Content'

export default function Frame({ children }: any) {
  return (
    <div id="frame" className="flex">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Nav />
        <Content>{children}</Content>
      </div>
    </div>
  )
}
