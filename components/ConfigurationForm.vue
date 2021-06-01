<template>
  <section>
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered is-variable is-8">
            <div class="column has-text-left is-6">
              {{ selectedButton[0] }}
              <form @submit.stop.prevent="">
                <p>Configuración</p>
                <p>Logo del espacio</p>
                <div class="flex-wrap-center">
                  <article class="media">
                    <figure class="media-left">
                      <p
                        class="image is-64x64"
                        style="background-color: #d7dbeb; border-radius: 50%"
                      >
                        <img
                          v-if="imageData.length > 0"
                          class="is-rounded preview"
                          :src="imageData"
                        />
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content"></div>
                    </div>
                  </article>
                  <div class="file-upload-form">
                    <input
                      id="upload-photo"
                      ref="file"
                      type="file"
                      accept="image/*"
                      @change="previewImage($event)"
                    />
                    <label for="upload-photo" class="button">
                      <b-icon class="file-icon" icon="upload"></b-icon>Subir
                      logo
                    </label>
                  </div>
                </div>
                <b-field label="Nombre del espacio">
                  <b-input
                    v-model="form.workspace"
                    placeholder="Ep: Mi espacio de trabajo"
                  ></b-input>
                </b-field>
                <b-field label="URL del espacio (direccion web)">
                  <b-input
                    v-model="form.workUrl"
                    placeholder="Ep: mi.dominio"
                  ></b-input>
                </b-field>
                <p>
                  ¿Cuántas personas trabajarán contigo, incluyendote a ti?
                </p>
                <div
                  v-for="button in buttons"
                  :key="'person -' + button.id"
                  class="setPosition"
                  @click="chosenButton(button.id)"
                >
                  <b-button
                    :focused="selectedButton.indexOf(Number(button.id)) !== -1"
                    >{{ button.value }}</b-button
                  >
                </div>
                <br />
                <div
                  v-for="color in colors"
                  :key="color.id"
                  class="setPosition"
                  @click="chosenColor(color.id)"
                >
                  <ColorsLayout
                    :id="color.id"
                    :colors="color.value"
                    :chosen="selectedColor.indexOf(Number(color.id)) !== -1"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Components
import ColorsLayout from '~/components/ColorsLayout'
export default {
  components: { ColorsLayout },
  data() {
    return {
      selectedColor: [],
      selectedButton: [],
      photo: null,
      imageData: '',
      form: {
        workspace: null,
        workUrl: null
      },
      file: {},
      dropFiles: [],
      buttons: [
        { id: 0, value: 'Solo yo' },
        { id: 1, value: '2-10' },
        { id: 2, value: '11-25' },
        { id: 3, value: '26-50' },
        { id: 4, value: '51-100' },
        { id: 5, value: '500 +' }
      ],
      colors: [
        { id: 0, value: 'black' },
        { id: 1, value: 'green' },
        { id: 3, value: 'blue' },
        { id: 4, value: 'blue' },
        { id: 5, value: 'blue' },
        { id: 6, value: 'blue' },
        { id: 7, value: 'red' },
        { id: 8, value: 'blue' },
        { id: 9, value: 'blue' },
        { id: 10, value: 'blue' }
      ]
    }
  },
  beforeMount() {
    this.selectedColor.push(10)
  },
  methods: {
    chosenColor(id) {
      this.selectedColor = []
      this.selectedColor.push(Number(id))
    },
    chosenButton(id) {
      this.selectedButton = []
      this.selectedButton.push(Number(id))
    },
    previewImage() {
      const input = event.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.file-icon
  margin-right 0.5rem !important

.setPosition
  display: inline-block

.setPosition:not(:last-child)
  margin-right 20px

.setPosition:hover
  cursor pointer

img.preview
  height 100%
  width 100%
  border-radius 50%

.file-upload-form

label
  cursor pointer
</style>
