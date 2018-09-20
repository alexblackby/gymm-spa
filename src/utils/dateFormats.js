import moment from 'moment'

moment.updateLocale('ru', {
  months: {
    format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
    standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
    isFormat: /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?|MMMM?(\[[^\[\]]*\]|\s+)+D[oD]?/
  }
})
moment.locale("ru")

/*
  Using moment.js syntax
 */
const formatList = {
  weekdayShortMonth: "dddd, D MMM",
  weekdayFullMonth: "dddd, D MMMM",
  dayMonth: "D MMMM",
  numericDate: "D.M.Y"
}


const hasFormat = function (formatName) {
  return (typeof formatList[formatName] !== "undefined")
}

const format = function (date, formatName) {
  if (!hasFormat(formatName)) {
    return false
  }

  let dateMoment = moment(date)
  return dateMoment.format(formatList[formatName])
}

export default {hasFormat, format}
