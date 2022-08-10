export function dateIsValid(dateStr: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/

  if (dateStr.match(regex) === null) {
    return false
  }

  const date = new Date(dateStr)

  const timestamp = date.getTime()

  if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
    return false
  }

  return date.toISOString().startsWith(dateStr)
}

export function expirationDate() {
  const today = new Date()
  const thirty_days_from_now = new Date().setDate(today.getDate() + 30)
  return thirty_days_from_now
}
