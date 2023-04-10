<template>
    <div class="registration-approval-log">
        <va-card class="mt-4">
            <div class="ml-2">
                Registration Approval Log

                <button
                    v-if="visibleLog"
                    v-b-toggle.registration-approval-log
                    type="button"
                    class="float-right btn-fill btn-md"
                    >
                    <i class="fa fa-eye-slash"></i>
                </button>

                <button
                    v-else
                    v-b-toggle.registration-approval-log
                    type="button"
                    class="float-right btn-fill btn-md"
                    >
                    <i class="fa fa-eye"></i>
                </button>

                <hr />

                <b-collapse id="registration-approval-log" class="mt-2" v-model="visibleLog">
                    <div class="row">
                        <div class="flex md2 offset--md10">
                        <va-input
                            :placeholder="$t('Search')"
                            v-model="search.log"
                            removable
                        >
                            <va-icon name="fa fa-search" slot="prepend" />
                        </va-input>
                        </div>
                    </div>

                    <va-data-table
                        :fields="fields.log"
                        :data="logAPI"
                        no-data-label="No data found"
                        :per-page="parseInt(perPage)"
                        :datacount="logAPI.length"
                        :dataperpage="parseInt(perPage)"
                        clickable
                    >
                        <template slot="no" slot-scope="row">
                            {{ row.rowIndex + 1 }}
                        </template>
                        <template slot="APPR_REMARK" slot-scope="props">
                            <span
                                v-b-tooltip.hover
                                v-on:click="readMore(props.rowData)"
                                title="Read more"
                                class="mr-2"
                            >
                                <i class="fa fa-window-restore"></i>
                            </span>
                        </template>
                    </va-data-table>
                </b-collapse>
            </div>
        </va-card>

        <vudal name="readMoreModal" class="widthModal">
            <div class="header">
                Remark<i class="close icon">&times;</i>
            </div>
            <div class="content">
                <b-textarea rows="5" v-model="read_remark" disabled></b-textarea>
            </div>
            <div class="actions">
                <button
                type="button"
                class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
                >
                <i class="fa fa-times" /> &nbsp; Close
                </button>
            </div>
        </vudal>
    </div>
</template>

<script>
    import Vudal from "vudal";
    import * as services02module2 from "@/app/module2/services02";

    export default {
        props: {
            // The parameters the component accepts
            consultantData: Object,
        },

        components:{
            Vudal
        },

        data(){
            return{
                visibleLog: false,
                logAPI: [],
                read_remark: '',
                currentPage: 1,
                perPage: "10",

                fields:{
                    log: [
                        {
                            name: "__slot:no",
                            title: "NO",
                        },
                        {
                            name: "DATE",
                            title: "Date",
                            sortField: "CREATE_TIMESTAMP",
                        },
                        {
                            name: "GROUP_NAME",
                            title: "Group",
                            sortField: "GROUP_NAME",
                        },
                        {
                            name: "DIST_NAME",
                            title: "Creation By",
                            sortField: "USER_NAME",
                        },
                        {
                            name: "TS_PARAM",
                            title: "Activity",
                            sortField: "TS_PARAM",
                        },
                        {
                            name: "__slot:APPR_REMARK",
                            title: "Remarks/Comments",
                            sortField: "APPR_REMARK",
                        },
                        {
                            name: "CREATE_TIMESTAMP",
                            title: "Latest Update",
                            sortField: "LATEST_UPDATE",
                        },
                    ],
                },

                search: {
                    log: ""
                },
            }
        },

        methods:{
            async readMore(data) {
                this.$modals.readMoreModal.$show();
                this.read_remark = data.APPR_REMARK;
            },

            getRegistrationApprovalLog: async function (consultId) {
                const response = await services02module2.getApplicationApprovalLog(consultId);
                if(response){
                    this.logAPI = response;
                }else{
                    this.logAPI = [];
                }
            },
        },

        created(){
            this.getRegistrationApprovalLog(this.consultantData.CONSULTANT_ID);
        },
    }
</script>

<style>
.registration-approval-log .v-pagination ul > li{
    padding-left: 0 !important;
}
.registration-approval-log .v-pagination ul > li:before{
    display: none !important;
}
</style>