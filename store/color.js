export const state = () => ({
  color: '#48B5FE'
})

export const mutations = {
  set(state, color) {
    state.color = color
  }
}
export const getters = {
  get: state => {
    return state.color
  }
}
