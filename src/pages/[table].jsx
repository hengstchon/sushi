import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  range,
  toComma,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '../utils'
import Header from '../components/Header'
import { TABLE_NUM } from '../utils'
import data from '../utils/data.json'

const getSum = order =>
  order.reduce((a, b) => {
    if (b.deleted) {
      return a
    } else {
      return a + b.price * b.number
    }
  }, 0)

export async function getStaticPaths() {
  const paths = range(1, TABLE_NUM).map(i => ({ params: { table: String(i) } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

const Table = () => {
  const router = useRouter()
  const { table } = router.query

  const [input, setInput] = useState('')
  const [menge, setMenge] = useState('1')
  const [order, setOrder] = useState([])
  const [showPrice, setShowPrice] = useState(false)
  const [priceInput, setPriceInput] = useState('')

  useEffect(() => {
    const orderInStorage = getLocalStorage(table)?.order
    orderInStorage && setOrder(orderInStorage)
  }, [])

  const sum = getSum(order)

  const handleChange = e => {
    setInput(e.target.value)
    if (e.target.value === '666') {
      setShowPrice(true)
    } else {
      setShowPrice(false)
    }
  }

  const handleChangeMenge = e => {
    setMenge(e.target.value)
  }

  const handlePriceChange = e => {
    setPriceInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (input === '666') {
      // 自定义价格
      const price = parseFloat(priceInput.replace(',', '.'))
      const item = { id: 666, name: '', price, number: parseInt(menge) }
      order.push(item)
      setOrder([...order])
    } else {
      // 从 data 里搜索
      const item = data.find(i => i.id == parseInt(input))
      if (item) {
        const itemInOrder = order.find(i => !i.deleted && i.id == item.id)
        if (itemInOrder) {
          itemInOrder.number += parseInt(menge)
        } else {
          item.number = parseInt(menge)
          order.push(item)
        }
        setOrder([...order])
      }
    }
    const tableData = { order, sum: getSum(order) }
    setLocalStorage(table, tableData)
    setInput('')
    setPriceInput('')
    setShowPrice(false)
  }

  const toggleItem = index => {
    order[index].deleted = !order[index].deleted
    setOrder([...order])
    const tableData = { order, sum: getSum(order) }
    setLocalStorage(table, tableData)
  }

  const clearTable = () => {
    setOrder([])
    removeLocalStorage(table)
  }

  return (
    <div>
      <Header title={`Tisch ${table}`} />

      <div className="mt-4 px-4">
        <form className="text-xl flex justify-center" onSubmit={handleSubmit}>
          <div>
            <div>
              <label>Nummer:</label>
              <input
                className="ml-2 h-11 w-32 border-2 rounded"
                type="number"
                name="number"
                value={input}
                onChange={handleChange}
              />
            </div>
            {showPrice && (
              <div className="mt-2">
                <label>Preis:</label>
                <input
                  className="ml-2 h-11 w-32 border-2 rounded"
                  type="number"
                  name="number"
                  value={priceInput}
                  onChange={handlePriceChange}
                />
              </div>
            )}
            <div className="mt-2">
              <label>Menge:</label>
              <input
                className="ml-2 h-11 w-32 border-2 rounded"
                type="number"
                name="number"
                value={menge}
                onChange={handleChangeMenge}
              />
            </div>
          </div>
          <button className="ml-10 bg-blue-200 py-2 px-6 rounded" type="submit">
            Hinzufügen
          </button>
        </form>

        {order.length > 0 && (
          <div className="text-2xl">
            <div className="mt-4 px-4 py-6 rounded-xl border bg-white">
              {order.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center py-1 ${
                    item.deleted && 'line-through'
                  }`}
                  onClick={() => toggleItem(i)}
                >
                  <div className="truncate">
                    <span>{item.id}</span>
                    <span className="ml-2">{item.name}</span>
                  </div>
                  <div className="flex-none">
                    {item.number && <span>x {item.number}</span>}
                    <span className="ml-8">
                      {toComma(item.price * item.number)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="mt-6 border-t pt-4 text-3xl flex justify-between">
                <span>Summe:</span>
                <span>{toComma(sum)}</span>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <a
                className="w-40 h-14 px-4 rounded-lg flex justify-center items-center bg-red-200"
                onClick={clearTable}
              >
                Fertig
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Table
