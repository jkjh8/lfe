import axios from 'src/boot/axios'

export function addRelays ({ state, dispatch }, payload) {
  const reqData = {
    local: state.selected,
    relay: payload
  }
  axios.post('/zones/addRelays', reqData).then(res => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
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
  })
}

export function deleteRelay ({ state, dispatch }, payload) {
  const reqData = { local: state.selected, relay: payload }
  axios.post('/zones/deleteRelay', reqData).then((res) => {
    dispatch('get')
  }).catch((err) => {
    console.log(err)
  })
}

export async function get ({ dispatch }) {
  try {
    const r = await axios.get('/zones/get')
    if (r) {
      dispatch('update', r.data.locals)
    }
  } catch (err) {
    console.log(err)
  }
}

export function update ({ state, commit }, payload) {
  commit('updateLocals', payload)
  if (state.selected > 0) {
    commit('updateZones', payload[state.selected - 1].zones)
    commit('updateRelays', payload[state.selected - 1].relays)
  }
}
