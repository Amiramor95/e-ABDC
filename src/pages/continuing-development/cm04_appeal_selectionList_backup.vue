<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Appeal Selection List</h4>
    </div>
    <va-card class="mt-5 col-12">
      <table class="table">
        <tbody>
          <tr>
            <td style="width: 10%">&nbsp;</td>
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
              <a href="approvalAppeal-postVetting-distributorList">{{ appealPost }}</a>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;PRE-VETTING PROGRAM
            </td>
            <td style="text-align: center">
              <a href="approvalPreVettingDistributorList">0</a>
            </td>
            <td style="text-align: center">
              <a href="">0</a>
            </td>
            <td style="text-align: center">
              <a href="">0</a>
            </td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;WRITING AND PUBLISHING BOOKS/ARTICLES
            </td>
            <td style="text-align: center">
              <a href="d-appealWritingList">0</a>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;READING APPROVED FINCANCIAL LITERATURE
            </td>
            <td style="text-align: center">
              <a href="d-appealReadingList">0</a>
            </td>
            <td style="text-align: center">
              <a href="f-appealReadingList">0</a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;TEACHING/SPEAKING
            </td>
            <td style="text-align: center">
              <a href="d-appealTeachingList">0</a>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;ACADEMIC/PROFESSIONAL QUALIFICATION
            </td>
            <td style="text-align: center">
              <a href="d-appealAcademicList">0</a>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>
              <i class="fa fa-external-link" />
              &nbsp;PASSING FINANCIAL PLANNER MODULES
            </td>
            <td style="text-align: center">
              <a href="d-appealFinancialList">0</a>
            </td>
            <td colspan="2"></td>
          </tr>
        </tbody>
      </table>
    </va-card>
  </va-card>
</template>
<script>
import * as servicesModule4 from "../../app/module4/services01";

export default {
  mounted() {
    this.counter();
  },
  methods: {
    counter: async function () {
      //(category,prog_type)
      this.appealPost = await servicesModule4.getAppealProgramTotalPending(2, 1);
      this.dPre = await servicesModule4.getAppealProgramTotalPending(2, 2);
      this.fPre = await servicesModule4.getAppealProgramTotalPending(1, 2);
      this.tPre = await servicesModule4.getAppealProgramTotalPending(3, 2);
    },
    data() {
      return {
        appealPost: 0,
        dPre: 0,
        fPre: 0,
        tPre: 0,
      };
    },
  },
};
</script>

