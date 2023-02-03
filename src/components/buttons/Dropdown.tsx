import { useState } from "react"
import { useRouter } from "next/router"

export default function Dropdown ({ dropdownItems, title, ddBtnClasName }: any) {

    const [dropdownOpen, setDropdownOpen] = useState(false)

    if(!title) return <p className="bg-red-500 text-white p-2 text-center rounded inline-block">Add title prop</p>

    return (
        <div>
            {dropdownOpen ? <div onClick={() => setDropdownOpen(false)} className="w-full h-full fixed top-0 left-0 flex z-1"></div> : <></>}
            <div
                className='dropdown-menu cursor-pointer z-10 relative bg-french-blue rounded-t p-1.5 px-3 text-center shadow-lg ease-in-out duration-300 text-white hover:bg-sapph-blue'
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <p>{title}</p>
                {dropdownOpen 
                    ? 
                        <ul className="absolute z-30 top-full text-black -left-0 w-full">
                            {dropdownItems.map((item: [], index: any) => (
                                <DropdownListItems item={item} key={index} />
                            ))}
                        </ul>
                    :
                        <></>
                }
            </div>
        </div>
    )
}

function DropdownListItems ({ item }: any) {

    const router = useRouter()

    return (
        <li onClick={() => router.push(item.link)} className="w-full p-1.5 px-3 bg-slate-200 cursor-pointer shadow-lg hover:bg-slate-100 dark:hover:bg-slate-300 ease-in-out duration-300">{item.name}</li>
    )
}