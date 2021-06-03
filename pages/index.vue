<template>
  <div class="hero">
    <div class="hero-body is-fullheight">
      <div class="columns">
        <div
          class="column has-text-left-desktop is-4-desktop has-text-centered-mobile is-12-mobile is-offset-1-desktop"
        >
          <ConfigurationForm />
        </div>
        <div class="column is-hidden-tablet-only is-hidden-mobile"></div>
        <div class="column is-hidden-mobile is-hidden-tablet-only">
          <Preview />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import ConfigurationForm from '~/components/ConfigurationForm'
import Preview from '~/components/Preview'
export default {
  components: { ConfigurationForm, Preview }
}
</script>
