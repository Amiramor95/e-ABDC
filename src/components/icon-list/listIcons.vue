<template>
  <div>
    <br />
    <b-form-group label="SELECT MENU ICON" v-slot="{ ariaDescribedby }">
      <horizontal-scroll>
        <div style="margin: 10px 10px 10px 10px;">
          <b-form-radio-group
            id="radio-slots"
            v-model="selectedIcon1"
            :aria-describedby="ariaDescribedby"
            name="radio-options-slots"
          >
            <b-form-radio
              v-for="icon in icons1"
              :key="icon"
              name="some-radios"
              :value="icon"
            >
              <i :class="icon"></i>
            </b-form-radio>
          </b-form-radio-group>
          <br />
          <b-form-radio-group
            id="radio-slots"
            v-model="selectedIcon2"
            :aria-describedby="ariaDescribedby"
            name="radio-options-slots"
          >
            <b-form-radio
              v-for="icon in icons2"
              :key="icon"
              name="some-radios"
              :value="icon"
            >
              <i :class="icon"></i>
            </b-form-radio>
          </b-form-radio-group>
          <br />
          <b-form-radio-group
            id="radio-slots"
            v-model="selectedIcon3"
            :aria-describedby="ariaDescribedby"
            name="radio-options-slots"
          >
            <b-form-radio
              v-for="icon in icons3"
              :key="icon"
              name="some-radios"
              :value="icon"
            >
              <i :class="icon"></i>
            </b-form-radio>
          </b-form-radio-group>
        </div>
      </horizontal-scroll>
    </b-form-group>
  </div>
</template>

<script>
import data1 from "./data1.json";
import data2 from "./data2.json";
import data3 from "./data3.json";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
export default {
  name: "listIcons",
  components: {
    HorizontalScroll
  },
  data() {
    return {
      selectedIcon1: null,
      selectedIcon2: null,
      selectedIcon3: null,
      icons1: [],
      icons2: [],
      icons3: []
    };
  },

  mounted() {
    (this.icons1 = data1), (this.icons2 = data2), (this.icons3 = data3);
  }
};
</script>
