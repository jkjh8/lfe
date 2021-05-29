export function updatePage (state, payload) {
  state.pages.page = payload
}

export function updateTotalPage (state, payload) {
  state.pages.totalPage = payload
}

export function updatelimit (state, payload) {
  state.pages.limit = payload
}

export function updateItemsPerPage (state, payload) {
  state.pages.itemsPerPage = payload
}

export function updateLog (state, payload) {
  state.logs.items = payload
}

export function updateZone (state, payload) {
  state.logs.zones = payload
}
