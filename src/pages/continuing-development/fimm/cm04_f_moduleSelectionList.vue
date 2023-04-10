<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">
        List of Module Selection (Fimm Training Provider)
      </h4>
    </div>
   


      <va-card class="mt-5 col-12"> 
      <table class="table table-striped">
        <tbody>
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
                @click="clickReading"
                type="button"
                class="ml-2 btn btn-info btn-fill btn-md"
              >
                <i class="fa fa-external-link" />
                &nbsp;READING APPROVED FINCANCIAL LITERATURE
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
 
    clickPre: async function () {
      this.$router.push("/fimm/f-preVettingProgramList");
    },
    clickReading: async function () {
       this.$router.push("/fimm/f-readingModuleList");
    },

  },
};
</script>

