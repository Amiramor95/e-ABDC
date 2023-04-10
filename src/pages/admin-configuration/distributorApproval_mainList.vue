<template>
  <div class="card-body">
    <div class="row justify-content-center">
        <div class="col-lg-10">
        <h4 slot="header">Distributor Approval Setting</h4>
        </div>
        <!-- Distributor Management -->
        <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <div v-for="(itemApprovalLevel, index) in processFlowList" :key="index">
            <h5><i class="fa fa-list-ul"></i>&nbsp;&nbsp; <b>{{itemApprovalLevel.module}}</b></h5>
            <hr>
            <div class="ml-5">
                <div v-for="(itemProcessFlow, indexProcess) in itemApprovalLevel.processFlow" :key="indexProcess">
                <span>{{itemProcessFlow.name}} - {{itemProcessFlow.refNo}}</span>
                <button @click="viewDetail(index+1, indexProcess+1)" type="button" class="float-right  btn-fill btn-md"><i class="fa fa-eye"></i></button>
            <hr>
                </div>
            </div>
        </div>
         <br />
  <button @click="back" type="button" class="btn btn-primary btn-fill btn-md"><i class="fa fa-step-backward" /> &nbsp; Previous </button>
      </va-card>
      </div>
    </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import 'vue-form-generator/dist/vfg.css'
import Spacing from '../../components/ui/spacing/Spacing.vue'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Spacing },

 data() {
        return {

        processFlowList:[
            {
                id: '1',
                module: 'Distributor Management',
                processFlow:[
                    {id:'1', name:'Extension Time', refNo:'A(1)(i)'},
                    {id:'2', name:'Update Distributor Details', refNo:'A(1)(b)'},
                    {id:'3', name:'Cessation of Operation', refNo:'A(1)(c)(i)'},
                    {id:'4', name:'Divestment', refNo:'A(1)(d)'},

                ]
            },
            {
                id: '2',
                module: 'Consultant Management',
                processFlow:[
                    {id:'1', name:'New Candidate', refNo:'A(2)(a)'},
                    {id:'2', name:'Re-register', refNo:'A(2)(b)'},
                    {id:'3', name:'Exemption', refNo:'A(2)(c)'},
                    {id:'4', name:'Termination', refNo:'A(2)(d)'},
                    {id:'5', name:'Resignation', refNo:'A(2)(e)'},
                    {id:'6', name:'Update Profile', refNo:'A(2)(f)'},
                    {id:'7', name:'Renewal', refNo:'A(2)(g)'},
                    {id:'8', name:'Re-sit/Re-schedule', refNo:'A(2)(h)'},
                    {id:'9', name:'Bankruptcy Check/Audit', refNo:'A(2)(i)'},
                    {id:'10', name:'Appeal', refNo:'A(2)(j)'},
                ]
            },
            {
                id: '3',
                module: 'Fund Management System',
                processFlow:[
                    {id:'1', name:'Fund Creation', refNo:'F(1)(a)(f)(i)'},
                    {id:'2', name:'Fund Lodgment', refNo:'F(1)(a)(f)(ii)'},
                    {id:'3', name:'Fund Termination/Suspension/Closure', refNo:'F(1)(b)'},
                    {id:'4', name:'NAV Management', refNo:'F(1)(e)'},
                    {id:'5', name:'Fund Management', refNo:'F(1)(g)'},
                    {id:'6', name:'Fund Dislodgement', refNo:'F(1)(i)'},
                ]
            },
            {
                id: '4',
                module: 'Annual Membership Subscription Fee (AMSF)',
                processFlow:[
                    {id:'1', name:'Integrate with AMSF system', refNo:'G(1)(a)'},
                ]
            },
            {
            id: '5',
            module: 'User Management',
            processFlow:[
                {id:'1', name:'New System User', refNo:'H(1)(a)'},
            ]
            },

        ]

        };
    },
    methods: {
        back() { this.$router.go(-1);}, // back button
        viewDetail(index,indexProcessFlow){
            if(index == 1){
            if(indexProcessFlow == 1){
                this.$router.push("/fimm/extensiondistributor-mainList");
            }
            else if(indexProcessFlow == 2){
                this.$router.push("/fimm/updatedistributor-mainList");
            }
            else if(indexProcessFlow == 3){
                this.$router.push("/fimm/cessationofoperationdistributor-mainList");
            }
            else if(indexProcessFlow == 4){
                this.$router.push("/fimm/divestmentdistributor-mainList");
            }
            }
            if(index == 2){
            if(indexProcessFlow == 1){
                this.$router.push("/fimm/NewConsultant-mainList");
            }else if(indexProcessFlow == 2){
                this.$router.push("/fimm/reRegisterConsultant-mainList");
            }else if(indexProcessFlow == 3){
                this.$router.push("/fimm/exemptionConsultant-mainList");
            }else if(indexProcessFlow == 4){
                this.$router.push("/fimm/terminationConsultant-mainList");
            }else if(indexProcessFlow == 5){
                this.$router.push("/fimm/resignationConsultant-mainList");
            }else if(indexProcessFlow == 6){
                this.$router.push("/fimm/profileConsultant-mainList");
            }else if(indexProcessFlow == 7){
                this.$router.push("/fimm/renewalConsultant-mainList");
            }else if(indexProcessFlow == 8){
                this.$router.push("/fimm/reSheduleConsultant-mainList");
            }else if(indexProcessFlow == 9){
                 this.$router.push("/fimm/bankruptcyConsultant-mainList");
            }else if(indexProcessFlow == 10){
                this.$router.push("/fimm/appealConsultant-mainList");
            }
            }else if(index == 3){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/fundCreation-mainList");
            }else if(indexProcessFlow == 2){
                this.$router.push("/fimm/fundLodgement-mainList");
            }else if(indexProcessFlow == 3){
                 this.$router.push("/fimm/fundTermination-mainList");
            }else if(indexProcessFlow == 4){
                this.$router.push("/fimm/NavManagement-mainList");
            }
            else if(indexProcessFlow == 5){
                this.$router.push("/fimm/fundManagement-mainList");
            }
            else if(indexProcessFlow == 6){
                this.$router.push("/fimm/funddislodgement-mainList");
            }
            }else if(index == 4){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/DistAnualFee-mainList");
            }
            }else if(index == 5){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/DistNewUser-mainList");
            }
            }

        }

  },
}
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
