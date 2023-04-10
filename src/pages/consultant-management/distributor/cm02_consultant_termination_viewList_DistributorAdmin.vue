<template>
    <div>
        <div class="row">
            <div class="col-12">
                <template v-if="!currentConsultant">
                    <div v-if="!isReady" style="margin-top: 25%">
                        <div class="text-center text-success my-2">
                            <b-spinner class="align-middle mr-2"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </div>

                    <va-card v-else>
                        <template>
                            <h4 style="margin-top:0px; margin-bottom:20px">
                            List of Consultant Termination Request
                            </h4>
                        </template>

                        <div style="display:flex; justify-content:flex-end; align-items:center">
                            <div class="flex md3 offset--md3">
                                <div style="display:flex; justify-content:flex-end">
                                    <h4
                                    style="margin:0; margin-bottom:10px; "
                                    >
                                        <va-input :placeholder="$t('Search')" v-model="search.terminate" removable>
                                            <va-icon name="fa fa-search" slot="prepend" />
                                        </va-input>
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <!-- CONSULTANT TABLE -->
                        <va-data-table
                            :fields="consultantFields"
                            :data="filteredConsultant"
                            no-data-label="No data found"
                            :per-page="parseInt(perPage)"
                            :datacount="filteredConsultant.length"
                            :dataperpage="parseInt(perPage)"
                            clickable
                        >
                            <template slot="index" slot-scope="row">
                                {{ row.rowIndex + 1 }}
                            </template>

                            <template slot="TERMINATION_REMARK" slot-scope="props">
                                <span
                                    v-b-tooltip.hover
                                    v-on:click="readMore(props.rowData)"
                                    title="Read more"
                                    class="badge mr-2"
                                >
                                <i class="fa fa-window-restore"></i
                                ></span>
                            </template>

                            <template slot="ACTION" slot-scope="props">
                                <h4 style="margin:0; font-size:20px">
                                    <span v-b-tooltip.hover title="View" class="badge badge-primary mr-2" @click="viewCurrentConsultant(props)">
                                        <i class="fa fa-eye"></i>
                                    </span>
                                </h4>
                            </template>
                        </va-data-table>
                        <br />

                        <div class="float-left">
                            <button
                                @click="back"
                                type="button"
                                class="btn btn-primary btn-fill btn-md"
                                >
                                <i class="fa fa-step-backward" /> &nbsp; Previous
                            </button>
                        </div>
                    </va-card>
                </template>

                <template v-else>
                    <va-card>
                        <h4 style="margin-top:0">Consultant Details</h4>
                        <br />
                        
                        <div>
                            <div class="content">
                                <div class="ml-4">
                                    <br />
                                    <table id="consultant-profile" class="table table-striped">
                                        <tbody>
                                        <tr>
                                            <td style="width: 25%">Name</td>
                                            <td>{{ currentConsultant.CONSULTANT_NAME }}</td>
                                        </tr>

                                        <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 286 && currentConsultant.CONSULTANT_NRIC">
                                            <td>New NRIC</td>
                                            <td>{{ currentConsultant.CONSULTANT_NRIC }}</td>
                                        </tr>
                                        <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 286 && currentConsultant.CONSULTANT_NRIC_OLD">
                                            <td>Old NRIC Number</td>
                                            <td>{{ currentConsultant.CONSULTANT_NRIC_OLD }}</td>
                                        </tr>

                                        <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 287 && currentConsultant.CONSULTANT_PASSPORT_NO">
                                            <td>Passport no</td>
                                            <td>{{ currentConsultant.CONSULTANT_PASSPORT_NO }}</td>
                                        </tr>

                                        <tr v-if="currentConsultant.CONSULTANT_CITIZEN == 287 && currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO">
                                            <td>Passport Expiry Date</td>
                                            <td>{{ date(currentConsultant.CONSULTANT_PASSPORT_EXPIRY_NO) }}</td>
                                        </tr>
                                        <tr>
                                            <td>Date of Birth</td>
                                            <td>{{ date(currentConsultant.CONSULTANT_DOB) }}</td>
                                        </tr>

                                        <tr>
                                            <td>Race</td>
                                            <td>{{ currentConsultant.CONSULTANT_RACE_VALUE }} 
                                            <span v-if="currentConsultant.CONSULTANT_RACE_VALUE=='OTHERS'"> - {{currentConsultant.CONSULTANT_OTHER_RACE}}</span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Mobile Phone Number</td>
                                            <td>{{ currentConsultant.CONSULTANT_MOBILE_NO }}</td>
                                        </tr>

                                        <tr>
                                            <td>House Number</td>
                                            <td>{{ currentConsultant.CONSULTANT_HOUSE_NO }}</td>
                                        </tr>

                                        <tr>
                                            <td>Email</td>
                                            <td>{{ currentConsultant.CONSULTANT_EMAIL }}</td>
                                        </tr>

                                        <!-- Correspondent Address -->
                                        <tr>
                                            <td colspan="4" style="font-weight:bold;">
                                            Correspondent Address
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Country</td>
                                            <td>
                                            {{currentConsultant.CORRESPONDENT_COUNTRY}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>State</td>
                                            <td>
                                            {{currentConsultant.CORRESPONDENT_STATE}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>City</td>
                                            <td>
                                            {{currentConsultant.CORRESPONDENT_CITY}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Postcode</td>
                                            <td>
                                            {{ currentConsultant.CORRESPONDENT_POSTAL }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>
                                            {{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR1 }}
                                            </td>
                                        </tr>
                                        <tr v-if="currentConsultant.CONSULTANT_CORRESPONDENT_ADDR2">
                                            <td>Address 2</td>
                                            <td>
                                            {{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR2 }}
                                            </td>
                                        </tr>
                                        <tr v-if="currentConsultant.CONSULTANT_CORRESPONDENT_ADDR3">
                                            <td>Address 3</td>
                                            <td>
                                            {{ currentConsultant.CONSULTANT_CORRESPONDENT_ADDR3 }}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <br />

                        <div class="row">
                            <div class="col-6 mb-2">
                                <strong >TERMINATION TYPE</strong><br>
                                    {{currentConsultant.TERMINATION_TYPE}}
                            </div>

                            <div class="col-6 mb-2" v-if="currentConsultant.TERMINATION_TYPE_ID==10">
                                <strong >TERMINATION_TYPE_OTHER_SPECIFY</strong><br>
                                {{currentConsultant.TERMINATION_TYPE_OTHER_SPECIFY}}
                            </div>

                            <div class="col-6 mb-2">
                                <strong for="">TERMINATION DATE</strong><br>
                                {{currentConsultant.TERMINATION_DATE}}
                            </div>

                            <div class="col-6 mb-2" v-if="currentConsultant.TERMINATION_TYPE_ID==5">
                                <strong for="">BANKRUPTCY DATE</strong><br>
                                {{currentConsultant.BANKRUPTCY_DATE}}
                            </div>

                            <div class="col-12 mt-4">
                                <vue-form-generator
                                    :model="model"
                                    :schema="disabledRemark"
                                    :options="formOptions"
                                    ref="singleForm"
                                    @model-updated="onModelUpdated"
                                >
                                </vue-form-generator>
                            </div>
                        </div>

                        <br />

                        <div class="float-left">
                            <button
                            @click="resetFormData"
                            type="button"
                            class="btn btn-primary btn-fill btn-md"
                            >
                            <i class="fa fa-step-backward" /> &nbsp; Previous
                            </button>
                        </div>
                    </va-card>
                </template>

                <vudal name="readRemarkModal" class="widthModal">
                    <div class="header">
                        Remark<i class="close icon">&times;</i>
                    </div>

                    <div class="content">
                        <vue-form-generator
                            :model="model"
                            :schema="readMoreSchema"
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
                    </div>
                </vudal>
            </div>
        </div>
    </div>
</template>

<script>
    import VueFormGenerator from 'vue-form-generator';
    import 'vue-form-generator/dist/vfg-core.css';
    import 'vue-form-wizard/dist/vue-form-wizard.min.css';
    import Vue from 'vue';
    import Vudal from 'vudal';
    import moment from 'moment';
    import * as services02module2 from '../../../app/module2/services02';
    import RepositoryFactory from '../../../repositories/RepositoryFactory';
    const Termination = RepositoryFactory.get('termination');

    Vue.use(VueFormGenerator);

    export default {
        components:{
            Vudal,
        },

        data(){
            return{
                isReady: false,
                consultantsAPI: [],
                currentConsultant: '',
                perPage: '10',
                search: {
                    terminate: '',
                },

                model: {
                    readRemark: '',
                    TERMINATION_REMARK: '',
                    TERMINATION_DATE: '',
                    BANKRUPTCY_DATE: '',
                    TERMINATION_DOCUMENT: [],
                    BANKRUPTCY_DOCUMENT: [],
                },

                formOptions: {
                    validateAfterChanged: true,
                },

                visible: {
                    bankruptcyDocument: false,
                },

                readMoreSchema: {
                    groups: [
                        {
                        styleClasses: "row",
                        fields: [
                            {
                                type: "textArea",
                                model: "readRemark",
                                rows: 5,
                                validator: "string",
                                styleClasses: "col-md-12",
                                disabled:true
                            },
                        ],
                        },
                    ],
                },

                disabledRemark: {
                    groups: [
                        {
                            styleClasses: 'row',
                            fields: [
                                {
                                    type: 'textArea',
                                    rows: 10,
                                    max: 1000,
                                    label: 'Remarks / Comments',
                                    hint: 'Max 1000 characters',
                                    model: 'TERMINATION_REMARK',
                                    placeholder: 'Enter Remarks or Comments',
                                    disabled:true
                                },
                                {
                                    theme: 'list',
                                    labels: "Uploaded Document",
                                    accept: '.pdf',
                                    multiple: true,
                                    text: 'Choose a File',
                                    model: 'TERMINATION_DOCUMENT',
                                    type: 'vfg-custom-file-view2',
                                    required: false,
                                    disabled: true,
                                },
                                {
                                    theme: 'list',
                                    labels: "Bankruptcy Document",
                                    accept: '.pdf',
                                    multiple: true,
                                    text: 'Choose a File',
                                    model: 'BANKRUPTCY_DOCUMENT',
                                    type: 'vfg-custom-file-view2',
                                    required: false,
                                    disabled: true,
                                    visible: (model, field, form) => {
                                        return this.visible.bankruptcyDocument;
                                    },
                                },
                            ],
                        },
                    ],
                },
            }
        },

        methods:{
            async readMore(data) {
                this.$modals.readRemarkModal.$show();
                this.model.readRemark = data.TERMINATION_REMARK;
            },
            
            back() {
                this.$router.push('/distributor/consultant-termination-Distributor')
            },

            resetFormData(){
                this.currentConsultant = '';
                this.model.TERMINATION_REMARK = '';
                this.model.TERMINATION_DATE = '';
                this.model.BANKRUPTCY_DATE = '';
                this.model.TERMINATION_DOCUMENT = [];
                this.model.BANKRUPTCY_DOCUMENT = [];
            },

            viewCurrentConsultant(props) {
                this.currentConsultant = props.rowData;
                this.model.TERMINATION_REMARK=props.rowData.TERMINATION_REMARK;
                this.model.TERMINATION_DATE=props.rowData.TERMINATION_DATE;
                this.model.BANKRUPTCY_DATE=props.rowData.BANKRUPTCY_DATE;

                this.model.TERMINATION_DOCUMENT=[];
                //Get Termination Document
                if(props.rowData.TERMINATION_ID){
                    this.getTerminationDocument(props.rowData.TERMINATION_ID, 'TERMINATION_DOCUMENT');
                }

                //Get Bankruptcy Document
                if(props.rowData.TERMINATION_TYPE_ID==5){
                    this.visible.bankruptcyDocument = true;
                    this.getBankruptcyDocument(props.rowData.TERMINATION_ID, 'BANKRUPTCY_DOCUMENT');
                }else{
                    this.visible.bankruptcyDocument = false;
                }
            },

            date: function (date) {
                return moment(date).format("DD-MMM-yyyy");
            },

            onModelUpdated(newVal, schema) {
  
            },

            getTerminationDocument: async function(termination_id, tablename) {
                const response = await Termination.getTerminationDocumentByID(
                    termination_id,
                    tablename
                );
                response.forEach(element => {
                    element.DOC_BLOB = this.b64toBlobPDF(
                        element.DOC_BLOB,
                        "application/pdf"
                        );
                        //console.log(element.DOC_BLOB); // <----- cuba tgk ini
                        element.DOC_BLOB = new File(
                        [element.DOC_BLOB],
                        element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
                        { type: element.DOC_BLOB.type }
                    );
                    const data = {
                        docID: element.TERMINATION_DOCUMENT_ID,
                        name: element.DOC_ORIGINAL_NAME + " - By " + element.CREATE_BY  + "." + element.DOC_FILETYPE,
                        size: element.DOC_FILESIZE,
                        type: element.DOC_FILETYPE,
                        ext: "exe",
                        url: window.URL.createObjectURL(element.DOC_BLOB)
                    };
                    this.model.TERMINATION_DOCUMENT.push(data);
                });
            },

            getBankruptcyDocument: async function(termination_id, tablename) {
                const response = await Termination.getTerminationDocumentByID(
                    termination_id,
                    tablename
                );
                response.forEach(element => {
                    element.DOC_BLOB = this.b64toBlobPDF(
                        element.DOC_BLOB,
                        "application/pdf"
                        );
                        //console.log(element.DOC_BLOB); // <----- cuba tgk ini
                        element.DOC_BLOB = new File(
                        [element.DOC_BLOB],
                        element.DOC_ORIGINAL_NAME + "." + element.DOC_FILETYPE,
                        { type: element.DOC_BLOB.type }
                    );
                    const data = {
                        docID: element.TERMINATION_DOCUMENT_ID,
                        name: element.DOC_ORIGINAL_NAME + " - By " + element.CREATE_BY  + "." + element.DOC_FILETYPE,
                        size: element.DOC_FILESIZE,
                        type: element.DOC_FILETYPE,
                        ext: "exe",
                        url: window.URL.createObjectURL(element.DOC_BLOB)
                    };
                    this.model.BANKRUPTCY_DOCUMENT.push(data);
                });
            },

            b64toBlobPDF(b64Data, contentType, sliceSize) {
                contentType = contentType || "";
                sliceSize = sliceSize || 512;

                var byteCharacters = atob(b64Data);
                var byteArrays = [];

                for (
                    var offset = 0;
                    offset < byteCharacters.length;
                    offset += sliceSize
                ) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                return new File(byteArrays, "pot", { type: contentType });
            },
        },

        computed: {
            consultantFields(){
                return [
                    { name: '__slot:index', title: 'NO' },
                    { name: 'CONSULTANT_NAME', title: 'CONSULTANT NAME' },
                    { name: 'CONSULTANT_NRIC', title: 'NRIC NUMBER' },
                    { name: 'CONSULTANT_PASSPORT_NO', title: 'PASSPORT NUMBER' },
                    { name: 'CONSULTANT_FIMM_NO', title: 'FIMM NUMBER' },
                    { name: 'CONSULTANT_TYPE', title: 'CONSULTANT TYPE' },
                    { name: 'TERMINATION_TYPE', title: 'TERMINATION TYPE' },
                    { name: 'TERMINATION_DATE', title: 'TERMINATION DATE' },
                    { name: '__slot:TERMINATION_REMARK', title: 'REMARKS/COMMENTS' },
                    { name: '__slot:ACTION', title: 'ACTION' },
                ];
            },

            filteredConsultant() {
                const search = this.search.terminate.toLowerCase();
                if (this.search && this.consultantsAPI) {
                    return this.consultantsAPI.filter(el => {
                    return Object.keys(el).some(key => `${el[key]}`.toLowerCase().match(search));
                    });
                }
                return this.consultantsAPI;
            },
        },

        async created () {
            const user = JSON.parse(localStorage.getItem('user'));
            var TERMINATION_STATUS=localStorage.getItem('TERMINATION_STATUS');
            var SUBMISSION_ID = localStorage.getItem('SUBMISSION_ID');
            this.consultantsAPI=await services02module2.getAllTerminationAdminBySubmissionId(user.USER_DIST_ID, JSON.stringify([TERMINATION_STATUS]), SUBMISSION_ID);
            this.isReady=true;
        },
    }
</script>

<style>

</style>