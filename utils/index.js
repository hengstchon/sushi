export const toComma = n =>
  n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })

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

export const TABLE_NUM = 9
