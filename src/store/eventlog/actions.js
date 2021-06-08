import axios from 'src/boot/axios'
import { Loading } from 'quasar'

export function getLog ({ state, commit }) {
  Loading.show()
  commit('loading', true)
  let query = `page=${state.pages.page}`
  query = query + `&limit=${state.pages.limit}`
  query = query + `&search=${state.logs.search}`
  query = query + `&zones=${state.logs.zones}`
  query = query + `&date=${state.date.enable}`
  query = query + `&start=${state.date.start}`
  query = query + `&end=${state.date.end}`

  axios.get(`/log/get?${query}`).then((res) => {
    commit('updateDocs', res.data)
    commit('loading', false)
  }).catch((error) => {
    console.log(error)
    commit('loading', false)
  })
  Loading.hide()
}
