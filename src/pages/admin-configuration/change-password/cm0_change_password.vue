<template>
  <div class="card-body">
    <div class="row justify-content-center">
        <!-- 2 -->
        <va-card class="ml-4 col-lg-10 my-1 px-1">
          <loder v-show="isLoader" />
          <div class="text-center text-danger my-2" v-if="!isDataReady">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
          <div v-else >

            <h5><i class="fa fa-key"></i>&nbsp;&nbsp;<b> CHANGE PASSWORD </b></h5>
            <hr />
            <div class="ml-5">
              </br></br> 
              <div>
                <div class="row mb-2">
                <vue-form-generator
                    :model="model"
                    :schema="schema"
                    :options="formOptions"
                    ref="changePass"
                >
                </vue-form-generator>
                </div>
                </br></br>
                <div class="row justify--left">
                <va-button v-on:click="cgangePassword" class="my-0"
                    >Change Password</va-button
                >
                </div>
                </br></br>
            </div>
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
import * as servicesModule04 from "../../../app/module0/services04";
import loder from "../../request_loader";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Spacing,Vudal,loder},
  mounted() {
    this.getPasswordSetting();
    this.getPurgeData();
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
      isLoader: false,
      isDataReady:false,
        passwordSetting: "",
        schema: {
            groups: [
            {
                styleClasses: "row",
                fields: [
                    {
                        type: "input",
                        inputType: "password",
                        label: "Old Password",
                        model: "OLD_PASSWORD",
                        placeholder: "Please enter old password",
                        required: true,
                        styleClasses: "col-md-12",
                        validator: ["string", this.validatePassword],
                    },
                    {
                        type: "input",
                        inputType: "password",
                        label: "New Password",
                        model: "USER_PASSWORD",
                        placeholder: "Please enter new password",
                        required: true,
                        validator: ["string", this.validatePassword],
                        styleClasses: "col-md-12"
                    },
                    {
                        type: "input",
                        inputType: "password",
                        label: "Confirm Password",
                        model: "CONFIRM_PASSWORD",
                        placeholder: "Confirm password",
                        required: true,
                        styleClasses: "col-md-12",
                        validator: ["string", this.isEqualTo]
                    },
                ]
            }
            ]
        },
        model: {
            OLD_PASSWORD: "",
            USER_PASSWORD: "",
            CONFIRM_PASSWORD: "",
        },
        formOptions: {
            // validationErrorClass: "has-error",
            // validationSuccessClass: "has-`success`",
            validateAfterChanged: true
        },

    }
  },
  methods: {

    async getPasswordSetting() {
      console.log("get pass sett");
      const response = await services06Module0.getPasswordSetting(0);
      this.passwordSetting = response;
      this.isDataReady = true; // Kill component loader
    },
    validatePassword(value) { 
        //alert();
        if (this.passwordSetting.MIN_LENGTH > (value.length)) {
            let expression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
            if (!expression.test(value)) {
                return [
                    "Password must contain at least " + this.passwordSetting.MIN_LENGTH + " character"
                ];
            }
        }else if(this.passwordSetting.MAX_LENGTH < (value.length)){
            let expression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
            if (!expression.test(value)) {
                return [
                    "Password must contain maximum " + this.passwordSetting.MAX_LENGTH + " character"
                ];
            }
        }

      if (
        this.passwordSetting.UPPERCASE_LOWERCASE &&
        this.passwordSetting.SPECIAL_CHARACTERS &&
        this.passwordSetting.ALPHANUMERIC
      ) {
        let expression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
        if (!expression.test(value)) {
          return [
            "Password must contain at least one uppercase letter, one lower case letter, one number and one character"
          ];
        }
      } else if (
        this.passwordSetting.UPPERCASE_LOWERCASE &&
        this.passwordSetting.SPECIAL_CHARACTERS &&
        !this.passwordSetting.ALPHANUMERIC
      ) {
        let expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
        if (!expression.test(value)) {
          return [
            "Password must contain at least one uppercase letter, one lower case letter, and one character"
          ];
        }
      } else if (
        this.passwordSetting.UPPERCASE_LOWERCASE &&
        !this.passwordSetting.SPECIAL_CHARACTERS &&
        !this.passwordSetting.ALPHANUMERIC
      ) {
        let expression = /^(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9#?!@$%^&*-]+)$/;
        if (!expression.test(value)) {
          return [
            "Password must contain at least one uppercase letter and one lower case letter"
          ];
        }
      } else if (
        this.passwordSetting.UPPERCASE_LOWERCASE &&
        !this.passwordSetting.SPECIAL_CHARACTERS &&
        this.passwordSetting.ALPHANUMERIC
      ) {
        let expression = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9#?!@$%^&*-]+)$/;
        if (!expression.test(value)) {
          return [
            "Password must contain at least one number, one uppercase letter and one lower case letter"
          ];
        }
      } else if (
        !this.passwordSetting.UPPERCASE_LOWERCASE &&
        !this.passwordSetting.SPECIAL_CHARACTERS &&
        this.passwordSetting.ALPHANUMERIC
      ) {
        let expression = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9#?!@$%^&*-]+)$/;
        if (!expression.test(value)) {
          return ["Password must contain at least one number and one letter"];
        }
      } else if (
        !this.passwordSetting.UPPERCASE_LOWERCASE &&
        this.passwordSetting.SPECIAL_CHARACTERS &&
        this.passwordSetting.ALPHANUMERIC
      ) {
        let expression = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
        if (!expression.test(value)) {
          return [
            "Password must contain at least one number, one letter and one special character"
          ];
        }
      } else if (
        !this.passwordSetting.UPPERCASE_LOWERCASE &&
        !this.passwordSetting.SPECIAL_CHARACTERS &&
        !this.passwordSetting.ALPHANUMERIC
      ) {
        let expression = /^([a-zA-Z0-9#?!@$%^&*-]+)$/;
        if (!expression.test(value)) {
          return [""];
        }
      } else if (
        !this.passwordSetting.UPPERCASE_LOWERCASE &&
        this.passwordSetting.SPECIAL_CHARACTERS &&
        !this.passwordSetting.ALPHANUMERIC
      ) {
        let expression = /^(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
        if (!expression.test(value)) {
          return ["Password must contain at least one special character"];
        }
      }
      //** must contain letter only (lowercase and uppercase) */
      // let expression1 = /^[a-zA-Z]+$/;
      // let expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/;
      // //** must contain at least one uppercase letter, one lower case letter and one number */
      // let expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character */
      // let expression5 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      // let expression6 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/;
    },
    isEqualTo(value, field, model) {
      console.log(value);
      if (value != this.model.USER_PASSWORD) {
        return ["Password do not match"];
      }
    },

    async cgangePassword() {
      if (this.$refs.changePass.validate()) {
          if (confirm("Are you sure you want to change password ?")){

            this.isLoader = true; // Loder
            const data = new FormData();
            data.append("oldPassword", this.model.OLD_PASSWORD);
            data.append("newPassword", this.model.USER_PASSWORD);
            data.append("confirmation", this.model.CONFIRM_PASSWORD);
            
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await servicesModule04.changePassword(data);
                this.resetData();
                this.isLoader = false; // Kill Loder
            } catch (error) {
                console.log(error);
            }
          }   
      }  
    },

    resetData(){
        this.model.OLD_PASSWORD = '';
        this.model.USER_PASSWORD = '';
        this.model.CONFIRM_PASSWORD = '';  
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
