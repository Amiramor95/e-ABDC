<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Distributor : List of Module Selection</h4>
    </div>
    <va-card class="mt-5 col-12">
      <table class="table table-striped">
        <tbody>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickPost"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;POST-VETTING PROGRAM
              </button>
            </td>
          </tr>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickPre"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;PRE-VETTING PROGRAM
              </button>
            </td>
          </tr>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickWriting"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;WRITING AND PUBLISHING BOOKS/ARTICLES
              </button>
            </td>
          </tr>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickReading"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;READING APPROVED FINCANCIAL LITERATURE
              </button>
            </td>
          </tr>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickTeaching"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;TEACHING/SPEAKING
              </button>
            </td>
          </tr>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickAcademic"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;ACADEMIC/PROFESSIONAL QUALIFICATION
              </button>
            </td>
          </tr>
          <tr>
            <td style="text-align: center">
              <button
                @click="clickFpam"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;PASSING FINANCIAL PLANNER MODULES
              </button>
            </td>
          </tr>
           <tr>
            <td style="text-align: center">
              <button
                @click="clickWaiver"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;WAIVER
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </va-card>
  </va-card>
</template>
<script>
export default {
  methods: {
    clickPost: async function () {
      this.$router.push("/distributor/d-postVettingProgramList");
    },
    clickPre: async function () {
      this.$router.push("/distributor/d-preVettingProgramList");
    },
    clickWriting: async function () {
      this.$router.push("/distributor/d-writingModuleList");
    },
    clickTeaching: async function () {
       this.$router.push("/distributor/d-teachingModuleList");
    },
    clickReading: async function () {
       this.$router.push("/distributor/d-readingModuleList");
    },
    clickAcademic: async function () {
       this.$router.push("/distributor/d-academicModuleList");
    },
    clickFpam: async function () {
       this.$router.push("/distributor/d-fpamModuleList");
    },
      clickWaiver: async function () {
       this.$router.push("/distributor/waiversubmissionlist");
    },
  },
};
</script>

