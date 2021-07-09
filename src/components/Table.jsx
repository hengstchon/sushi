import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getLocalStorage, toComma } from '../utils'

const Table = ({ table }) => {
  const [sum, setSum] = useState()
  useEffect(() => {
    const sum = getLocalStorage(table)?.sum
    setSum(sum)
  }, [])

  return (
    <Link href={`/${table}`}>
      <a className="rounded-lg py-2 px-4 flex justify-between text-2xl bg-white shadow">
        <div className="h-20 w-32 flex justify-center items-center rounded-lg bg-red-200">
          Tisch {table}
        </div>
        {sum && <div className="flex items-center">Summe: {toComma(sum)}</div>}
      </a>
    </Link>
  )
}

export default Table
