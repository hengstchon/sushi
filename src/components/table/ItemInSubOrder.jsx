import { toPrice } from '@/utils'

const ItemInSubOrder = ({ item, reduceOneItem }) => {
  return (
    <div className="flex justify-between py-1">
      <div className="truncate">
        <span>{item.id}</span>
        <span className="ml-4">{item.name}</span>
      </div>

      <div className="flex-none w-1/3 flex justify-between">
        <span onClick={reduceOneItem}>x {item.qty}</span>
        <span className="ml-8">{toPrice(item.price)}</span>
      </div>
    </div>
  )
}

export default ItemInSubOrder
