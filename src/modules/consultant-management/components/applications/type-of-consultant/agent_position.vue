<template>
  <div>
    <!-- <p>{{ general_settings.STAFF_POSITIONS }}</p>
    <p>{{ position }}</p> -->

    <b-form-group
      label="Select your position:"
      label-for="positions"
      label-cols-lg="3"
      label-cols-md="2"
      description=""
    >

      <select id="positions" class="form-control col-lg-9 col-md-10 p-0" 
          v-model="model.CANDIDATE_POSITION_CATEGORY" placeholder="Select a position">
            <option
                v-for="position in general_settings.STAFF_POSITIONS"
                v-bind:key="position.ID"
                :value="position.ID"
              >
                {{position.NAME}}
              </option>
      </select>

      <!-- <multiselect
        id="positions"
        v-model="selected_position"
        :options="general_settings.STAFF_POSITIONS"
        placeholder="Select a position"
        track-by="ID"
        label="NAME"
        @select="onStateSelected"
        class="col-lg-9 col-md-10 p-0"
      >
      </multiselect> -->

      <!-- <b-form-select
        v-model="selected_position"
        class="form-group bgcolor"
        label="NAME"
        placeholder="Select a position"
        @select="onStateSelected"
      >
        <template>
          <option
            v-for="position in general_settings.STAFF_POSITIONS"
            v-bind:key="position.ID"
            :selected="position.ID == position"
          >
            {{ position.NAME }}
          </option>
        </template>
      </b-form-select> -->
    </b-form-group>

    <div v-if="model.CANDIDATE_POSITION_CATEGORY">
      <b-form-group
        label="Position:"
        label-cols-lg="3"
        label-cols-md="2"
        label-for="input-1"
        description=""
        v-if="model.CANDIDATE_POSITION_CATEGORY === 3"
      >
        <b-form-input
          id="positions"
          v-model="model.CANDIDATE_POSITION"
          placeholder="Position's name"
          class="col-lg-9 col-md-10"
        ></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "section-agent-position",

  // computed: {
  //   ...mapGetters({ general_settings: "getGeneralSettings" }),
  // },
  props: {
    savedConsultantLicenseData: Object,
  },
  data() {
    return {
      model: {
        CANDIDATE_POSITION_CATEGORY: '',
        CANDIDATE_POSITION: '',
      }
    };
  },

  computed: {
    ...mapState({
      general_settings: (state) => state.consultant.general_settings,
    }),
    selected_position_state() {
      const position_options = this.general_settings.STAFF_POSITIONS;
      const item = position_options.find((item) => item.ID === this.position);
      return item;
    },
  },

  created() {
    // console.log("general_settings", this.general_settings);
    // console.log("Selected positon", this.selected_position_state.ID, this.selected_position_state.NAME);
    if(this.savedConsultantLicenseData){
      this.model = _.cloneDeep(this.savedConsultantLicenseData);
    }
  },

  mounted() {
    // this.selected_position = this.general_settings.find(
    //   (general_settings) => general_settings.ID === selected_position
    // );
    //this.selected_position = this.selected_position_state.ID;
  },

  methods: {
    onStateSelected(item) {
      this.selected_position = item.ID;
    },
    getDataToSave(){
      let dataToSave = {
        CANDIDATE_POSITION_CATEGORY: this.model.CANDIDATE_POSITION_CATEGORY,
        CANDIDATE_POSITION: this.model.CANDIDATE_POSITION,
      };
      return dataToSave;
    }
  },
};
</script>

<style></style>
