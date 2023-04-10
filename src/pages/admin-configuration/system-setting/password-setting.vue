<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">Password Settings</h4>
      </div>

      <!-- 2 -->
      <va-card class="ml-4 col-lg-10 my-1 px-1">
        <h5><i class="fa fa-key"></i>&nbsp;&nbsp;<b> Password </b></h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>Password Characteristic</span>
            <button
              v-if="visiblePassCharacter == false"
              v-b-toggle.collapse-4
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visiblePassCharacter == true"
              v-b-toggle.collapse-4
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-4"
              class="mt-4"
              v-model="visiblePassCharacter"
            >
              <va-card>
                <br />
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="selectedMinLength"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Minimum Password Length</span
                          >
                          <input
                             :disabled="this.selectedMinLength == false"
                             v-model="passwordSetting.MIN_LENGTH"
                             type="text"
                             placeholder="0"
                             @keypress="onlyNumber"
                             @change="checkNumber"
                             class="col-2 form-control form-control-md"
                          />
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="selectedMaxLength"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Maximum Password Length</span
                          >
                          <input
                            :disabled="this.selectedMaxLength == false"
                            v-model="passwordSetting.MAX_LENGTH"
                            type="text"
                            placeholder="0"
                            @keypress="onlyNumber"
                            @change="checkNumber"
                            class="col-2 form-control form-control-md"
                          />
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="passwordSetting.UPPERCASE_LOWERCASE"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Uppercase and Lowercase Letters</span
                          >
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="passwordSetting.ALPHANUMERIC"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Alphanumeric</span
                          >
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="passwordSetting.SPECIAL_CHARACTERS"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Special Characters " _ "</span
                          >
                        </div>
                      </div>
                      <br />
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" >
                    <button
                      @click="setPasswordSetting"
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md buttonsave"
                    >
                      <i class="fa fa-save" />&nbsp; SAVE
                    </button>
                  </td>
                </tr>
              </va-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <span>Password History</span>
            <button
              v-if="visiblePassHistory == false"
              v-b-toggle.collapse-5
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visiblePassHistory == true"
              v-b-toggle.collapse-5
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-5"
              class="mt-4"
              v-model="visiblePassHistory"
            >
              <va-card >
                <tr>
                  <td colspan="2" >
                    <div class="row ">
                      <div class="ml-4 col-md-12 historyarea">
                        <span class="col mt-1 description">History Limit</span>
                        <input
                          v-model="model.PASSWORD"
                          type="text"
                          placeholder="0"
                          @keypress="onlyNumber"
                          class="float-right col-7 form-control form-control-md"
                        />
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      @click="submitHistory"
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md buttonsave"
                    >
                      <i class="fa fa-save" />&nbsp; SAVE
                    </button>
                  </td>
                </tr>
              </va-card>
            </b-collapse>
            <hr />
          </div>

        <!--  <div>
            <span>Default Password</span>
            <button
              v-if="visibleDefaultPass == false"
              v-b-toggle.collapse-6
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleDefaultPass == true"
              v-b-toggle.collapse-6
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-6"
              class="mt-4"
              v-model="visibleDefaultPass"
            >
              <va-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12 historyarea">
                        <span class="col mt-1 description"
                          >Set default password value</span
                        >
                        <input
                          v-model="model.PASSWORD_DEFAULT_VALUE"
                          type="text"
                          placeholder="0"
                          @keypress="onlyNumber"
                          class="float-right col-5 form-control form-control-md"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <br />
                <br />
                <tr>
                  <td colspan="2">
                    <button
                      @click="submitDefault"
                      type="submit"
                      class="ml-2 float-right btn btn-primary btn-fill btn-md buttonsave"
                    >
                      <i class="fa fa-save" />&nbsp; SAVE
                    </button>
                  </td>
                </tr>
              </va-card>
            </b-collapse>
            <hr />
          </div> -->

          <div>
            <span>Security Questions</span>
            <button
              v-if="visibleSecurityQuestions == false"
              v-b-toggle.collapse-7
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleSecurityQuestions == true"
              v-b-toggle.collapse-7
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-7"
              class="mt-4"
              v-model="visibleSecurityQuestions">
              <va-card>
                    <div class="row">
                      <div class="ml-4 col-md-12 historyarea">
                        <vue-form-generator
                        :model="model"
                        :schema="addQuestion"
                        :options="formOptions"
                        ref="exceptionForm"
                        />
                      </div>
                    </div>
                    <button
                      @click="submitQuestion"
                      type="submit"
                      class="ml-2 float-right btn btn-primary btn-fill btn-md buttonsavequestion"
                    >
                      <i class="fa fa-save" />&nbsp; SAVE
                    </button>
                     <vudal name="simpleModalEdit" class="widthModal">
                        <div class="header">
                            Edit Question
                        <i class="close icon">&times;</i>
                        <br />
                        </div>
                        <div class="content">
                            <vue-form-generator
                            :model="model"
                            :schema="editQuestion"
                            :options="formOptions"
                            />
                        </div>
                        <div class="actions">
                          <button
                          type="button"
                          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                          >
                          <i class="fa fa-times" /> &nbsp; Close
                          </button>
                          <button
                          @click="updateQuestion"
                          type="button"
                          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
                          >
                          <i class="fa fa-edit" /> &nbsp; Edit
                          </button>
                        </div>
                    </vudal>
                    <div class="data-list">
                       <h4 class="card-title">List of Security Questions</h4>
                        <va-data-table
                          :fields="fields"
                          :data="filteredDataQuestion"
                          :per-page="parseInt(perPage)"
                          :datacount="questionListCount"
                          :dataperpage="parseInt(perPage)"
                          clickable
                        >
                        <template slot="no" slot-scope="row">
                        {{ row.rowIndex + 1 }}
                        </template>

                        <template slot="actions" slot-scope="props">
                        <h4 class="mt-2">
                        <span
                        v-b-tooltip.hover
                        title="edit"
                        v-on:click="showEditModal(props.rowData)"
                        class="badge badge-primary mr-2"
                        >
                        <i class="fa fa-edit"></i
                        ></span>
                        <span
                        v-b-tooltip.hover
                        title="delete"
                        v-on:click="deleteQuestion(props.rowData)"
                        class="badge badge-danger mr-1"
                        >
                        <i class="fa fa-trash"></i
                        ></span>
                        </h4>
                        </template>
                        </va-data-table>
                        </div>
              <!-- <div class="flex xs12 md float-right"> -->

              </va-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>

import Vue from "vue";
import Vudal from "vudal";
import Spacing from "../../../components/ui/spacing/Spacing.vue";
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule0 from "../../../app/module0/services02";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Spacing,Vudal},
  mounted() {
    this.getPasswordSetting();
   // this.getUserIdSetting();
    this.getPasswordHistory();
    this.getPasswordDefault();
    this.getSecurityQuestion();
  },
  computed: {
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "SECURITY_QUESTION",
          title: "Question",
          sortField: "SECURITY_QUESTION"
        },
        {
          name: "__slot:actions",
          title: "Action",
          dataClass: "inline"
        }
      ];
    },
    filteredDataQuestion() {
    if (!this.term || this.term.length < 1) {
    return this.listQuestion;
    }

    // return this.users.filter(item => {
    //   return item.company.toLowerCase().startsWith(this.term.toLowerCase());
    // });
    }
  },
  watch: {
    selectedMinLength: function (val) {
      if (val == false) {
        this.passwordSetting.MIN_LENGTH = 0;
      }
    },
    selectedMaxLength: function (val) {
      if (val == false) {
        this.passwordSetting.MAX_LENGTH = 0;
      }
    },
  },
  // DATA SCHEMA
  data() {
    return {
      field: [],
      term: null,
      perPage: 10,
      perPageOptions: ["4", "6", "10", "20"],
      listQuestion: [],
      questionListCount:null,
      
      //currentPage: 1,
      passwordSetting: {
        SETTING_PASSWORD_ID: null,
        MIN_LENGTH: 0,
        MAX_LENGTH: 0,
        UPPERCASE_LOWERCASE: false,
        ALPHANUMERIC: false,
        SPECIAL_CHARACTERS: false,
        updatePasswordSetting: false,
      },
      model: {
        PASSWORD: "",
        PASSWORD_DEFAULT_VALUE: "",
      },
      selectedMinLength: false,
      selectedMaxLength: false,

      userIdSetting: {
        SETTING_USERID_ID: null,
        MIN_LENGTH: 0,
        MAX_LENGTH: 0,
        UPPERCASE_LOWERCASE: false,
        ALPHANUMERIC: false,
        SPECIAL_CHARACTERS: false,
        updateUseridSetting: false,
      },
       formquestion: {
        SECURITY_ID: "",
        SECURITY_QUESTION: "",
      },

      dataToggle: true,

      visibleUserId: false,

      visiblePassCharacter: false,
      visiblePassHistory: false,
      visibleDefaultPass: false,
      visibleSecurityQuestions: false,
      HistoryList: [],
      DefaultList: [],

      addQuestion: {
        groups: [
          {
           // styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Set Questions",
                model: "modelAdd.SECURITY_QUESTION",
                placeholder: "Enter Questions",
                required: true,
                validator: "string",
                styleClasses: "col-md-12 questionclass"
              }
            ]
          }
        ]
      },
       editQuestion: {
        groups: [
          {
           // styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Set Questions",
                model: "modelEdit.SECURITY_QUESTION",
                placeholder: "Enter Questions",
                required: true,
                validator: "string",
                styleClasses: "col-md-12 questionclass"
              }
            ]
          }
        ]
      },
      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "modelFilter.SECURITY_QUESTION",
                label: "Name",
                styleClasses: "col-md-6"
              }
            ]
          }
        ]
      },
   formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true
      },
   model: {
         SECURITY_QUESTION: "",

        modelAdd: {
          SECURITY_QUESTION: "",
        },

        modelEdit: {
          SECURITY_ID: null,
         SECURITY_QUESTION: "",
        },

        modelFilter: {
         SECURITY_QUESTION: "",
        }
      },
    }
  },
  methods: {
    onlyNumber ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if(keyCode < 48 || keyCode > 57) { // 46 is dot
        $event.preventDefault();
        }
    },
     checkNumber(){
        let minNumber=this.passwordSetting.MIN_LENGTH;
        let maxNumber=this.passwordSetting.MAX_LENGTH;
        console.log("Min=",this.passwordSetting.MIN_LENGTH);
        console.log("Max=",this.passwordSetting.MAX_LENGTH);
        if(minNumber >= maxNumber)
        {
          alert("Minimum Length Always less than Maximum Length");
          this.passwordSetting.MIN_LENGTH=3;
          this.passwordSetting.MAX_LENGTH=12;
        }

      },
    async setPasswordSetting() {
       let minNumber=this.passwordSetting.MIN_LENGTH;
        let maxNumber=this.passwordSetting.MAX_LENGTH;
        console.log("Min=",this.passwordSetting.MIN_LENGTH);
        console.log("Max=",this.passwordSetting.MAX_LENGTH);
        if(minNumber >= maxNumber)
        {
          alert("Minimum Length Always less than Maximum Length");
          this.passwordSetting.MIN_LENGTH=3;
          this.passwordSetting.MAX_LENGTH=12;
        }
        else{
            const data = new FormData();
            data.append(
            "SETTING_PASSWORD_ID",
            this.passwordSetting.SETTING_PASSWORD_ID
            );
            data.append("MIN_LENGTH", this.passwordSetting.MIN_LENGTH);
            data.append("MAX_LENGTH", this.passwordSetting.MAX_LENGTH);
            if(this.passwordSetting.UPPERCASE_LOWERCASE == true)
            {
              data.append("UPPERCASE_LOWERCASE",1);
            }
            else{
             data.append("UPPERCASE_LOWERCASE",0);
            }
            if(this.passwordSetting.ALPHANUMERIC == true)
            {
              data.append("ALPHANUMERIC",1);
            }
            else{
             data.append("ALPHANUMERIC",0);
            }
            if(this.passwordSetting.SPECIAL_CHARACTERS == true)
            {
              data.append("SPECIAL_CHARACTERS",1);
            }
            else{
              data.append("SPECIAL_CHARACTERS",0);
            }
           
          //  data.append(
          //   "UPPERCASE_LOWERCASE",
          //   this.passwordSetting.UPPERCASE_LOWERCASE
          //   );
          //   data.append("ALPHANUMERIC", this.passwordSetting.ALPHANUMERIC);
          //   data.append(
          //   "SPECIAL_CHARACTERS",
          //   this.passwordSetting.SPECIAL_CHARACTERS
          //   );

            if (this.passwordSetting.updatePasswordSetting == false) {
            const response = await services06Module0.setPasswordSetting(data);
            this.getPasswordSetting();
            } else {
            data.append("_method", "PUT");
            const response = await services06Module0.updatePasswordSetting(data);
            }
      }
    },
    async getSecurityQuestion() {
      const response = await services06Module0.getSecurityQuestionAll();
      this.listQuestion = response;
      this.questionListCount=this.listQuestion.length;
    },

  

    async getUserIdSetting() {
      const response = await services06Module0.getUserIdSetting(1);
      if (response != null) {
        this.userIdSetting = response;
        // alert(JSON.stringify(this.userIdSetting));
        this.userIdSetting.updateUseridSetting = true;
        response.MIN_LENGTH != null
          ? (this.selectedMinLength = true)
          : (this.selectedMinLength = false);
        response.MAX_LENGTH != null
          ? (this.selectedMaxLength = true)
          : (this.selectedMaxLength = false);
      } else {
        this.passwordSetting.updateUseridSetting = false;
      }
    },

    async getPasswordSetting() {
      const response = await services06Module0.getPasswordSetting(1);
      if (response != null) {
        this.passwordSetting = response;
      if(response.UPPERCASE_LOWERCASE == 1)
      {
        this.passwordSetting.UPPERCASE_LOWERCASE = true;
      }
      else{
        this.passwordSetting.UPPERCASE_LOWERCASE = false;
      }
      if(response.ALPHANUMERIC == 1)
      {
        this.passwordSetting.ALPHANUMERIC = true;
      }
      else{
        this.passwordSetting.ALPHANUMERIC = false;
      }
      if(response.SPECIAL_CHARACTERS == 1)
      {
        this.passwordSetting.SPECIAL_CHARACTERS = true;
      }
      else{
        this.passwordSetting.SPECIAL_CHARACTERS = false;
      }

        this.passwordSetting.updatePasswordSetting = true;
        response.MIN_LENGTH != null
          ? (this.selectedMinLength = true)
          : (this.selectedMinLength = false);
        response.MAX_LENGTH != null
          ? (this.selectedMaxLength = true)
          : (this.selectedMaxLength = false);
      } else {
        this.passwordSetting.updatePasswordSetting = false;
      }
    },

    getPasswordHistory: async function () {
      const response = await servicesModule0.getPasswordHistoryById();
      this.HistoryList = response;
      this.model.PASSWORD = response.PASSWORD;
    },
    async submitHistory() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("PASSWORD", this.model.PASSWORD);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createPasswordHistory(data);
        this.getPasswordHistory();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
    async submitQuestion() {
      if (this.$refs.exceptionForm.validate()) {
        let app = this;
        var param = app.model;
        const data = new FormData();
        data.append("SECURITY_QUESTION", this.model.modelAdd.SECURITY_QUESTION);
        try {
          // eslint-disable-next-line no-unused-vars
         const response = await servicesModule0.createSecurityQuestion(data);
          this.getSecurityQuestion();
          // this.$modals.simpleModal.$hide()
        } catch (error) {
          console.log(error);
        }
      }
    },
     async showEditModal(data) {
      const response = await servicesModule0.getSecurityQuestionById(
        data.SECURITY_ID
      );
      this.$modals.simpleModalEdit.$show();
      this.model.modelEdit = response;
    },
     async updateQuestion() {
      try {
        //alert(this.model.modelEdit.CALENDAR_NAME);
        const data = new FormData();
        data.append(
          "SECURITY_ID",
          this.model.modelEdit.SECURITY_ID
        );
        data.append("SECURITY_QUESTION", this.model.modelEdit.SECURITY_QUESTION);
      //  data.append("_method", "PUT");

        const response = await servicesModule0.updateSecurityQuestion(data);
        this.getSecurityQuestion();
        // this.$modals.simpleModal.$hide();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteQuestion(data) {
    // eslint-disable-next-line no-unused-vars
    const response = await servicesModule0.deleteSecurityQuestion(
    data.SECURITY_ID
    );
    this.getSecurityQuestion();
    },
    getPasswordDefault: async function () {
      const response = await servicesModule0.getPasswordDefaultById();
      this.DefaultList = response;
      this.model.PASSWORD_DEFAULT_VALUE = response.PASSWORD_DEFAULT_VALUE;
    },
    async submitDefault() {
      let app = this;
      var param = app.model;
      const data = new FormData();
      data.append("PASSWORD_DEFAULT_VALUE", this.model.PASSWORD_DEFAULT_VALUE);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await servicesModule0.createPasswordDefault(data);
        this.getPasswordDefault();
        // this.$modals.simpleModal.$hide()
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-layout__main {
  background: #e8e8e8;
}
.buttonsave{
  margin-top: 40px;
}
.buttonsavequestion{
  float: left !important;

}
.historyarea{
  margin-top:10px;
}
.vue-form-generator{
  width: 60% !important;
}
.data-list{
  margin-top: 60px;
}
.inline {
  display: inline-flex;
}

.va-data-table__pagination {
  margin-top: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inherit;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: flex-end;
}
.form-group.error .errors{
  float: right;
}
</style>
