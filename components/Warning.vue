<template>
  <p class="level-left">
    <img
      :src="exclamationIcon"
      alt=""
      style="width: 17px; height: 17px; margin-right: 10px"
    />
    <slot></slot>
  </p>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    exclamationIcon() {
      return '/img/exclamation.svg'
    }
  }
}
</script>

<style scoped lang="stylus">
.level-left
  align-items unset !important
</style>
