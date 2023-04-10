<template>
  <va-card>
    <div class="row">
      <h4 slot="header" class="card-title">Media Management : List of User</h4>
    </div>
    <br>
    <va-card>
        <div>
            <vudal name="simpleModal" class="widthModal">
        <div class="header">
          RESET PASSWORD FOR {{this.model.mediaName }} ?
         </div>

        <div class="actions">
          <button type="button" class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          @click="rejectReset">
            <i class="fa fa-times" /> &nbsp; NO
          </button>
          <button type="button" class="cancel vudal-btn mr-2 btn btn-success btn-fill btn-md"
          @click="approveReset">
            <i class="fa fa-check" /> &nbsp;  YES
          </button>

        </div>
      </vudal>
          <tabs
            :tabs="tabs"
            :currentTab="currentTab"
            :wrapper-class="'default-tabs'"
            :tab-class="'default-tabs__item'"
            :tab-active-class="'default-tabs__item_active'"
            :line-class="'default-tabs__active-line'"
            @onClick="handleClick"
          />
          <div>
            <div v-if="currentTab === 'tab1'">
              <br>
              <br>
              <div>
              <va-data-table
                :fields="newRecordFields"
                :data="newRecordFilteredData"
                no-data-label="No data found"
                :per-page="parseInt(perPage2)"
                :datacount="newRecordCount"
                :dataperpage="parseInt(perPage2)"
                clickable
              >
                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>

                <template slot="actions" slot-scope="props">
                <input
                    type="checkbox"
                    v-model="props.rowData.selected"
                  >
              </template>
              </va-data-table>
              <br>
              <br>
              <div class="float-right">

                  <button
                    @click="rejectRecord"
                    type="button"
                    style="background: #ff4a55; color: #ffffff"
                    class="ml-1 btn btn-fill btn-md"
                  >
                    <i class="fa fa-ban" /> &nbsp; Reject
                  </button>
                  <button
                    @click="approveRecord"
                    type="button"
                    style="background: #87cb16; color: #ffffff"
                    class="ml-1 btn btn-fill btn-md"
                  >
                    <i class="fa fa-paper-plane" /> &nbsp; Approve
                  </button>
              </div>

              </div>
            </div>
            <div v-if="currentTab === 'tab2'">
              <br>
              <div class="row">
                <div class="flex md2 offset--md10">
                  <va-input
                    :value="term"
                    :placeholder="$t('Search')"
                    @input="search"
                    removable
                  >
                    <va-icon name="fa fa-search" slot="prepend" />
                  </va-input>
                </div>
              </div>
              <va-data-table
                :fields="caRecordFields"
                :data="caRecordFilteredData"
                no-data-label="No data found"
                :per-page="parseInt(perPage)"
                :datacount="caRecordCount"
                :dataperpage="parseInt(perPage)"
                clickable
              >

                <template slot="no" slot-scope="row">
                  {{ row.rowIndex + 1 }}
                </template>
                <template slot="resetPin" slot-scope="props">
                <h5 class="mt-1">

                    <span
                      v-if="props.rowData.ISRESET == 1"
                      v-on:click="resetRecord(props.rowData)"
                      v-b-tooltip.hover
                      title="Reset Password Requested"
                      style="color: #ff4a55"
                      class="ml-1 btn btn-fill btn-md"
                    >
                      <i class="fa fa-refresh"></i
                    ></span>
                  </h5>
                </template>

                <template slot="actions" slot-scope="props">
                  <h5 class="mt-1">
                    <span
                      v-b-tooltip.hover
                      title="Delete"
                      v-on:click="deleteRecord(props.rowData)"
                      class="badge badge-danger mr-2"
                    >
                      <i class="fa fa-trash"></i
                    ></span>
                  </h5>
                </template>
              </va-data-table>
            </div>

          </div>
        </div>
      </va-card>
        <br>
        <br>
        <div class="float-left">
                <h5 class="mt-1">
                    <span
                      style="color: #ff4a55"
                      class="ml-1 btn btn-fill btn-md"
                    >
                      <i class="fa fa-refresh"></i
                    ></span> : ( {{ resetCount }} ) user requested for reset password.
                  </h5>
        </div>

    <br />
      <br />
      <br />
      <button
        @click="back"
        type="button"
        class="btn btn-primary btn-fill btn-md"
      >
        <i class="fa fa-step-backward" /> &nbsp; Previous
      </button>
  </va-card>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import { debounce } from "lodash";
import * as services01Module5 from "../../../../app/module5/services01";
import Tabs from "vue-tabs-with-active-line";
import Vudal from "vudal";

const TABS = [
  {
    title: "New Submission",
    value: "tab1",
  },
  {
    title: "Registered User",
    value: "tab2",
  },
];

export default {
  mounted() {
    this.getAllRegisteredUser();
    this.getNewSubmission();
    this.counter();

  },
  components: {Tabs,Vudal },

  methods: {
    // search
    search: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    back() {
      this.$router.go(-1);
    }, // back button

    // getAllRegisteredRecord
    getAllRegisteredUser: async function () {
      const response = await services01Module5.getAllUser();
      this.caRecordList = response;
      this.caRecordCount = this.caRecordList.length;

    },

    getNewSubmission: async function () {
      const response = await services01Module5.getNewSubmission();
      this.newRecordList = response;
      this.newRecordCount = this.newRecordList.length;
    },

    async resetRecord(val) {
      this.$modals.simpleModal.$show();
      this.model.mediaID= val.MEDIA_USERID;
      this.model.mediaName=val.USER_NAME;
    },


    async deleteRecord(data) {
      if (confirm("Are you sure you want to DELETE this user?")) {

        try {
        const response = await services01Module5.deleteUser(data.MEDIA_USERID);
        this.getAllRegisteredUser();
        this.getNewSubmission();

      } catch (error) {
        console.log(error);
      }


      }
    },
    async approveRecord(data) {
      if (confirm("Are you sure you want to APPROVE this submission?")) {
        const data = new FormData();
        this.checkboxArray = [];
          this.newRecordFilteredData.forEach((item) => {
            if (item.selected == true) {
              this.checkboxArray.push(item.MEDIA_USERID);
            }
          });

         //alert(this.checkboxArray);
          data.append("MEDIA_USERID", JSON.stringify(this.checkboxArray));
          data.append("TS_ID", 3 );
          const user = localStorage.getItem("user");
          data.append("APPROVE_BY", JSON.parse(user).user_id);
          data.append("TITLE","New Registration")

        try {
        const response = await services01Module5.updateUser(data);
        this.getAllRegisteredUser();
        this.getNewSubmission();

      } catch (error) {
        console.log(error);
      }


      }
    },
    async rejectRecord(data) {
      if (confirm("Are you sure you want to REJECT this submission?")) {
        const data = new FormData();
        this.checkboxArray = [];
          this.newRecordFilteredData.forEach((item) => {
            if (item.selected == true) {
              this.checkboxArray.push(item.MEDIA_USERID);
            }
          });

         //alert(this.checkboxArray);
          data.append("MEDIA_USERID", JSON.stringify(this.checkboxArray));
          data.append("CONTENT","Your User ID request was rejected by ApplicationAdmin");
          data.append("TITLE","UserID Request Submission")

        try {
        const response = await services01Module5.rejectUser(data);

        this.getAllRegisteredUser();
        this.getNewSubmission();
      } catch (error) {
        console.log(error);
      }


      }
    },

    counter: async function () {
      this.resetCount = await services01Module5.getResetCount();

    },

    rejectReset: async function () {
        if (confirm("Are you sure you want to REJECT this user password?")) {
        const data = new FormData();
        data.append("MEDIA_USERID",this.model.mediaID);
        data.append("CONTENT","Password reset request was rejected by Application Admin.");
        data.append("TITLE","Reset Password Request Submission")


        try {
        const response = await services01Module5.rejectResetPassword(data);
        this.getAllRegisteredUser();
        this.getNewSubmission();
        this.counter();

      } catch (error) {
        console.log(error);
      }


      }
    },
    approveReset: async function () {
         if (confirm("Are you sure you want to RESET this user password?")) {
        const data = new FormData();
        data.append("ISRESET",0);
        data.append("MEDIA_USERID",this.model.mediaID);
        data.append("TITLE","Reset Password Request Submission")


        try {
        const response = await services01Module5.resetUserPassword(data);
        this.getAllRegisteredUser();
        this.getNewSubmission();
        this.counter();

      } catch (error) {
        console.log(error);
      }


      }

    },

  },

  computed: {
    caRecordFields() {
      return [
        {
          name: "__slot:resetPin",
          dataClass: "justify-content-center",
          width: "2%",
        },
        {
          name: "__slot:no",
          title: "NO",
          width: "5%",
        },
        {
          name: "USER_NAME",
          title: "NAME",
          sortField: "USER_NAME",
        },
        {
          name: "COMPANY_NAME",
          title: "COMPANY NAME",
          sortField: "COMPANY_NAME",
        },
        {
          name: "USER_ID",
          title: "USER ID",
          sortField: "USER_ID",
        },
        {
          name: "USER_DESIGNATION",
          title: "DESIGNATION",
          sortField: "USER_DESIGNATION",
        },
        {
          name: "USER_PHONENO",
          title: "CONTACT NUMBER",
          sortField: "USER_PHONENO",
        },
        {
          name: "USER_EMAIL",
          title: "EMAIL",
          sortField: "USER_EMAIL",
        },
        {
          name: "LAST_SEEN_AT",
          title: "LAST SEEN AT",
          sortField: "LAST_SEEN_AT",
        },
        {
          name: "APPROVE_BY",
          title: "APPROVED BY",
          sortField: "APPROVE_BY",
        },
        {
          name: "APPROVE_DATE",
          title: "APPROVED DATE",
          sortField: "APPROVE_DATE",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "3%",
        },
      ];
    },

    // eslint-disable-next-line vue/return-in-computed-property
    caRecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.caRecordList;
      }

      return this.caRecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.COMPANY_NAME.toLowerCase().includes(v) ||
              item.DESIGNATION.toLowerCase().includes(v) ||
              item.CONTACT_NUMBER.includes(v) ||
              item.EMAIL.toLowerCase().includes(v)||
              item.TS_PARAM.toLowerCase().includes(v)||
              item.USER_NAME.toLowerCase().includes(v)
          );
      });
    },

      newRecordFields() {
      return [
        {
          name: "__slot:no",
          title: "NO",
        },
        {
          name: "CREATE_TIMESTAMP",
          title: "SUBMISSION DATE",
          sortField: "CREATE_TIMESTAMP",
        },
        {
          name: "USER_NAME",
          title: "NAME",
          sortField: "USER_NAME",
        },
        {
          name: "COMPANY_NAME",
          title: "COMPANY NAME",
          sortField: "COMPANY_NAME",
        },
        {
          name: "USER_ID",
          title: "USER ID",
          sortField: "USER_ID",
        },
        {
          name: "USER_DESIGNATION",
          title: "DESIGNATION",
          sortField: "USER_DESIGNATION",
        },
        {
          name: "USER_PHONENO",
          title: "CONTACT NUMBER",
          sortField: "USER_PHONENO",
        },
        {
          name: "USER_EMAIL",
          title: "EMAIL",
          sortField: "USER_EMAIL",
        },
        {
          name: "TS_PARAM",
          title: "STATUS",
          sortField: "TS_PARAM",
        },

        {
          name: "__slot:actions",
          title: "ACTIONS",
          dataClass: "justify-content-center",
          width: "5%",
        },
      ];
    },

    newRecordFilteredData() {
      if (!this.term || this.term.length < 1) {
        return this.newRecordList;
      }

      return this.newRecordList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.COMPANY_NAME.toLowerCase().includes(v) ||
              item.DESIGNATION.toLowerCase().includes(v) ||
              item.CONTACT_NUMBER.includes(v) ||
              item.EMAIL.toLowerCase().includes(v)||
              item.TS_PARAM.toLowerCase().includes(v)||
              item.USER_NAME.toLowerCase().includes(v)
          );
      });
    },

  },

  data() {
    return {
      header: "",
      field: [],
      term: null,
      perPage: "10",
      currentPage: 1,
      caRecordList: [],
      count: 1,
      caRecordCount: null,
      visibleForm: true,
      resetCount:0,

      newRecordList: [],
      newRecordCount: null,
      perPage2: "10",

      tabs: TABS,
      currentTab: "tab1",

      model: {
          companyName: "",
          designation: "",
          contactNo: "",
          email: "",

          mediaID:"",
          mediaName:"",
      },

      registerNewSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "input",
                inputType: "text",
                model: "companyName",
                label: "Company Name",
                styleClasses: "col-md-6",
                placeholder:"Enter company name",
                required: true,
              },
              {
                type: "input",
                inputType: "text",
                model: "designation",
                label: "Designation",
                styleClasses: "col-md-6",
                placeholder:"Enter designation",
              },
              {
                type: "input",
                inputType: "text",
                model: "contactNo",
                label: "Contact Number",
                styleClasses: "col-md-6",
                placeholder:"Enter contact number",
              },
              {
                type: "input",
                inputType: "email",
                model: "email",
                label: "Email",
                styleClasses: "col-md-6",
                placeholder:"Enter email",
              },
            ],
          },
        ],
      },


      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
};
</script>
<style lang="scss">
.default-tabs {
  position: relative;
  margin: 0 auto;

  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;

    &__active {
      color: black;
    }

    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}

.alignright {
  display: flex;
  justify-content: flex-end;
}

.alignleft {
  display: flex;
  justify-content: flex-start;
}
</style>

<style scoped>
.widthModal {
  width: 80%;
}
</style>
