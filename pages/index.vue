<template>
  <div class="hero">
    <div class="hero-body is-fullheight">
      <div class="columns">
        <div
          class="column has-text-left-desktop is-5-desktop has-text-centered-mobile is-12-mobile"
        >
          <ConfigurationForm />
        </div>
        <div class="column is-hidden-tablet is-hidden-mobile"></div>
        <div
          class="column is-paddingless is-hidden-mobile is-hidden-tablet-only has-text-right"
        >
          <Preview style="margin-top: 10rem" />
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
