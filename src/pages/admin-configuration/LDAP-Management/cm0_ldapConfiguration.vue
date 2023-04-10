<template>
 <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-lg-10">
             <h4 slot="header">System Settings</h4>
            </div>
              <va-card class="ml-4 col-lg-10 my-1 px-1">
                  <vudal name="simpleModalTestConnection" class="widthModal">
                <div class="header">LDAP Test Connection<i class="close icon">&times;</i></div>
                <div class="content">
                  <div v-if="this.modalStatus == 200">
                        <span class="textcolor">LDAP successfully tested and able to connect.</span>
                  </div>
                  <div v-else-if="this.modalStatus == 400">
                        <span class="textcolorerror">LDAP test un-successful to connect.</span>
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
                <template slot="header">
                  <div class="row">
                    <div class="col header-col">
                      <h4 class="card-title">LDAP-Active Directory Configuration</h4>
                    </div>
                    <div class="col float-right">
                      <div class="float-right">
                        <h5>
                          <b-badge
                            v-b-toggle.collapse-1
                            class="mr-1"
                            variant="primary"
                          >
                            <i class="fa fa-info"></i>
                          </b-badge>

                        </h5>
                      </div>
                    </div>
                  </div>
                  <b-collapse id="collapse-1" class="ml-1">
                    <va-card style="background-color: lightgrey;">
                      <table>
                        <tr>
                          <td><b>CN</b></td>
                          <td>=</td>
                          <td>Common Name</td>
                        </tr>
                        <tr>
                          <td><b>OU</b></td>
                          <td>=</td>
                          <td>Organizational Unit</td>
                        </tr>
                        <tr>
                          <td><b>DC</b></td>
                          <td>=</td>
                          <td> Domain Component</td>
                        </tr>
                      </table>

                    </va-card>
                  </b-collapse>
                </template>
                <!--form class="ml-2" v-on:submit.prevent="adsetting"-->
                  <div class="form-group">
                    <vue-form-generator
                      :model="model"
                      :schema="schema"
                      :options="formOptions"
                      ref="ldapForm"
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
                      @click="testCon"
                      type="button"
                      class="mr-2 btn btn-info btn-fill btn-md">
                      <i class="fa fa-exchange" /> &nbsp; Test Connection
                    </button>

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
//import 'vue-form-generator/dist/vfg.css'
import Vudal from 'vudal'
import * as servicesModule0 from '../../../app/module0/services'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

//Vue.use(VueFormGenerator)

export default {
  mounted () {
    this.getLDAPSetting()
  },
  components: {
    Vudal,
    PulseLoader
  },
  // METHOD
  methods: {
      back() {
         this.$router.push("/fimm/integration-setting");
      },
    testLDAPConnection: async function () {

    },
    async testCon () {
       this.$modals.simpleModalTestConnection.$show();
       const data = new FormData()
          data.append('SETTING_IDAP_ID', this.model.SETTING_IDAP_ID)
          data.append('LDAP_ATTR_RDN', this.model.LDAP_ATTR_RDN)
          data.append('LDAP_ATTR_UUID', this.model.LDAP_ATTR_UUID)
          data.append('LDAP_USER_OBJ', this.model.LDAP_USER_OBJ)
          data.append('LDAP_CONN_URL', this.model.LDAP_CONN_URL)
          data.append('LDAP_USER_DN', this.model.LDAP_USER_DN)
          data.append('LDAP_USER_FILTER', this.model.LDAP_USER_FILTER)
          data.append('LDAP_SEARCH_SCOPE', this.model.LDAP_SEARCH_SCOPE)
          data.append('LDAP_BIND_TYPE', this.model.LDAP_BIND_TYPE)
          data.append('LDAP_BIND_DN', this.model.LDAP_BIND_DN)
          data.append('LDAP_BIND_CRED', this.model.LDAP_BIND_CRED)
          this.modalmessage = '';
          await servicesModule0.getLDAPTestConnection(data)
          .then(response =>{
            console.log("LDAP=",response.message);
            this.modalmessage = response.message;
            this.modalStatus = response.status;
        });
    },

    getLDAPSetting: async function () {
      const response = await servicesModule0.getLDAPSettingList()
      console.log('LDAP data1 :', response);
      if (response !== 'error') {
        this.model.SETTING_IDAP_ID = response.SETTING_IDAP_ID
        this.model.LDAP_ATTR_RDN = response.LDAP_ATTR_RDN
        this.model.LDAP_ATTR_UUID = response.LDAP_ATTR_UUID
        this.model.LDAP_USER_OBJ = response.LDAP_USER_OBJ
        this.model.LDAP_CONN_URL = response.LDAP_CONN_URL
        this.model.LDAP_USER_DN = response.LDAP_USER_DN
        this.model.LDAP_USER_FILTER = response.LDAP_USER_FILTER
        this.model.LDAP_SEARCH_SCOPE = response.LDAP_SEARCH_SCOPE
        this.model.LDAP_BIND_TYPE = response.LDAP_BIND_TYPE
        this.model.LDAP_BIND_DN = response.LDAP_BIND_DN
        this.model.LDAP_BIND_CRED = response.LDAP_BIND_CRED
      }
    },

    async submit () {
       if(this.$refs.ldapForm.validate()) {
        const data = new FormData()
        data.append('SETTING_IDAP_ID', this.model.SETTING_IDAP_ID)
        data.append('LDAP_ATTR_RDN', this.model.LDAP_ATTR_RDN)
        data.append('LDAP_ATTR_UUID', this.model.LDAP_ATTR_UUID)
        data.append('LDAP_USER_OBJ', this.model.LDAP_USER_OBJ)
        data.append('LDAP_CONN_URL', this.model.LDAP_CONN_URL)
        data.append('LDAP_USER_DN', this.model.LDAP_USER_DN)
        data.append('LDAP_USER_FILTER', this.model.LDAP_USER_FILTER)
        data.append('LDAP_SEARCH_SCOPE', this.model.LDAP_SEARCH_SCOPE)
        data.append('LDAP_BIND_TYPE', this.model.LDAP_BIND_TYPE)
        data.append('LDAP_BIND_DN', this.model.LDAP_BIND_DN)
        data.append('LDAP_BIND_CRED', this.model.LDAP_BIND_CRED)
        try {
           if(this.model.SETTING_IDAP_ID !== ''){
              console.log("Update");
              const response = await servicesModule0.updateLDAPSetting(data)
           }
           else{
              console.log("Create");
              const response = await servicesModule0.createLDAPSetting(data)
           }
          this.getLDAPSetting()
          //this.$modals.simpleModal.$hide()
        } catch (error) {
          console.log(error)
        }
      }
    },
  },

  data () {
    return {
      editMode:false,
      modalMessage: '',
      modalStatus: 0,
      model: {
          SETTING_IDAP_ID: "",
          LDAP_ATTR_RDN: "",
          LDAP_ATTR_UUID: "",
          LDAP_USER_OBJ: "",
          LDAP_CONN_URL: "",
          LDAP_USER_DN: "",
          LDAP_USER_FILTER: "",
          LDAP_SEARCH_SCOPE: "",
          LDAP_BIND_TYPE: "",
          LDAP_BIND_DN: "",
          LDAP_BIND_CRED: "",
      },
      schema: {
        groups: [
        {
        fields: [
           {
            type: 'input',
            inputType: 'hidden',
          //  label: 'SETTING ID',
            model: 'SETTING_IDAP_ID',
           // required: true,
           // validator: "in",
             //readonly: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'RDN LDAP Attribute',
            model: 'LDAP_ATTR_RDN',
            placeholder: 'cn',
            required: true,
            validator: "string",
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'UUID LDAP Attribute',
            model: 'LDAP_ATTR_UUID',
            placeholder: 'objectGUID',
            required: true,
            validator: "string",
          },
          {
            type: 'input',
            inputType: 'Text',
            label: 'User Object Classess',
            model: 'LDAP_USER_OBJ',
            placeholder: 'person,organizationalPerson,user',
            required: true,
            validator: "string",

          },
          {
            type: 'input',
            inputType: 'Text',
            label: 'Connection URL',
            model: 'LDAP_CONN_URL',
            placeholder: 'ldap://192.168.104.88:389',
            required: true,
            validator: "string",

          },
          {
            type: 'input',
            inputType: 'text',
            label: 'User DN',
            model: 'LDAP_USER_DN',
            placeholder: 'uid=lfcs or ou=IT',
            required: true,
            validator: "string",

          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Custom User LDAP Filter',
            model: 'LDAP_USER_FILTER',
            placeholder: 'LDAP Filter',

          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Search Scope',
            model: 'LDAP_SEARCH_SCOPE',
            placeholder: 'One Level',

          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Bind Type',
            model: 'LDAP_BIND_TYPE',
            placeholder: 'simple',
            required: true,
            validator: "string",

          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Bind DN',
            model: 'LDAP_BIND_DN',
            placeholder: 'DC=fimm,DC=net',
            required: true,
            validator: "string",

          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Bind Credential',
            model: 'LDAP_BIND_CRED',
            placeholder: '123456',
            required: true,
            validator: "string",

          },

        ],
       }
      ]
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.header-col{
  margin: 20px 0px 30px 0px;
}
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
</style>
