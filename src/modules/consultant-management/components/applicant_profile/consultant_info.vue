<template>
    <div>
        <h4 style="margin-top:0">Consultant Details</h4>
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
                        <profile-view :consultantData="consultantData"></profile-view>
                    </div>
                </div>
                
                <div v-if="currentTab === 'tab2'">
                    <div class="ml-4">
                        <br />
                        <table class="table table-striped">
                            <tbody>
                            <tr>
                                <td style="width: 15%">Agent Type</td>
                                <td>{{ consultantData.CANDIDATE_CATEGORY }}</td>
                            </tr>
                            <tr v-if="consultantData.CANDIDATE_CATEGORY == 'STAFF'">
                                <td style="width: 15%">Position</td>
                                <td>
                                {{ consultantData.CANDIDATE_POSITION_CATEGORY }} 
                                <span v-if="consultantData.CANDIDATE_POSITION_CATEGORY=='OTHERS'"> - {{ consultantData.CANDIDATE_POSITION}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>License Type</td>
                                <td>{{ consultantData.TYPE_NAME }} ({{ consultantData.TYPE_FULL_NAME }})</td>
                            </tr>
                            <tr>
                                <td>Distributor</td>
                                <td>{{ consultantData.DIST_NAME }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="currentTab === 'tab3'">
                    <div class="ml-4">
                    <br />
                    <div v-if="consultantData.license_exemption">
                        <exemption-data :consultantData="consultantData"></exemption-data>
                    </div>
                    
                    <div v-else>
                        <table class="table table-striped">
                        <tbody>
                            <tr>
                                <td style="width: 15%">Examination Type</td>
                                <td>{{ consultantData.EXAMINATION_TYPE }}</td>
                            </tr>

                            <tr>
                                <td>Result</td>
                                <td v-if="consultantData.RESULT==0">
                                    Fail
                                </td>
                                <td v-else-if="consultantData.RESULT==1">
                                    Pass
                                </td>
                                <td v-else>
                                    -
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Certificate
                                </td>
                                <td>
                                    <!-- Not Available -->
                                    <a
                                    href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                    target="_blank"
                                    >
                                    View</a
                                    >
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>

                <div v-if="currentTab === 'tab4'">
                    <div class="ml-3">
                    <br />
                        <table class="table table-striped">
                            <tbody>
                                <tr style="width: 100%">
                                    <vue-form-generator
                                    :model="model"
                                    :schema="fileUploadSchema"
                                    :options="formOptions"
                                    ref="fileUploadForm"
                                    >
                                    </vue-form-generator>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div v-if="currentTab === 'tab5'">
                    <div class="ml-3">
                        <br />
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td>
                                        Bankruptcy Status
                                    </td>
                                    <td>
                                        <span v-if="consultantData.BANKRUPTCY_STATUS==0">No</span>
                                        <span v-else-if="consultantData.BANKRUPTCY_STATUS==1">Yes</span>
                                        <span v-else>Not checked</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Bankruptcy Date
                                    </td>
                                    <td>
                                        {{consultantData.BANKRUPTCY_DATE}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tabs from 'vue-tabs-with-active-line';

    // Consultant Profile Data display
    import ProfileView from "@/modules/consultant-management/components/applicant_profile/profile";
    import ExemptionData from "@/modules/consultant-management/components/applicant_profile/exemption_data";

    import * as services02module2 from '@/app/module2/services02';

    export default {
        props: {
            consultantData: Object,
        },

        components: {Tabs, ProfileView, ExemptionData},

        data(){
            return{
                tabs: [
                    {
                        title: "Applicant Profile",
                        value: "tab1"
                    },
                    {
                        title: "Type of Consultant",
                        value: "tab2"
                    },
                    {
                        title: "Examination",
                        value: "tab3"
                    },
                    {
                        title: "Uploaded Document",
                        value: "tab4"
                    },
                    {
                        title: "Bankruptcy Check",
                        value: "tab5"
                    }
                ],

                currentTab: 'tab1',

                model: {
                    PROFILE_UPLOADED_DOCUMENTS: [],
                },

                formOptions: {
                    validateAfterChanged: true,
                },

                fileUploadSchema: {
                    groups: [
                        {
                            styleClasses: 'row',
                            fields: [
                            {
                                accept: '.pdf',
                                multiple: true,
                                text: 'Choose a File',
                                model: 'PROFILE_UPLOADED_DOCUMENTS',
                                type: 'vfg-custom-file-view',
                                styleClasses: 'col-md-12',
                                required: false,
                                disabled: true,
                            },
                            ],
                        },
                    ],
                },
            }
        },

        methods: {
            handleClick(newTab) {
                this.currentTab = newTab;
            },

            getDocumentByID: async function(consultId, other_documents) {
                const response = await services02module2.getConsultantDocuments(consultId, other_documents);
                response.forEach(el => {
                    el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, "application/pdf");

                    el.DOC_BLOB = new File(
                    [el.DOC_BLOB],
                    //el.DOC_ORIGINAL_NAME + "." + el.DOC_FILETYPE,
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
                    
                    this.model.PROFILE_UPLOADED_DOCUMENTS.push(data);
                });
            },

            b64toBlobPDF(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = atob(b64Data);
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                return new File(byteArrays, 'pot', { type: contentType });
            },
        },

        created(){
            if (this.consultantData) {
                this.getDocumentByID(this.consultantData.CONSULTANT_ID, 'CONSULTANT_OTHER_DOCUMENTS');
            }
        }
    }
</script>

<style>

</style>