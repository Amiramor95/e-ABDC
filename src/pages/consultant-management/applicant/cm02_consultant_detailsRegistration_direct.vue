<template>
  <div class="">
    <div class="">
      <div class="row">
        <div class="col-12">
          <div>
            <b-modal ref="my-modal" hide-footer title="Notification">
              <div class="d-block text-center">
                <h3>Select new date for your exam</h3>
              </div>
              <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
            </b-modal>
          </div>
          <va-card>
            <div class="ml-4">
              <h4 slot="header" class="card-title">Applicant Details</h4>

                    <br>
                              <br />
                              <table class="table table-striped">
                                <tbody>
                                  <tr>
                                    <td>Name</td>
                                    <td>NoorHidayah Binti Mohd Faizal</td>
                                  </tr>
                                  <tr>
                                    <td>New NRIC</td>
                                    <td>890408-03-5556</td>
                                  </tr>
                                  <tr>
                                      <td>Date of Birth</td>
                                      <td>08-04-1989</td>
                                  <tr>
                                    <td>Address</td>
                                    <td>3, Jalan Dato Abdul Aziz, Seksyen 14</td>
                                  </tr>
                                  <tr>
                                    <td>Postcode</td>
                                    <td>46100</td>
                                  </tr>
                                  <tr>
                                    <td>City</td>
                                    <td>Petaling Jaya,</td>
                                  </tr>
                                  <tr>
                                    <td>State</td>
                                    <td>Selangor</td>
                                  </tr>
                                  <tr>
                                    <td>Telephone Number</td>
                                    <td>014-6218910</td>
                                  </tr>
                                  <tr>
                                    <td>Email</td>
                                    <td>hidayah@gmail.com</td>
                                  </tr>
                                   <tr>
                                    <td>Highest Qualification</td>
                                    <td>Degree</td>
                                  </tr>
                                  <tr>
                                    <td>Examination Type
                                    </td>
                                    <td>
                                      CUTE
                                    </td>
                                  </tr>



                                </tbody>
                              </table>

                          </div>
          </va-card>
          <br/>
          <br/>
          <va-card>
                        <vue-form-generator
                        :model="model"
                        :schema="schema"
                        @model-updated="onModelUpdated"

                        >
                        </vue-form-generator>
                        <br/>
                        <button
                          @click.prevent="reset"
                          type="button"
                          class="ml-2 btn btn-fill btn-sm btn-danger"
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          class="ml-2 btn btn-fill btn-sm btn-primary"
                        >
                          Search
                        </button>
            <br />
                <br /><br /><br />
                <div>
                  <small>* Choose 1 exam session</small>


                      <b-table
                        hover
                        id= "examtimetable"
                        :items="examTimetableList"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        responsive="md"
                      >
                        <template #cell(index)="data">
                          {{ data.index + 1 }}
                        </template>
                        <template #cell()="data">
                          <span class="description">{{ data.value }}</span>
                        </template>
                        <template #cell(actions)="data">
                          <b-form-checkbox @click="addExamSession(data)">

                          </b-form-checkbox>
                        </template>
                      </b-table>
                    </div>
                    <br/>
                    <div class="float-right">
                <button
                    @click="onSubmitConsultant"
                    type="button"
                    class="ml-2 btn btn-primary btn-fill btn-md"
                  >
                    Submit
                  </button>
                  </div>
                  </va-card>
                </div>
                <br/>

        </div>
      </div>
    </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import HorizontalScroll from "vue-horizontal-scroll";
import axios from "axios";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
import * as services06Module0 from "../../../app/module0/services06";
import moment from "moment";
import { parse } from "vue-currency-input";
import * as servicesmodule0 from "../../../app/module0/services";
// import * as servicesmodule2 from "../../../app/module2/services";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.use(VueFormWizard);
Vue.use(axios);
Vue.component(axios);
Vue.component(Vudal);
// register globally
Vue.component("multiselect", Multiselect);

export default {
  components: {
    axios,
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    value: File,
  },
  created () {

    // this.getExamCourses();
    // this.getSite();
    // this.getExamListPreference();
  },
  mounted () {
    this.showModal();
  },
  watch: {
    "model.nricNo": function (val) {
      console.log("dob :" + this.model.dateOfBirth);
      if (val.substr(11, 1) != "") {
        console.log("last character :" + val.substr(11, 1));
        var Year = val.substring(0, 2);
        var Month = val.substring(2, 4);
        var Day = val.substring(4, 6);

        var cutoff = new Date().getFullYear() - 2000;
        console.log("year :" + cutoff);

        var dob =
          (Year > cutoff ? "19" : "20") + Year + "-" + Month + "-" + Day;
        this.model.dateOfBirth = dob;
        console.log("dob :" + dob);
        console.log((Year > cutoff ? "19" : "20") + Year);
        const yearBirth = (Year > cutoff ? "19" : "20") + Year;
        if (parseInt(yearBirth) <= 1970) {
          console.log("1970 and below");
          // this.visibleOldIc = true;
        } else {
          console.log("above");
          // this.visibleOldIc = false;
        }
        if (parseInt(val.substr(11, 1)) % 2 == 0) {
          console.log("The number is even. Female");
          this.model.gender = "2";
        } else {
          console.log("The number is odd. Male");
          this.model.gender = "1";
        }
      }
    },
  },
  computed: {
    filterexamcenter: function () {
      return this.centerExam.filter(JSON.stringify(this.model.stateExam.name));
    },
    // mappedItems() {
    //   return this.examTimetableList(item){
    //     return{

    //     }
    //   }
    // }
  },
  data() {
    return {
      visible: false,
      visibleIc: true,
      visiblePassport: false,
      visibleOtherRace: false,
      visibleOtherLanguage: false,
      visibleCFP: false,
      visibleStaff: false,
      visibleConsultant: false,
      visibleCmsrlY: false,
      visibleCmsrlN: false,
      visibleUts: false,
      visiblePrs: false,

      viewType: 1,

      country: [{ name: "MALAYSIA", id: "1", selected: true }],
      state: [
        { id: "MY-14", name: "WILAYAH PERSEKUTUAN KUALA LUMPUR" },
        { id: "MY-15", name: "WILAYAH PERSEKUTUAN LABUAN" },
        { id: "MY-16", name: "WILAYAH PERSEKUTUAN PUTRAJAYA" },
        { id: "MY-01", name: "JOHOR" },
        { id: "MY-02", name: "KEDAH" },
        { id: "MY-03", name: "KELANTAN" },
        { id: "MY-04", name: "MELAKA" },
        { id: "MY-05", name: "NEGERI SEMBILAN" },
        { id: "MY-06", name: "PAHANG" },
        { id: "MY-07", name: "PULAU PINANG" },
        { id: "MY-08", name: "PERAK" },
        { id: "MY-09", name: "PERLIS" },
        { id: "MY-10", name: "SELANGOR", selected: true },
        { id: "MY-11", name: "TERENGGANU" },
        { id: "MY-12", name: "SABAH" },
        { id: "MY-13", name: "SARAWAK" },
      ],
      // exam
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        backgroundColor: "#ff0000",
        eventColor: "#378006",
        eventClick: this.handleDateClick,
        events: [
          { title: "Available", date: "2020-11-01", display: "background" },
          { title: "Available", date: "2020-11-02", display: "background" },
        ],
      },
      currentPageSelected: 1,
      perPageSelected: 5,
      filterSelected: null,
      fieldSelectedExam: [
        // A virtual column that doesn't exist in items
        { key: "index", label: "No" },
        // A column that needs custom formatting
        { key: "examDate", label: "Exam Date" },
        { key: "sessionTime", label: "Session Time" },
        { key: "day", label: "Day" },
        { key: "centreName", label: "Centre Name" },
        { key: "centreLocation", label: "Centre Location" },
        { key: "availableSit", label: "Available Sit" },
        { key: "actions", label: "Action" },
      ],
      selectedExamList: [],
      centerExam: [
        {
            siteid: "ASLC",
            sitename: "Alor Setar Learning Centre",
            address: "Open University Malaysia (OUM)",
            city: "Alor Setar",
            state: "Kedah"
        },
        {
            siteid: "PSITCP0X",
            sitename: "PreSIT Center Profile X",
            address: "Jalan Gasing",
            city: "Petaling Jaya",
            state: "Selangor"
        },
        {
            siteid: "PSITCP0Y",
            sitename: "PreSIT Center Profile Y",
            address: "Jalan Meru",
            city: "Ipoh",
            state: "Perak"
        }
      ],
      schema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "stateExam",
                label: "State",
                placeholder: "Enter state",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "id",
                  label: "name",
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.state;
                },
              },

              {
                type: "vueMultiSelect",
                model: "centerExam",
                label: "Exam Center",
                placeholder: "Enter Exam Center",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "state",
                  label: "sitename",
                  searchable: false,
                },
                values: (model, schema) => {
                  return this.centerExam;
                },
              },

              {
                labels: 'Preferred Exam Date',
                type: 'vfg-functional-date',
                inputType: 'date',
                placeholder: 'Preferred dateExam Date',
                model: 'expiryDate',
                noLabel: true,
                noClearButton: true,
                format: 'dd-MM-yyyy',
                styleClasses: 'col-md-6',
                required: true,
              },
            ],
          },
        ],
      },

      // search
      sessionYear: "",
      examDate:"",
      sessionTime: "",
      day: "",
      centreLoc: "",
      applicationID: "",

      currentPage: 1,
      perPage: 5,
      filter: null,
      fields: [
        // A virtual column that doesn't exist in items
        { key: "examTimetableList.sessionid", label: "No" },
        // A column that needs custom formatting
        { key: "examTimetableList.timeopen", label: "Exam Date" },
        { key: "examTimetableList.timeopen", label: "Session Time" },
        { key: "examTimetableList.timeopen", label: "Day" },
        { key: "examTimetableList.center.sitename", label: "Centre Name" },
        { key: "examTimetableList.center.address", label: "Centre Location" },
        { key: "examTimetableList.cemter.availableseat", label: "Available Sit" },
        { key: "actions", label: "Action" },
      ],
      examTimetableList: [
        {
            "sessionid": 209,
            "timeopen": 1625295600,
            "availableseat": 21,
            "center": {
                "siteid": "ASLC",
                "sitename": "Alor Setar Learning Centre",
                "address": "Open University Malaysia (OUM)",
                "city": "Alor Setar",
                "state": "Kedah"
            }
        },
        {
            "sessionid": 212,
            "timeopen": 1625014800,
            "availableseat": 23,
            "center": {
                "siteid": "ASLC",
                "sitename": "Alor Setar Learning Centre",
                "address": "Open University Malaysia (OUM)",
                "city": "Alor Setar",
                "state": "Kedah"
            }
        },
        {
            "sessionid": 213,
            "timeopen": 1625101200,
            "availableseat": 25,
            "center": {
                "siteid": "ASLC",
                "sitename": "Alor Setar Learning Centre",
                "address": "Open University Malaysia (OUM)",
                "city": "Alor Setar",
                "state": "Kedah"
            }
        },
        {
            "sessionid": 216,
            "timeopen": 1625810400,
            "availableseat": 24,
            "center": {
                "siteid": "ASLC",
                "sitename": "Alor Setar Learning Centre",
                "address": "Open University Malaysia (OUM)",
                "city": "Alor Setar",
                "state": "Kedah"
            }
        },
        {
            "sessionid": 228,
            "timeopen": 1626318000,
            "availableseat": 25,
            "center": {
                "siteid": "ASLC",
                "sitename": "Alor Setar Learning Centre",
                "address": "Open University Malaysia (OUM)",
                "city": "Alor Setar",
                "state": "Kedah"
            }
        },
        {
            "sessionid": 229,
            "timeopen": 1626400800,
            "availableseat": 24,
            "center": {
                "siteid": "ASLC",
                "sitename": "Alor Setar Learning Centre",
                "address": "Open University Malaysia (OUM)",
                "city": "Alor Setar",
                "state": "Kedah"
            }
        }
      ],

      model: {
        // Section 1
        applicationID: "",
        applicantName: "",
        nricNo: "",
        oldNricNo: "",
        passportNo: "",
        nricPhoto: Blob,
        passportExpDate: "",
        passportPhoto: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        race: "",
        highestQualification: "",
        math: "",
        language: "",
        subject: "",
        spmFile: "",
        stpmFile: "",
        diplomaFile: "",
        degreeFile: "",
        proCertFile: "",
        certificate: "",
        // correspondence
        country: "",
        state: "",
        city: "",
        postcode: "",
        addr1: "",
        addr2: "",
        addr3: "",
        // permanent
        pcountry: "",
        pstate: "",
        pcity: "",
        ppostcode: "",
        paddr1: "",
        paddr2: "",
        paddr3: "",

        // section2
        category: "",
        cmsrl: "",
        distributor: "",
        uts: "",
        prs: "",

        // exam
        applicationType: "",
        catExemption: "",
        qualification: "4",
        stateExam:"",

        otherQua: "",

        catConsultant: "",
        ApprenticeProg: "",
        companyName: "",
        companyType: "",
        companyBranch: "",

        department: "1",
        othersDepartment: "",
        distApprenticeProg: "",
        distDistPointCode: "",
        distPointName: "",
        distaddress: "",
        distaddress2: "",
        distpostcode: "",
        distcity: "",
        distState: "",
        centerExam: "",
      },
      formOptions: {
        validateAfterChanged: true,
      },
    };
  },
  methods: {
    showModal() {
        this.$refs['my-modal'].show()
      },
    hideModal() {
        this.$refs['my-modal'].hide()
    },
    getExamCourses: async function () {
      const response = await this.getExamCourses();
      this.examCourses = respone;
      console.log(this.examCourses);
    },
    getExamSite: async function () {
      const response = await this.getExamSite();
      this.examsite = respone;
      console.log(this.examsite);
    },
    getExamListPreference: async function () {
      const response = await this.getexamListPreference();
      this.examlistpreference = respone;
      console.log(this.examlistpreference);
    },
    accept: async function () {},
    onComplete() {
      alert(JSON.stringify(this.model));
    },
    processPreferences: async function () {
      var dataid=135;
      try{
      const response = await servicesmodule2.getProcessPreference(dataid);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    onSubmitConsultant: async function () {
      var dataid = 136;
      if (confirm('Declaring that the details inserted is correct ? ')) {
      console.log('Start function submit')
      const fs = require('fs');
      // var candidate = {"applicationid": 131 ,"companycode": "ASB01","companyname": "Amanah Saham Bumiputra","coursename": "CUTE","email": "johari@fimm.com.my","name": "Muhamad Khairul Bin Azhar","idnumber": "930121105532","mobile": "+601121253742","sessionid": 220};
      var candidate = {"applicationid": 136,"companycode": "ASB01","companyname": "Amanah Saham Bumiputra","coursename": "CUTE","email": "asyraf.matrozai@araken.biz","name": "NoorHidayah Binti Mohd Faizal","idnumber": "890408035156","mobile": "+60142310327","sessionid": 238};
      let txtdata = new FormData();
      let data = new FormData();
      let imageblob= this.model.nricPhoto;
      console.log(this.model.nricPhoto)
      // let imgphoto = new File(this.model.nricPhoto, 'image3.png');
      let imgphoto = new File(null, 'image3.png')
      console.log(imgphoto);
      console.log(candidate);
      const datajson = JSON.stringify(candidate);
      const datablob = new Blob([datajson], {type:'application/json'});
      // data.append('imagefile', fs.createReadStream(imgphoto));
      console.log('pass 1');
      data.append('imagefile', imgphoto);
      console.log('pass 1 withour error');
      console.log('pass 2');
      data.append('candidate', datablob);
      console.log('pass 2 withour error');
      for (var pair of data.entries()) {
          console.log(pair[0]+ ', ' + pair[1]);
      }
      // data.append('candidate', '{\n"applicationid": 3,\n"companycode": "ASB01",\n"companyname": "Amanah Saham Bumiputra",\n"coursename": "CUTE",\n"email": "zubaidah@gmail.com",\n"name": "Siti Zubaidah binti Haji Ali",\n"idnumber": "940501104328",\n"mobile": "+60114152176",\n"sessionid1": 200,\n"sessionid2": 201,\n"sessionid3": 202\n}', {contentType: 'application/json'});

      // const data = new FormData();
      // data.append("APPLICANT_NAME", this.model.applicantName);

      // data.append("EMAIL", this.model.email);
      // alert(this.model.email);
      // try {
      //   // const response = await servicesModule2.createApplication(data);
      //   this.$router.go(-1);
      // } catch (error) {
      //   console.log(error);
      // }
      try {
          // console.log('Data: '+ data.get(imagefile));
          // console.log('Data: '+ data.get(candidate));
          console.log('Start function submit')
          // const response = await servicesmodule2.postCandidateRegisterPreference(data);
          const response = await servicesmodule2.postRegisterDirect(data);
          console.log(response)
          const response2 = await servicesmodule2.getProcessPreference(dataid);
          console.log(response2)
          //this.$router.push(-1)
        } catch (error) {
          console.log(error)
        }
      } else {
          // Do nothing!
          console.log('Thing was not saved to the database.');
      }
    },
    switchView(type) {
      this.viewType = type;
    },
    handleDateClick: function (calEvent, jsEvent, view) {
      // console.log(JSON.stringify(view));
      // console.log(JSON.stringify(jsEvent));
      console.log(JSON.stringify(calEvent.event));
      //  var dt = calEvent.date;
      alert(
        "Event Clicked on : " +
          this.moment(calEvent.event.start).format("DD-MM-yyyy, h:mm:ss a")
      );
      // var r = confirm("Delete " + calEvent.title + "\n" + dt);
      // if (r === true) {
      //    $('#calendar').fullCalendar('removeEvents', calEvent._id);
      // }
    },
    validateExpiryDate(value) {
      if (value != null) {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds() +
          " GMT";
        const dateTime = date + " " + time;

        const unixTimeNow = Date.parse(dateTime);
        console.log(unixTimeNow);

        // date expiry
        const expiryDate = this.model.USER_PASS_EXP;
        const dateExpiry =
          expiryDate.getFullYear() +
          "-" +
          (expiryDate.getMonth() + 1) +
          "-" +
          expiryDate.getDate();
        const timeExpiry =
          expiryDate.getHours() +
          ":" +
          expiryDate.getMinutes() +
          ":" +
          expiryDate.getSeconds() +
          " GMT";
        const dateTimeExpiry = dateExpiry + " " + timeExpiry;
        const unixTimeExpiryDate = Date.parse(dateTimeExpiry);
        console.log(unixTimeExpiryDate);

        // compare
        if (unixTimeExpiryDate < unixTimeNow) {
          console.log("expired");
          return ["Expired"];
        } else {
          console.log("not expired");
          // return ["Expired"];
        }
      } else {
        console.log("ssdfdsf");
      }
    },
    validateFourthTab() {
      return this.$refs.fourthTabForm.validate();
    },

    removeExamSession(data){
      console.log(JSON.stringify(data.item));
      this.selectedExamList.unshift(data.item);

    },

    addExamSession(data) {
      console.log(JSON.stringify(data.item));
      this.selectedExamList.shift(data.item);
      // if (this.selectedExamList.length < this.noOfSession) {
      //   this.selectedExamList.shift(data.item);
      // }
    },
    onModelUpdated(newVal, schema) {
      console.log(newVal);
      if (schema == "citizenship") {
        if (newVal == 1) {
          this.visiblePassport = false;
          this.visibleIc = true;
        } else {
          this.visiblePassport = true;
          this.visibleIc = false;
        }
      } else if (schema == "race") {
        if (newVal.name == "OTHERS") {
          this.visibleOtherRace = true;
        } else {
          this.visibleOtherRace = false;
        }
      } else if (schema == "language") {
        if (newVal.name == "OTHERS") {
          this.visibleOtherLanguage = true;
        } else {
          this.visibleOtherLanguage = false;
        }
      } else if (schema == "certificate") {
        if (newVal.name == "CERTIFIED FINANCIAL PLANNER (CFP)") {
          this.visiblePro = true;
        } else {
          this.visiblePro = false;
        }
      } else if (schema == "category") {
        if (newVal == 1) {
          this.visibleConsultant = false;
          this.visibleStaff = true;
          this.visibleCmsrlY = true;
        } else {
          this.visibleConsultant = true;
          this.visibleStaff = false;
          this.visibleCmsrlY = false;
        }
      } else if (schema == "cmsrl") {
        if (newVal == 1) {
          this.visibleCmsrlY = true;
          this.visibleCmsrlN = false;
        } else {
          this.visibleCmsrlY = false;
          this.visibleCmsrlN = true;
        }
      } else if (schema == "distributor") {
        if (newVal.name == "ENG JIA SECURITIES SDN BHD") {
          this.visiblePrs = true;
          this.visibleUts = false;
        } else {
          this.visiblePrs = false;
          this.visibleUts = true;
        }
      } else if (schema == "race") {
        if (newVal.name == "Others") {
          this.otherRace = true;
        } else {
          this.otherRace = false;
        }
      } else if (schema == "nationality") {
        this.model.dateOfBirth = null;
      } else if (schema == "icNo") {
        console.log("dob :" + this.model.dateOfBirth);
        if (newVal.substr(11, 1) != "") {
          console.log("last character :" + newVal.substr(11, 1));
          var Year = newVal.substring(0, 2);
          var Month = newVal.substring(2, 4);
          var Day = newVal.substring(4, 6);

          var cutoff = new Date().getFullYear() - 2000;
          console.log("year :" + cutoff);

          var dob =
            (Year > cutoff ? "19" : "20") + Year + "-" + Month + "-" + Day;
          this.model.dateOfBirth = dob;
          console.log("dob :" + dob);
          console.log((Year > cutoff ? "19" : "20") + Year);
          const yearBirth = (Year > cutoff ? "19" : "20") + Year;
          if (parseInt(yearBirth) <= 1970) {
            console.log("1970 and below");
            this.visibleOldIc = true;
          } else {
            console.log("above");
            this.visibleOldIc = false;
          }
          if (parseInt(newVal.substr(11, 1)) % 2 == 0) {
            console.log("The number is even. f");
            this.model.gender = "1";
          } else {
            console.log("The number is odd. l");
            this.model.gender = "2";
          }
        }
      } else if (schema == "stateExam"){
        try{
        console.log(JSON.stringify(this.model.stateExam));
        alert(JSON.stringify(this.model.centerExam.state));
        console.log(JSON.stringify(this.model.centerExam.state));
        alert(JSON.stringify(this.model.expiryDate));
        console.log(JSON.stringify(this.model.expiryDate));
        } catch (error) {
          console.log (error);
        }
      }


    },
  },
};
</script>

<!-- New step! Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.display-inline label {
  display: inline !important;
  padding: 5px;
}
.app-layout__main {
  background: #e8e8e8;
}
.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px; // hide bottom border
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
<style scoped>
.widthModal {
  width: 80%;
}
.width {
  width: 100%;
}
.widthName {
  width: 5%;
}
</style>
