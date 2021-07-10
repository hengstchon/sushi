import { getLocalStorage, getSum, toPrice } from '@/utils/index'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Table = ({ table }) => {
  const [sum, setSum] = useState()

  useEffect(() => {
    const order = getLocalStorage(table)
    order && setSum(getSum(order))
  }, [])

  return (
    <Link href={`/${table}`}>
      <a className="rounded-lg mt-4 py-2 px-4 flex justify-between text-2xl bg-white shadow border">
        <div className="h-20 w-32 flex justify-center items-center rounded-lg border bg-red-200">
          Tisch {table}
        </div>
        {sum && <div className="flex items-center">{toPrice(sum)}</div>}
      </a>
    </Link>
  )
}

export default Table
