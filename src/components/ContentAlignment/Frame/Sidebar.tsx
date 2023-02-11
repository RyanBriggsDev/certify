import Image from 'next/image'
import profilePic from '@/assets/profilePic.png'
import courses64 from '@/assets/sidebar/courses64.png'
import dashboard48 from '@/assets/sidebar/dashboard48.png'
import candidates66 from '@/assets/sidebar/candidates66.png'
import customers64 from '@/assets/sidebar/customers64.png'
import reports58 from '@/assets/sidebar/reports58.png'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// sidenav links
const links = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    img: dashboard48,
  },
  {
    name: 'Courses',
    link: '/courses',
    img: courses64,
  },
  {
    name: 'Candidates',
    link: '/candidates',
    img: candidates66,
  },
  {
    name: 'Customers',
    link: '/customers',
    img: customers64,
  },
  {
    name: 'Reports',
    link: '/reports',
    img: reports58,
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {!open && (
        <SidebarArrow
          setOpen={setOpen}
          open={open}
          className="top-[50%] -left-1"
        />
      )}
      <aside
        id="sidebar"
        className={`${
          open
            ? 'w-screen sm:w-60'
            : 'w-0 scale-0 sm:w-0 sm:scale-0 md:scale-100'
        } fixed left-0 top-0 flex min-h-screen flex-col justify-between bg-white/[0.6] p-4 shadow-md duration-300 dark:bg-zinc-900/[0.9] md:static md:w-80`}
      >
        <SidebarProfile></SidebarProfile>
        <SidebarArrow
          setOpen={setOpen}
          open={open}
          className="-right-1 top-[50%]"
        />
        <SidebarLinks>
          <SidebarLink />
        </SidebarLinks>
        <SidebarSettings></SidebarSettings>
      </aside>
    </>
  )
}

function SidebarArrow({ setOpen, open, className }) {
  return (
    <div
      className={`font absolute cursor-pointer rounded bg-sapph-blue p-2 text-2xl text-white md:hidden ${
        open && 'rotate-180'
      }
      ${className && className}`}
      onClick={() => setOpen(!open)}
    >
      &#x2192;
    </div>
  )
}

function SidebarProfile() {
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-2 shadow-md dark:bg-dark-gray dark:bg-none">
      <div className="flex gap-4">
        <Image
          src={profilePic}
          width="48"
          height="48"
          className="rounded-xl"
          alt="temporary profile picture"
        />
        <div>
          <h3>Ryan Briggs</h3>
          <p className="cursor-pointer text-sm text-blue-500 underline">
            Edit Profile
          </p>
        </div>
      </div>
      <hr />
      <div className="flex items-center gap-2">
        <h3>Active Courses</h3>
        <p className="text-2xl">248</p>
      </div>
    </div>
  )
}

function SidebarLinks({ children }: any) {
  return <ul className="flex flex-col gap-2">{children}</ul>
}

function SidebarLink() {
  const router = useRouter()

  return (
    <>
      {links.map((item, index) => (
        <li
          onClick={() => router.push(`${item.link}`)}
          key={index}
          className={`space-between flex cursor-pointer items-center gap-4 rounded p-2 shadow-md duration-300 ease-in-out [&>*]:hover:invert-0 ${
            item.link === router.route
              ? 'bg-french-blue text-white [&>*]:invert-0'
              : 'bg-white hover:bg-french-blue hover:text-white dark:bg-dark-gray'
          }`}
        >
          <Image
            className="invert dark:invert-0"
            src={item.img}
            width={24}
            height={24}
            alt={item.name}
          />
          <h3 className="inline">{item.name}</h3>
        </li>
      ))}
    </>
  )
}

function SidebarSettings() {
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-2 shadow-md dark:bg-dark-gray">
      <h3 className="text-xl">User Settings</h3>
      {/* Need to decide on what items to put here */}
      <ul>
        <li>Sign Out</li>
        <li>Profile</li>
        <li>Settings</li>
        <li>Etc</li>
      </ul>
    </div>
  )
}
