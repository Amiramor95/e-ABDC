/* eslint-disable no-debugger, no-console */
<template
><div>
  <vue-form-generator
    :model="model"
    :schema="firstTabSchema"
    :options="formOptions"
    ref="firstTabForm"
    @model-updated="onModelUpdated"
  >
  </vue-form-generator>

  <button @click="submit" type="button" class="ml-2 btn btn-primary btn-fill btn-md">
    Submit
  </button>
</div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import Vudal from 'vudal'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import * as servicesModule5 from '../../app/module5/services05'
import moment from 'moment'
import { parse } from 'vue-currency-input'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.use(VueFormWizard)
Vue.component(Vudal)
// register globally
Vue.component('multiselect', Multiselect)
export default {
  components: {
    Vudal,
    HorizontalScroll,
  },
  data () {
    return {
      documentIdArray: [],
      uploadFileOject: [],
      companyLogo: '',
      model: {
        data: '',
        file: [],
      },
      firstTabSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                labels: 'Upload SSM Form 9',
                accept: '.pdf,.xlsx,.xls',
                multiple: true,
                text: 'Choose a File',
                model: 'file',
                type: 'vfg-custom-multiple-file',
                styleClasses: 'col-md-12',
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    async submit () {
      const data = new FormData()
      if (this.model.file.length != 0) {
        for (let i = 0; i < this.model.file.length; i++) {
          data.append('file[]', this.model.file[i])
        }
      }
      data.append('data', this.model.data)

      try {
        const response = await servicesModule5.uploadFile(
          data,
        )
      } catch (error) {
        console.log(error)
      }
    },

  },
}
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.display-inline label {
  display: inline !important;
  padding: 5px;
}
.app-layout__main {
  background: #e8e8e8;
}
.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px; // hide bottom border
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
<style scoped>
.widthModal {
  width: 80%;
}
.width {
  width: 100%;
}
.widthName {
  width: 5%;
}
</style>
