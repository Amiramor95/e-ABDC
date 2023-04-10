<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Appeal Selection List</h4>
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
              <a href="approvalAppeal-postVetting-distributorList">{{post}}</a>
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
              <a href="approvalAppeal-preVetting-distributorList">{{dPre}}</a>
            </td>
            <td style="text-align: center"><a href="approvalAppeal-FpreVetting-distributorList">{{fPre}}</a></td>
            <td style="text-align: center"><a href="approvalAppeal-TpreVetting-distributorList">{{tPre}}</a></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;WRITING AND PUBLISHING BOOKS/ARTICLES
            </td>
            <td style="text-align: center">
              <a href="d-appealWritingList">{{ writing }}</a>
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
              <a href="d-appealReadingList">{{ reading }}</a>
            </td>
            <td style="text-align: center"><a href="f-appealReading-distributorList">{{ freading }}</a></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;TEACHING/SPEAKING
            </td>
            <td style="text-align: center">
              <a href="d-appealTeachingList">{{ teaching }}</a>
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
              <a href="d-appealAcademicList">{{ qualification }}</a>
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
              <a href="d-appealFinancialList">{{ fp }}</a>
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
      this.post = await servicesModule4.getAppealProgramTotalPending(2,1);
      this.dPre = await servicesModule4.getAppealProgramTotalPending(2,2);
      this.fPre = await servicesModule4.getAppealProgramTotalPending(1,2);
      this.tPre = await servicesModule4.getAppealProgramTotalPending(3,2);
      this.writing = await services07Module4.getModuleApprovalTotalPending();
      this.reading = await services07Module4.getModuleApprovalTotalPending(2);
      this.freading = await services07Module4.getModuleApprovalTotalPending(2,1);
      this.teaching = await services07Module4.getModuleApprovalTotalPending(3);
      this.qualification = await services07Module4.getModuleApprovalTotalPending(4);
      this.fp = await services07Module4.getModuleApprovalTotalPending(5);
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
      postVet:0,
      preVet:0,
      post:0,
      dPre:0,
      fPre:0,
      tPre:0,

    };
  },
};
</script>

