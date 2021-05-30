export function updatePage (state, payload) {
  state.pages.page = payload
}

export function updateDocs (state, payload) {
  state.pages.totalPages = payload.totalPages
  state.pages.itemsPerPage = payload.itemsPerPage
  // state.pages.limit = payload.limit
  state.pages.pagingCounter = payload.pagingCounter
  state.pages.totalDocs = payload.totalDocs
  state.logs.items = payload.docs
}

export function updatelimit (state, payload) {
  state.pages.limit = payload
}

export function loading (state, payload) {
  state.pages.loading = payload
}

export function updateLog (state, payload) {
  state.logs.items = payload
}

export function updateZone (state, payload) {
  state.logs.zones = payload
}
