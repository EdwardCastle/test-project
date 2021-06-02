<template>
  <section>
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column has-text-left is-7" style="border: solid blue">
              <!-- start form -->
              <form @submit.stop.prevent="">
                <p style="font-size: 18px; font-weight: bold">Configuración</p>

                <!-- start logo -->
                <p
                  style="font-size: 14px; margin-bottom: 10px; margin-top: 10px; font-weight: bold"
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
                  </article>

                  <div>
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
                <!-- end logo -->

                <!-- start fields -->
                <b-field
                  :type="colors[selectedColor[0]].type"
                  label="Nombre del espacio"
                  style="margin-top: 10px"
                >
                  <b-input
                    v-model="workspace"
                    placeholder="Ep: Mi espacio de trabajo"
                  ></b-input>
                </b-field>
                <b-field
                  :type="colors[selectedColor[0]].type"
                  label="URL del espacio (direccion web)"
                >
                  <b-input
                    v-model="workUrl"
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
                <!-- end fields -->

                <!-- start number of people -->
                <p style="font-weight: bold; margin-top: 20px">
                  ¿Cuántas personas trabajarán contigo, incluyendote a ti?
                </p>
                <div
                  v-for="button in buttons"
                  :key="'person -' + button.id"
                  class="setPosition"
                  style="margin-top: 10px; margin-right: 10px"
                  @click="chosenButton(button.id)"
                >
                  <b-button
                    outlined
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
                <!-- end of number of people -->
                <br />

                <!-- start theme color -->
                <p style="margin-top: 10px; font-weight: bold">
                  Color del tema
                </p>
                <div class="row is-flex flex-wrap-center">
                  <div
                    v-for="color in colors"
                    :key="color.id"
                    class="column is-paddingless"
                    @click="chosenColor(color.id)"
                  >
                    <ColorsLayout
                      :id="color.id"
                      :colors="color.value"
                      :chosen="selectedColor.indexOf(Number(color.id)) !== -1"
                      style="cursor: pointer"
                    />
                  </div>
                </div>
                <!-- end color theme -->

                <!-- start workspace privacy -->
                <p style="margin-top: 20px; font-weight: bold">
                  Privacidad del espacio
                </p>
                <div class="row is-flex">
                  <div class="column" style="border: solid red 1pt">
                    <div>
                      <b-radio
                        v-model="radio"
                        native-value="private"
                        :type="colors[selectedColor[0]].type"
                      >
                        Privado
                      </b-radio>
                      <p class="letter">
                        El contenido sera visible solo para ti y los miembros de
                        tu Organizacion
                      </p>
                    </div>
                  </div>
                  <div class="column" style="border: solid red 1pt">
                    <div>
                      <b-radio
                        v-model="radio"
                        native-value="publico"
                        :type="colors[selectedColor[0]].type"
                      >
                        Publico
                      </b-radio>
                      <p class="letter">
                        Cualquiera con el vinculo podra ver la actividad de tu
                        organizacion
                      </p>
                    </div>
                  </div>
                </div>
                <!-- end workspace privacy -->

                <!-- start form buttons -->
                <div style="margin-top: 20px">
                  <b-button
                    :type="colors[selectedColor[0]].type"
                    disabled
                    style="font-size: 14px; padding: 1.5rem; margin-right: 10px"
                    >Guardar cambios</b-button
                  >
                  <b-button style="font-size: 14px; padding: 1.5rem"
                    ><b>Descartar</b></b-button
                  >
                </div>
                <!--end form buttons -->
              </form>
              <!-- end form -->
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
      selectedColor: [9],
      selectedButton: [],
      photo: null,
      imageData: '',
      workspace: null,
      workUrl: null,
      radio: 'private',
      file: {},
      buttons: [
        { id: 0, value: 'Solo yo' },
        { id: 1, value: '2-10' },
        { id: 2, value: '11-25' },
        { id: 3, value: '26-50' },
        { id: 4, value: '51-100' },
        { id: 5, value: '500 +' }
      ],
      colors: [
        { id: 0, value: '#39B0FF', type: 'is-blue' },
        { id: 1, value: '#04B58B', type: 'is-light-green' },
        { id: 2, value: '#3E9C4B', type: 'is-dark-green' },
        { id: 3, value: '#B6BC00', type: 'is-yellow' },
        { id: 4, value: '#E59100', type: 'is-light-orange' },
        { id: 5, value: '#E55C00', type: 'is-dark-orange' },
        { id: 6, value: '#EE1F50', type: 'is-red' },
        { id: 7, value: '#D6198A', type: 'is-light-purple' },
        { id: 8, value: '#B321F1', type: 'is-dark-purple' },
        { id: 9, value: '#48B5FE', type: 'is-primary' }
      ]
    }
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
  margin-right 0.5rem !importantb

.setPosition:hover
  cursor pointer

img.preview
  height 100%
  width 100%
  border-radius 50%

label
  cursor pointer
  background #FFFFFF 0 0 no-repeat padding-box
  border-radius 5px
  opacity 1
  width 105px
  height 32px
</style>
