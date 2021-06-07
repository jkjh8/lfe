import axios from 'src/boot/axios'
import { Notify, Loading } from 'quasar'

function errNotify () {
  Notify.create({
    type: 'negative',
    message: '정보를 갱신하지 못하였습니다.',
    position: 'center',
    timeout: 1000
  })
}

// refresh zones relays
export function refresh ({ dispatch }, payload) {
  Loading.show()
  axios.get(`/zones/resetZones?id=${payload}`).then((res) => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
  Loading.hide()
}

// locals
export function addLocals ({ dispatch }, payload) {
  Loading.show()
  axios.post('/zones/addLocals', payload).then(res => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
  Loading.hide()
}

export function updateLocalName ({ dispatch }, payload) {
  Loading.show()
  axios.post('/zones/updateLocalName', payload).then((res) => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
  Loading.hide()
}

export function deleteLocal ({ dispatch }, payload) {
  Loading.show()
  axios.get(`/zones/deleteLocal?id=${payload}`).then((res) => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
  Loading.hide()
}

// Zones
export function addZones ({ state, dispatch }, payload) {
  Loading.show()
  const reqData = {
    local: state.selected,
    zone: payload
  }
  axios.post('/zones/addZones', reqData).then(res => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
  Loading.hide()
}

export function updateZoneName ({ state, dispatch }, payload) {
  Loading.show()
  const reqData = {
    local: state.selected,
    zone: payload
  }
  axios.post('/zones/updateZoneName', reqData).then(res => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
  Loading.hide()
}

export function deleteZone ({ state, dispatch }, payload) {
  Loading.show()
  const reqData = { local: state.selected, zone: payload }
  axios.post('/zones/deleteZone', reqData).then((res) => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
  Loading.hide()
}

// Relays
export function addRelays ({ state, dispatch }, payload) {
  Loading.show()
  const reqData = {
    local: state.selected,
    relay: payload
  }
  axios.post('/zones/addRelays', reqData).then(res => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
  Loading.hide()
}

export function updateRelay ({ state, dispatch }, payload) {
  Loading.show()
  const reqData = {
    local: state.selected,
    relay: payload
  }
  axios.post('/zones/updateRelay', reqData).then(res => {
    dispatch('get')
  }).catch(err => {
    console.err(err)
    errNotify()
  })
  Loading.hide()
}

export function deleteRelay ({ state, dispatch }, payload) {
  Loading.show()
  const reqData = { local: state.selected, relay: payload }
  axios.post('/zones/deleteRelay', reqData).then((res) => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
  Loading.hide()
}

// refresh locals
export async function get ({ dispatch }) {
  Loading.show()
  try {
    const r = await axios.get('/zones/get')
    if (r) {
      dispatch('update', r.data.locals)
    }
  } catch (err) {
    console.log(err)
    errNotify()
  }
  Loading.hide()
}

export function update ({ state, commit }, payload) {
  commit('updateLocals', payload)
  if (state.selected > 0) {
    commit('updateZones', payload[state.selected - 1].zones)
    commit('updateRelays', payload[state.selected - 1].relays)
  }
}
