import Nav from './Nav'
import Sidebar from './Sidebar'
import Content from './Content'
import { useState } from 'react'

export default function Frame({ children }: any) {
  const [navOpen, setNavOpen] = useState<boolean>(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const handleSidebarToggle = () => {
    if (navOpen) setNavOpen(false)
    setSidebarOpen(!sidebarOpen)
  }

  const handleNavToggle = () => {
    if (sidebarOpen) setSidebarOpen(false)
    setNavOpen(!navOpen)
  }

  return (
    <div id="frame" className="flex">
      <Sidebar
        toggleSidebar={() => handleSidebarToggle()}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex w-full flex-col">
        <Nav
          toggleNav={() => handleNavToggle()}
          navOpen={navOpen}
          frame={true}
        />
        <Content>{children}</Content>
      </div>
    </div>
  )
}
