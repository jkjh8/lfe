import axios from 'axios'

axios.defaults.baseURL = `http://${window.location.hostname}:3000`
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true

export function getLog ({ state, commit }) {
  commit('loading', true)
  console.log(state.logs)
  let query = `page=${state.pages.page}`
  query = query + `&limit=${state.pages.limit}`
  query = query + `&search=${state.logs.search}`
  query = query + `&zones=${state.logs.zones}`

  axios.get(`/log/get?${query}`).then((res) => {
    commit('updateDocs', res.data)
    commit('loading', false)
  }).catch((error) => {
    console.log(error)
    commit('loading', false)
  })
}
