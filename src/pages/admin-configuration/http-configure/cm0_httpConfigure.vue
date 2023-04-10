<template>
        <div class="card-body">
          <div class="row justify-content-center">
             <div class="col-lg-10">
             <h4 slot="header">System Settings</h4>
            </div>
              <va-card class="ml-4 col-lg-10 my-1 px-1">
                <h4 slot="header" class="card-title">HTTP Setting</h4>
                <div class="form-group">
                  <vue-form-generator
                    tag="div"
                    :schema="schema"
                    :model="model"
                    :options="formOptions"
                    ref="RegForm"
                  >
                  </vue-form-generator>
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
                      class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" /> &nbsp; Save
                    </button>
                  </div>
              </va-card>
          </div>
        </div>
</template>
<script>
import "vue-form-generator/dist/vfg.css";
import * as servicesModule0 from "../../../app/module0/services";

export default {
  mounted() {
    this.getHttpSetting();
  },
  //METHOD
  methods: {
      back() {
       this.$router.push("/fimm/integration-setting");
      },
     getHttpSetting: async function() {
      const response = await servicesModule0.getHttpSettingList();
      if (response != "error") {
        // console.log('data : ' + JSON.parse(response.EMAIL_SMTP_PORT))
        this.model.SETTING_HTTP_ID = response.SETTING_HTTP_ID;
        this.model.API_KEY = response.API_KEY;
        this.model.USER_NAME = response.USER_NAME;
        this.model.API_SECRET = response.API_SECRET;
        this.model.ALLOW_IP = response.ALLOW_IP;
        this.model.DLR_URL = response.DLR_URL;
      }
    },

    async submit() {
      if (this.$refs.RegForm.validate()) {
        const data = new FormData();
        data.append("SETTING_HTTP_ID",this.model.SETTING_HTTP_ID);
         data.append("USER_NAME", this.model.USER_NAME);
        data.append("API_KEY", this.model.API_KEY);
        data.append("API_SECRET", this.model.API_SECRET);
        data.append("ALLOW_IP", this.model.ALLOW_IP);
        data.append("DLR_URL", this.model.DLR_URL);
        try {
           if(this.model.SETTING_HTTP_ID !== ''){
            console.log("Update");
            const response = await servicesModule0.updateHttpSetting(data);
         }
         else{
            console.log("Create");
            const response = await servicesModule0.createHttpSetting(data)
         }
          this.getHttpSetting();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async saveAsDraft() {
    },
  },

  //DATA SCHEMA
  data() {
    return {
      //DATA MODEL
      model: {
        SETTING_HTTP_ID: '',
        USER_NAME: '',
        API_KEY: "",
        API_SECRET: "",
        ALLOW_IP: "",
        DLR_URL: "",
      },

      // FORM
      schema: {
        fields: [
          {
            type: "input",
            inputType: "hidden",
           // label: "SMS ID",
            model: "SETTING_HTTP_ID",
          },
           {
            type: "input",
            inputType: "text",
            label: "USER NAME",
            model: "USER_NAME",
            required: true,
            validator: "required",
            placeholder: "ENTER USERNAME",
            styleClasses: "col-md-8"
          },
          {
            type: "input",
            inputType: "text",
            label: "API KEY",
            model: "API_KEY",
            required: true,
            validator: "required",
            placeholder: "ENTER API KEY",
            styleClasses: "col-md-8"
          },
          {
            type: "input",
            inputType: "password",
            label: "API SECRET",
            model: "API_SECRET",
            required: true,
            validator: "required",
            placeholder: "ENTER API SECRET",
            styleClasses: "col-md-8"
          },
          {
            type: "input",
            inputType: "text",
            label: "ALLOW IP",
            model: "ALLOW_IP",
            required: true,
            validator: "required",
            placeholder:"*.*.*.*",
            styleClasses: "col-md-8"
          },
          {
            type: "input",
            inputType: "text",
            label: "DLR URL",
            model: "DLR_URL",
            placeholder: "ENTER DLR URL",
            styleClasses: "col-md-8"
          },
        ]
      },

      // FORM OPTION
      formOptions: {
      // validateAfterLoad: false,
        validateAfterChanged: true,
        //validateAsync: true
      }
    };
  }
};
</script>
