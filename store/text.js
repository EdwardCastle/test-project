export const state = () => ({
  text: 'Mi Espacio'
})

export const mutations = {
  set(state, text) {
    state.text = text
  }
}
export const getters = {
  get: state => {
    return state.text
  }
}
