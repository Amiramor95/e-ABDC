<template>
 <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-lg-10">
             <h4 slot="header">Document & Form Template Setting</h4>
            </div>
              <va-card class="ml-4 col-lg-10 my-1 px-1">
                <template slot="header">
                  <div class="row">
                    <div class="col header-col">
                      <h5 class="card-title-file"> <i class="fa fa-file" /> &nbsp;File Size Settings</h5>
                    </div>
                  </div>
                </template>
                <!--form class="ml-2" v-on:submit.prevent="adsetting"-->
                  <div class="form-group">
                    <vue-form-generator
                      :model="model"
                      :schema="schema"
                      :options="formOptions"
                      ref="fileSizeForm"
                    />
                    <!--vue-form-generator
                      v-show="editMode"
                      :model="model.modelEdit"
                      :schema="editschema"
                      :options="formOptions"
                      ref="ldapeditForm"
                    /-->
                  </div>
                  <button
                    type="button"
                     @click="back"
                    class="btn btn-primary btn-fill float-left btn-md">
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                  <div class="float-right">
                    <button
                      @click="submit"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md">
                      <i class="fa fa-save" /> &nbsp; Save
                    </button>
                  </div>

                <!--/form-->
              </va-card>
          </div>
        </div>
</template>

<script>
import Vue from 'vue'
//import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import * as servicesModule0 from '../../../app/module0/services'

//Vue.use(VueFormGenerator)

export default {
  mounted () {
    this.getFileSizeSetting()
  },

  // METHOD
  methods: {
      back() {
         this.$router.push("/fimm/document-form-setting");
      },

    getFileSizeSetting: async function () {
      const response = await servicesModule0.getFileSizeSettingList()
      console.log('File :', response);
      if (response !== 'error') {
        this.model.FILE_SIZE_SETTING_ID = response.FILE_SIZE_SETTING_ID
        this.model.ADMIN_MODULE = response.ADMIN_MODULE
        this.model.DISTRIBUTOR_MODULE = response.DISTRIBUTOR_MODULE
        this.model.CONSULTANT_MODULE = response.CONSULTANT_MODULE
        this.model.CAS_MODULE = response.CAS_MODULE
        this.model.CPD_MODULE = response.CPD_MODULE
        this.model.FMS_MODULE = response.FMS_MODULE
        this.model.FINANCE_MODULE = response.FINANCE_MODULE
        this.model.AMSF_MODULE = response.AMSF_MODULE
      }
    },

    async submit () {
      // if(this.$refs.fileSizeForm.validate()) {
        const data = new FormData()
        data.append('FILE_SIZE_SETTING_ID', this.model.FILE_SIZE_SETTING_ID)
        data.append('ADMIN_MODULE', this.model.ADMIN_MODULE)
        data.append('DISTRIBUTOR_MODULE', this.model.DISTRIBUTOR_MODULE)
        data.append('CONSULTANT_MODULE', this.model.CONSULTANT_MODULE)
        data.append('CAS_MODULE', this.model.CAS_MODULE)
        data.append('CPD_MODULE', this.model.CPD_MODULE)
        data.append('FMS_MODULE', this.model.FMS_MODULE)
        data.append('FINANCE_MODULE', this.model.FINANCE_MODULE)
        data.append('AMSF_MODULE', this.model.AMSF_MODULE)
        console.log("data=", this.model.ADMIN_MODULE);
        try {
           if(this.model.FILE_SIZE_SETTING_ID !== ''){
              console.log("Update");
              const response = await servicesModule0.updateFileSizeSetting(data)
           }
           else{
              console.log("Create");
              const response = await servicesModule0.createFileSizeSetting(data)
           }
          this.getFileSizeSetting()
          //this.$modals.simpleModal.$hide()
        } catch (error) {
          console.log(error)
        }
      //}
    },
  },

  data () {
    return {
      editMode:false,
      model: {
          FILE_SIZE_SETTING_ID: "",
          ADMIN_MODULE: 0,
          DISTRIBUTOR_MODULE: 0,
          CONSULTANT_MODULE: 0,
          CAS_MODULE: 0,
          CPD_MODULE: 0,
          FMS_MODULE: 0,
          FINANCE_MODULE: 0,
          AMSF_MODULE: 0,
      },
      schema: {
        groups: [
        {
        fields: [
           {
            type: 'input',
            inputType: 'hidden',
          //  label: 'SETTING ID',
            model: 'FILE_SIZE_SETTING_ID',
           // required: true,
           // validator: "in",
             //readonly: true,
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'ADMIN MODULE  <span class="sublabel">File Size (MB)</span>',
            model: 'ADMIN_MODULE',
            //placeholder: 'cn',
          //  required: true,
            //validator: "integer",
            styleClasses: 'file-size-form-class'
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'DISTRIBUTOR MODULE <span class="sublabel">File Size (MB)</span>',
            model: 'DISTRIBUTOR_MODULE',
          //  required: true,
           // validator: "integer",
            styleClasses: 'file-size-form-class'
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'CONSULTANT MODULE <span class="sublabel">File Size (MB)</span>',
            model: 'CONSULTANT_MODULE',
           // required: true,
            //validator: "integer",
            styleClasses: 'file-size-form-class'

          },
          {
            type: 'input',
            inputType: 'number',
            label: 'CAS_MODULE <span class="sublabel">File Size (MB)</span>',
            model: 'CAS_MODULE',
           // required: true,
            //validator: "integer",
            styleClasses: 'file-size-form-class'

          },
          {
            type: 'input',
            inputType: 'number',
            label: 'CPD MODULE <span class="sublabel">File Size (MB)</span>',
            model: 'CPD_MODULE',
            //required: true,
            //validator: "integer",
            styleClasses: 'file-size-form-class'

          },
          {
            type: 'input',
            inputType: 'number',
            label: 'FMS MODULE <span class="sublabel">File Size (MB)</span>',
            model: 'FMS_MODULE',
           // required: true,
            //validator: "integer",
            styleClasses: 'file-size-form-class'

          },
          {
            type: 'input',
            inputType: 'number',
            label: 'FINANCE MODULE <span class="sublabel">File Size (MB)</span>',
            model: 'FINANCE_MODULE',
            //required: true,
            //validator: "integer",
            styleClasses: 'file-size-form-class'

          },
          {
            type: 'input',
            inputType: 'number',
            label: 'AMSF MODULE <span class="sublabel">File Size (MB)</span>',
            model: 'AMSF_MODULE',
           // placeholder: 'simple',
            //required: true,
            //validator: "integer",
            styleClasses: 'file-size-form-class'
          },

        ],
       }
      ]
      },
      formOptions: {
       // validateAfterLoad: false,
        validateAfterChanged: true,
       // validateAsync: true,
      },
    }
  },
}
</script>

<style lang="scss">
.header-col{
  margin: 20px 0px 30px 0px;
}
.card-title-file{
    font-weight: bold;
    margin-top: 20px;
}

.file-size-form-class {
    // background-color: red;
     width: 100%;
     border-bottom: 1px solid rgb(194, 192, 192);
     padding:  10px;

}
.file-size-form-class  .field-wrap{
  width: 10%;
  float: right;
}
.file-size-form-class .sublabel{
  font-weight: bold;
  position: absolute;
  right: 15%;
}
.file-size-form-class  .field-wrap input{
  text-align: center;
}
</style>