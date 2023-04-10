<template>
  <va-card
    class="striped-tabled-with-hover"
    body-classes="table-full-width table-responsive"
  >
    <h4 slot="header" class="card-title">
      Details Of Distributor License Type
    </h4>
    <div>
      <div class="float-right flex xs12 md12 xl8">
        <button
          @click="registerNewDistType"
          type="button"
          class="btn btn-success btn-fill float-left btn-md"
        >
          <i
            class="fa fa-plus"
            v-b-tooltip.hover.left
            title="Register New Distributor License Type"
          />
        </button>
      </div>
    </div>
    <br />
    <br />
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info"
            >Accordion 1</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-1"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text
              >I start opened because <code>visible</code> is
              <code>true</code></b-card-text
            >
            <b-card-text></b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info"
            >Accordion 2</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body> </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="info"
            >Accordion 3</b-button
          >
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body> </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <br />
  </va-card>
</template>

<script>
import axios from "axios";

export default {
  name: "license",
  data() {
    return {};
  },
  methods: {
    registerNewDistType() {
      this.$router.push("/distributor/cm1_distributor_registerType");
    }
  },
  computed: {},
  mounted: {}
};
</script>
