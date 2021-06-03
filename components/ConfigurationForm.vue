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

                <!-- start name field -->
                <b-field
                  :type="colors[selectedColor[0]].type"
                  label="Nombre del espacio"
                  style="margin-top: 10px"
                >
                  <b-input
                    v-model="$v.workspace.$model"
                    placeholder="Ep: Mi espacio de trabajo"
                    @blur="$v.workspace.$touch()"
                  ></b-input>
                </b-field>
                <transition name="fade">
                  <p
                    v-if="$v.workspace.$error"
                    style="animation-duration: 200ms; margin-top: -10px; margin-bottom: 10px"
                  >
                    <Warning>
                      <span
                        v-show="$v.workspace.$error && !$v.workspace.required"
                      >
                        Debes especificar un nombre
                      </span>
                      <span
                        v-show="$v.workspace.$error && !$v.workspace.maxLength"
                      >
                        El nombre no debe exceder de 50 letras
                      </span>
                    </Warning>
                  </p>
                </transition>
                <!-- end name input -->

                <!-- start work url input -->
                <b-field
                  :type="colors[selectedColor[0]].type"
                  label="URL del espacio (direccion web)"
                >
                  <b-input
                    v-model="$v.workUrl.$model"
                    placeholder="Ep: mi.dominio"
                    @blur="$v.workUrl.$touch()"
                  ></b-input>
                </b-field>
                <transition name="fade">
                  <p
                    v-if="$v.workUrl.$error"
                    style="animation-duration: 200ms; margin-top: -10px"
                  >
                    <Warning>
                      <span v-show="$v.workUrl.$error && !$v.workUrl.required">
                        Debes especificar una dirección
                      </span>
                      <span
                        v-show="
                          $v.workUrl.$error &&
                            !$v.workUrl.url &&
                            workUrl.length !== 0
                        "
                      >
                        Debe especificar una dirección válida
                      </span>
                    </Warning>
                  </p>
                </transition>
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
                <!-- end work url input -->

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
                    :style="
                      selectedButton.indexOf(Number(button.id)) !== -1
                        ? `border: solid ${
                            colors[selectedColor[0]].value
                          } 1pt; box-shadow: 0 0 5px ${
                            colors[selectedColor[0]].value
                          }`
                        : ''
                    "
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
                <div
                  class="row is-flex flex-wrap-baseline"
                  style="margin-top: 10px"
                >
                  <div
                    v-for="color in colors"
                    :key="color.id"
                    class="column has-text-centered is-paddingless"
                    @click="chosenColor(color.id)"
                  >
                    <b-radio
                      v-show="selectedColor.indexOf(Number(color.id)) !== -1"
                      v-model="colors[selectedColor[0]].value"
                      :type="color.type"
                      :native-value="color.value"
                      size="is-large"
                      class="flex-wrap-baseline"
                    ></b-radio>
                    <ColorsLayout
                      :id="color.id"
                      :colors="color.value"
                      :chosen="selectedColor.indexOf(Number(color.id)) !== -1"
                      style="cursor: pointer; z-index: 1"
                    />
                  </div>
                </div>
                <!-- end color theme -->

                <!-- start workspace privacy -->
                <p style="margin-top: 10px; font-weight: bold">
                  Privacidad del espacio
                </p>
                <div class="row is-flex">
                  <div class="column">
                    <div
                      class="column pointerable"
                      :style="
                        radio === 'private'
                          ? `border: solid ${
                              colors[selectedColor[0]].value
                            } 1px; border-radius: 5px;
                            box-shadow: 0 0 5px ${
                              colors[selectedColor[0]].value
                            }`
                          : `border-radius: 5px; border: 2px solid #e4e4e4;`
                      "
                      @click="radio = 'private'"
                    >
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
                  <div class="column">
                    <div
                      class="column pointerable"
                      :style="
                        radio === 'public'
                          ? `border: solid ${
                              colors[selectedColor[0]].value
                            } 1px; border-radius: 5px;
                            box-shadow: 0 0 10px ${
                              colors[selectedColor[0]].value
                            }`
                          : `border-radius: 5px; border: 2px solid #e4e4e4;`
                      "
                      @click="radio = 'public'"
                    >
                      <b-radio
                        v-model="radio"
                        native-value="public"
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
                    :disabled="
                      imageData.length === 0 ||
                        selectedButton.length === 0 ||
                        $v.$invalid
                    "
                    style="font-size: 14px; padding: 1.5rem; margin-right: 10px"
                    @click="notifyUser"
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
import { required, maxLength } from 'vuelidate/lib/validators'

// Components
import ColorsLayout from '~/components/ColorsLayout'
import Warning from '~/components/Warning'
import validators from '~/utils/validators'
const url = validators.urlValidator
export default {
  components: { Warning, ColorsLayout },
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
      ],
      currentColor: null
    }
  },
  validations: {
    workspace: {
      required,
      maxLength: maxLength(25)
    },
    workUrl: {
      required,
      url
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
    },
    notifyUser() {
      this.$buefy.dialog.alert({
        message: 'Se guardaron los datos',
        type: this.colors[this.selectedColor[0]].type
      })
      console.log('LOGO IMAGEN EN base64: ' + this.imageData)
      console.log('NOMBRE DEL ESPACIO: ' + this.workspace)
      console.log('URL DEL ESPACIO: ' + this.workUrl)
      console.log(
        'CANTIDAD DE PERSONAS: ' + this.buttons[this.selectedButton[0]].value
      )
      console.log('COLOR DEL TEMA: ' + this.colors[this.selectedColor[0]].value)
      if (this.radio === 'private')
        console.log('PRIVACIDAD DEL ESPACIO: privado')
      else console.log('PRIVACIDAD DEL ESPACIO: publico')
    }
  }
}
</script>

<style lang="stylus" scoped>

.file-icon
  margin-right 0.5rem !important

.setPosition
  display: inline-block
  margin-right 0.5rem !important

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
