export const fromDate = (time) => {
  const date = new Date(time)
  const y = date.getFullYear()
  const mo = date.getMonth()
  const d = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  return `${y}-${mo+1}-${d} ${h}:${m}:${s}`
}

