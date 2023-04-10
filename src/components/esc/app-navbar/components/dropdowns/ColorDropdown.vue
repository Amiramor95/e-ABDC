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
            <b-button v-for="(colordata,k) in colorlist" :key="k" class="size"  :style="{background: colordata.THEME_ACTIVE_COLOR}" variant="secondary" @click="setTheme(colordata.COLOUR_SETTING_ID)">
            </b-button>
          </b-button-group>
        </b-list-group-item>
      </div>
    </b-list-group>

  </va-dropdown>
</template>

<script>
import VaIconColor from '../../../../../iconset/VaIconColor'
import * as servicesModule0 from "../../../../../app/module0/services02"

export default {
   mounted() {
     this.getAllColorSetting();
     this.getActiveColorSetting();
  },
  watch: {
  computedActiveColor: function(newVal, oldVal) {
  this.activeColorList = newVal;
  this.$store.commit("colorActive", this.activeColorList.THEME_ACTIVE_COLOR);
  this.$store.commit("colorPassive", this.activeColorList.THEME_PASSIVE_COLOR);
  this.$store.commit("colorText", this.activeColorList.THEME_TEXT_COLOR);
  }
  },
  computed: {
    // a computed getter
    computedActiveColor: function() {
      return this.activeColorList;
    }
  },
  inject: ['contextConfig'],
  components: {
    VaIconColor,
  },
  data () {
    return {
      palette: Object.values(this.$themes),
      colorTheme: this.$store.getters.paletteText,
      colorlist:[],
      activeColorList: [],
    }
  },
  methods: {
      getAllColorSetting: async function () {
      const response = await servicesModule0.getAllColorCode();
      this.colorlist = response;
    },
     getActiveColorSetting: async function () {
      const response = await servicesModule0.getActiveColorCode();
      //this.activeColorList = response;
     if(response){
        this.activeColorList = response;
        }
        else{
          this.$store.commit("colorActive", "#4F5E7F");
          this.$store.commit("colorPassive", "#8497B0");
          this.$store.commit("colorText", "#FFFFFF");
        }
    },
    async setTheme(data){
      const response = await servicesModule0.getColourById(data);
       this.selectedTheme = response.THEME_NAME
      this.$store.commit('colorActive', response.THEME_ACTIVE_COLOR)
      this.$store.commit('colorPassive', response.THEME_PASSIVE_COLOR)
      this.$store.commit('colorText', response.THEME_TEXT_COLOR)
      this.colorTheme = response.THEME_TEXT_COLOR

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
  margin: 2px !important;
  border-radius: 5px !important;
}
.customtext{
  font-weight: 600;
}
.btn-group button{
  border: 1px solid green;
}
</style>
