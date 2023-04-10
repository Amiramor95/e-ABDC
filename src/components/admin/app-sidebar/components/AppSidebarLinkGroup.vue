<template>
  <li
    class="app-sidebar-link-group"
    :class="computedClass"
  >
    <div v-if="!minimized">
    <va-modal
    v-model="showStaticModal"
    :title="notifyTitle"
    :message="menuNotification"
    no-dismiss
    cancel-text=""
    ok-text="OK"
    @ok="proceedToNotification"
    />

    
     
      <div @click.stop.prevent="toggleMenuItem(title)">
        <app-sidebar-link
          :icon="icon"
          :iconRight="`fa fa-angle-${expanded ? 'up' : 'down'}`"
          :title="title"
        />
      </div>

      <transition-expand>
        <ul
          class="app-sidebar-link-group__submenu"
          v-show="expanded"
          ref="linkGroupWrapper"
        >
          <slot/>
        </ul>
      </transition-expand>
    </div>

    <va-dropdown
      v-if="minimized"
      position="right"
      fixed
      :preventOverflow="false"
      ref="dropdown"
    >
      <div slot="anchor">
        <app-sidebar-link
          :icon="icon"
          iconRight="material-icons"
          iconRightContent="more_horiz"
          :activeByDefault="isActive"
          minimized
        />
      </div>
      <ul
        class="app-sidebar-link-group__submenu"
        :style="computedSubmenuColor"
      >
        <slot/>
      </ul>
    </va-dropdown>
  </li>



</template>

<script>
import TransitionExpand from './TransitionExpand'
import Vudal from "vudal";
import { colorShiftHsl, ColorThemeMixin } from '../../../../services/vuestic-ui'
import AppSidebarLink from './AppSidebarLink'
import * as servicesModule02 from "../../../../app/module0/services02";

export default {
  name: 'app-sidebar-link-group',
   mounted () {
    this.showStaticModal = false
  },
  mixins: [ColorThemeMixin],
  inject: ['contextConfig'],
  props: {
    icon: [String, Array],
    title: String,
    minimized: Boolean,
    activeByDefault: Boolean,
    children: Array,
    color: {
      type: String,
      default: 'secondary',
    },
  },
  components: {
    TransitionExpand,
    AppSidebarLink,
    Vudal,
  },
  data () {
    return {
      isActive: this.activeByDefault,
      isHovered: false,
      showStaticModal: false,
      menuNotification: '',
      notifyTitle: '',
      expanded: this.expanded,
      colorText: this.$store.getters.paletteText
    }
  },
  watch: {
    $route () {
      this.$refs.dropdown && this.$refs.dropdown.hide()
      this.updateActiveState()
    },
    minimized (value) {
      if (!value) {
        this.isActive = false
      } else {
        this.updateActiveState()
      }
    },
    '$store.getters.paletteText': function() {
      this.colorText = this.$store.getters.paletteText;
    }
  },
  methods: 
  {
    proceedToNotification () {
      this.$router.push('/fimm/page-under-maintenance')
    },
    async toggleMenuItem (title) {
        var usersidebar = JSON.parse(localStorage.getItem("user"));
        var user_type_sidebar = usersidebar.user_type;
        if(user_type_sidebar == 'fimm' || user_type_sidebar == 'DISTRIBUTOR')
        {
        const responsepagenoti = await servicesModule02.getMaintanceNotification(user_type_sidebar,title);
        if(responsepagenoti.length == 0)
        {
         this.expanded = !this.expanded;
         //this.showStaticModal = false;
        }
        else{
            this.expanded = this.expanded;
            var html = responsepagenoti[0].NOTIFICATION_DESC;
            var div = document.createElement("div");
            div.innerHTML = html;
            var text = div.textContent || div.innerText || "";
            this.notifyTitle = responsepagenoti[0].NOTIFICATION_TITLE;
            this.menuNotification = text;
             this.showStaticModal = true;
             
        }
        }
        else{
           this.expanded = !this.expanded;
        } 

    },
    updateHoverState () {
      this.isHovered = !this.isHovered
    },
    updateActiveState () {
      const active = this.children.some(item => item.name === this.$route.name)

      this.isActive = this.minimized ? active : false
      this.expanded = active
    },
  },
  computed: {
    computedClass () {
      return {
        'app-sidebar-link-group--minimized': this.minimized,
        'app-sidebar-link-group--isActive': this.isActive,
      }
    },
    computedLinkStyles () {
      if (this.isHovered || this.isActive) {
        return {
          color: this.colorText,
          backgroundColor: colorShiftHsl(this.$themes.secondary, { s: -13, l: 15 }).css,
          borderColor: this.isActive ? this.colorText : 'transparent',
        }
      }

      return {}
    },
    computedIconStyles () {
      if (this.isHovered || this.isActive) {
        return {
          color: this.colorText,
        }
      }

      return 'white'
    },

    computedSubmenuColor () {
      return {
        backgroundColor: this.contextConfig.invertedColor ? 'white' : this.$themes[this.color],
      }
    },
  },
}

</script>

<style lang="scss">

.app-sidebar-link-group {
  flex-direction: column;
  position: relative;
  display: flex;

  &__submenu {
    list-style: none;
    padding-left: 0;
    width: 100%;
    overflow: hidden;

    a {
      display: block;
      padding-left: 2.5rem;
    }

    .app-sidebar-link-group--minimized & {
      width: 10rem;
      border-radius: 0.375rem;
      margin-left: 2px;
      max-height: 80vh;
      padding: 0.375rem 0;
      overflow-y: auto;
      overflow-x: hidden;

      a {
        padding: 0.75rem 1rem;
        border: 0;
      }
    }
  }

  &--minimized {
    .va-dropdown {
      &__anchor {
        width: 100%;
      }
    }
  }
}
</style>
