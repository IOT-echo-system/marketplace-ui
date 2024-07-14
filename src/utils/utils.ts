import moment from 'moment'

export const formatDate = (date: Date | string, format?: string): string => {
  return moment(date)
    .local()
    .format(format ?? 'MMM DD, YYYY')
}

export const formatNumber = (number: number, decimalPoints = 2): string => {
  const numberStr = number.toFixed(decimalPoints).toString()
  const [integerPart, fractionalPart] = numberStr.split('.')
  let lastThreeDigits = integerPart.slice(-3)
  const otherDigits = integerPart.slice(0, -3)
  if (otherDigits !== '') {
    lastThreeDigits = ',' + lastThreeDigits
  }
  const indianFormattedNumber = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThreeDigits
  if (fractionalPart) {
    return `${indianFormattedNumber}.${fractionalPart}`
  }
  return indianFormattedNumber
}
