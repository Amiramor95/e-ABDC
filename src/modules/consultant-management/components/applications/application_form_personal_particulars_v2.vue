<template>
  <div>
    <div class="col-md-8 mt-5 pl-0">
      <input-address-section></input-address-section>
    </div>
    <div class="col-md-8 mt-5 pl-0">
      <input-address-section></input-address-section>
    </div>
  </div>
</template>

<script>
import InputAddressSection from "./personal-particulars/address";
import * as services02module0 from "../../../../app/module0/services02";
import * as GeneralSettingsAPI from "../../services/general";

export default {
  components: {
    InputAddressSection,
  },
  props: {
    // The parameters the component accepts
    parentDataLoaded: Boolean,
    formDataModel: Object,
  },
  data: function () {
    return {};
  },
  created() {},
};
</script>
