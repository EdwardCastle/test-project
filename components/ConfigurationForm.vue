<template>
  <section>
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column has-text-left is-7" style="border: solid blue">
              <form @submit.stop.prevent="">
                <p style="font-size: 18px">Configuración</p>
                <p
                  style="font-size: 14px; margin-bottom: 10px; font-weight: bold"
                >
                  Logo del espacio
                </p>
                <div class="flex-wrap-center">
                  <article class="media">
                    <figure class="media-left">
                      <p
                        class="image is-64x64"
                        style="background: #343C4A; border-radius: 34px; opacity: 1;"
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
                    <label
                      for="upload-photo"
                      class="button"
                      style="font-size: 14px"
                    >
                      <b-icon class="file-icon" icon="upload"></b-icon>Subir
                      logo
                    </label>
                  </div>
                  <div style="margin-top: 10px">
                    <p class="letter">
                      Este logo identificará tu espacio entre el resto.
                    </p>
                    <p class="letter" style="margin-top: 10px">
                      Preferiblemente sube una imagen .png igual o superior a
                      65px a 72ppp con fondo transparente.
                    </p>
                  </div>
                </div>
                <b-field label="Nombre del espacio" style="margin-top: 10px">
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
                <p class="letter">
                  Puedes cambiar la URL de tu espacio (dirección web) en
                  cualquier momento, pero por cortesía hacia tus compañeros de
                  trabajo y otros usuarios de Plankton, porfavor no lo hagas muy
                  seguido :)
                </p>
                <p class="letter" style="margin-top: 10px">
                  Nota: Si cambias la URL de tu espacio, Plankton
                  automáticamente redireccionará desde la antigua dirección
                  hacia la nueva. En cualquier caso, deberías asegurarte que tus
                  compañeros sepan acerca del cambio porque la dirección
                  anterior pasará a estar libre y puede ser usada por otro
                  espacio en el futuro.
                </p>
                <p style="font-weight: bold; margin-top: 20px">
                  ¿Cuántas personas trabajarán contigo, incluyendote a ti?
                </p>
                <div
                  v-for="button in buttons"
                  :key="'person -' + button.id"
                  class="setPosition"
                  style="margin-top: 10px"
                  @click="chosenButton(button.id)"
                >
                  <b-button
                    :focused="selectedButton.indexOf(Number(button.id)) !== -1"
                    ><b style="font-size: 14px">{{ button.value }}</b></b-button
                  >
                </div>
                <p class="letter" style="margin-top: 10px">
                  Este logo identificará tu espacio entre el resto.
                </p>
                <p class="letter" style="margin-top: 10px">
                  Preferiblemente sube una imagen .png igual o superior a 65px a
                  72ppp con fondo transparente.
                </p>
                <br />
                <p style="margin-top: 10px; font-weight: bold">
                  Color del tema
                </p>
                <div
                  v-for="color in colors"
                  :key="color.id"
                  class="setPosition"
                  style="margin-top: 10px"
                  @click="chosenColor(color.id)"
                >
                  <ColorsLayout
                    :id="color.id"
                    :colors="color.value"
                    :chosen="selectedColor.indexOf(Number(color.id)) !== -1"
                  />
                </div>
                <p style="margin-top: 20px; font-weight: bold">
                  Privacidad del espacio
                </p>
                <div class="row is-flex is-marginless">
                  <div class="column" style="border: solid red 1pt">asd</div>
                  <div class="column" style="border: solid red 1pt">zxc</div>
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
        { id: 0, value: '#39B0FF' },
        { id: 1, value: '#04B58B' },
        { id: 3, value: '#3E9C4B' },
        { id: 4, value: '#B6BC00' },
        { id: 5, value: '#E59100' },
        { id: 6, value: '#E55C00' },
        { id: 7, value: '#EE1F50' },
        { id: 8, value: '#D6198A' },
        { id: 9, value: '#B321F1' },
        { id: 10, value: '#48B5FE' }
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
  margin-right 20.6px

.setPosition:hover
  cursor pointer

img.preview
  height 100%
  width 100%
  border-radius 50%

.file-upload-form
label
  cursor pointer
  background #FFFFFF 0 0 no-repeat padding-box
  border 1px solid #E4E4E4
  border-radius 5px
  opacity 1
  width 105px
  height 32px
</style>
