import Header from '@/components/Header'
import InputForm from '@/components/table/InputForm'
import OperationButtons from '@/components/table/OperationButtons'
import OrderContent from '@/components/table/OrderContent'
import {
  copyOrder,
  getLocalStorage,
  range,
  removeLocalStorage,
  setLocalStorage,
  TABLE_NUM,
} from '@/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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

  const [order, setOrder] = useState([[]])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const orderInStorage = getLocalStorage(table)
    orderInStorage && setOrder(orderInStorage)
  }, [])

  const saveOrder = newOrder => {
    setOrder(newOrder)
    setLocalStorage(table, newOrder)
  }

  const addItems = (item, qty) => {
    const activeSubOrder = order[activeIndex]
    const itemInSubOrder = activeSubOrder.find(
      i => i.id !== 666 && i.id === item.id
    )

    if (itemInSubOrder) {
      itemInSubOrder.qty += qty
    } else {
      activeSubOrder.push({ ...item, qty })
    }

    const newOrder = copyOrder(order)
    saveOrder(newOrder)
  }

  const reduceOneItem = itemIndex => {
    const activeSubOrder = order[activeIndex]
    const item = activeSubOrder[itemIndex]
    if (item.qty > 1) {
      item.qty -= 1
    } else {
      activeSubOrder.splice(itemIndex, 1)
    }
    const newOrder = copyOrder(order)
    saveOrder(newOrder)
  }

  const addSubOrder = () => {
    const newOrder = copyOrder(order)
    newOrder.push([])
    saveOrder(newOrder)
    setActiveIndex(newOrder.length - 1)
  }

  const removeActiveSubOrder = () => {
    if (order.length == 1) return
    if (!confirm('Sind Sie sicher?')) return
    const newOrder = copyOrder(order)
    newOrder.splice(activeIndex, 1)
    saveOrder(newOrder)
    setActiveIndex(0)
  }

  const clearTable = () => {
    setOrder([[]])
    removeLocalStorage(table)
  }

  useEffect(() => {
    console.log('order:', order)
    console.log('ac:', activeIndex)
  }, [order])

  return (
    <div>
      <Header title={`Tisch ${table}`} />

      <div className="mt-6 px-4 text-2xl">
        <InputForm addItems={addItems} />

        <div className="mt-6">
          <OrderContent
            order={order}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            reduceOneItem={reduceOneItem}
          />

          {order[activeIndex] && (
            <div className="mt-14">
              <OperationButtons
                addSubOrder={addSubOrder}
                removeActiveSubOrder={removeActiveSubOrder}
                clearTable={clearTable}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Table
