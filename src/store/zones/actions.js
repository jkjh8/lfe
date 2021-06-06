import axios from 'src/boot/axios'
import { Notify } from 'quasar'

function errNotify () {
  Notify.create({
    type: 'negative',
    message: '정보를 갱신하지 못하였습니다.',
    position: 'center',
    timeout: 1000
  })
}

export function updateZoneName ({ state, dispatch }, payload) {
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
}

export function deleteZone ({ state, dispatch }, payload) {
  const reqData = { local: state.selected, zone: payload }
  axios.post('/zones/deleteZone', reqData).then((res) => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
}

// Relays
export function addRelays ({ state, dispatch }, payload) {
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
}

export function updateRelay ({ state, dispatch }, payload) {
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
}

export function deleteRelay ({ state, dispatch }, payload) {
  const reqData = { local: state.selected, relay: payload }
  axios.post('/zones/deleteRelay', reqData).then((res) => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
    errNotify()
  })
}

// refresh locals
export async function get ({ dispatch }) {
  try {
    const r = await axios.get('/zones/get')
    if (r) {
      dispatch('update', r.data.locals)
    }
  } catch (err) {
    console.log(err)
    errNotify()
  }
}

export function update ({ state, commit }, payload) {
  commit('updateLocals', payload)
  if (state.selected > 0) {
    commit('updateZones', payload[state.selected - 1].zones)
    commit('updateRelays', payload[state.selected - 1].relays)
  }
}
