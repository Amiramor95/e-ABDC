<template>
  <va-card>
    <div class="row">
      <div slot="header" class="card-title">
        <h4>Subsequent Time Extension Request Record</h4>
      </div>
    </div>
    <va-data-table
      :fields=" user.hasOwnProperty('user_type') ? fimmTableHeader : tableHeader"
      :data="extensionRequests"
      no-data-label="No data found"
      :per-page="parseInt(perPage)"
      :dataperpage="parseInt(perPage)"
      :datacount="dataCount"
      clickable
      >
        <template slot="no" scope="item">
          {{ item.rowIndex + 1 }}
        </template>
        <template slot="EXTENSION_TYPE" scope="item">
        {{
          item.rowData.EXTENSION_TYPE +
          (item.rowData.EXTENSION_TYPE == "OTHERS"
            ? ` (${item.rowData.OTHER_EXTENSION_TYPE})`
            : "")
        }}
      </template>
      <template slot="DATE_CREATED" scope="item">
        {{ item.rowData.SUBMISSION_DATE != null ? moment(item.rowData.SUBMISSION_DATE).format("DD MMM YYYY") : null}}
      </template>
      <template slot="STATUS" scope="item">
        <template v-if="user.hasOwnProperty('user_type')">
          <span v-if="user.USER_GROUP_ID == 4">{{item.rowData.rd_approval.task_status.TS_PARAM}}</span>
          <span v-else-if="user.USER_GROUP_ID == 2">{{item.rowData.rd_hod_approval.task_status.TS_PARAM}}</span>
          <span v-else-if="user.USER_GROUP_ID == 3">{{item.rowData.gm_approval.task_status.TS_PARAM}}</span>
          <span v-else-if="user.USER_GROUP_ID == 1">{{item.rowData.ceo_approval.task_status.TS_PARAM}}</span>
        </template>
        <template v-else>
          <template v-if="isManager">
            {{item.rowData.manager_approval.task_status.TS_PARAM}}
          </template>
          <template v-else>
            {{item.rowData.task_status.TS_PARAM}}
          </template>
        </template>
      </template>
      <template slot="EXTENSION_APPROVAL_DATE" scope="item">
        <!-- {{ item.rowData.APPROVAL_DATE != null ? moment(item.rowData.APPROVAL_DATE).format("DD MMM YYYY") : null}} -->
        <template v-if="!isManager">
          <span v-if="user.USER_GROUP_ID == 4">{{item.rowData.rd_approval.APPROVAL_DATE != null ? moment(item.rowData.rd_approval.APPROVAL_DATE).format("DD MMM YYYY") : null}}</span>
          <span v-else-if="user.USER_GROUP_ID == 2">{{item.rowData.rd_hod_approval.APPROVAL_DATE != null ? moment(item.rowData.rd_hod_approval.APPROVAL_DATE).format("DD MMM YYYY") : null}}</span>
          <span v-else-if="user.USER_GROUP_ID == 3">{{item.rowData.gm_approval.APPROVAL_DATE != null ? moment(item.rowData.gm_approval.APPROVAL_DATE).format("DD MMM YYYY") : null}}</span>
          <span v-else-if="user.USER_GROUP_ID == 1">{{item.rowData.ceo_approval.APPROVAL_DATE != null ? moment(item.rowData.ceo_approval.APPROVAL_DATE).format("DD MMM YYYY") : null}}</span>
        </template>
        <template v-else>
          <span>{{item.rowData.manager_approval.APPROVAL_DATE != null ? moment(item.rowData.manager_approval.APPROVAL_DATE).format("DD MMM YYYY") : null}}</span>
        </template>
      </template>
        <template slot="action" scope="item">
          <b-badge v-b-tooltip.hover title="View" variant="primary" @click="redirect(item.rowIndex)">
            <i class="fa fa-eye"></i>
          </b-badge>
        </template>
      </va-data-table>
  </va-card>
</template>
<script>
import moment from "moment";
import * as servicesModule1 from "../../../../../app/module1/services07";

export default {
  data() {
    return {
      extensionRequests: [],
      dataCount: 0,
      perPage: "10",
      user: JSON.parse(localStorage.getItem('user')),
      isManager: JSON.parse(localStorage.getItem('user')).hasOwnProperty('user_type') ? false : true,
      tableHeader: [
        {
          name: "__slot:no",
          title: "No",
          width: "5%",
        },
        {
          name: "__slot:DATE_CREATED",
          title: "Submission Date",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "author.USER_NAME",
          title: "CREATED BY",
          width: "15%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:EXTENSION_TYPE",
          title: "Extension Criteria",
          width: "30%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:EXTENSION_APPROVAL_DATE",
          title: "Extension Approval Date",
          width: "30%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:STATUS",
          title: "Status",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:action",
          title: "Action",
          width: "10%",
          dataClass: "justify-content-center",
        },
      ],
      fimmTableHeader: [
        {
          name: "__slot:no",
          title: "No",
          width: "5%",
        },
        {
          name: "__slot:DATE_CREATED",
          title: "Submission Date",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "distributor.DIST_NAME",
          title: "DISTRIBUTOR NAME",
          width: "20%",
          // dataClass: "text-center"
        },
        {
          name: "author.USER_NAME",
          title: "CREATED BY",
          width: "15%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:EXTENSION_TYPE",
          title: "Extension Criteria",
          width: "30%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:STATUS",
          title: "Status",
          width: "10%",
          // dataClass: "text-center"
        },
        {
          name: "__slot:action",
          title: "Action",
          width: "10%",
          dataClass: "justify-content-center",
        },
      ],
    }
  },
  methods: {
    moment,
    getData: async function() {
      let res = await servicesModule1.approvalLists(true);
      this.extensionRequests = res.data;
      this.dataCount = res.data.length;
    },
    redirect(index) {
      localStorage.setItem('RE_ID', this.extensionRequests[index].SUBSEQUENT_EXTENSION_REQUEST_ID);
      this.$router.push('view-subsequent-extension-request');
    }
  },
  created() {
    this.getData();
  }
}
</script>
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
