<template>
    <div>
        <div class="ml-2">
        <vue-form-generator
            :model="model"
            :schema="registerNewSchema"
            :options="formOptions"
            ref="registerNewForm"
            @model-updated="onModelUpdated"
        >
        </vue-form-generator>
        </div>
        <br />
        <div class="ml-1 col-md-11">
        <vue-form-generator
            :model="model"
            :schema="fileUploadSchema"
            :options="formOptions"
            ref="fileUploadForm"
            @model-updated="onModelUpdated"
        >
        </vue-form-generator>
        </div>
        <br/>
        <div class="float-right">
            <button
            :disabled="!fileRecordsForUpload.length && !this.userId"
            @click="addParticipant"
            type="button"
            class="ml-1 btn btn-success btn-fill btn-md"
            >
            <i class="fa fa-plus" /> &nbsp; Add Participant
            </button>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import Multiselect from "vue-multiselect";
    import * as servicesModule4 from "../../../../../../app/module4/services02";

    Vue.component("multiselect", Multiselect);
    export default {
        props: {
            fileRecordsForUpload: Array,
            userId: Number,
        },
        mounted() {
            // this.getAllConsultantList()
        },
        methods: {
            onModelUpdated(newVal, schema) {
                if (schema == "writingTitle") {
                    this.model.writingTitle = String(newVal).toUpperCase();
                }
                if (schema == "publisher") {
                    this.model.publisher = String(newVal).toUpperCase();
                }
                if (schema == "consultantName") {
                    this.model.consultantName = String(newVal).toUpperCase();
                }
            },
            getAllConsultantList: async function () {
                const response = await servicesModule4.consultantList();
                this.consultantList = response;
            },
            addParticipant() {
                this.$emit('upload-by-individual', this.model)
            }
        },
        computed: {
            writingModeList() {
                return [{
                        "WRITING_MODE_ID": "1",
                        "WRITING_MODE_NAME": "Article"
                    },
                    {
                        "WRITING_MODE_ID": "2",
                        "WRITING_MODE_NAME": "Book"
                    },
                ]
            },
        },
        data() {
            return {
                consultantList: [],
                model: {
                    writingTitle: "",
                    publishDate: null,
                    writingMode: "",
                    publisher: "",
                    consultant: "",
                    consultantName: "",
                    nricNumber: "",
                    passportNumber: "",
                    fileUpload: "",
                    file: [],
                },
                registerNewSchema: {
                    fields: [
                        {
                            type: "input",
                            inputType: "text",
                            model: "writingTitle",
                            label: "Writing Title",
                            placeholder: "Enter Writing Title",
                            styleClasses: "col-md-12",
                            required: true,
                        },
                        {
                            type: "vueMultiSelect",
                            model: "writingMode",
                            label: "Writing Mode",
                            placeholder: "Select Writing Mode",
                            selectOptions: {
                                multiple: false,
                                key: "WRITING_MODE_ID",
                                label: "WRITING_MODE_NAME",
                                searchable: true,
                            },
                            values: (model, schema) => {
                                return this.writingModeList;
                            },
                            styleClasses: "col-md-12",
                            required: true,
                        },
                        {
                            type: "input",
                            inputType: "date",
                            model: "publishDate",
                            label: "Publish Date",
                            styleClasses: "col-md-6",
                            required: true,
                            validator: ["required"],
                        },
                        {
                            type: "input",
                            inputType: "text",
                            model: "publisher",
                            label: "Publisher",
                            placeholder: "Enter Publisher",
                            styleClasses: "col-md-6",
                            required: true,
                            validator: ["required"],
                        },
                        // {
                        //     type: "vueMultiSelect",
                        //     model: "consultant",
                        //     label: "Consultant Name",
                        //     placeholder: "Select Consultant Name",
                        //     selectOptions: {
                        //         multiple: false,
                        //         key: "CONSULTANT_ID",
                        //         label: "CONSULTANT_NAME",
                        //         searchable: true,
                        //     },
                        //     values: (model, schema) => {
                        //         return this.consultantList;
                        //     },
                        //     styleClasses: "col-md-12",
                        //     required: true,
                        // },
                        {
                            type: "input",
                            inputType: "text",
                            model: "consultantName",
                            label: "Consultant Name",
                            placeholder: "Enter Consultant Name",
                            styleClasses: "col-md-12",
                            required: true,
                        },
                        {
                            type: "input",
                            inputType: "text",
                            model: "nricNumber",
                            label: "NRIC Number",
                            placeholder: "Enter NRIC Number without '-'",
                            styleClasses: "col-md-6",
                            required: false,
                            hint: 'Note : Key-in NRIC number without '-'. Example: 800102034100',
                        },
                        {
                            type: "input",
                            inputType: "text",
                            model: "passportNumber",
                            label: "Passport Number",
                            placeholder: "Enter Passport Number",
                            styleClasses: "col-md-6",
                            required: false,
                        },
                    ],
                },
                fileUploadSchema: {
                    groups: [{
                        styleClasses: "row",
                        fields: [{
                            labels: "Upload Supporting Document",
                            accept: ".pdf",
                            multiple: false,
                            text: "Choose a File",
                            model: "file",
                            type: "vfg-custom-multiple-file",
                            styleClasses: "col-md-12 pl-0",
                        }, ],
                    }, ],
                },
                formOptions: {
                    validateAfterChanged: true,
                },
            }
        },
    }
</script>