export function updateLocals (state, payload) {
  state.locals = payload
}

export function updateZones (state, payload) {
  state.zones = payload
}

export function updateRelays (state, payload) {
  state.relays = payload
}

export function updateRelay (state, payload) {
  state.relays[payload.id].name = payload.name
  state.relays[payload.id].code = payload.code
  state.relays[payload.id].value = payload.value
}

export function updateSelected (state, payload) {
  state.selected = payload
  state.zones = state.locals[payload - 1].zones
  state.relays = state.locals[payload - 1].zones
}
