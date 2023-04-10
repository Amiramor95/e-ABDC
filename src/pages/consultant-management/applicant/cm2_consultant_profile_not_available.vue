<template>
<div class="content">
    <div class="container-fluid">
        <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-lg-12">
                <va-card  class="strpied-tabled-with-hover"
                    body-classes="table-full-width table-responsive">

                        <h4 slot="header" class="card-title">Applicant Details</h4>

                    <br>
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
                                    <td>Name</td>
                                    <td>NoorHiyadah Binti Mohd Faizal</td>
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
                                    <td>Category</td>
                                    <td>Agent</td>
                                  </tr>
                                  <tr>
                                    <td>Apprienticeship Program</td>
                                    <td>Yes</td>
                                  </tr>
                                  <tr>
                                    <td>Company Distributor</td>
                                    <td>A.D.Fincancial Sdn. Bhd.</td>
                                  </tr>

                                </tbody>
                              </table>
                          </div>
                        </div>
                        <div v-if="currentTab === 'tab3'">
                          <div class="ml-4">
                              <br />
                              <table class="table table-striped">
                                <tr>
                          <th>No</th>
                          <th>Document</th>
                        </tr>
                                <tbody>
                                 <tr>
                                  <td>1</td>
                            <td>Cover letter for Former and Variation PRS consultant
                              &nbsp;
                              &nbsp; &nbsp;
                              <a
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                target="_blank"
                                class="row"
                              >
                                view</a
                              >
                              </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Letter of Undertaking for variation due to Merger
                              &nbsp;
                              &nbsp; &nbsp;
                              <a
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                target="_blank"
                                class="row"
                              >
                                view</a
                              >
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Printed online application
                              &nbsp;
                              &nbsp; &nbsp;
                              <a
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                target="_blank"
                                class="row"
                              >
                                view</a
                              >
                            </td>

                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Statutory Declaration
                              &nbsp;
                              &nbsp; &nbsp;
                              <a
                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                target="_blank"
                                class="row"
                              >
                                view</a
                              >
                            </td>

                          </tr>

                                </tbody>
                              </table>
                          </div>
                        </div>
                        <div v-if="currentTab === 'tab4'">
                          <div class="ml-3">
                              <br />
                              <table class="table table-striped">
                                <tbody>
                                   <tr>
                                    <td>Examination Type</td>
                                    <td>CUTE</td>
                                  </tr>
                                  <!-- <tr>
                                    <td>Exam Date</td>
                                    <td>Not Available</td>
                                  </tr>
                                   <tr>
                                    <td>Exam Session</td>
                                    <td>Not Available</td>
                                  </tr>
                                   <tr>
                                    <td>Exam Location</td>
                                    <td>Not Available</td>
                                  </tr> -->
                                  <tr>
                                    <td>Result</td>
                                    <td>Not Available</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Certificate
                                    </td>
                                    <td>
                                    Not Available
                                    </td>
                                    <!-- <td> <a href="" target="_blank" >View</a></td> -->
                                  </tr>
                                  <tr>
                                  <td>
                                    Appeal
                                  </td>
                                  <td>
                                    Not Available
                                  <!-- <button
                                    @click="appeal"
                                    type="button"
                                    class="mr-2 btn btn-info btn-fill btn-md">
                                    Request Appeal
                                  </button> -->
                                  </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Appeal Status
                                    </td>
                                    <td>
                                      Not Available
                                    </td>
                                  </tr>

                                </tbody>
                              </table>
                          </div>
                        </div>

                    </div>
                  </div>
                  <br/>
                  <button
                 @click="back"
                 type="submit" class="btn btn-primary btn-fill float-left btn-md">
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                   <div class="float-right">

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
import pdf from "vue-pdf";
import "vue-form-generator/dist/vfg.css";
import Tabs from 'vue-tabs-with-active-line';
import * as servicesmodule0 from "../../../app/module0/services";
// import * as servicesmodule2 from "../../../app/module2/services";
const TABS = [{
  title: 'Applicant Information',
  value: 'tab1',
},
{
  title: 'Type of Applicant',
  value: 'tab2',
},
{
  title: 'Uploaded Document',
  value: 'tab3',
},
{
  title: 'Examination',
  value: 'tab4',
},
];
export default {
  created() {
    // const response = servicesmodule2.getCertificate(data);
    // console.log("Success", response);
    // const blob = new Blob([response.data]);
    // const objectUrl = URL.createObjectURL(blob);
    // this.pdfsrc = objectUrl;
    // return pdfsrc;
  },

  mounted () {
    // this.getExamResult();
    console.log(JSON.stringify(this));
  },

  components: {
    Tabs,
    pdf,
  },

   data() {
    return {
      tabs: TABS,
      currentTab: 'tab1',
      pdfsrc: null,
      getResult:[],
      getResultPDF:[],

     status: [

        {
          id: "Exam",
          name: "Exam Related"
        },
        {
          id: "Termination",
          name: "Termination"
        },
                {
          id: "Bankruptcy",
          name: "Bankruptcy"
        }
      ],
      examrelated:[
        {
          id:"examResults",
          name:"Exam Results"
        },
        {
          id:"Others",
          name:"Others (Waiver)"
        }
      ],
     schema: {
        fields: [
          {
                type: "select",
                label: "Appeal Type",
                model: "status",

                values: (model, schema) => {
                  return this.status;
                },
                 required: true,
            validator: "string"
              },
              {
                type: "select",
                label: "Select",
                model: "examRelated",

                values: (model, schema) => {
                  return this.examrelated;
                },
                 required: true,
            validator: "string"
              },

        ]
      },
      schema2:{
        fields:[
          {
            type: "textArea",
            label: "Remark",
            model: "Remark",
            hint: "Max 500 characters",
            max: 500,
            rows: 4,
            required: true,
            validator: "string"
          },
          {
            type: "input",
            inputType: "file",
            label: "Supported Document",
            model: "documentName",
            required: false,
            validator: "string",
            hideInput: true,
            preview: false
          },

        ]
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true
      },
    }
  },

  methods: {
    getExamResult: async function () {
      var data = 130;
      try{
        console.log('Start function submit')
        console.log(data);
        const response = await servicesmodule2.getCertificate(data);
        const blob = new Blob([response]);
        const objectUrl = URL.createObjectURL(blob);
        const response2 = await servicesmodule2.getResult(data);
        this.getResult = JSON.stringify(response2);
        this.getResultPDF = JSON.stringify(response);
      } catch (error) {
          console.log(error)
        }

    },
    back(){
      this.$router.go(-1);
    },
     saveAsDraft(){

    },
    appeal(){
      this.$router.push({
        name: 'c-consultantAppeal',
      });
    },
    validatestatusForm(){
  return this.$refs.statusForm.validate();
},
submit:async function(){
  const response= await this.validatestatusForm();
  if(response){
    //
  }else{

  }
},
    handleClick(newTab) {
      this.currentTab = newTab;
    },// end tab
    onModelUpdated(newVal, schema) {
      console.log(schema);
      if (schema == "document") {
        console.log(newVal.replace("C:\\fakepath\\", ""));
        this.model.document = newVal.replace("C:\\fakepath\\", "");
      }
    }
  }
}
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
