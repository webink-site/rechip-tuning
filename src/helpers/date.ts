import moment from 'moment'
import 'moment/dist/locale/ru'
moment.locale('ru')

export function formatDate (date: number) {
  return moment.unix(date).format('LL')
}
