<template>
  <va-card>
    <h5 slot="header" class="card-title">Fund Management</h5>
    <div>
      <br />
      <br />
      <div class="row justify-content-center">
        <b-card
          @click="FundDetailsEdit"
          type="button"
          class="btn btn-outline-primary m-2 col-2 text-center"
        >
          <div class="icon-flex">
            <div class="icon-wrapper">
              <span class="fa fa-usd"></span>
            </div>
          </div>
          <div style="color: blue" class="m-2">Manage Fund Details</div>
        </b-card>
        <b-card
          @click="FundNotesEdit"
          type="button"
          class="btn btn-outline-primary m-2 col-2 text-center"
        >
          <div class="icon-flex">
            <div class="icon-wrapper">
              <span class="fa fa-gears"></span>
            </div>
          </div>
          <div style="color: blue" class="m-2">Manage Fund Notes</div>
        </b-card>
      </div>
      <br />
      <br />
    </div>
    <button
    @click="back"
    type="button"
    class="btn btn-primary btn-fill float-left btn-md"
  >
    <i class="fa fa-step-backward" /> &nbsp; Previous
  </button>
  </va-card>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push("fundManagementFundList");
    },
    FundDetailsEdit() {
      this.$router.push({
        name: "fundManagementEditDetails"
      });
    },
    FundNotesEdit() {
      this.$router.push({
        name: "fundManagementEditFundNotes"
      });
    },
  },
};
</script>

<style scoped>
.icon-flex,
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-wrapper {
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid blue;
  font-size: 2rem;
  width: 80px;
  height: 80px;
}
.icon-wrapper i {
  color: blue;
}

.icon-wrapperConsultant {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-wrapperBoth {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-wrapperBoth {
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #6600ff;
  font-size: 2rem;
  width: 80px;
  height: 80px;
}
.icon-wrapperBoth i {
  color: #6600ff;
}
</style>
