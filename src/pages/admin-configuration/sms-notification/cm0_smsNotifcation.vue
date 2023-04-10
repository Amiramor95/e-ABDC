<template>
        <div class="card-body">
          <div class="row justify-content-center">
             <div class="col-lg-10">
             <h4 slot="header">System Settings</h4>
            </div>
              <va-card class="ml-4 col-lg-10 my-1 px-1">
                 <vudal name="simpleModalTestConnection" class="widthModal">
                <div class="header">SMS Test Connection<i class="close icon">&times;</i></div>
                <div class="content">
                  <div v-if="this.modalmessage == 202">
                        <span class="textcolor">SMS Sent</span>
                  </div>
                  <div v-else-if="this.modalmessage == 404">
                        <span class="textcolorerror">SMS Not Send</span>
                  </div>
                   <div v-else>
                  <pulse-loader ></pulse-loader>
                  </div>
                </div>
                <div class="actions">
                <button
                type="button"
                value="PUT"
                class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                >
                <i class="fa fa-times" /> &nbsp; Close
                </button>
                </div>
                </vudal>
                <h4 slot="header" class="card-title">SMS Setting</h4>
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
                      @click="testSms"
                      type="button"
                      class="mr-2 btn btn-info btn-fill btn-md"
                    >
                      <i class="fa fa-exchange" /> &nbsp; Send Test SMS
                    </button>

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
import Vudal from 'vudal'
import * as servicesModule0 from "../../../app/module0/services";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  mounted() {
    this.getSmsSetting();
  },
  components: {
    Vudal,
    PulseLoader
  },
  //METHOD
  methods: {
      back() {
       this.$router.push("/fimm/integration-setting");
      },
     getSmsSetting: async function() {
      const response = await servicesModule0.getSmsSettingList();
      if (response != "error") {
        // console.log('data : ' + JSON.parse(response.EMAIL_SMTP_PORT))
        this.model.SETTING_SMS_ID = response.SETTING_SMS_ID;
        this.model.SMS_HTTP_URL = response.SMS_HTTP_URL;
        this.model.SMS_HTTP_PARAM = response.SMS_HTTP_PARAM;
        this.model.SMS_REQ_HEADER = response.SMS_REQ_HEADER;
        this.model.SMS_RES_SUCCESS = response.SMS_RES_SUCCESS;
        this.model.SMS_RES_FAILURE = response.SMS_RES_FAILURE;
      }
    },

    async editExceptionAPI() {
      try {
        const data = new FormData();
        data.append(
          "SETTING_SMS_ID",
          this.model.SETTING_SMS_ID
        );
        data.append("SMS_HTTP_URL", this.model.SMS_HTTP_URL);
        data.append(
          "SMS_HTTP_URL",
          moment(this.model.SMS_HTTP_URL)
        );
        data.append(
          "SMS_HTTP_PARAM",
          moment(this.model.SMS_HTTP_PARAM)
        );
		    data.append(
          "SMS_REQ_HEADER",
          this.model.SMS_REQ_HEADER
        );
		    data.append(
          "SMS_RES_SUCCESS",
          this.model.SMS_RES_SUCCESS
        );
		    data.append(
          "SMS_RES_FAILURE",
          this.model.SMS_RES_FAILURE
        );
        this.getAllExceptionSms();
        // this.$modals.simpleModal.$hide();
      } catch (error) {
        console.log(error);
      }
    },

    async submit() {
      if (this.$refs.RegForm.validate()) {
        const data = new FormData();
        data.append("SETTING_SMS_ID",this.model.SETTING_SMS_ID);
        data.append("SMS_HTTP_URL", this.model.SMS_HTTP_URL);
        data.append("SMS_HTTP_PARAM", this.model.SMS_HTTP_PARAM);
        data.append("SMS_REQ_HEADER", this.model.SMS_REQ_HEADER);
        data.append("SMS_RES_SUCCESS", this.model.SMS_RES_SUCCESS);
        data.append("SMS_RES_FAILURE", this.model.SMS_RES_FAILURE);
        try {
           if(this.model.SETTING_SMS_ID !== ''){
            console.log("Update");
            const response = await servicesModule0.updateSmsException(data);
         }
         else{
            console.log("Create");
            const response = await servicesModule0.createSmsSetting(data)
         }
          this.getSmsSetting();
        } catch (error) {
          console.log(error);
        }
      }
    },
     async testSms(){
        this.$modals.simpleModalTestConnection.$show();
      const data = new FormData()
         data.append("SETTING_SMS_ID",this.model.SETTING_SMS_ID);
        data.append("SMS_HTTP_URL", this.model.SMS_HTTP_URL);
        data.append("SMS_HTTP_PARAM", this.model.SMS_HTTP_PARAM);
        data.append("SMS_REQ_HEADER", this.model.SMS_REQ_HEADER);
        data.append("SMS_RES_SUCCESS", this.model.SMS_RES_SUCCESS);
        data.append("SMS_RES_FAILURE", this.model.SMS_RES_FAILURE);
         this.modalmessage = '';
        await servicesModule0.testSmsSetting(data)
        .then(response =>{
          console.log("SMS MESSAGE=",response);
           this.modalmessage = response.status;
        })
    },

    async saveAsDraft() {
    },
  },

  //DATA SCHEMA
  data() {
    return {
       modalmessage: '',
      model: {
        SETTING_SMS_ID: '',
        SMS_HTTP_URL: "",
        SMS_HTTP_PARAM: "",
        SMS_REQ_HEADER: "",
        SMS_RES_SUCCESS: "",
        SMS_RES_FAILURE: ""
      },

      // FORM
      schema: {
        fields: [
          {
            type: "input",
            inputType: "hidden",
           // label: "SMS ID",
            model: "SETTING_SMS_ID",
          },
          {
            type: "input",
            inputType: "text",
            label: "HTTP URL",
            model: "SMS_HTTP_URL",
            required: true,
            validator: "string",
            placeholder: "http://www.smsserver.com/sendsms"
          },
          {
            type: "input",
            inputType: "text",
            label: "HTTP Parameters",
            model: "SMS_HTTP_PARAM",
            required: true,
            validator: "string",
            placeholder: "toNumber=6[Your Number here]&text=Your message here"
          },
          {
            type: "input",
            inputType: "text",
            label: "Request Headers",
            model: "SMS_REQ_HEADER",
           // required: true,
          //  validator: "string",
            placeholder:
              "context-Type: application/jason,Authorization:Basic QWxhZGRpbjpvcGy"
          },
          {
            type: "input",
            inputType: "text",
            label: "Success Responses",
            model: "SMS_RES_SUCCESS",
            styleClasses: "ml-3 col-md-5"
          },
          {
            type: "input",
            inputType: "text",
            label: "Failure Responses",
            model: "SMS_RES_FAILURE",
            styleClasses: "col-md-6"
          }
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
<style>
.textcolor{
  color: green;
  font-weight: bold;
}
.textcolorerror{
   color: red;
  font-weight: bold;
}
</style>
