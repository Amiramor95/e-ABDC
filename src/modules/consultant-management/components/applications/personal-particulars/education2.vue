<template>
  <div class="row">
    <div class="col-md-12">
        <vue-form-generator
          :model="model"
          :schema="tabEducationSchema"
          :options="formOptions"
          ref="tabForm1"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
    </div>
  </div>
</template>

<script>
import * as services02module2 from "../../../../../app/module2/services02";
export default {
  name: "personal-education",
  props: {
    // parameters the component accepts
    savedConsultantData: Object,
    personal_particulars: Object,
    general_settings: Object,
    savedConsultantEducationData: Object,
    qualification: {
      type: Array,
    },
  },

  computed: {
    options_profesional_certs() {
      // manually added null to the options to disable value in the database
      const certs = [
        {
          ID: null,
          NAME: "-",
        },
        ...this.general_settings.PROFESSIONAL_CERTIFICATES,
      ];
      return certs;
    },
  },
  watch: {
    // "model.CONSULTANT_EDUCATION_ID": function (value) {
    //   // console.log(value)
    // },
  },
  data() {
    return {
      model: {
        CONSULTANT_HIGHEST_QUALIFICATION: '',
        MATH: '',
        LANGUAGE: '',
        OTHER_LANGUAGE: '',
        SELECTED_PROFESIONAL_CERT: '',
        ADVANCE_LEVEL_DOCS: [],
        SPM_DOCS: [],
        SPMV_DOCS: [],
        STPM_DOCS: [],
        DIPLOMA_DOCS: [],
        DEGREE_DOCS: [],
        DEGREE_MAJOR: '',
        DEGREE_MINOR: '',
        ORDINARY_LEVEL_DOCS: [],
        FILE_PROFESIONAL_CERT: '',
        SUBJECT: '',
        OTHER_SUBJECT: '',
        SUBJECT1: '',
        SUBJECT2: '',
        SUBJECT3: '',
        PROFESSIONAL_CERTIFICATE: '',
        PROFESSIONAL_CFP_DOCS: [],
        PROFESSIONAL_IFP_DOCS: [],
        PROFESSIONAL_RFP_DOCS: [],
        PROFESSIONAL_SRFP_DOCS: [],
        CONSULTANT_SPM: '',
      },
      options_spm_math_credit: '',

      spmequivalent: [
        { name: 'Credit in Mathematics', value: '1' },
        { name: 'Credit in Language', value: '2' },
        { name: 'Credit in Other subject', value: '3' },
      ],
      math: [
        { name: 'YES', value: '1' },
        { name: 'NO', value: '0' },
      ],
      subject: [
        { name: 'CREDIT IN SEJARAH', value: '1' },
        { name: 'CREDIT IN PENDIDIKAN ISLAM', value: '2' },
        { name: 'OTHERS', value: '3' },
      ],
      language: [
        { name: 'MALAY', value: '1' },
        { name: 'CHINESE', value: '2' },
        { name: 'ENGLISH', value: '3' },
        { name: 'OTHERS', value: '4' },
      ],
      certificate: [
        { name: 'CERTIFIED FINANCIAL PLANNER (CFP)', value: '1' },
        { name: 'ISLAMIC FINANCIAL PLANNER (IFP)', value: '2' },
        { name: 'REGISTERED FINANCIAL PLANNER (RFP)', value: '3' },
        { name: 'SHARIAH REGISTERED FINANCIAL PLANNER (SRFP)', value: '4' },
      ],

      formOptions: {
        validateAfterChanged: true,
      },

      visibleEducation: {
        ADVANCE_LEVEL: false,
        SPM: false,
        SPMV: false,
        STPM: false,
        DIPLOMA: false,
        DEGREE: false,
        ORDINARY_LEVEL: false,
        PROFESSIONAL: false,
        visibleOtherLanguage: false,
        visibleOtherSubject: false,
        PROFESSIONAL_CFP: false,
        PROFESSIONAL_IFP: false,
        PROFESSIONAL_RFP: false,
        PROFESSIONAL_SRFP: false,
        MATH: false,
        LANGUAGE: false,
        OTHER_SUBJECT: false,
      },

      tabEducationSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'CONSULTANT_HIGHEST_QUALIFICATION',
                label: 'Highest Qualification',
                placeholder: 'Enter highest qualification',
                required: true,
                selectOptions: {
                  multiple: false,
                  value: 'CONSULTANT_QUALIFICATION_ID',
                  label: 'QUAL_NAME',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.qualification;
                },
              },
              {
                labels: 'Upload Supported Document For ADVANCE LEVEL Equivalent Qualification',
                theme: "list",
                multiple: false,
                text: 'Choose a file',
                model: 'ADVANCE_LEVEL_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.ADVANCE_LEVEL;
                },
              },
              {
                labels: 'Upload Supported Document For SPM or SPM Equivalent Qualification',
                theme: "list",
                multiple: false,
                text: 'Choose a file',
                model: 'SPM_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.SPM;
                },
              },
              {
                labels: 'Upload Supported Document For SPMV or SPMV Equivalent Qualification',
                theme: "list",
                multiple: false,
                text: 'Choose a file',
                model: 'SPMV_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.SPMV;
                },
              },
              {
                labels: 'Upload Supported Document For STPM Or STPM Equivalent Qualification',
                theme: "list",
                multiple: false,
                text: 'Choose A FILE',
                model: 'STPM_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.STPM;
                },
              },
              {
                labels: 'Upload Supported Document For Diploma',
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'DIPLOMA_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.DIPLOMA;
                },
              },
              {
                labels: 'Upload Supported Document For Degree Qualification',
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'DEGREE_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.DEGREE;
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Major in',
                model: 'DEGREE_MAJOR',
                placeholder: 'Please specify',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-6 text-uppercase pl-0',
                visible: (model, field, form) => {
                  return this.visibleEducation.DEGREE;
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Minor in',
                model: 'DEGREE_MINOR',
                placeholder: 'Please specify',
                validator: 'string',
                styleClasses: 'col-md-6 text-uppercase pr-0',
                visible: (model, field, form) => {
                  return this.visibleEducation.DEGREE;
                },
              },
              {
                labels: 'Upload Supported Document For ORDINARY LEVEL Qualification',
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'ORDINARY_LEVEL_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.ORDINARY_LEVEL;
                },
              },
              // {
              //   type: 'vueMultiSelect',
              //   model: 'CONSULTANT_SPM',
              //   label: 'SPM or SPM Equivalent',
              //   placeholder: 'Select SPM or SPM Equivalent',
              //   required: true,
              //   selectOptions: {
              //     multiple: false,
              //     key: 'id',
              //     label: 'name',
              //     searchable: true,
              //   },
              //   values: (model, schema) => {
              //     return this.spmequivalent;
              //   },
              // },
              {
                type: 'radios',
                label: 'Credit in Mathemathic',
                model: 'MATH',
                required: true,
                styleClasses: 'col-md-6 display-inline pl-0',
                values: () => {
                  return this.math;
                },
                // visible: (model, field, form) => {
                //   return this.visibleEducation.MATH;
                // },
              },
              {
                type: 'vueMultiSelect',
                model: 'LANGUAGE',
                label: 'Credit in Language',
                placeholder: 'Enter credit in language',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.language;
                },
                // visible: (model, field, form) => {
                //   return this.visibleEducation.LANGUAGE;
                // },
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'Other Language',
                model: 'OTHER_LANGUAGE',
                placeholder: 'Please specify',
                validator: 'string',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.visibleOtherLanguage;
                },
              },
              {
                type: 'vueMultiSelect',
                model: 'SUBJECT',
                label: 'Credit Other Subject',
                placeholder: 'Enter credit other subject',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.subject;
                },
                // visible: (model, field, form) => {
                //   return this.visibleEducation.OTHER_SUBJECT;
                // },
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'Other Subject',
                model: 'OTHER_SUBJECT',
                placeholder: 'Please specify',
                validator: 'string',
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEducation.visibleOtherSubject;
                },
              },

              {
                type: 'vueMultiSelect',
                model: 'PROFESSIONAL_CERTIFICATE',
                label: 'Professional Certificate',
                placeholder: 'Enter professional certificate',
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  key: 'id',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.certificate;
                },
                // visible: (model, field, form) => {
                //   return this.visibleEducation.PROFESSIONAL;
                // },
              },
              {
                labels: 'Upload Supported Document For Professional Certificate (CFP)',
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'PROFESSIONAL_CFP_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                visible: (model, field, form) => {
                  return this.visibleEducation.PROFESSIONAL_CFP;
                },
              },
              {
                labels: 'Upload Supported Document For Professional Certificate (IFP)',
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'PROFESSIONAL_IFP_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                visible: (model, field, form) => {
                  return this.visibleEducation.PROFESSIONAL_IFP;
                },
              },
              {
                labels: 'Upload Supported Document For Professional Certificate (RFP)',
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'PROFESSIONAL_RFP_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                visible: (model, field, form) => {
                  return this.visibleEducation.PROFESSIONAL_RFP;
                },
              },
              {
                labels: 'Upload Supported Document For Professional Certificate (SRFP)',
                theme: "list",
                multiple: false,
                text: 'Choose a File',
                model: 'PROFESSIONAL_SRFP_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                visible: (model, field, form) => {
                  return this.visibleEducation.PROFESSIONAL_SRFP;
                },
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    onModelUpdated(newVal, schema) {
      if (schema == 'CONSULTANT_HIGHEST_QUALIFICATION') {
          if (newVal.CONSULTANT_QUALIFICATION_ID == 1) {
            this.showHighestEducationUploader();
            this.visibleEducation.SPM = true;
          } else if (newVal.CONSULTANT_QUALIFICATION_ID == 2) {
            this.showHighestEducationUploader();
            this.visibleEducation.SPMV = true;
          } 
          else if (newVal.CONSULTANT_QUALIFICATION_ID == 3) {
            this.showHighestEducationUploader();
            this.visibleEducation.STPM = true;
          } 
          else if (newVal.CONSULTANT_QUALIFICATION_ID == 11) {
            this.showHighestEducationUploader();
            this.visibleEducation.DEGREE = true;
          } 
          else if (newVal.CONSULTANT_QUALIFICATION_ID == 12) {
            this.showHighestEducationUploader();
            this.visibleEducation.DIPLOMA = true;
          } 
          else if (newVal.CONSULTANT_QUALIFICATION_ID == 14) {
            this.showHighestEducationUploader();
            this.visibleEducation.ADVANCE_LEVEL = true;
          }
          else if (newVal.CONSULTANT_QUALIFICATION_ID == 15) {
            this.showHighestEducationUploader();
            this.visibleEducation.ORDINARY_LEVEL = true;
          }   
        }
        // else if(schema == 'CONSULTANT_SPM'){
        //   if (newVal.name == 'Credit in Mathematics') {
        //     this.visibleEducation.MATH = true;
        //   }else{
        //     this.visibleEducation.MATH = false;
        //   }
        //   if (newVal.name == 'Credit in Language') {
        //     this.visibleEducation.LANGUAGE = true;
        //   }else{
        //     this.visibleEducation.LANGUAGE = false;
        //   }
        //   if (newVal.name == 'Credit in Other subject') {
        //     this.visibleEducation.OTHER_SUBJECT = true;
        //   }else{
        //     this.visibleEducation.OTHER_SUBJECT = false;
        //   }
        // }
        else if (schema == 'LANGUAGE') {
          if (newVal.name == 'OTHERS') {
            this.visibleEducation.visibleOtherLanguage = true;
          } else {
            this.visibleEducation.visibleOtherLanguage = false;
          }
        } 
        else if (schema == 'OTHER_SUBJECT') {
          if (newVal.name == 'OTHERS') {
            this.visibleEducation.visibleOtherSubject = true;
          } else {
            this.visibleEducation.visibleOtherSubject = false;
          }
        } 
        else if (schema == 'PROFESSIONAL_CERTIFICATE') {
          if (newVal.name == 'CERTIFIED FINANCIAL PLANNER (CFP)') {
            this.visibleEducation.PROFESSIONAL_CFP = true;
          } else {
            this.visibleEducation.PROFESSIONAL_CFP = false;
          }
          if (newVal.name == 'ISLAMIC FINANCIAL PLANNER (IFP)') {
            this.visibleEducation.PROFESSIONAL_IFP = true;
          } else {
            this.visibleEducation.PROFESSIONAL_IFP = false;
          }
        }
    },

    showHighestEducationUploader() {
      this.mapDataSourceToModel();
      for (let qualification in this.visibleEducation) {
        this.visibleEducation[qualification] = false;
      }
    },

    getDataToSave() {
      let dataToSave = {
        CONSULTANT_HIGHEST_QUALIFICATION: this.model.CONSULTANT_HIGHEST_QUALIFICATION.CONSULTANT_QUALIFICATION_ID,
        // MATH: this.model.MATH,
        // LANGUAGE: this.model.LANGUAGE,
        // SELECTED_PROFESIONAL_CERT: this.model.SELECTED_PROFESIONAL_CERT,
        // SPM_DOCS: this.model.SPM_DOCS,
        // SPMV_DOCS: this.model.SPMV_DOCS,
        // STPM_DOCS: this.model.STPM_DOCS,
        // DIPLOMA_DOCS: this.model.DIPLOMA_DOCS,
        // DEGREE_DOCS: this.model.DEGREE_DOCS,
        // FILE_PROFESIONAL_CERT: this.model.FILE_PROFESIONAL_CERT,
        // SUBjECT0: this.model.SUBJECT0,
        // SUBJECT1: this.model.SUBJECT1,
        // SUBKECT2: this.model.SUBKECT2,
      };
      console.log('Education data' ,dataToSave);
      return dataToSave;
    },

     //Upload Consultant Education Data
    saveConsultantEducation: async function() {
      const data = new FormData();
      data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
      if(this.model.CONSULTANT_HIGHEST_QUALIFICATION){
        data.append("CONSULTANT_HIGHEST_QUALIFICATION", this.model.CONSULTANT_HIGHEST_QUALIFICATION.CONSULTANT_QUALIFICATION_ID);
      }else{
        data.append("CONSULTANT_HIGHEST_QUALIFICATION", '');
      }
      if(this.model.ADVANCE_LEVEL_DOCS){
        for (let i = 0; i < this.model.ADVANCE_LEVEL_DOCS.length; i++) {
          data.append("ADVANCE_LEVEL_DOCS[]", this.model.ADVANCE_LEVEL_DOCS[i]);
        }
      }
      if(this.model.DEGREE_DOCS){
        for (let i = 0; i < this.model.DEGREE_DOCS.length; i++) {
          data.append("DEGREE_DOCS[]", this.model.DEGREE_DOCS[i]);
        }
      }
      if(this.model.DEGREE_MAJOR){
        data.append("DEGREE_MAJOR", this.model.DEGREE_MAJOR);
      }else{
        data.append("DEGREE_MAJOR", '');
      }
      if(this.model.DEGREE_MINOR){
        data.append("DEGREE_MINOR", this.model.DEGREE_MINOR);
      }else{
        data.append("DEGREE_MINOR", '');
      }

      if(this.model.DIPLOMA_DOCS){
        for (let i = 0; i < this.model.DIPLOMA_DOCS.length; i++) {
          data.append("DIPLOMA_DOCS[]", this.model.DIPLOMA_DOCS[i]);
        }
      }
      if(this.model.ORDINARY_LEVEL_DOCS){
        for (let i = 0; i < this.model.ORDINARY_LEVEL_DOCS.length; i++) {
          data.append("ORDINARY_LEVEL_DOCS[]", this.model.ORDINARY_LEVEL_DOCS[i]);
        }
      }
      if(this.model.SPMV_DOCS){
        for (let i = 0; i < this.model.SPMV_DOCS.length; i++) {
          data.append("SPMV_DOCS[]", this.model.SPMV_DOCS[i]);
        }
      }
      if(this.model.STPM_DOCS){
        for (let i = 0; i < this.model.STPM_DOCS.length; i++) {
          data.append("STPM_DOCS[]", this.model.STPM_DOCS[i]);
        }
      }
      if(this.model.MATH){
        data.append("MATH", this.model.MATH);
      }else{
        data.append("MATH", '');
      }
      if(this.model.LANGUAGE){
        data.append("LANGUAGE", this.model.LANGUAGE.value);
      }else{
        data.append("LANGUAGE", '');
      }
      if(this.model.OTHER_LANGUAGE){
        data.append("OTHER_LANGUAGE", this.model.OTHER_LANGUAGE);
      }else{
        data.append("OTHER_LANGUAGE", '');
      }
      if(this.model.SUBJECT){
        data.append("SUBJECT", this.model.SUBJECT.value);
      }else{
        data.append("SUBJECT", '');
      }
      if(this.model.OTHER_SUBJECT){
        data.append("OTHER_SUBJECT", this.model.OTHER_SUBJECT);
      }else{
        data.append("OTHER_SUBJECT", '');
      }
      
      if(this.model.PROFESSIONAL_CERTIFICATE){
        data.append("PROFESSIONAL_CERTIFICATE", this.model.PROFESSIONAL_CERTIFICATE.value);
      }else{
        data.append("PROFESSIONAL_CERTIFICATE", '');
      }
      if(this.model.PROFESSIONAL_CFP_DOCS){
        for (let i = 0; i < this.model.PROFESSIONAL_CFP_DOCS.length; i++) {
          data.append("PROFESSIONAL_CFP_DOCS[]", this.model.PROFESSIONAL_CFP_DOCS[i]);
        }
      }
      if(this.model.PROFESSIONAL_IFP_DOCS){
        for (let i = 0; i < this.model.PROFESSIONAL_IFP_DOCS.length; i++) {
          data.append("PROFESSIONAL_IFP_DOCS[]", this.model.PROFESSIONAL_IFP_DOCS[i]);
        }
      }
      if(this.model.PROFESSIONAL_RFP_DOCS){
        for (let i = 0; i < this.model.PROFESSIONAL_RFP_DOCS.length; i++) {
          data.append("PROFESSIONAL_RFP_DOCS[]", this.model.PROFESSIONAL_RFP_DOCS[i]);
        }
      }
      if(this.model.PROFESSIONAL_SRFP_DOCS){
        for (let i = 0; i < this.model.PROFESSIONAL_SRFP_DOCS.length; i++) {
          data.append("PROFESSIONAL_SRFP_DOCS[]", this.model.PROFESSIONAL_SRFP_DOCS[i]);
        }
      }

      await services02module2.uploadConsultantEducation(data);
    },


    mapDataSourceToModel() {
      this.model.MATH = this.model.MATH;

      this.model.CONSULTANT_HIGHEST_QUALIFICATION =
        this.general_settings.CONSULTANT_QUALIFICATIONS.find(
          (item) =>
            item.CONSULTANT_QUALIFICATION_ID ===
            this.model.CONSULTANT_HIGHEST_QUALIFICATION
        );

      this.model.LANGUAGE = this.general_settings.CREDIT_LANGUAGES.find(
        (item) => item.SETTING_GENERAL_ID === this.model.LANGUAGE
      );

      if (this.model.PROFESSIONAL_CERTIFICATE) {
        this.model.SELECTED_PROFESIONAL_CERT =
          this.options_profesional_certs.find(
            (item) => item.NAME === this.model.PROFESSIONAL_CERTIFICATE_VALUE
          );
      }
    },

    //for validaitons
    isValid(string) {
      return string.length > 4 ? true : false; //your validation criteria goes here
    },
    isRequiredValid(string) {
      return string.length > 0 ? true : false; //your validation criteria goes here
    },
    isNricOrPassportNoValid(string) {
      return string.length > 5 ? true : false; //your validation criteria goes here
    },
    isValidEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
  },

  created() {
    if(this.savedConsultantEducationData){
      this.model = _.cloneDeep(this.savedConsultantEducationData);
      console.log("props observed on education info (3rd) component");
      console.log(this.savedConsultantEducationData);
     }
  },

  computed: {
    consultantEducationValidation() {
      if (this.model.CONSULTANT_HIGHEST_QUALIFICATION) {
        return true;
      }
      return false;
    },

    selected_credit_language_state() {
      const language_options = this.general_settings.CREDIT_LANGUAGES;
      const item = language_options.find(
        (item) => item.SETTING_GENERAL_ID === this.model.model.LANGUAGE
      );
      return item;
    },

    selected_highest_qualification_state() {
      const qual_options = this.general_settings.CONSULTANT_QUALIFICATIONS;
      const item = qual_options.find(
        (item) =>
          item.CONSULTANT_QUALIFICATION_ID ===
          this.model.CONSULTANT_HIGHEST_QUALIFICATION
      );
      return item;
    },
  },
};
</script>

<style></style>
