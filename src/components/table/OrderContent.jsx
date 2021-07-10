import ItemInSubOrder from '@/components/table/ItemInSubOrder'
import { getSubOrderSum, getSum, toPrice } from '@/utils'

const OrderContent = ({
  order,
  activeIndex,
  setActiveIndex,
  reduceOneItem,
}) => {
  return (
    <div>
      <div className="space-y-4">
        {order.map((subOrder, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg bg-white divide-y divide-dashed divide-opacity-50 ${
              index === activeIndex
                ? 'border-4 border-red-200'
                : 'border border-dotted'
            }`}
            style={{ minHeight: '80px' }}
            onClick={() => setActiveIndex(index)}
          >
            {subOrder.map((item, i) => (
              <ItemInSubOrder
                key={i}
                item={item}
                reduceOneItem={() => activeIndex === index && reduceOneItem(i)}
              />
            ))}

            {order.length > 1 && (
              <div className="text-right pt-3 text-xl font-light">
                Zwischensumme: {toPrice(getSubOrderSum(subOrder))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 border-t-2 flex justify-between font-bold bg-white">
        <span>SUMME:</span>
        <span>{toPrice(getSum(order))}</span>
      </div>
    </div>
  )
}

export default OrderContent
