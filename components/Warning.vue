<template>
  <p>
    <font-awesome-icon :icon="['fas', 'exclamation']" />
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
  }
}
</script>

<style scoped></style>
