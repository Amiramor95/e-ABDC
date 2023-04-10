<template>
        <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-lg-10">
             <h4 slot="header">System Settings</h4>
            </div>
               
              <va-card class="ml-4 col-lg-10 my-1 px-1">
                <vudal name="simpleModalTestConnection" class="widthModal">
                <div class="header">Email Notification<i class="close icon">&times;</i></div>
                <div class="content">
                  <div v-if="this.modalmessage == 200">
                        <span class="textcolor">Email Server Connection Successful</span>
                  </div>
                   <div v-else-if="this.modalmessage == 'error'">
                     <span class="textcolorerror">Email Server Connection UnSuccessful</span>
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

                <h4 slot="header" class="card-title">Email Notification</h4>
                <div class="ml-3">
                 <div class="form-group">
                    <vue-form-generator
                      :schema="schema"
                      :model="model"
                      :options="formOptions"
                      ref="RegForm" >
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
                       @click="testConnection"
                        type="button" class="mr-2 btn btn-info btn-fill btn-md">
                        <i class="fa fa-exchange" /> &nbsp; Test Connection
                      </button>

                      <button   @click="submitEmailSetting" type="button" class="ml-2 btn btn-primary btn-fill btn-md">
                        <i class="fa fa-save" /> &nbsp; Save
                      </button> 
                    </div>
                </div>
              </va-card>
          </div>
        </div>
</template>
<script>
import 'vue-form-generator/dist/vfg.css'
import Vudal from 'vudal'
import * as servicesModule0 from '../../../app/module0/services'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import loder from "../../request_loader";

export default {

  mounted () {
    this.getEmailSetting()
  },
  components: {
    Vudal,
   PulseLoader,
   loder
  },
  // METHOD
  methods: {
     back() {
         this.$router.push("/fimm/integration-setting");
      },
    getEmailSetting: async function () {
      const response = await servicesModule0.getEmailSettingList()
      if (response !== 'error') {
        // console.log('data : ' + JSON.parse(response.EMAIL_SMTP_PORT))
        this.model.SETTING_EMAIL_ID = response.SETTING_EMAIL_ID
        this.model.EMAIL_SMTP_PORT = response.EMAIL_SMTP_PORT
        this.model.EMAIL_LOGIN_ID = response.EMAIL_LOGIN_ID
        this.model.EMAIL_SMTP_SERVER = response.EMAIL_SMTP_SERVER
        this.model.EMAIL_FROM = response.EMAIL_FROM
        this.model.EMAIL_SECURITY = response.EMAIL_SECURITY
        this.model.EMAIL_LOGIN_PASS = response.EMAIL_LOGIN_PASS
        this.model.EMAIL_LOGIN_PASS_VER1 = response.EMAIL_LOGIN_PASS_VER1
      }
        //this.isDataReady = false;
    },

    async submitEmailSetting () {
      if (this.$refs.RegForm.validate()) {
        const data = new FormData()
        console.log("Email ID=",this.model.SETTING_EMAIL_ID);
        data.append('SETTING_EMAIL_ID', this.model.SETTING_EMAIL_ID)
        data.append('EMAIL_SMTP_PORT', this.model.EMAIL_SMTP_PORT)
        data.append('EMAIL_LOGIN_ID', this.model.EMAIL_LOGIN_ID)
        data.append('EMAIL_SMTP_SERVER', this.model.EMAIL_SMTP_SERVER)
        data.append('EMAIL_FROM', this.model.EMAIL_FROM)
        data.append('EMAIL_SECURITY', this.model.EMAIL_SECURITY)
        data.append('EMAIL_LOGIN_PASS', this.model.EMAIL_LOGIN_PASS)
        data.append('EMAIL_LOGIN_PASS_VER1', this.model.EMAIL_LOGIN_PASS_VER1)
        data.append('NOTIFICATION_TO', this.model.NOTIFICATION_TO)
        try {
          if(this.model.SETTING_EMAIL_ID !== ''){
          console.log("Update");
           const response = await servicesModule0.updateEmailSetting(data)
          }
          else{
            console.log("Create");
            const response = await servicesModule0.createEmailSetting(data)
          }
         
          this.getEmailSetting()
          
        } catch (error) {
          console.log(error)
        }
      }
    },
    async testConnection(){
       if(this.$refs.RegForm.validate()) {
      const data = new FormData()
        //console.log("Email ID=",this.model.SETTING_EMAIL_ID);
        if(this.model.SETTING_EMAIL_ID != '' && this.model.EMAIL_SMTP_PORT != '' && this.model.EMAIL_LOGIN_ID != '' && this.model.EMAIL_SMTP_SERVER != '' && this.model.EMAIL_FROM != '' &&  this.model.NOTIFICATION_TO != '')
        {
         this.$modals.simpleModalTestConnection.$show();
        }
        data.append('SETTING_EMAIL_ID', this.model.SETTING_EMAIL_ID)
        data.append('EMAIL_SMTP_PORT', this.model.EMAIL_SMTP_PORT)
        data.append('EMAIL_LOGIN_ID', this.model.EMAIL_LOGIN_ID)
        data.append('EMAIL_SMTP_SERVER', this.model.EMAIL_SMTP_SERVER)
        data.append('EMAIL_FROM', this.model.EMAIL_FROM)
        data.append('EMAIL_SECURITY', this.model.EMAIL_SECURITY)
        data.append('EMAIL_LOGIN_PASS', this.model.EMAIL_LOGIN_PASS)
        data.append('EMAIL_LOGIN_PASS_VER1', this.model.EMAIL_LOGIN_PASS_VER1)
        data.append('NOTIFICATION_TO', this.model.NOTIFICATION_TO)
       // console.log("Response=", response);
       try {
       
        this.modalmessage = '';
        await servicesModule0.testConnectionEmailSetting(data)
        .then(response =>{
           console.log("Response=", response);
          this.modalmessage = response;
        })
        } catch (error) {
          console.log(error)
            console.log("exception=",response.exception)
        }
    }
  }
  },

  // DATA SCHEMA
  data () {
    return {
     // editMode:false,
      // DATA MODEL
      isLoader: false,
      isDataReady: false,
      modalmessage: '',

      model: {
        SETTING_EMAIL_ID: '',
        EMAIL_LOGIN_PASS: '',
        EMAIL_LOGIN_ID: '',
        EMAIL_SMTP_SERVER: '',
        EMAIL_FROM: '',
        EMAIL_SMTP_PORT: '',
        EMAIL_SECURITY: 'TLS',
        EMAIL_LOGIN_PASS_VER1: '',
        NOTIFICATION_TO: '',
      },

      // FORM
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'hidden',
            //label: 'SETTING_EMAIL_ID',
            model: 'SETTING_EMAIL_ID',
            //placeholder: 'Account@example.com',

          },
          {
            type: 'input',
            inputType: 'email',
            label: 'Send Email From',
            model: 'EMAIL_FROM',
            placeholder: 'Account@example.com',
            required: true,
            validator: "email",

          },
           {
            type: 'input',
            inputType: 'email',
            label: 'Notification Send To',
            model: 'NOTIFICATION_TO',
            placeholder: 'noreply@fimm.com.my',
            required: true,
            validator: "email",

          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Outgoing SMTP Server',
            model: 'EMAIL_SMTP_SERVER',
            placeholder: 'smtp.example.com',
            required: true,
            validator: "string",

          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Login User ID',
            model: 'EMAIL_LOGIN_ID',
            required: true,
            validator: "string",

          },
          {
            type: 'input',
            inputType: 'Password',
            label: 'Login Password',
            model: 'EMAIL_LOGIN_PASS',
            required: true,
            validator: "string",
          },
          {
            type: 'input',
            inputType: 'Password',
            label: 'Verify Password',
            model: 'EMAIL_LOGIN_PASS_VER1',
            required: true,
            validator: "string",
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'SMTP Port Number',
            model: 'EMAIL_SMTP_PORT',
            required: true,
            validator: "number",
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Security',
            model: 'EMAIL_SECURITY',
            required: true,
            validator: "string",
          },

        ],

      },

      // FORM OPTION
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },

    }
  },
}
</script>
<style>
.v-spinner{
  align-items: center;
}
.textcolor{
  color: green;
  font-weight: bold;
}
.textcolorerror{
   color: red;
  font-weight: bold;
}
/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
    background: radial-gradient(rgba(20, 20, 20,.8), rgba(0, 0, 0, .8));

  background: -webkit-radial-gradient(rgba(20, 20, 20,.8), rgba(0, 0, 0,.8));
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 150ms infinite linear;
  -moz-animation: spinner 150ms infinite linear;
  -ms-animation: spinner 150ms infinite linear;
  -o-animation: spinner 150ms infinite linear;
  animation: spinner 150ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(255,255,255, 0.75) 1.5em 0 0 0, rgba(255,255,255, 0.75) 1.1em 1.1em 0 0, rgba(255,255,255, 0.75) 0 1.5em 0 0, rgba(255,255,255, 0.75) -1.1em 1.1em 0 0, rgba(255,255,255, 0.75) -1.5em 0 0 0, rgba(255,255,255, 0.75) -1.1em -1.1em 0 0, rgba(255,255,255, 0.75) 0 -1.5em 0 0, rgba(255,255,255, 0.75) 1.1em -1.1em 0 0;
box-shadow: rgba(255,255,255, 0.75) 1.5em 0 0 0, rgba(255,255,255, 0.75) 1.1em 1.1em 0 0, rgba(255,255,255, 0.75) 0 1.5em 0 0, rgba(255,255,255, 0.75) -1.1em 1.1em 0 0, rgba(255,255,255, 0.75) -1.5em 0 0 0, rgba(255,255,255, 0.75) -1.1em -1.1em 0 0, rgba(255,255,255, 0.75) 0 -1.5em 0 0, rgba(255,255,255, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
