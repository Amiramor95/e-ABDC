<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <va-card
              class="striped-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
              <h4 slot="header" class="card-title">
                 User Registration Details
              </h4>

              <br />
              <div>
                <tabs
                  :tabs="tabs"
                  :currentTab="currentTab"
                  :wrapper-class="'default-tabs'"
                  :tab-class="'default-tabs__item'"
                  :tab-active-class="'default-tabs__item_active'"
                  :line-class="'default-tabs__active-line'"
                  @onClick="handleClick"
                />
                <div class="content">
                  <div v-if="currentTab === 'tab1'">
                    <div class="ml-4">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 20%">Name</td>
                            <td style="width: 2%">:</td>
                            <td>{{ getDataUser.USER_NAME }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">User ID</td>
                            <td style="width: 2%">:</td>
                            <td>{{ getDataUser.USER_USER_ID }}</td>
                          </tr>
                          <tr>
                            <td>NRIC No</td>
                            <td>:</td>
                            <td>{{ getDataUser.USER_NRIC }}</td>
                          </tr>
                           <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>{{ getDataUser.USER_EMAIL }}</td>
                          </tr>
                          <tr v-if="getDataUser.USER_NRIC == null">
                            <td>Passport No</td>
                            <td>:</td>
                            <td>{{getDataUser.USER_PASS_NUM}}</td>
                          </tr>
                          <tr>
                            <td>Mobile Number</td>
                            <td>:</td>
                            <td>
                              +60{{
                                getDataUser.USER_MOBILE_NUM.substring(0, 1)
                              }}-{{
                                getDataUser.USER_MOBILE_NUM.substring(1, 10)
                              }}
                            </td>
                          </tr>
                           <tr>
                            <td>Office Number</td>
                            <td>:</td>
                            <td>
                              {{
                                getDataUser.USER_OFFICE_NUM
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>Extension Number</td>
                            <td>:</td>
                            <td>{{ getDataUser.USER_EXTENSION_NUM }}</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td>:</td>
                            <td>
                              {{ getDataUser.USER_ADDR_1 }}
                              {{ getDataUser.USER_ADDR_2 }}
                              {{ getDataUser.USER_ADDR_3 }}
                            </td>
                          </tr>
                           <tr>
                            <td>COUNTRY</td>
                            <td>:</td>
                            <td>{{ getDataUser.COUNTRYNAME }}</td>
                          </tr>
                           <tr>
                            <td>State</td>
                            <td>:</td>
                            <td>{{ getDataUser.STATENAME }}</td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>:</td>
                            <td>{{ getDataUser.SET_CITY_NAME }}</td>
                          </tr>
                          <tr>
                            <td>Postcode</td>
                            <td>:</td>
                            <td>{{ getDataUser.POSTCODE_NO }}</td>
                          </tr>
                          <tr>
                            <td>Distributor</td>
                            <td>:</td>
                            <td>{{ getDataUser.DIST_NAME }}</td>
                          </tr>
                          <tr>
                            <td>Distributor Point Name</td>
                            <td>:</td>
                            <td>{{ getDataUser.DIST_POINT_NAME }}</td>
                          </tr>
                          <tr>
                            <td>User Role</td>
                            <td>:</td>
                            <td>{{ getDataUser.DISTRIBUTOR_MANAGE_GROUP_NAME }}</td>
                          </tr>
                          <tr>
                            <td>Status</td>
                            <td>:</td>
                            <td>{{ getDataUser.TS_PARAM }}</td>
                          </tr>

                        </tbody>

                      </table>
                    </div>
                  </div>
                  <div v-if="currentTab === 'tab2'">
                    <div class="ml-4">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td style="width: 20%; vertical-align: top;">Passport Size Photo</td>
                            <td style="width: 2%;vertical-align: top;">:</td>
                            <td v-if ="photoname != ''">
                              <img style="width: 120px; height: 120px" :src=imgUrl />
                               <!-- <VueFileAgent
                            :uploadUrl="'https://example.com'"
                            :uploadHeaders="{}"
                            :downloadable="true"
                            :readonly="true"
                            :multiple="false"
                            :deletable="false"
                            :editable="false"
                            :linkable="true"
                            :accept="'.jpg,jpeg,.png,.gif'"
                            :maxSize="'14MB'"
                            :maxFiles="8"
                            :helpText="'Select files'"
                            :thumbnailSize="120"
                            :theme="'list'"
                            v-model="fileRecordsImage"
                          ></VueFileAgent> -->

                            </td>
                            <td v-else>
                            </td>
                          </tr>
                          <tr>
                            <td  style="width: 20%; vertical-align: top;">Document</td>
                            <td style="width: 2%;vertical-align: top;">:</td>
                            <td  v-if ="docname != ''">
                              <VueFileAgent
                                :uploadUrl="'https://example.com'"
                                :uploadHeaders="{}"
                                :multiple="true"
                                :deletable="true"
                                :editable="false"
                                :linkable="true"
                                :accept="'.pdf'"
                                :maxSize="'2MB'"
                                :maxFiles="8"
                                :helpText="'Select files'"
                            :thumbnailSize="120"
                            :theme="'list'"
                            v-model="fileRecords"
                          ></VueFileAgent>
                            <!-- <VueFileAgent
                            :multiple="false"
                            :deletable="false"
                            :editable="false"
                            :meta="true"
                            :accept="'image/*,video/*,.pdf,.zip'"
                            :maxSize="'14MB'"
                            :maxFiles="8"
                            :helpText="'Select files'"
                            :errorText="{
                            type: 'Please select images, videos, pdf or zip files',
                            size: 'You selected a larger file!',
                            }"
                            :thumbnailSize="120"
                            :theme="'list'"
                            v-model="fileRecords"
                            ></VueFileAgent> -->
                            </td>
                            <td v-else>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                <div class="ml-4">
                <br />
                  <table class="table">
                    <tbody>
                      <tr v-if="getDataUser.APPR_STATUS == 2 || getDataUser.APPR_STATUS == 1" >
                        <td style="text-align:right"> <button  @click="update_profile"  type="button"  class="btn btn-success btn-fill btn-md">
                        <i class="fa fa-edit" /> &nbsp; Update Profile
                        </button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </va-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import Tabs from "vue-tabs-with-active-line";
import * as services6Module1 from "../../../../app/module1/services06";
const TABS = [
  {
    title: "User Profile",
    value: "tab1",
  },
  {
    title: "Upload Documents",
    value: "tab2",
  },

];
export default {
    mounted() {
    this.getUserRegList();
    this.getUserRegListDoc();
    console.log(JSON.stringify(this));
  },
  components: {
    Tabs,
  },

  data() {
    return {
      tabs: TABS,
     // getDataUser: this.$route.params.USERDETAIL,
     getDataUser: {},
      currentTab: "tab1",
      fileRecords: [],
      fileRecordsImage:[],
      imgUrl: '',
      fileLetter:'',
      photoname: '',
      docname: '',


      //FORM
      model: {
        Remark: "",
       // fileRecords: [],
      },
      schema: {
        fields: [
          {
            type: "textArea",
            label: "Remark",
            model: "Remark",
            hint: "Max 500 characters",
            max: 500,
            rows: 4,
            required: true,
            validator: "string",
          },
        ],
      },
       fileViewLetterSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".PDF",
                multiple: true,
                text: "Choose a File",
                model: "fileLetter",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    };
  },

  methods: {
    back() {
      this.$router.push({ name: "distributor-user-management-list" });
    }, // back button
     update_profile() {
      this.$router.push({ name: "distributor-user-profile-set-up" });
    },
    validatestatusForm() {
      return this.$refs.statusForm.validate();
    },
      // getAllRecord
    getUserRegList: async function () {
      const user = localStorage.getItem("user");
      const response = await services6Module1.getUserRegListStatus(
        JSON.parse(user).user_id
      );
      this.getDataUser = response;
    //    this.imgUrl = this.getDataUser.PHOTO_FILEPATH+"/"+this.getDataUser.USER_REGI_DOCU_ID +"_"+this.getDataUser.PHOTO_FILENAME;
    //  var filename = this.getDataUser.USER_REGI_DOCU_ID +"_"+this.getDataUser.DOC_FILENAME;
    //   this.fileRecords= [
    //       {
    //         "name": filename,
    //         "size": this.getDataUser.DOC_FILESIZE,
    //         "type": "'.pdf,.doc,.docx'",
    //         "ext":this.getDataUser.DOC_FILEEXTENSION,
    //       },
    //   ]
      //this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    getUserRegListDoc: async function () {
      const user = localStorage.getItem("user");
      const response = await services6Module1.getUserRegListStatusDoc(
        JSON.parse(user).user_id
      );
     // console.log("DocResponse=",response.PHOTO_FILENAME);
      this.photoname = response.PHOTO_FILENAME;
       this.docname = response.DOC_FILENAME;

       response.DOC_BLOB = new File(
          [response.DOC_BLOB],
          response.DOC_FILENAME,
          { type: response.DOC_MIMETYPE }
        );

       this.imgUrl= response.PHOTO_IMAGE;

        const data = {
          name: response.DOC_FILENAME,
          size: response.DOC_FILESIZE,
          type: response.DOC_FILEEXTENSION,
          ext: "exe",
          url: window.URL.createObjectURL(response.DOC_BLOB),
        };
        this.fileRecords.push(data);

        response.PHOTO_BLOB = new File(
          [response.PHOTO_BLOB],
          response.PHOTO_FILENAME,
          { type: response.PHOTO_MIMETYPE }
        );
        const data1 = {
          name: response.PHOTO_FILENAME,
          size: response.PHOTO_FILESIZE,
          type: response.PHOTO_FILEEXTENSION,
          ext: "exe",
          url: window.URL.createObjectURL(response.PHOTO_BLOB),
        };
        this.fileRecordsImage.push(data1);

     //this.getDataUser = response;
    //    this.imgUrl = this.getDataUser.PHOTO_FILEPATH+"/"+this.getDataUser.USER_REGI_DOCU_ID +"_"+this.getDataUser.PHOTO_FILENAME;
    //  var filename = this.getDataUser.USER_REGI_DOCU_ID +"_"+this.getDataUser.DOC_FILENAME;
    //   this.fileRecords= [
    //       {
    //         "name": filename,
    //         "size": this.getDataUser.DOC_FILESIZE,
    //         "type": "'.pdf,.doc,.docx'",
    //         "ext":this.getDataUser.DOC_FILEEXTENSION,
    //       },
    //   ]
      //this.fundprofileRecordCount = this.fundprofileRecordList.length;
    },
    async viewRecord(data) {
      this.$router.push({
        name: "distributor-user-management-review",
        params: { USERDETAIL: data },
      });
    },



    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema == "document") {
        console.log(newVal.replace("C:\\fakepath\\", ""));
        this.model.document = newVal.replace("C:\\fakepath\\", "");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
    &_active {
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
      margin-left: 20px;
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
</style>
