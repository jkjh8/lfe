export function localsName (state) {
  const localNames = ['방송센터']
  state.locals.forEach(element => {
    localNames.push(element.name)
  })
  return localNames
}
