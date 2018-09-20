import Vue from 'vue'
import dateFormats from '../utils/dateFormats'

Vue.filter('dateFormat', function (value, formatName) {
  if (!value) return ''

  // convert sec to ms
  value *= 1000

  let d = new Date(value)
  let thisYear = (d.getFullYear() == new Date().getFullYear())

  if (!thisYear) {
    formatName = 'numericDate'
  }

  let dateStr = dateFormats.format(d, formatName)
  let dateStrUcfirst = dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
  return dateStrUcfirst
})
