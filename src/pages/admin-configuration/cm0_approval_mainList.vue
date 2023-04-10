<template>
  <div class="card-body">
    <div class="row justify-content-center">
        <div class="col-lg-10">
        <h4 slot="header">Approval Setting</h4>
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
                    {id:'1', name:'New Member/Distributor', refNo:'A(1)(a)'},
                    {id:'2', name:'Update Distributor Details', refNo:'A(1)(b)'},
                    {id:'3', name:'Cessation of Operation', refNo:'A(1)(c)(i)'},
                    {id:'4', name:'Suspension/Revocation by FIMM', refNo:'A(1)(c)(ii)'},
                    {id:'5', name:'Divestment ', refNo:'A(1)(d)'},
                    {id:'6', name:'Extension Time', refNo:'A(1)(i)'},

                ]
            },
            {
                id: '2',
                module: 'Consultant Management',
                processFlow:[
                    {id:'1', name:'New Candidate', refNo:'A(2)(a)'},
                    {id:'2', name:'Re‐Register', refNo:'A(2)(b)'},
                    {id:'3', name:'Exemption', refNo:'A(2)(c)'},
                    {id:'4', name:'Termination', refNo:'A(2)(d)'},
                    {id:'5', name:'Re‐Sit/Re‐Schedule', refNo:'A(2)(h)'},
                    {id:'6', name:'Bankruptcy Check/Audit', refNo:'A(2)(i)'},
                    {id:'7', name:'Appeal', refNo:'A(2)(j)'},
                ]
            },
            {
                id: '3',
                module: 'Consultant Alert (CAS)',
                processFlow:[
                    {id:'1', name:'Consultant Case Management', refNo:'B(1)(a)'},
                ]
            },
            {
                id: '4',
                module: 'CPD', 
                processFlow:[
                    {id:'1', name:'Post‐Vetting Submission', refNo:'D(1)(a)'},
                    // {id:'2', name:'Repeated Post‐Vetting Submission', refNo:'D(1)(a)(a)'},
                    {id:'2', name:'Pre‐Vetting Submission', refNo:'D(1)(b)'},
                   // {id:'4', name:'Repeated Pre‐Vetting Submission', refNo:'D(1)(b)(a)'},
                    {id:'3', name:'5 Modules Submission', refNo:'D(1)(c)'},
                    {id:'4', name:'Waiver Module Submission', refNo:': D(1)(d)'},
                    {id:'5', name:'CPD Revocation (FIMM)', refNo:'D(1)(f)'},
                    {id:'6', name:'New Training Provider', refNo:'D(1)(g)'},
                ]
            },
            {
                id: '5',
                module: 'Finance Module', 
                processFlow:[
                    {id:'1', name:'Company Registration Payment', refNo:'E(1)(a)'},
                    {id:'2', name:'Prepayment Topup', refNo:'E(1)(b)'},
                    {id:'3', name:'Consultant Registration Payment', refNo:'E(1)(c)'},
                    {id:'4', name:'Pre‐Payment Refund', refNo:'E(1)(d)'},
                ]
            },
            {
                id: '6',
                module: 'Fund Management System',
                processFlow:[
                    {id:'1', name:'Fund Lodgment', refNo:'F(1)(a)(f)'},
                    {id:'2', name:'Fund Termination/Suspension/Closure', refNo:'F(1)(b)'},
                    {id:'3', name:'NAV Management', refNo:'F(1)(e)'},
                    {id:'4', name:'Fund Management', refNo:'F(1)(g)'},
                    {id:'5', name:'Fund Creation', refNo:'F(1)(a)(f)(i)'},
                    {id:'6', name:'3rd Company Creation', refNo:'F(1)(i)'},
                ]
            },
            {
                id: '7',
                module: 'Annual Membership Subscription Fee (AMSF)',
                processFlow:[
                    {id:'1', name:'Integrate with AMSF system', refNo:'G(1)(a)'},
                ]
            },
            // {
            //     id: '7',
            //     module: 'User Management',
            //     processFlow:[
            //         {id:'1', name:'New System User', refNo:'H(1)(a)'},
            //         {id:'2', name:'New FIMM User', refNo:'H(1)(b)'},
            //     ]
            // },
            {
                id: '8',
                module: 'Admin/Core Module', 
                processFlow:[
                    {id:'1', name:'Announcement Management', refNo:'L(1)(j)'},
                    {id:'2', name:'Circular Management', refNo:'L(1)(g)'},
                ]
            },
             {
                id: '9',
                module: 'User Management',
                processFlow:[
                    {id:'1', name:'New FIMM User', refNo:'H(1)(b)'},
                   // {id:'2', name:'New FIMM User', refNo:'H(1)(b)'},
                ]
            },

        ]

        };
    },
    methods: {
         back () {
      this.$router.push("/fimm/screen-management-setting");
    }, // back button
        viewDetail(index,indexProcessFlow){
            if(index == 1){
            if(indexProcessFlow == 1){
                this.$router.push("/fimm/newDistributor-approval-level");
            }else if(indexProcessFlow == 2){
                this.$router.push("/fimm/updateDistributor-approval-level");
            }else if(indexProcessFlow == 3){
                 this.$router.push("/fimm/cessationDistributor-approval-level");
            }else if(indexProcessFlow == 4){
                this.$router.push("/fimm/suspensionRevocationDistributor-approval-level");
            }else if(indexProcessFlow == 5){
                this.$router.push("/fimm/divestmentDistributor-approval-level");
            }else if(indexProcessFlow == 6){
                this.$router.push("/fimm/extensionManager-mainList");
            }
            }else if(index == 2){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/newConsultant-approval-level");
            }else if(indexProcessFlow == 2){
                this.$router.push("/fimm/re-register-approval-level");
            }else if(indexProcessFlow == 3){
                 this.$router.push("/fimm/exemption-approval-level");
            }else if(indexProcessFlow == 4){
                this.$router.push("/fimm/terminationConsultant-approval-level");
            }else if(indexProcessFlow == 5){
                this.$router.push("/fimm/reschedule-approval-level");
            }else if(indexProcessFlow == 6){
                 this.$router.push("/fimm/banckruptcyCheckConsultant-approval-level");
            }else if(indexProcessFlow == 7){
                this.$router.push("/fimm/appealConsultant-approval-level");
            }
            }else if(index == 3){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/newCase-approval-level");
            }
            }else if(index == 4){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/postVettingSubmission-approval-level");
            }
           // else if(indexProcessFlow == 2){
           //      this.$router.push("/fimm/repeated-post‐petting-submission");
           // }
            else if(indexProcessFlow == 2){
                 this.$router.push("/fimm/preVettingSubmission-approval-level");
            }
            //else if(indexProcessFlow == 4){
                // this.$router.push("/fimm/repeated-pre‐vetting submission");

           // }
            else if(indexProcessFlow == 3){
                this.$router.push("/fimm/5ModulesSubmission-approval-level");
            }else if(indexProcessFlow == 4){
                 this.$router.push("/fimm/waiverSubmission-approval-level");
            }else if(indexProcessFlow == 5){
                 this.$router.push("/fimm/revocationCPD-approval-level");
            }else if(indexProcessFlow == 6){
                 this.$router.push("/fimm/newTrainingProvider-approval-level");
            }
            }else if(index == 5){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/newDistributorPayment-approval-level");
            }else if(indexProcessFlow == 2){
                this.$router.push("/fimm/prepaymentTopupDistributor-approval-level");
            }else if(indexProcessFlow == 3){
                 this.$router.push("/fimm/newConsultantPayment-approval-level");
            }else if(indexProcessFlow == 4){
                this.$router.push("/fimm/prepaymentRefundDistributor-approval-level");
            }
            }else if(index == 6){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/fundLodgement-approval-level");
            }else if(indexProcessFlow == 2){
                this.$router.push("/fimm/fundTermination-approval-level");
            }else if(indexProcessFlow == 3){
                 this.$router.push("/fimm/navManagement-approval-level");
            }else if(indexProcessFlow == 4){
                this.$router.push("/fimm/fundManagement-approval-level");
            }else if(indexProcessFlow == 5){
                this.$router.push("/fimm/fundCreation-approval-level");
            }else if(indexProcessFlow == 6){
                this.$router.push("/fimm/companyCreation-approval-level");
            }

            }else if(index == 7){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/anualFee-approval-level");
            }
            }else if(index == 8){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/annoucement-mainList");
            }if(indexProcessFlow == 2){
                this.$router.push("/fimm/circular-mainList");
            }
            }else if(index == 9){
                if(indexProcessFlow == 1){
                this.$router.push("/fimm/newfimm-mainList");
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
