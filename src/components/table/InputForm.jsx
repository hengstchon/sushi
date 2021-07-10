import { isNumber } from '@/utils'
import data from '@/utils/data.json'
import { useState } from 'react'

const InputForm = ({ addItems }) => {
  const [input, setInput] = useState('')

  const [showPrice, setShowPrice] = useState(false)
  const [priceInput, setPriceInput] = useState('')

  const handleChange = e => {
    setInput(e.target.value)
    if (e.target.value.includes('666')) {
      setShowPrice(true)
    } else {
      setShowPrice(false)
    }
  }

  const handlePriceChange = e => {
    setPriceInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    let qty = 1
    let itemNr

    // 得到 qty 和 itemNr
    if (input.includes('*')) {
      // 大于 1 个
      const [qtyStr, itemNrStr] = input.split('*')
      if (!qtyStr || !itemNrStr) return
      if (!isNumber(qtyStr) || !isNumber(itemNrStr)) return
      qty = parseInt(qtyStr)
      itemNr = parseInt(itemNrStr)
    } else {
      // 1 个
      if (!isNumber(input)) return
      itemNr = parseInt(input)
    }

    let item
    if (itemNr === 666) {
      if (priceInput === '') return
      const price = parseFloat(priceInput.replace(',', '.'))
      item = { id: 666, name: 'andere', price }
    } else {
      item = data.find(i => i.id == itemNr)
    }

    if (!item) return
    addItems(item, qty)

    setInput('')
    setPriceInput('')
    setShowPrice(false)
  }

  return (
    <form className="text-xl flex justify-around" onSubmit={handleSubmit}>
      <div>
        <div>
          <label>Nummer: </label>
          <input
            className="ml-2 h-11 w-32 border-2 rounded"
            name="number"
            type="tel"
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
      </div>

      <button
        className="border ml-10 bg-blue-200 py-2 px-6 rounded"
        type="submit"
      >
        Hinzufügen
      </button>
    </form>
  )
}

export default InputForm
