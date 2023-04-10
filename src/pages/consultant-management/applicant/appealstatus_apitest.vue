<template>
  <va-card>
        <vue-form-generator
      :model="model"
      :schema="appealSchema"
      ref="bulkForm"
    >
    </vue-form-generator>
    <button
                    @click="submit"
                    type="button"
                    class="ml-2 btn btn-primary btn-fill btn-md"
                  >
                    Submit
                  </button>
    <va-card>
   <div class="row">
        <h4 slot="header" class="card-title">Display appeal status</h4>
        <br/>

        Exam Result = PASS


    </div>
  </va-card>


  </va-card>
</template>
<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import * as servicesmodule0 from "../../../app/module0/services";
import * as servicesmodule2 from "../../../app/module2/services";
import pdf from "vue-pdf";
import { b64toBlobPDF } from '../../../app/fileServices';

Vue.use(VueFormGenerator)
Vue.component(pdf)

export default {
  components: {
    pdf,
  },

  methods: {
    submit: async function () {
      // let data = new FormData();
      // data.append('applicationid', this.model.applicationID);
      var data = 6;
      try{
        console.log('Start function submit')
        console.log(data);
        const response = await servicesmodule2.getCertificate(data);
        const blob = new Blob([response]);
        const objectUrl = URL.createObjectURL(blob);
        // console.log(response);
        const response2 = await servicesmodule2.getResult(data);
        console.log(response2);
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
      pdfsrc: Blob,
      model: {
        applicationID: '',
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
            ],
          },
        ],
      },
    }
  },
}
</script>
