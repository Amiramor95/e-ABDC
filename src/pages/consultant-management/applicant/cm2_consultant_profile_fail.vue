<template>
<div class="content">
    <div class="container-fluid">
        <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-lg-12">
               <va-card  class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
                <h4 slot="header" class="card-title">Appeal Application</h4>
                 <form class="ml-3">
                  <div class="form-group">
                <br>
                <vue-form-generator
                  :model="model"
                  :schema="schema"
                  :options="formOptions"
                  @model-updated="onModelUpdated"
                  ref="statusForm"
                >
                </vue-form-generator>
                <br>
                <br>
                <label>Exam Result &nbsp; : &nbsp; FAIL
                </label>
                <br>
                <br>
                <br>
                <vue-form-generator
                  :model="model2"
                  :schema="schema2"
                  :options="formOptions"
                  @model-updated="onModelUpdated"
                  ref="statusForm"
                >
                </vue-form-generator>
                <br>
                  </div>
                 <button
                 @click="back"
                 type="submit" class="btn btn-primary btn-fill float-left btn-md">
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                   <div class="float-right">
                      <!-- <button
                        @click="saveAsDraft"
                        type="button"
                        class="mr-2 btn btn-info btn-fill btn-md"
                      >
                       <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                      </button> -->
                      <button
                        @click="submit"
                        type="button"
                        class="btn btn-primary btn-fill btn-md"
                      >
                      <i class="fa fa-paper-plane" /> &nbsp; Submit
                      </button>
                   </div>
                 </form>
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
  title: 'Examination & Backruptcy Check',
  value: 'tab4',
},
];
export default {
  created(){
    // this.getExamResult();
  },
  // mounted () {
  //   this.getExamResult();
  //   console.log(JSON.stringify(this.getExamResult));
  // },
  components: {
    Tabs,
  },

   data() {
    return {
      tabs: TABS,
      currentTab: 'tab1',
      appealDate: null,
      documentIdArray: [],
      uploadFileOject: [],
      getResults:[],
      model: {
        data: '',
        file: [],
      },
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
          name:"Exam Related Appeal – Exam Result"
        },
        {
          id:"waiver",
          name:"Exam Related Appeal – Exam Waiver"
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
            label: "Reason",
            model: "Remark",
            hint: "Max 500 characters",
            max: 500,
            rows: 4,
            required: false,
            validator: "string"
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
      var dataid = 15;
      try{
        axios.get('https://ems-stg.fimm.com.my/api/v1/registration/candidate/result', {
        responseType: 'application/json',
        params: {
            applicationid: dataid,
        }
        }).then(response => {
        console.log("data : " + JSON.stringify(response.data));
        console.log(response.status);
        this.getResults = response.data;
        })
        // console.log('Start function get')
        // // const response2 = await servicesmodule2.getCertificate(data);
        // // const blob = new Blob([response]);
        // // const objectUrl = URL.createObjectURL(blob);
        // const responses = await servicesmodule2.getResult(data);
        // console.log(responses);
        // this.getResults = JSON.stringify(responses);
        // this.getResultPDF = JSON.stringify(response);
      } catch (error) {
          console.log(error)
        }

    },
    back(){
      this.$router.go(-1);
    },
     saveAsDraft(){

    },
    validatestatusForm(){
  return this.$refs.statusForm.validate();
},
submit:async function(){
  const response= await this.validatestatusForm();
  var data=15;
  try{
    console.log('Start function get')
    console.log(data);
    let txtdata = new FormData();
    txtdata.append('applicationid', '15');
    txtdata.append('idnumber', '930505105462');
    txtdata.append('reason', 'This is a reason test');
    const response = await servicesmodule2.postAppeal(txtdata);
    this.$router.push({
        name: 'c-consultantReviewProfileappealpending',
      });

  }catch(error){
    console.log(error);
  }
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
