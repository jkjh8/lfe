export function nickname (state) {
  if (state.user && state.user.name) {
    return state.user.name.substring(0, 1)
  } else {
    return ''
  }
}

export function user (state) {
  return state.user
}
