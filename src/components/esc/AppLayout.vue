<template>
  <app-page-layout
    class="app-layout"
    :is-top-bar.sync="isTopBar"
    :minimized.sync="minimized"
    :mobile-width="mobileWidth"
  >
    <app-navbar
      :style="colorTheme"
      class="app-layout__navbar"
      :is-top-bar.sync="isTopBar"
      :minimized.sync="minimized"
    />
    <app-topbar class="app-layout__topbar" v-if="isTopBar" />
    <div class="app-layout__container">
      <app-sidebar
        class="app-layout__sidebar"
        v-if="!isTopBar"
        :minimized="minimized"
      />
      <div
        class="app-layout__main"
        :class="{ 'app-layout__main--top': isTopBar }"
      >
        <!-- <div v-if="isDashboard" class="app-dashboard"></div> -->
        <main
          class="app-layout__main-layout layout fluid gutter--xl"
          slot="content"
          role="main"
        >
          <router-view />
        </main>
      </div>
    </div>
  </app-page-layout>
</template>

<script>
import AppPageLayout from './AppPageLayout'
import AppNavbar from './app-navbar/AppNavbar'
import AppTopbar from './app-topbar/AppTopbar'
import AppSidebar from './app-sidebar/AppSidebar'
import { originalTheme, corporateTheme, themeType1, themeType2, themeType3, themeType4, themeType5 } from 'vuestic-ui/src/services/themes'
import {
  ColorThemeActionsMixin,
  ColorThemeMixin,
} from '../../services/vuestic-ui'

export default {
  props: {},
  name: 'app-esc-layout',
  components: {
    AppPageLayout,
    AppNavbar,
    AppTopbar,
    AppSidebar,
  },
  mounted () {
  },
  data () {
    return {
      isTopBar: false,
      isDashboard: true,
      minimized: false,
      mobileWidth: 767,
      colorTheme: 'background-color: ' + this.$store.getters.paletteActive,
    }
  },
  inject: ['contextConfig'],
  mixins: [ColorThemeActionsMixin, ColorThemeMixin],
  // created () {
  //   if (this.$route.query && this.$route.query.theme === 'themeType1') {
  //     this.setTheme('themeType1')
  //   } else if (this.$route.query && this.$route.query.theme === 'themeType2') {
  //     this.setTheme('themeType2')
  //   } else if (this.$route.query && this.$route.query.theme === 'themeType3') {
  //     this.setTheme('themeType3')
  //   } else if (this.$route.query && this.$route.query.theme === 'themeType4') {
  //     this.setTheme('themeType4')
  //   } else if (this.$route.query && this.$route.query.theme === 'themeType5') {
  //     this.setTheme('themeType5')
  //   } else if (this.$route.query && this.$route.query.theme === 'corporateTheme') {
  //     this.setTheme('corporateTheme')
  //   }
  //   this.$root.$on('change-theme', this.setTheme)
  // },
  // beforeDestroy () {
  //   this.$root.$off('change-theme', this.setTheme)
  // },
  watch: {
    '$store.getters.paletteActive': function () {
      this.colorTheme = 'background-color: ' + this.$store.getters.paletteActive
    },
  },
  methods: {
    // setTheme (themeName) {
    //   const theme = themeName === ('corporate' || 'theme1') ? (corporateTheme || themeType1) : originalTheme
    //   this.setColors(theme.colors)
    //   Object.keys(theme.context).forEach(key => {
    //     this.contextConfig[key] = theme.context[key]
    //   })
    // },
  },
}
</script>

<style lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;

  &__container {
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    // TODO Probably there is a better way to achieve this.
    height: calc(100% - 65px);

    @include media-breakpoint-down(sm) {
      height: calc(100% - 110px);
    }
  }

  &__main {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    max-height: 100%;
    min-height: 100%;

    &--top {
    }

    &-layout {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      overflow: auto;
      box-sizing: border-box;
      min-height: 100%;
      margin: 0;
    }
  }
}
.app-dashboard {
  border-bottom: 6px solid red;
  background-color: lightgrey;
}
</style>
