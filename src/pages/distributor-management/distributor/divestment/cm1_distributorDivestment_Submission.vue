
<template>
  <va-card>
    <h5 slot="header" class="card-title">Divestment</h5>
    <!-------------------------------- cancellation type -------------------------------------->
    <div>
      <br/>
      <h6 slot="header" class="card-title">Choose Divestment Type</h6>
      <br/>
      <div class="row justify-content-center">
        <b-card
          @click="Fund"
          type="button"
          class="btn btn-outline-primary m-2 col-2 text-center"
        >
          <div class="icon-flex">
            <div class="icon-wrapper">
              <span class="fa fa-usd"></span>
            </div>
          </div>
          <div style="color: blue" class="m-2">Funds</div>
        </b-card>
        <b-card
          @click="Consultant"
          type="button"
          class="btn btn-outline-primary m-2 col-2 text-center"
        >
          <div class="icon-flex">
            <div class="icon-wrapper">
              <span class="fa fa-user"></span>
            </div>
          </div>
          <div style="color: blue" class="m-2">Consultants</div>
        </b-card>
        <b-card
          @click="fundConsultant"
          type="button"
          class="btn btn-outline-primary m-2 col-2 text-center"
        >
          <div class="icon-flex">
            <div class="icon-wrapperBoth">
              <i class="fa fa-usd"></i>
              <i class="fa fa-user"></i>
            </div>
          </div>
          <div style="color: blue" class="m-2">Funds and Consultants</div>
        </b-card>
        
      </div>
      <br/>
      <br/>
      <br/>
       <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
    </div>
  </va-card>
</template>

<script>
export default {
  methods: {

    back () {
      this.$router.push('/distributor/DistributorDivestment-List')
    },
    
    Fund () {
      this.$router.push('/distributor/DistributorDivestment-Fund')
    },
    
    Consultant () {
      this.$router.push('/distributor/DistributorDivestment-Consultant')
    },

    fundConsultant () {
      this.$router.push('/distributor/DistributorDivestment-FundConsultant')
    },

  },
}
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
