<template>
  <div id="layoutAuthentication_content">
    <main>
      <div class="container">

        <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-lg-10">
             <h4 slot="header">System Settings</h4>
            </div>
            <div class="col-lg-12">
              <va-card>
                <template slot="header">
                  <div class="row">
                    <div class="col">
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
                    <!--vue-form-generator
                      tag="div"
                      :model="model"
                      :schema="schema"
                      :options="formOptions"
                      @model-updated="onModelUpdated"
                      ref="RegForm"
                    -->
                    <vue-form-generator
                      :model="model"
                      :schema="schema"
                      :options="formOptions"
                      ref="ldapForm"
                    />

                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary btn-fill float-left btn-md"
                  >
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                  <div class="float-right">
                    <button
                      @click="testCon"
                      type="button"
                      class="mr-2 btn btn-info btn-fill btn-md"
                    >
                      <i class="fa fa-exchange" /> &nbsp; Test Connection
                    </button>

                    <button
                      @click="submit"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" /> &nbsp; Save
                    </button>
                  </div>

                <!--/form-->
              </va-card>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
//import VueFormGenerator from 'vue-form-generator'
//import 'vue-form-generator/dist/vfg.css'
import * as servicesModule0 from '../../../app/module0/services'

//Vue.use(VueFormGenerator)

export default {
  mounted () {
    this.getLDAPSetting()
  },

  // METHOD
  methods: {
    testLDAPConnection: async function () {

    },
    async testCon () {

    },

    getLDAPSetting: async function () {
      const response = await servicesModule0.getLDAPSettingList()
      if (response !== 'error') {
        // console.log('data : ' + JSON.parse(response.EMAIL_SMTP_PORT))
       /* this.model.LDAP_ATTR_RDN = response.LDAP_ATTR_RDN
        this.model.LDAP_ATTR_UUID = response.LDAP_ATTR_UUID
        this.model.LDAP_USER_OBJ = response.LDAP_USER_OBJ
        this.model.LDAP_CONN_URL = response.LDAP_CONN_URL
        this.model.LDAP_USER_DN = response.LDAP_USER_DN
        this.model.LDAP_USER_FILTER = response.LDAP_USER_FILTER
        this.model.LDAP_SEARCH_SCOPE = response.LDAP_SEARCH_SCOPE
        this.model.LDAP_BIND_TYPE = response.LDAP_BIND_TYPE
        this.model.LDAP_BIND_DN = response.LDAP_BIND_DN
        this.model.LDAP_BIND_CRED = response.LDAP_BIND_CRED*/
      }
    },

    async submit () {
       if(this.$refs.ldapForm.validate()) {
          console.log("Precheck=");
          let app = this;
        var param = app.model;
        const data = new FormData()
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
          // eslint-disable-next-line no-unused-vars
          const response = await servicesModule0.createLDAPSetting(data)
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
      model: {
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
            placeholder: 'ldap://192.168.3.199:389',
            required: true,
            validator: "string",

          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Usern DN',
            model: 'LDAP_USER_DN',
            placeholder: 'OU=HR Admin,DC=ad,DC=vn,DC=my',
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
            placeholder: 'CN=dummy,OU=HR Admin,DC=ad,DC=vn,DC=my',
            required: true,
            validator: "string",

          },
          {
            type: 'input',
            inputType: 'password',
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
       // validateAfterLoad: false,
        validateAfterChanged: true,
       // validateAsync: true,
      },
    }
  },
}
</script>
