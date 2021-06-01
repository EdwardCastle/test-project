<template>
  <div>
    <div
      :class="`column ${chosen ? 'chosen' : ''}`"
      :style="`background-color: ${colors}; border-radius: 50%`"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: null
    },
    colors: {
      type: String,
      default: null
    },
    chosen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.chosen
  border solid 1pt red !important
</style>
