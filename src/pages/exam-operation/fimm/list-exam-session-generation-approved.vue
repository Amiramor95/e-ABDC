<template>
  <va-inner-loading :loading="statusLoad">
  <va-card>
    <div class="row">
      <h4 class="card-title" slot="header">List of Exam Session Generated</h4>
      <br />
      <div class="col float-right">
        <div class="float-right">
          <h5>
            <span
              class="badge badge-success mr-1"
              title="Add New Session"
              v-b-tooltip.hover
              v-on:click="create"
            >
              <i class="fa fa-plus"></i
            ></span>
            <span
              class="badge badge-primary "
              title="Change View List"
              v-b-tooltip.hover
              v-on:click="exchange"
            >
              <i class="fa fa-exchange"></i
              ></span>
          </h5>
        </div>
      </div>
    </div>

    <!-- list table-->
    <va-card class="mt-5 col-12">
      <va-data-table
        :data="filteredData"
        :datacount="RecordCount"
        :dataperpage="parseInt(perPage)"
        :fields="fields"
        :per-page="parseInt(perPage)"
        clickable
        no-data-label="No data found"
      >
        <template slot="no" slot-scope="row">
          {{ row.rowIndex + 1 }}
        </template>

        <template slot="CSL" slot-scope="props">
        </template>
        <template slot="actions" slot-scope="props">
          <h5 class="mt-1">
<!--            <span-->
<!--              v-b-tooltip.hover-->
<!--              title="Repeat Program"-->
<!--              v-on:click="addProgram(props.rowData)"-->
<!--              class="badge badge-primary mr-2"-->
<!--            >-->
<!--              <i class="fa fa-plus"></i-->
<!--            ></span>-->
<!--            <span-->
<!--              v-b-tooltip.hover-->
<!--              title="View Submission Programs"-->
<!--              v-on:click="viewRecord(props.rowData)"-->
<!--              class="badge badge-primary mr-2"-->
<!--            >-->
<!--              <i class="fa fa-eye"></i-->
<!--            ></span>-->
          </h5>
        </template>
      </va-data-table>
      <br />
      <br />
      <br />
      <button
        @click="back"
        class="btn btn-primary btn-fill btn-md"
        type="button"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
      <div class="float-right">
        <button
          @click="submit"
          type="button"
          class="btn btn-success btn-fill btn-md"
        >
          <i class="fa fa fa-paper-plane"/> &nbsp; Accept
        </button>
      </div>
    </va-card>
  </va-card>
  </va-inner-loading>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import * as servicesModule from "../../../app/exam-booking-module/services01";

export default {
  mounted() {
    this.getAllRecord();
  },

  components: {},

  methods: {
      exchange() {
          this.$router.push({name: 'list-exam-session-generation',});
      },
      submit(){},
    create() {
      this.$router.push({name: 'create-exam-session',});
    },
    back() {
      this.$router.go(-1);
    }, // back button

    // getAllRecord
    getAllRecord: async function () {
      // const response = await servicesModule.getAllExamTypeDetails();
      const response = [];
      this.RecordList = response;
      this.RecordCount = this.RecordList.length;
      this.statusLoad = false;
    },
    async viewRecord(data) {
      localStorage.setItem(
        "f-consultantViewExamTypeList",
        JSON.stringify(data)
      );
      this.$router.push({
        name: "f-consultantViewExamTypeList",
      });
    },

    async addProgram(data) {
      localStorage.setItem(
        "f-consultantExamTypeRepeatSubmission",
        JSON.stringify(data)
      );
      this.$router.push({
          name: "f-consultantExamTypeRepeatSubmission",
      });
    },
  },

  computed: {
      fields() {
          return [
              {
                  name: "__slot:marker",
                  width: "30px",
                  dataClass: "text-center",
              },
              {
                  name: "__slot:no",
                  title: "No",
                  width: "30px",
              },
              {
                  name: "EXAM_NO",
                  title: "EXAM NO",
              },
              {
                  name: "EXAM_TYPE",
                  title: "Exam Type",
              },
              {
                  name: "DATE",
                  title: "DATE",
              },
              {
                  name: "DAY",
                  title: "DAY",
              },
              {
                  name: "START_TIME",
                  title: "START TIME",
              },
              {
                  name: "END_TIME",
                  title: "END TIME",
              },
              {
                  name: "English",
                  title: "Exam ID (English)",
              },
              {
                  name: "Malay",
                  title: "Exam ID (Malay)",
              },
              {
                  name: "Chinese",
                  title: "Exam ID (Chinese)",
              },
              {
                  name: "EXAM_CLOSING",
                  title: "EXAM CLOSING",
              },
              {
                  name: "CSL_DATE",
                  title: "CSL DATE",
              },
              {
                  name: "__slot:CSL",
                  title: "CSL",
              },
              {
                  name: "STATUS",
                  title: "STATUS",
              },
              {
                  name: "__slot:actions",
                  title: "ACTION",
                  // dataClass: "float-right"
              },
          ];
      },
      filteredData() {
          return this.RecordList;
      },
  },

  data() {
    return {
      statusLoad: true,
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      count: 1,
      RecordCount: null,
      classificationList: [],
      RecordList: [],


      model: {
        modelFilter: {},
      },

      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>
<style lang="scss">
.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}

.content {
  margin-top: 30px;
  font-size: 20px;
}
.inline {
  display: inline-flex;
  float: right;
}
</style>
