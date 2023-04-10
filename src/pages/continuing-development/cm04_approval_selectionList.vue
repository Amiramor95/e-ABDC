<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Approval Selection List</h4>
    </div>
    <va-card class="mt-5 col-12">
      <table class="table">
        <tbody>
          <tr>
            <td style="width: 10%"><b>Module</b></td>
            <td style="width: 5%; text-align: center"><b>Distributor</b></td>
            <td style="width: 5%; text-align: center">
              <b>Fimm Training Provider</b>
            </td>
            <td style="width: 5%; text-align: center">
              <b>Training Provider</b>
            </td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;POST-VETTING PROGRAM
            </td>
            <td style="text-align: center">
              <a href="approval-postVetting-distributorList">{{post}}</a>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;PRE-VETTING PROGRAM
            </td>
            <td style="text-align: center">
              <a href="approvalPreVettingDistributorList">{{dPre}}</a>
            </td>
            <td style="text-align: center"><a href="apprFPreVettingDistributorList">{{fPre}}</a></td>
            <td style="text-align: center"><a href="apprTPreVettingDistributorList">{{tPre}}</a></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;WRITING AND PUBLISHING BOOKS/ARTICLES
            </td>
            <td style="text-align: center">
              <a href="approvalWritingDistributorList">{{ writing }}</a>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;READING APPROVED FINCANCIAL LITERATURE
            </td>
            <td style="text-align: center">
              <a href="approvalReadingDistributorList">{{ reading }}</a>
            </td>
            <td style="text-align: center"><a href="approvalFReadingDistributorList">{{ freading }}</a></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;TEACHING/SPEAKING
            </td>
            <td style="text-align: center">
              <a href="approvalTeachingDistributorList">{{ teaching }}</a>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;ACADEMIC/PROFESSIONAL QUALIFICATION
            </td>
            <td style="text-align: center">
              <a href="approvalAcademicDistributorList">{{ qualification }}</a>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;PASSING FINANCIAL PLANNER MODULES
            </td>
            <td style="text-align: center">
              <a href="approvalFPDistributorList">{{ fp }}</a>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;WAIVER
            </td>
            <td style="text-align: center">
              <a href="waiver-submission-list">{{ waiver }}</a>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </va-card>
  </va-card>
</template>
<script>
import * as servicesModule4 from "../../app/module4/services01";
import * as services07Module4 from "../../app/module4/services07";

export default {
  mounted() {
    this.counter();
  },
  methods: {

    counter: async function () {
      this.post = await servicesModule4.getProgramApprovalTotalPending(2,1);
      this.dPre = await servicesModule4.getProgramApprovalTotalPending(2,2);
      this.fPre = await servicesModule4.getProgramApprovalTotalPending(1,2);
      this.tPre = await servicesModule4.getProgramApprovalTotalPending(3,2);
      this.writing = await services07Module4.getModuleApprovalTotalPendingApproval();
      this.reading = await services07Module4.getModuleApprovalTotalPendingApproval(2);
      this.freading = await services07Module4.getModuleApprovalPendingApprovalFReading(2);
      this.teaching = await services07Module4.getModuleApprovalTotalPendingApproval(3);
      this.qualification = await services07Module4.getModuleApprovalTotalPendingApproval(4);
      this.fp = await services07Module4.getModuleApprovalTotalPendingApproval(5);
      this.waiver = await servicesModule4.getWaiverApprovalTotalPending();
    },
  },
  data() {
    return {
      PDATA: [],
      writing: 0,
      reading: 0,
      freading: 0,
      teaching: 0,
      qualification: 0,
      fp: 0,
      waiver: 0,
      postVet:0,
      preVet:0,
      waiver:0,
      post:0,
      dPre:0,
      fPre:0,
      tPre:0,

    };
  },
};
</script>

