import moment from 'moment'

export function days (state) {
  return moment(state.time).format('YYYY/MM/DD')
}

export function wDays (state) {
  return moment(state.time).format('dddd')
}

export function times (state) {
  return moment(state.time).format('hh:mm:ss')
}

export function ampm (state) {
  return moment(state.time).format('a')
}
