import Nav from './Nav'
import Sidebar from './Sidebar'
import Content from './Content'
import { useState } from 'react'
import Protected from '@/components/Protected'
import { useSession } from 'next-auth/react'

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
    <Protected>
      <div id="frame" className="flex">
        <Sidebar
          toggleSidebar={() => handleSidebarToggle()}
          sidebarOpen={sidebarOpen}
        />
        <div className="flex w-full flex-col p-4">
          <Nav
            toggleNav={() => handleNavToggle()}
            navOpen={navOpen}
            frame={true}
          />
          <Content>{children}</Content>
        </div>
      </div>
    </Protected>
  )
}
