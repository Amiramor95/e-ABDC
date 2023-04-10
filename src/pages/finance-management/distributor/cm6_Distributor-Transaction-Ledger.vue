
<template>
  <va-card>
    <h5 slot="header" class="card-title">Transaction Ledger</h5>
    <!-------------------------------- cancellation type -------------------------------------->
    <div>
      <br/>
      <h6 slot="header" class="card-title">Choose Transaction</h6>
      <br/>
      <div class="row justify-content-center">
        <b-card
          @click="PrePayment"
          type="button"
          class="btn btn-outline-primary m-2 col-2 text-center"
        >
          <div class="icon-flex">
            <div class="icon-wrapper">
              <span class="fa fa-usd"></span>
            </div>
          </div>
          <div style="color: blue" class="m-2">Pre-Payment Transaction</div>
        </b-card>
        <b-card
          @click="Others"
          type="button"
          class="btn btn-outline-primary m-2 col-2 text-center"
        >
          <div class="icon-flex">
            <div class="icon-wrapper">
              <span class="fa fa-gears"></span>
            </div>
          </div>
          <div style="color: blue" class="m-2">Distributor Registration and AMSF Collection Transaction</div>
        </b-card>
      </div>
      <br/>
      <br/>
    </div>
  </va-card>
</template>

<script>
  export default {
    methods: {
      PrePayment () {
        this.$router.push('/distributor/distributor-pre-payment-Transaction-List')
      },
      Others () {
        this.$router.push('/distributor/distributor-amfs-Transaction-List')
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
