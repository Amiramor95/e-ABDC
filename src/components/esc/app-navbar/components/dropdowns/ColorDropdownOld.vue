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
          <b-button-group style="align:center;" size="sm">
            <b-button variant="secondary" @click="setTheme1">Theme 1</b-button>
            <b-button variant="warning" @click="setTheme2">Theme 2</b-button>
          </b-button-group>
      <va-chip flat>Select Theme</va-chip>
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
      valueColor: ""
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
</style>