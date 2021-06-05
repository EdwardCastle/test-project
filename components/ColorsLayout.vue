<template>
  <div>
    <div
      v-if="!isMobile"
      class="`column flex-wrap-center`"
      :style="
        !chosen
          ? `background-color: ${colors}; border-radius: 23px; height: 45px; width: 45px`
          : ``
      "
    ></div>
    <div
      v-else
      class="`column flex-wrap-center`"
      :style="
        !chosen
          ? `background-color: ${colors}; border-radius: 23px; height: 20px; width: 20px`
          : ``
      "
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
  },
  computed: {
    isMobile() {
      return this.$screen.width <= 768
    }
  }
}
</script>

<style lang="stylus" scoped></style>
