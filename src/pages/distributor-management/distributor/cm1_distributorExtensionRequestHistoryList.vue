<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        List of Time Extension Request
      </h4>
    </div>
    <va-card>
      <table class="table table-striped">
        <tbody>
          <tr>
            <td>EXTENSION CRITERIA</td>
            <td>{{form.type}}</td>
          </tr>
          <tr>
            <td>JUSTIFICATION</td>
            <td>{{form.justification}}</td>
          </tr>
          <tr>
            <td>EXTENSION END DATE</td>
            <td>{{form.end_date}}</td>
          </tr>
          <tr>
            <td>SUBMISSION DATE</td>
            <td>{{form.date_submission}}</td>
          </tr>
          <tr>
            <td>APPROVAL DATE</td>
            <td>{{form.approval_date}}</td>
          </tr>
        </tbody>
      </table>
    </va-card>
    <div class="mt-3">
      <va-card>
        <va-data-table
        no-data-label="No data found"
        :fields="header"
        :data="histories"
        :per-page="parseInt(perPage)"
        :dataperpage="parseInt(perPage)"
        :datacount="dataCount"
        >
          <template slot="no" scope="item">
            {{ item.rowIndex + 1 }}
          </template>
          <template slot="DATE_SUBMISSION" scope="item">
            {{ item.rowData.SUBMISSION_DATE === null ? null : moment(item.rowData.SUBMISSION_DATE).format('DD MMM YYYY') }}
          </template>
          <template slot="DATE_APPROVAL" scope="item">
            {{ item.rowData.EXTENSION_APPROVAL_DATE === null ? null : moment(item.rowData.EXTENSION_APPROVAL_DATE).format('DD MMM YYYY') }}
          </template>
          <template slot="EXTENSION_TYPE" scope="item">
            {{ item.rowData.EXTENSION_TYPE + item.rowData.EXTENSION_TYPE.toUpperCase() === 'OTHER' ? ` (${item.rowData.OTHER_EXTENSION_TYPE})` : null }}
          </template>
          <template slot="EXTENSION_TYPE" scope="item">
            {{ item.rowData.EXTENSION_TYPE + (item.rowData.EXTENSION_TYPE.toUpperCase() === 'OTHER' ? ` (${item.rowData.OTHER_EXTENSION_TYPE})` : '') }}
          </template>
          <template slot="action" scope="item">
            <span>
              <b-badge
                  class="mr-1"
                  variant="primary"
                  @click="redirect(item.rowData.EXTENSION_REQUEST_ID)"
                  ><i class="fa fa-plus"></i
                ></b-badge>
            </span>
          </template>
        </va-data-table>
      </va-card>
    </div>
  </va-card>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import Vue from "vue";
import Vudal from "vudal";
import moment from "moment";
import VfgDateForwardCalendar from "../../component/VfgDateForwardCalendar.vue";
import axios from "axios";
import * as servicesModule1 from "../../../app/module1/services07";
import * as servicesModule0 from "../../../app/module0/services02";

// Vue.use(VueFormGenerator);
// Vue.component("field-vfg-date-forward-calendar", VfgDateForwardCalendar);
// Vue.use(Vudal);

export default {
  components: {
    vudal: Vudal,
  },
  computed: {},
  data() {
    return {
      histories: [],
      dataCount: 0,
      perPage: "10",
      form: {
        type: null,
        justification: null,
        approval_date: null,
        end_date: null,
        other_type: null,
        date_submission: null,
      },
      header: [
        {
          name: "__slot:no",
          title: "No",
          width: "5%",
        },
        {
          name: "__slot:DATE_SUBMISSION",
          title: "Submission Date",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:DATE_APPROVAL",
          title: "Approval Date",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:EXTENSION_TYPE",
          title: "Extension Criteria",
          width: "20%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:action",
          title: "Action",
          width: "5%",
          dataClass: "justify-content-center",
        },
      ]
    };
  },
  created() {
    // this.fetchExtensionList()
    // console.log(this.$route.params.id);
    axios.get(`/api/module1/distributor_extension_request_histories/${this.$route.params.id}`).then((res) => {
      let data = res.data.data;

      this.histories = res.data.history;
      this.dataCount = this.histories.length;
      this.form = {
        type: data.EXTENSION_TYPE,
        justification: data.JUSTIFICATION,
        approval_date: moment(data.EXTENSION_APPROVAL_DATE).format('DD MMM YYYY'),
        end_date: moment(data.EXTENSION_END_DATE).format('DD MMM YYYY'),
        other_type: data.OTHER_EXTENSION_TYPE === "null" || data.OTHER_EXTENSION_TYPE === null || data.OTHER_EXTENSION_TYPE === '' ? null : data.OTHER_EXTENSION_TYPE,
        date_submission: data.SUBMISSION_DATE === null ? null : moment(data.SUBMISSION_DATE).format('DD MMM YYYY')
      }
    })
  },
  methods: {
    moment,
    redirect(id) {
      localStorage.setItem("RE_ID", id);

      this.$router.push({name:`create-subsequent-extension-request`});
    }
  },
};
</script>

<style lang="scss">
.w-150px {
  width: 150px;
  height: 150px;
}

.vue-form-wizard .wizard-icon-circle .wizard-icon-container {
  border-radius: 50% !important;
  margin: -4px;
}

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

