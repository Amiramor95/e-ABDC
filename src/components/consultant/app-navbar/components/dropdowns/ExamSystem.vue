<template>
  <va-dropdown
    class="exam-system"
    offset="0, 13px"
  >
    <i
      slot="anchor"
      class="fa fa-graduation-cap"
      :color="contextConfig.invertedColor ? $themes.gray : 'white'"
    />
  </va-dropdown>
</template>

<script>
// import VaIconColor from '../../../../../iconset/VaIconColor'

export default {
  inject: ['contextConfig'],
  components: {
  },
  data () {
    return {
      palette: Object.values(this.$themes),
    }
  },
  computed: {
    selectedTheme: {
      get () {
        return this.contextConfig.invertedColor ? 'corporate' : 'original'
      },
      set (themeName) {
        this.$root.$emit('change-theme', themeName)
      },
    },
    modeOptions () {
      return [
        {
          label: 'Dark',
          value: 'original',
        },
        {
          label: 'Light',
          value: 'corporate',
        },
      ]
    },
  },
}
</script>

<style lang="scss">

.exam-system {
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
