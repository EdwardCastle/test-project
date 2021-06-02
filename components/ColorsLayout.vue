<template>
  <div>
    <div
      :class="`column flex-wrap-center`"
      :style="
        !chosen
          ? `background-color: ${colors}; border-radius: 23px; height: 45px; width: 45px`
          : `background-color: ${colors}; border-color ${colors}; border-radius: 23px; height: 45px; width: 45px; box-shadow: 0 0 0 0.2em; opacity: 0.5`
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
  }
}
</script>

<style lang="stylus" scoped></style>
