export function updatePage (state, payload) {
  state.pages = payload
}

export function updateTotalPage (state, payload) {
  state.totalPage = payload
}

export function updateItemsPerPage (state, payload) {
  state.itemsPerPage = payload
}

export function updateLog (state, payload) {
  state.items = payload
}

export function updateZone (state, payload) {
  state.zones = payload
}
