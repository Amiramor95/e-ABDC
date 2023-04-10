<template>
  <nav class="app-navbar" :style="navbarStyle">
    <div class="app-navbar__content row">
      <div class="app-navbar__menu-container">
        <va-icon-menu
          class="app-navbar__menu"
          v-if="!minimized && !isTopBar"
          @click.native="$emit('update:minimized', !minimized)"
          :color="colorText"
        />
        <!-- <va-icon-menu
          class="app-navbar__menu"
          v-if="!minimized && !isTopBar"
          @click.native="$emit('update:minimized', !minimized)"
          :color="contextConfig.invertedColor ? $themes.gray : 'black'"
        /> -->

        <va-icon-menu-collapsed
          class="app-navbar__menu"
          v-if="minimized && !isTopBar"
          @click.native="$emit('update:minimized', !minimized)"
          :color="this.colorText"
        />
        <router-link class="app-navbar__logo mr-3" to="/">
          <img src="./assets/logo01.png" style="position: relative; top: -10px;"/>
        </router-link>
        <p :style="colorTextStyle" style="font-size: 35px; position: relative; top: -13px;"><b>LFCS</b></p>
      </div>
      <app-navbar-actions
        class="app-navbar__actions md5 lg4"
        :user-name="userName"
        :is-top-bar.sync="isTopBarProxy"
      />
    </div>
    <div class="app-navbar__shape" :style="shapeStyle"></div>
  </nav>
</template>

<script>
// import VaIconVuestic from '../../../iconset/VaIconVuestic'
import VaIconMenu from '../../../iconset/VaIconMenu'
import VaIconMenuCollapsed from '../../../iconset/VaIconMenuCollapsed'
import AppNavbarActions from './components/AppNavbarActions'
import { colorShiftHsl, ColorThemeMixin } from '../../../services/vuestic-ui'

export default {
  name: 'app-navbar',
  mixins: [ColorThemeMixin],
  inject: ['contextConfig'],
  components: {
    // VaIconVuestic,
    VaIconMenu,
    VaIconMenuCollapsed,
    AppNavbarActions,
  },
  props: {
    isTopBar: {
      type: Boolean,
      required: true,
    },
    minimized: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      userName: '',

      userID: '',
      colorText: this.$store.getters.paletteText,
      colorTextStyle: 'color: white',
    }
  },
  mounted () {
    this.userdata = JSON.parse(localStorage.getItem('user'))
    this.getUsername()
  },
  watch: {
    '$store.getters.paletteText': function () {
      this.colorText = this.$store.getters.paletteText
      this.colorTextStyle = 'color: white'// '+this.$store.getters.paletteText
    },
    '$store.getters.palettePassive': function () {
      this.borderTopColor = this.$store.getters.palettePassive
    },
  },
  methods: {
    getUsername: async function () {
      this.userName = JSON.parse(JSON.stringify(this.$store.getters.userDetail)).name
    },

  },
  computed: {
    isTopBarProxy: {
      get () {
        return this.isTopBar
      },
      set (isTopBar) {
        this.$emit('update:isTopBar', isTopBar)
      },
    },
    minimizedProxy: {
      get () {
        return this.minimized
      },
      set (minimized) {
        this.$emit('update:minimized', minimized)
      },
    },
    navbarStyle () {
      const style = {
        backgroundColor: 'white',
        // display:none,
      }

      if (this.contextConfig.gradient) {
        style.backgroundColor = this.$store.getters.paletteActive
      }

      if (this.contextConfig.shadow === 'sm') {
        style.boxShadow = !this.isTopBar
          ? '0 2px 3px 0 rgba(52, 56, 85, 0.25)'
          : null
      }
      return style
    },

    shapeStyle () {
      return {
        borderTopColor: this.$store.getters.palettePassive,
      }
    },

  },
}
</script>

<style lang="scss">
$nav-border-side-width: 3.1875rem;

.app-navbar {
  background-color: rgb(79, 94, 127);
  transition: background-color 0.3s ease; /* sidebar's bg color transitions as well -> consistency */
  display: flex;
  padding: 1rem 1rem;
  z-index: 1;

  &__content {
    z-index: 1;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    flex: 1 1 auto;
  }

  &__center {
    display: flex;
    margin-left: 3rem;
    justify-content: space-between;
    align-items: center;
  }

  &__text {
    color: $lighter-gray;
  }

  &__button {
    width: 10rem;
    margin: 0 0 0 1rem !important;
    font-weight: bold;

    .va-button__content__icon-left.fa-github {
      font-size: 1.5rem;
    }
  }

  &__menu {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    margin-right: 1.5rem;
  }

  &__menu-container {
    display: flex;
    flex-wrap: nowrap;
    height: 1.5rem;
  }

  &__logo {
    width: 7rem;
    height: 170%;
    align-items: center;

    & * {
      max-height: 100%;
      max-width: 100%;
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  &__actions {
    justify-content: flex-end;
  }

  &__mailto-link:hover {
    filter: brightness(85%);
  }

  &__shape {
    transition: border-top-color 0.3s ease; /* sidebar's bg color transitions as well -> consistency */
    width: 33%;
    max-width: 467px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    border-top: 4.215rem solid transparent; // hardcoded size
    border-left: $nav-border-side-width solid transparent;
    border-right: $nav-border-side-width solid transparent;
    height: 0;
    border-top-color: rgb(132, 151, 176);
  }

  @include media-breakpoint-down(lg) {
    &__button {
      display: none !important;
    }
  }

  @include media-breakpoint-down(md) {
    &__center {
      display: none !important;
    }
  }

  @include media-breakpoint-down(sm) {
    &__content {
      align-items: flex-end;
    }

    &__actions {
      margin-top: 1.25rem;
      justify-content: space-between;
      width: 100%;
    }

    &__shape {
      display: none;
    }
  }
}
.text{
  color: white;
  font-size: 25px;
  white-space: nowrap;
}
</style>
