export function updatePage (state, payload) {
  state.pages.page = payload
}

export function updateDocs (state, payload) {
  state.pages.totalPages = Number(payload.totalPages)
  state.pages.itemsPerPage = Number(payload.itemsPerPage)
  // state.pages.limit = payload.limit
  state.pages.pagingCounter = Number(payload.pagingCounter)
  state.pages.totalDocs = Number(payload.totalDocs)
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

export function updateSearch (state, payload) {
  state.logs.search = payload
}

export function updateDateEnable (state, payload) {
  state.date.enable = payload
}

export function updateDateStart (state, payload) {
  state.date.start = payload
}

export function updateDateEnd (state, payload) {
  state.date.end = payload
}
