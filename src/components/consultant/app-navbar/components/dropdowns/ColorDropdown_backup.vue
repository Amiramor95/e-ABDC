<template>
  <va-dropdown class="color-dropdown" offset="0, 13px">
    <va-icon-color
      slot="anchor"
      class="color-dropdown__icon"
      :color="colorTheme"
    />
    <b-list-group>
      <div>
        <b-list-group-item>
          <div style="align:center;">
            <div style="align:center;">
          <va-badge
          class="color-picker-dropdown__badge"
          color="primary"
          slot="anchor"
        >
          Select Theme
        </va-badge>
          </div>
          <!-- <p class="customtext" size="sm">Select Themes : </p> -->
          </div>
          <b-button-group style="align:center;" size="sm">
            <b-button class="grey size" variant="secondary" @click="setTheme1"> </b-button>
            <b-button class="peach size" variant="warning" @click="setTheme2"> </b-button>
            <b-button class="brown size" variant="primary" @click="setTheme3" > </b-button>
            <b-button class="blue size" variant="info" @click="setTheme4" > </b-button>
            <b-button class="pink size" @click="setTheme5"> </b-button>
            <b-button class="maroon size" @click="setTheme6"> </b-button>
          </b-button-group>

          <!-- <va-button-toggle
        outline
        small
        v-model="selectedTheme"
        :options="modeOptions"
        style="max-width: 100%;"
      />
      <va-dropdown class="color-picker-dropdown mt-1 mb-1">
        <va-badge
          class="color-picker-dropdown__badge"
          color="primary"
          slot="anchor"
        >
          Select Theme
        </va-badge>
        <va-color-picker-input
          outline
          small
          class="my-1"
          :palette="palette"
          v-model="$themes.primary"
          :options="modeOptions"
          style="max-width: 100%;"
        />
      </va-dropdown> -->
        </b-list-group-item>
      </div>
    </b-list-group>

  </va-dropdown>
</template>

<script>
import VaIconColor from '../../../../../iconset/VaIconColor'

export default {
  inject: ['contextConfig'],
  components: {
    VaIconColor,
  },
  data () {
    return {
      palette: Object.values(this.$themes),
      colorTheme: this.$store.getters.paletteText,
    }
  },
  // watch: {
  //   selectedTheme(value) {
  //       if(value == 'original'){
  //           this.$store.commit("colorActive", '#4F5E7F');
  //           this.$store.commit("colorPassive", '#8497B0');
  //           this.$store.commit("colorText", '#FFFFFF');

  //       }else{
  //           this.$store.commit("colorActive", '#f19259');
  //           this.$store.commit("colorPassive", '#f5e1da');
  //           this.$store.commit("colorText", '#000000');

  //       }
  //   }
  // },
  // watch: {
  //   '$themes.primary': function (val) {
  //     this.$store.commit("colorText", val);
  //     this.colorTheme = this.$store.getters.paletteText;
  //   }
  // },
  //    watch: {
  //   '$store.getters.paletteText': function() {
  //     this.colorTheme = 'color: '+this.$store.getters.paletteText;
  //   }
  // },
  methods: {
    setTheme1 () {
      this.selectedTheme = 'original'
      this.$store.commit('colorActive', '#4F5E7F')
      this.$store.commit('colorPassive', '#8497B0')
      this.$store.commit('colorText', '#FFFFFF')
      this.colorTheme = '#FFFFFF'
    },
    setTheme2 () {
      this.selectedTheme = 'corporate'
      this.$store.commit('colorActive', '#f19259')
      this.$store.commit('colorPassive', '#f5e1da')
      this.$store.commit('colorText', '#000000')
      this.colorTheme = '#000000'
    },
    setTheme3 () {
      this.$store.commit('colorActive', '#93381F')
      this.$store.commit('colorPassive', '#591C0B')
      this.$store.commit('colorText', '#FFFFFF')
      this.colorTheme = '#FFFFFF'
      this.selectedTheme = 'theme3'
    } ,
    setTheme4 () {
      this.$store.commit('colorActive', '#002060')
      this.$store.commit('colorPassive', '#B4C6E7')
      this.$store.commit('colorText', '#FFFFFF')
      this.colorTheme = '#FFFFFF'
      this.selectedTheme = 'theme4'
    },
    setTheme5 () {
      this.$store.commit('colorActive', '#ec7676')
      this.$store.commit('colorPassive', '#FFFFFF')
      this.$store.commit('colorText', '#000000')
      this.colorTheme = '#000000'
      this.selectedTheme = 'theme5'
    },
    setTheme6 () {
      this.$store.commit('colorActive', '#860e0e')
      this.$store.commit('colorPassive', '#EF1F1F')
      this.$store.commit('colorText', '#FFFFFF')
      this.colorTheme = '#FFFFFF'
      this.selectedTheme = 'theme6'
    },
  },
  computed: {
    // selectedTheme: {
    //   get () {
    //     return this.contextConfig.invertedColor ? 'corporate' : 'original'
    //   },
    //   set (themeName) {
    //     this.$root.$emit('change-theme', themeName)
    //   },
    // },
    modeOptions () {
      return [
        {
          label: 'Theme 1',
          value: 'original',
        },
        {
          label: 'Theme 2',
          value: 'corporate',
        },
        {
          label: 'Theme 3',
          value: 'theme3',
        },        
        {
          label: 'Theme 4',
          value: 'theme4',
        },
        {
          label: 'Theme 5',
          value: 'theme5',
        },
        {
          label: 'Theme 6',
          value: 'theme6',
        }
      ]
    },
  },
}
</script>

<style lang="scss">
.color-dropdown {
  cursor: pointer;

  &__icon {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__content {
    background-color: $dropdown-background;
    box-shadow: $gray-box-shadow;
    border-radius: 0.5rem;

    .color-picker-dropdown {
      display: flex;
      justify-content: center;

      &__badge {
        /* Badges have 0.5rem to the right by default */
        margin-left: 0.5rem;
      }
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}

.button-restore {
  display: flex;
  margin: 0.375rem auto;
}
.grey{
  background-color: #4F5E7F !important;
}
.peach{
  background-color: #f19259 !important;
}
.brown{
  background-color: #93381F !important;
}
.blue{
  background-color: #002060 !important;
}
.pink{
  background-color: #ec7676 !important;
}
.maroon{
  background-color: #860e0e !important;
}
.size{
  height: 2rem;
  width: 2rem !important;
}
.customtext{
  font-weight: 600;
}
.btn-group button{
  border: 1px solid green;
}
</style>
