import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Dropdown({
  dropdownItems,
  title,
  ddBtnClasName,
}: any) {
  const [dropdownOpen, setDropdownOpen] =
    useState(false)

  if (!title)
    return (
      <p className="inline-block rounded bg-red-500 p-2 text-center text-white">
        Add title prop
      </p>
    )

  return (
    <div>
      {dropdownOpen ? (
        <div
          onClick={() => setDropdownOpen(false)}
          className="z-1 fixed top-0 left-0 flex h-full w-full"
        ></div>
      ) : (
        <></>
      )}
      <div
        className="dropdown-menu relative z-10 cursor-pointer rounded-t bg-french-blue p-1.5 px-3 text-center text-white shadow-lg duration-300 ease-in-out hover:bg-sapph-blue"
        onClick={() =>
          setDropdownOpen(!dropdownOpen)
        }
      >
        <p>{title}</p>
        {dropdownOpen ? (
          <ul className="absolute top-full -left-0 z-30 w-full text-black">
            {dropdownItems.map(
              (item: [], index: any) => (
                <DropdownListItems
                  item={item}
                  key={index}
                />
              )
            )}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

function DropdownListItems({ item }: any) {
  const router = useRouter()

  return (
    <li
      onClick={() => router.push(item.link)}
      className="w-full cursor-pointer bg-slate-200 p-1.5 px-3 shadow-lg duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-slate-300"
    >
      {item.name}
    </li>
  )
}
