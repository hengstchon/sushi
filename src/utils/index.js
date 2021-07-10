export const TABLE_NUM = 40

export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = key => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const removeLocalStorage = key => {
  return window.localStorage.removeItem(key)
}

export const range = (start, end) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

export const getSubOrderSum = subOrder => {
  return subOrder.reduce((a, b) => a + b.price * b.qty, 0)
}

export const getSum = order => {
  let sum = 0
  for (const subOrder of order) {
    const subSum = getSubOrderSum(subOrder)
    sum += subSum
  }
  return sum
}

export const toPrice = n => {
  // return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
  return `${n.toFixed(2).replace('.', ',')} €`
}

export const isNumber = str => {
  const pattern = /^\d+$/
  return pattern.test(str)
}

export const copyOrder = order => {
  const newOrder = []
  for (const subOrder of order) {
    newOrder.push([...subOrder])
  }
  return newOrder
}
