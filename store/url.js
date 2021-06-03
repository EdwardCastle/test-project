export const state = () => ({
  url: 'mi_dominio.plankton'
})

export const mutations = {
  set(state, url) {
    state.url = url
  }
}
export const getters = {
  get: state => {
    return state.url
  }
}
