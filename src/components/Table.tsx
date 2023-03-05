import { useRouter } from 'next/router'
import Button from './Button'

export default function Table({ data, clickable }: TableProps) {
  const tableHeads = Object.keys(data[0])
  const router = useRouter()
  const { pathname } = router

  return (
    <div className="overflow-x-auto">
      {data.length > 0 && (
        <table className="w-full table-auto text-center">
          <thead>
            <tr>
              {tableHeads.map((head, i) => (
                <th className="bg-sapph-blue p-3" key={i}>
                  {head.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(data).map((obj, index) => (
              <tr
                key={index}
                // data object requires an id key when using table clickable prop
              >
                {Object.values(obj).map((value, index2) =>
                  value === 'delete' ? (
                    <td className="bg-dark-gray py-1 px-3">x</td>
                  ) : (
                    <td className="bg-dark-gray py-1 px-3" key={index2}>
                      {value}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

type TableProps = {
  data: any
  clickable: boolean
}
