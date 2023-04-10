<template>
    <div class="mb-4 ml-1 col-md-12">
      <table class="table table-striped"></table>
      <table class="table table-striped" v-if="module">
        <tbody>
          <tr>
            <td style="width: 15%">
              <b>Total Participant </b>
              &nbsp;
              <span
                role="button"
                v-b-tooltip.hover
                title="View Participant"
                @click="viewParticipant"
                class="badge badge-primary mr-2"
              >
                <i class="fa fa-external-link"></i
              ></span>
            </td>
            <td style="width: 1%">:</td>
            <td>
              <span v-if="module.TOTAL_PARTICIPANT">{{
                module.TOTAL_PARTICIPANT
              }}</span>
            </td>
          </tr>
          <tr>
            <td style="width: 15%"><b>CPD ID </b></td>
            <td style="width: 1%">:</td>
            <td>
              <span v-if="module.MODULE_CODE">{{ module.MODULE_CODE }}</span>
              <span v-else></span>
            </td>
          </tr>
          <tr>
            <td style="width: 15%"><b>Status</b></td>
            <td style="width: 1%">:</td>
            <td>{{ module.TS_ID_DESCRIPTION }}</td>
          </tr>
        </tbody>
      </table>
      <hr/>
    </div>
</template>
<script>
export default {
  props: {
    module: Object,
    participantLists: Array,
    route: String,
  },
  methods: {
    viewParticipant: async function () {
      let title = "";
      if (this.module.MODULE_TYPE == 1) {
        title = "Writing";
      } else if (this.module.MODULE_TYPE == 2) {
        title = "Reading";
      } else if (this.module.MODULE_TYPE == 3) {
        title = "Teaching/Speaking";
      } else if (this.module.MODULE_TYPE == 4) {
        title = "Academic/Professional Qualification";
      } else if (this.module.MODULE_TYPE == 5) {
        title = "Passing Financial Planner";
      }
      localStorage.setItem("title_viewParticipant", `${title} : View Participant List`);
      localStorage.setItem(this.route, JSON.stringify(this.participantLists));
      localStorage.setItem("route_name_viewParticipant", this.route);
      this.$router.push({
        name: this.route,
      });
    },
  },
  mounted() {},
};
</script>