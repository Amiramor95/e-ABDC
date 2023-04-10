<template>
<div>
  <va-card>

    <div class="row">
      <h4 slot="header" class="card-title">Candidate Details</h4>
      <br />
    </div>
    <!-- button -->
    <vue-form-generator
      :model="model"
      :schema="appealSchema"
      ref="bulkForm"
    >
    </vue-form-generator>

    <br>

    <button
      type="submit"
      class="ml-2 btn btn-primary btn-fill float-right btn-md"
      @click.prevent="submit"
    >
      <i class="fa fa-paper-plane" /> &nbsp; Submit
    </button>

  </va-card>
  <br />
  <va-card>
    <div>
      Appeal Status = "APPROVED"
    </div>
    <div>
      result output =
      {
        "appealid": 2,
        "candidatename": "Nora Ain Binti Kasim",
        "candidateid": "860213015054",
        "appealstatus": "APPROVED"
    }
    </div>

  </va-card>
  </div>
</template>
<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import * as servicesmodule0 from "../../../app/module0/services";
import * as servicesmodule2 from "../../../app/module2/services";

Vue.use(VueFormGenerator)

export default {

  methods: {
    submit: async function () {
      console.log('Start function submit')
      const fs = require('fs');
      // var candidate = {"applicationid": 100,"companycode": "ASB01","companyname": "Amanah Saham Bumiputra","coursename": "CUTE","email": "zubaidahhjali@gmail.com","name": "Siti Zubaidah binti Haji Ali","idnumber": "940521104328","mobile": "+60114152176","sessionid1": 208,"sessionid2": 209,"sessionid3": 210};
      var applicationid = 103;
      var idNumber = "900403016678";
      var reason = "This is a reason test";
      const FormData = require('form-data');
      let data = new FormData();
      console.log('pass 1');
      data.append('applicationid', '6');
      console.log('pass 1 withour error');
      console.log('pass 2');
      data.append('idnumber', '9600604015056');
      console.log('pass 2 withour error');
      console.log('pass 3');
      data.append('reason', 'Test');
      console.log('pass 3 withour error');
      for (var pair of data.entries()) {
          console.log(pair[0]+ ', ' + pair[1]);
      }
      try {
          console.log('Start function submit')
          const response = await servicesmodule2.postAppeal(JSON.stringify(data));
          console.log(response)
          //this.$router.push(-1)
        } catch (error) {
          console.log(error)
        }
    },

    edit (item) {
      console.log(item)
    },
  },
  back () {
    this.$router.go(-1)
  },

  computed: {
  },

  data () {
    return {

      model: {
        applicationID: '',
        idNumber: '',
        reason: '',
      },

      appealSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                model: 'applicationID',
                label: 'Application ID',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'idNumber',
                label: 'ID Number',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'reason',
                label: 'reason',
                styleClasses: 'col-md-6',
              },
            ],
          },
        ],
      },
    }
  },
}
</script>
