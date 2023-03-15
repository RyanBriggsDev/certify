import { useState } from 'react'
import { useRouter } from 'next/router'
import Icon from './Icon'

export default function Table({
  data,
  route,
  onClick,
  pageNumber = 0,
  pageSize = 10,
  width = 'w-full',
}: TableProps) {
  const tableHeads = Object.keys(data[0])
  const router = useRouter()

  const [page, setPage] = useState(pageNumber)

  const handleClick = (obj) => {
    router.push(`/${route}/${obj.id}`)
  }

  return (
    <div className={`overflow-x-auto ${width}`}>
      {data.length > 0 && (
        <>
          <table
            className={`lg:text-md table-auto bg-dark-gray text-left text-sm md:text-center md:text-base ${width}`}
          >
            <thead>
              <tr>
                {tableHeads.map((head, i) => (
                  <th className="bg-sapph-blue p-1 text-center md:p-3" key={i}>
                    {head.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {Object.values(
                data.slice(pageSize * page, pageSize * page + pageSize)
              ).map((obj: any, index: number) => (
                <tr
                  key={index}
                  // data object requires an id key when using table route prop
                >
                  {Object.values(obj).map((value: any, index: number) =>
                    value === 'remove' ? (
                      <td
                        key={index}
                        className="flex items-center justify-center gap-1 bg-dark-gray py-1 px-1 md:gap-3 md:px-3"
                      >
                        <div
                          onClick={() => onClick(obj)}
                          className="flex h-full w-full cursor-pointer items-center justify-center"
                        >
                          <Icon icon="BiTrash" color="warning" size="xl" />
                        </div>
                      </td>
                    ) : (
                      <td
                        className={`bg-dark-gray py-1 px-3 ${
                          route ? 'cursor-pointer' : ''
                        }`}
                        onClick={() => handleClick(obj)}
                        key={index}
                      >
                        {value}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className={`flex items-center justify-center bg-dark-gray py-3 ${width}`}
          >
            {page - 1 > -1 && (
              <button onClick={() => setPage(page - 1 > -1 ? page - 1 : page)}>
                Back
              </button>
            )}
            <label style={{ padding: '0 1em' }}>{page + 1}</label>
            {page + 1 < data.length / pageSize && (
              <button
                onClick={() => {
                  setPage(page + 1 < data.length / pageSize ? page + 1 : page)
                }}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

type TableProps = {
  data: any
  route?: string
  onClick?: any
  pageNumber?: number
  pageSize?: number
  width?: string
}
