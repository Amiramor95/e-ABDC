<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <td style="width: 20%">Exemption Category</td>
                    <td>{{consultantData.EXEMPTION_CATEGORY_NAME}}</td>
                    <td v-if="consultantData.license_exemption.EXEMPTION_CATEGORY_ID==2"></td>
                </tr>
            </thead>

            <!-- Fund manager -->
            <tbody v-if="consultantData.license_exemption.EXEMPTION_CATEGORY_ID==1">
                <tr>
                    <td>CMSRL No</td>
                    <td>{{consultantData.license_exemption.FM_CMSRL_NO}}</td>
                </tr>

                <tr>
                    <td>CMSRL Expiry Date</td>
                    <td>{{ date(consultantData.license_exemption.FM_EXPIREY_DATE) }}</td>
                </tr>

                <tr>
                    <td>
                        Documents
                    </td>
                    <td>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionDocuments"
                            :options="formOptions"
                            ref="exemptionDocuments"
                        >
                        </vue-form-generator>
                    </td>
                </tr>
            </tbody>

            <!-- CEO -->
            <tbody v-if="consultantData.license_exemption.EXEMPTION_CATEGORY_ID==3">
                <tr>
                    <td>
                        Documents
                    </td>
                    <td>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionDocuments"
                            :options="formOptions"
                            ref="exemptionDocuments"
                        >
                        </vue-form-generator>
                    </td>
                </tr>
            </tbody>

            <!-- Director -->
            <tbody v-if="consultantData.license_exemption.EXEMPTION_CATEGORY_ID==4">
                <tr>
                    <td>Years of experience</td>
                    <td>{{consultantData.license_exemption.DIRECTOR_YEAR}}</td>
                </tr>
                
                <tr>
                    <td>
                        Documents
                    </td>
                    <td>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionDocuments"
                            :options="formOptions"
                            ref="exemptionDocuments"
                        >
                        </vue-form-generator>
                    </td>
                </tr>
            </tbody>

            <!-- Insurance agent -->
            <tbody v-if="consultantData.license_exemption.EXEMPTION_CATEGORY_ID==5">
                <tr>
                    <td>Insurance Certificates</td>
                    <td>{{consultantData.license_exemption.INSURANCE_CERTIFICATE_NAME}}</td>
                </tr>
                
                <tr>
                    <td>
                        Documents
                    </td>
                    <td>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionDocuments"
                            :options="formOptions"
                            ref="exemptionDocuments"
                        >
                        </vue-form-generator>
                    </td>
                </tr>

                <tr>
                    <td>Completion Date</td>
                    <td>{{ date(consultantData.license_exemption.PRSFP_IA_COMPLETION_DATE) }}</td>
                </tr>
            </tbody>

            <!-- Unit trust consultant -->
            <tbody v-if="consultantData.license_exemption.EXEMPTION_CATEGORY_ID==6">
                <tr>
                    <td>
                        Documents
                    </td>
                    <td>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionDocuments"
                            :options="formOptions"
                            ref="exemptionDocuments"
                        >
                        </vue-form-generator>
                    </td>
                </tr>
            </tbody>

            <!-- Pioneer consultant -->
            <tbody v-if="consultantData.license_exemption.EXEMPTION_CATEGORY_ID==7">
                <tr>
                    <td>
                        Documents
                    </td>
                    <td>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionDocuments"
                            :options="formOptions"
                            ref="exemptionDocuments"
                        >
                        </vue-form-generator>
                    </td>
                </tr>
            </tbody>

            <!-- Financial planner -->
            <tbody v-if="consultantData.license_exemption.EXEMPTION_CATEGORY_ID==2">
                <tr>
                    <td>
                        Documents
                    </td>
                    <td>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionFPDocument"
                            :options="formOptions"
                            ref="exemptionFPDocument"
                        >
                        </vue-form-generator>
                    </td>
                    <td></td>
                </tr>

                <!-- a) FPAM -CFP/IFP/Both -->
                <tr>
                    <td colspan="6" style="font-weight:bold;">
                        a) FPAM -CFP/IFP/Both
                    </td>
                </tr>

                <tr>
                    <td>
                        Module 1 Completion Date
                    </td>
                    <td>
                        <span v-if="consultantData.license_exemption.FP_FPAM_MODULE1_DATE">
                            {{ date(consultantData.license_exemption.FP_FPAM_MODULE1_DATE) }}
                        </span>
                    </td>
                    <td>
                        <span class="d-block">Uploaded Document</span>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionFpamModule1Document"
                            :options="formOptions"
                            ref="exemptionFpamModule1Document"
                        >
                        </vue-form-generator>
                    </td>
                </tr>

                <tr>
                    <td>
                        Module 3 Completion Date
                    </td>
                    <td>
                        <span v-if="consultantData.license_exemption.FP_FPAM_MODULE3_DATE">
                            {{ date(consultantData.license_exemption.FP_FPAM_MODULE3_DATE) }}
                        </span>
                    </td>
                    <td>
                        <span class="d-block">Uploaded Document</span>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionFpamModule3Document"
                            :options="formOptions"
                            ref="exemptionFpamModule3Document"
                        >
                        </vue-form-generator>
                    </td>
                </tr>

                <tr>
                    <td>
                        CFP/IFP-Certified Completion Date
                    </td>
                    <td>
                        <span v-if="consultantData.license_exemption.FP_FPAM_CERTIFY_DATE">
                            {{ date(consultantData.license_exemption.FP_FPAM_CERTIFY_DATE) }}
                        </span>
                    </td>
                    <td>
                        <span class="d-block">Uploaded Document</span>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionFpamCertifyDocument"
                            :options="formOptions"
                            ref="exemptionFpamCertifyDocument"
                        >
                        </vue-form-generator>
                    </td>
                </tr>

                <!-- b) MFPC -->
                <tr>
                    <td colspan="6" style="font-weight:bold;">
                        b) MFPC
                    </td>
                </tr>

                <!-- i) RFP/Shariah RFP - Partial Completion -->
                <tr>
                    <td colspan="6" style="font-weight:bold;">
                        i) RFP/Shariah RFP - Partial Completion
                    </td>
                </tr>

                <tr>
                    <td>
                        Module 1 Completion Date
                    </td>
                    <td>
                        <span v-if="consultantData.license_exemption.FP_MFPC_MODULE1_DATE">
                            {{ date(consultantData.license_exemption.FP_MFPC_MODULE1_DATE) }}
                        </span>
                    </td>
                    <td>
                        <span class="d-block">Uploaded Document</span>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionMfpcModule1Document"
                            :options="formOptions"
                            ref="exemptionMfpcModule1Document"
                        >
                        </vue-form-generator>
                    </td>
                </tr>

                <tr>
                    <td>
                        Module 3 Completion Date
                    </td>
                    <td>
                        <span v-if="consultantData.license_exemption.FP_MFPC_MODULE3_DATE">
                            {{ date(consultantData.license_exemption.FP_MFPC_MODULE3_DATE) }}
                        </span>
                    </td>
                    <td>
                        <span class="d-block">Uploaded Document</span>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionMfpcModule3Document"
                            :options="formOptions"
                            ref="exemptionMfpcModule3Document"
                        >
                        </vue-form-generator>
                    </td>
                </tr>

                <tr>
                    <td>
                        Module 6 Completion Date
                    </td>
                    <td>
                        <span v-if="consultantData.license_exemption.FP_MFPC_MODULE6_DATE">
                            {{ date(consultantData.license_exemption.FP_MFPC_MODULE6_DATE) }}
                        </span>
                    </td>
                    <td>
                        <span class="d-block">Uploaded Document</span>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionMfpcModule6Document"
                            :options="formOptions"
                            ref="exemptionMfpcModule6Document"
                        >
                        </vue-form-generator>
                    </td>
                </tr>

                <!-- ii) RFP/Shairah RFP - Certified -->
                <tr>
                    <td colspan="6" style="font-weight:bold;">
                        ii) RFP/Shairah RFP - Certified
                    </td>
                </tr>

                <tr>
                    <td>
                        Completion Date
                    </td>
                    <td>
                        <span v-if="consultantData.license_exemption.FP_MFPC_CERTIFY_DATE">
                            {{ date(consultantData.license_exemption.FP_MFPC_CERTIFY_DATE) }}
                        </span>
                    </td>
                    <td>
                        <span class="d-block">Uploaded Document</span>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionMfpcCertifyDocument"
                            :options="formOptions"
                            ref="exemptionMfpcCertifyDocument"
                        >
                        </vue-form-generator>
                    </td>
                </tr>

                <!-- c) MFPAA -->
                <tr>
                    <td colspan="6" style="font-weight:bold;">
                        c) MFPAA
                    </td>
                </tr>

                <tr>
                    <td>
                        Completion Date
                    </td>
                    <td>
                        <span v-if="consultantData.license_exemption.FP_MFPAA_CERTIFY_DATE">
                            {{ date(consultantData.license_exemption.FP_MFPAA_CERTIFY_DATE) }}
                        </span>
                    </td>
                    <td>
                        <span class="d-block">Uploaded Document</span>
                        <vue-form-generator
                            :model="model"
                            :schema="exemptionMfpaaCertifyDocument"
                            :options="formOptions"
                            ref="exemptionMfpaaCertifyDocument"
                        >
                        </vue-form-generator>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import moment from "moment";
    import * as services02module2 from "@/app/module2/services02";

    export default {
        props: {
            // The parameters the component accepts
            consultantData: Object,
        },

        data(){
            return{
                model:{
                    EXEMPTION_DOCUMENTS: [],
                    EXEMPTION_FP_DOCUMENT: [],
                    FPAM_MODULE1_DOCUMENT: [],
                    FPAM_MODULE3_DOCUMENT: [],
                    FPAM_CERTIFY_DOCUMENT: [],
                    MFPC_MODULE1_DOCUMENT: [],
                    MFPC_MODULE3_DOCUMENT: [],
                    MFPC_MODULE6_DOCUMENT: [],
                    MFPC_CERTIFY_DOCUMENT: [],
                    MFPAA_CERTIFY_DOCUMENT: [],
                },

                formOptions: {
                    validateAfterChanged: true
                },

                exemptionDocuments: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "EXEMPTION_DOCUMENTS",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },

                exemptionFPDocument: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "EXEMPTION_FP_DOCUMENT",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },

                exemptionFpamModule1Document: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "FPAM_MODULE1_DOCUMENT",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },

                exemptionFpamModule3Document: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "FPAM_MODULE3_DOCUMENT",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },

                exemptionFpamCertifyDocument: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "FPAM_CERTIFY_DOCUMENT",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },

                exemptionMfpcModule1Document: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "MFPC_MODULE1_DOCUMENT",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },

                exemptionMfpcModule3Document: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "MFPC_MODULE3_DOCUMENT",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },

                exemptionMfpcModule6Document: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "MFPC_MODULE6_DOCUMENT",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },

                exemptionMfpcCertifyDocument: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "MFPC_CERTIFY_DOCUMENT",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },

                exemptionMfpaaCertifyDocument: {
                    groups: [
                        {
                            styleClasses: "row",
                            fields: [
                                {
                                    theme: "list",
                                    multiple: true,
                                    text: "Choose a File",
                                    model: "MFPAA_CERTIFY_DOCUMENT",
                                    type: "vfg-custom-file-view2",
                                    styleClasses: "col-md-12",
                                    required: false,
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },
            }
        },

        created(){

        },

        mounted(){
            if(this.consultantData.license_exemption.EXEMPTION_CATEGORY_ID==1){
                this.getExemptionDocument(this.consultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_FM_DOCUMENT');
            }else if(this.consultantData.license_exemption.EXEMPTION_CATEGORY_ID==3){
                this.getExemptionDocument(this.consultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_CEO_DOCUMENT');
            }else if(this.consultantData.license_exemption.EXEMPTION_CATEGORY_ID==4){
                this.getExemptionDocument(this.consultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_DIRECTOR_DOCUMENT');
            }else if(this.consultantData.license_exemption.EXEMPTION_CATEGORY_ID==5){
                this.getExemptionDocument(this.consultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_PRSFP_IA_DOCUMENT');
            }else if(this.consultantData.license_exemption.EXEMPTION_CATEGORY_ID==6){
                this.getExemptionDocument(this.consultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_PRSFP_UTC_DOCUMENT');
            }else if(this.consultantData.license_exemption.EXEMPTION_CATEGORY_ID==7){
                this.getExemptionDocument(this.consultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_PRSFP_PR_DOCUMENT');
            }else if(this.consultantData.license_exemption.EXEMPTION_CATEGORY_ID==2){
                this.getExemptionDocument(this.consultantData.CONSULTANT_ID, 'CONSULTANT_EXEMPTION_FP_DOCUMENT');
            }
        },

        methods:{  
            date: function (date) {
                return moment(date).format("DD-MMM-yyyy");
            },

            getExemptionDocument: async function(consultantId, tableName) {
                const response = await services02module2.getConsultantDocuments(consultantId, tableName);
                response.forEach(el => {
                    el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");

                    el.DOC_BLOB = new File(
                        [el.DOC_BLOB],
                        el.DOC_ORIGINAL_NAME,
                        {
                            type: el.DOC_BLOB.type
                        }
                    );

                    const data = {
                        docID: el.CA_DOCUMENT_ID,
                        name: el.DOC_ORIGINAL_NAME,
                        size: el.DOC_FILESIZE,
                        type: el.DOC_FILETYPE,
                        ext: "exe",
                        url: window.URL.createObjectURL(el.DOC_BLOB)
                    };

                    if(el.FIELD_NAME=='EXEMPTION_FP'){
                        this.model.EXEMPTION_FP_DOCUMENT.push(data);
                    }else if(el.FIELD_NAME=='EXEMPTION_FPAM_MODULE1'){ 
                        this.model.FPAM_MODULE1_DOCUMENT.push(data);
                    }else if(el.FIELD_NAME=='EXEMPTION_FPAM_MODULE3'){ 
                        this.model.FPAM_MODULE3_DOCUMENT.push(data);
                    }else if(el.FIELD_NAME=='EXEMPTION_FPAM_CERTIFY'){ 
                        this.model.FPAM_CERTIFY_DOCUMENT.push(data);
                    }else if(el.FIELD_NAME=='EXEMPTION_MFPC_MODULE1'){ 
                        this.model.MFPC_MODULE1_DOCUMENT.push(data);
                    }
                    else if(el.FIELD_NAME=='EXEMPTION_MFPC_MODULE3'){ 
                        this.model.MFPC_MODULE3_DOCUMENT.push(data);
                    }
                    else if(el.FIELD_NAME=='EXEMPTION_MFPC_MODULE6'){ 
                        this.model.MFPC_MODULE6_DOCUMENT.push(data);
                    }
                    else if(el.FIELD_NAME=='EXEMPTION_MFPC_CERTIFY'){ 
                        this.model.MFPC_CERTIFY_DOCUMENT.push(data);
                    }
                    else if(el.FIELD_NAME=='EXEMPTION_MFPAA_CERTIFY'){ 
                        this.model.MFPAA_CERTIFY_DOCUMENT.push(data);
                    }else{
                        this.model.EXEMPTION_DOCUMENTS.push(data);
                    }
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
            }
        },
    }
</script>

<style>

</style>