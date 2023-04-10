<template>
  <div class="row">
    <div class="col-md-12">
      <div class="border-bottom my-3"></div>
    </div>

    <!-- Educational Qualification -->
    <div class="col-md-12 mb-3" v-for="(education, eindex) in educations" :key="eindex">
      <b-form-group
        label-for="highest-education"
        description=""
        class="required"
      >
        <label v-if="eindex==0">Highest Qualification: <span class="text-danger">*</span></label>
        <label v-else>Educational Qualification:</label>
        <b-form-select
          id="highest-education"
          v-model="education.CONSULTANT_HIGHEST_QUALIFICATION"
          class="form-group bgcolor mb-0"
          placeholder="Select your highest qualification"
        >
          <template>
            <option
              v-for="qualification in general_settings.CONSULTANT_QUALIFICATIONS"
              v-bind:key="qualification.CONSULTANT_QUALIFICATION_ID"
              :value="qualification.CONSULTANT_QUALIFICATION_ID"
            >
              {{ qualification.QUAL_NAME }}
            </option>
          </template>
        </b-form-select>
      </b-form-group>

      <div v-if="eindex!=0">
        <b-form-group
          v-if="education.CONSULTANT_HIGHEST_QUALIFICATION"
          label-for="qualification-advance-level"
          class="m-0"
          description="Upload Supported Document"
        >
          <vue-form-generator
            :model="education"
            :schema="educationSchema"
            :options="formOptions"
            ref="advanceLevelDocUpload"
          >
          </vue-form-generator>
        </b-form-group>

        <div class="row mt-3" v-if="education.CONSULTANT_HIGHEST_QUALIFICATION == 11">
          <b-form-group
            class="required col-md-6"
            id="fieldset-degree-major"
            label="Major in"
            label-for="input-degree-major"
          >
            <b-form-input
              id="input-degree-major"
              placeholder="Please specify"
              v-model="education.DEGREE_MAJOR"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="required col-md-6"
            id="fieldset-degree-minor"
            label="Minor in"
            label-for="input-degree-minor"
          >
            <b-form-input
              id="input-degree-minor"
              placeholder="Please specify"
              v-model="education.DEGREE_MINOR"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="row mt-3" v-if="education.CONSULTANT_HIGHEST_QUALIFICATION == 12">
          <b-form-group
            class="required col-md-12"
            id="fieldset-diploma-specific"
            label="Please specify"
            label-for="input-diploma-specific"
          >
            <b-form-input
              class="text-uppercase"
              id="input-diploma-specific"
              placeholder="Please specify"
              v-model="education.DIPLOMA_SPECIFY"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="text-right mt-2">
        <button size="sm" class="btn btn-primary" @click="addEducation()" type="button" v-if="eindex==educations.length-1">
          <i class="fa fa-plus mr-2"></i>Add
        </button>
        <button size="sm" class="btn btn-danger ml-2" type="button" @click="deleteEducation(education)" v-if="eindex!=0">
          <i class="fa fa-trash mr-2"></i>Delete
        </button>
      </div>
    </div>

    <div class="col-md-12">
      <div class="border-bottom my-3"></div>
    </div>

    <!-- SPM Qualification -->
    <div class="col-md-12">
      <h5>SPM <span class="text-danger" v-if="savedConsultantData.CONSULTANT_CITIZEN==286">*</span></h5>

      <b-form-group
        label="Credit in Mathemathic"
        label-for="radio-credit-math"
        :class="{'required' : savedConsultantData.CONSULTANT_CITIZEN==286}"
      >
        <b-form-radio-group
          id="radio-credit-math"
          v-model="model.MATH"
          :options="math"
          name="radio-credit-math"
          value-field="value"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group
        label="Credit in language:"
        label-for="credit-language"
        description=""
        :class="{'required' : savedConsultantData.CONSULTANT_CITIZEN==286}"
        class="pl-0"
      >
        <b-form-select
          id="credit-language"
          v-model="model.LANGUAGE"
          class="form-group bgcolor mb-0"
          placeholder="Select"
          @change="onCreditLanguageSelected"
        >
          <template>
            <option
              v-for="qualification in general_settings.CREDIT_LANGUAGES"
              v-bind:key="qualification.SETTING_GENERAL_ID"
              :value="qualification.SETTING_GENERAL_ID"
            >
              {{ qualification.SET_PARAM }}
            </option>
          </template>
        </b-form-select>

        <!-- <multiselect
            id="credit-language"
            v-model="model.LANGUAGE"
            :options="general_settings.CREDIT_LANGUAGES"
            track-by="SETTING_GENERAL_ID"
            label="SET_PARAM"
            placeholder="Select one"
            @select="onCreditLanguageSelected"
          >
          </multiselect> -->
      </b-form-group>

      <b-form-group v-if="model.LANGUAGE == 677"
        id="fieldset-language-other"
        label="Other Language"
        label-for="input-language-other"
      >
        <b-form-input
          id="input-language-other"
          placeholder="Please specify"
          v-model="model.OTHER_LANGUAGE"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Credit in other Subject:"
        label-for="credit-other-subject"
        description=""
        :class="{'required' : savedConsultantData.CONSULTANT_CITIZEN==286}"
        class="mt-3"
      >
        <b-form-select
          id="credit-other-subject"
          v-model="model.CREDIT_SUBJECT"
          class="form-group bgcolor mb-0"
          placeholder="Select"
        >
          <template>
            <option
              v-for="csubject in credit_subjects"
              v-bind:key="csubject.value"
              :value="csubject.value"
            >
              {{ csubject.name }}
            </option>
          </template>
        </b-form-select>
      </b-form-group>

      <div v-if="model.CREDIT_SUBJECT == 3">
        <h6>Add Subjects</h6>
        <div v-for="(subject, sindex) in subjects" :key="sindex">
          <div class="d-flex align-items-center mb-2">
            <b-form-group
              id="fieldset-subjects"
              label-for="input-subjects"
              class="mb-2"
            >
              <b-form-input
                class="text-uppercase"
                placeholder="Please specify"
                v-model="subject.SUBJECT_NAME"
              ></b-form-input>
            </b-form-group>

            <div class="d-flex align-items-center ml-2 mb-2">
              <button size="sm" class="btn btn-primary" @click="addSubject()" type="button" v-if="sindex==subjects.length-1">
                <i class="fa fa-plus"></i>
              </button>
              <button size="sm" class="btn btn-danger ml-2" type="button" @click="deleteSubject(subject)" v-if="sindex!=0">
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <div class="border-bottom my-3"></div>
    </div>

    <!-- Professional Certificate -->
    <div class="col-md-12">
      <b-form-group
        label="Professional Certificate:"
        label-for="profesional-certificate"
        description=""
        class="mt-3 mb-0"
      >
        <b-form-select
          id="profesional-certificate"
          v-model="model.PROFESSIONAL_CERTIFICATE"
          class="form-group bgcolor mb-0"
          placeholder="Select"
        >
          <template>
            <option
              v-for="certificate in general_settings.PROFESSIONAL_CERTIFICATES"
              v-bind:key="certificate.ID"
              :value="certificate.ID"
            >
              {{ certificate.NAME }}
            </option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group
        v-if="model.PROFESSIONAL_CERTIFICATE"
        label-for="file-profesional-cert"
        description="Upload Supported Document for Professional Certificate"
        class="mt-2"
      >
        <vue-form-generator
          :model="document"
          :schema="professionalCertificateSchema"
          :options="formOptions"
          ref="professionalCertificateUpload"
        >
        </vue-form-generator>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as services02module2 from '../../../../../app/module2/services02'
export default {
  name: 'personal-education',
  props: {
    // parameters the component accepts
    savedConsultantData: Object,
    personal_particulars: Object,
    general_settings: Object,
    savedConsultantEducationData: Object,
    consultantCreditSubject: {
      type: Array,
    },
    consultantQualificationDatas: {
      type: Array,
    },
  },
  components: {

  },
  computed: {
    options_profesional_certs () {
      // manually added null to the options to disable value in the database
      const certs = [
        {
          ID: null,
          NAME: '-',
        },
        ...this.general_settings.PROFESSIONAL_CERTIFICATES,
      ]
      return certs
    },
  },

  data () {
    return {
      model: {
        MATH: '',
        LANGUAGE: '',
        OTHER_LANGUAGE: '',
        CREDIT_SUBJECT: '',
        PROFESSIONAL_CERTIFICATE: '',
      },

      document: {
        PROFESSIONAL_CERTIFICATE_DOCS: [],
      },

      // model2: {
      //   CONSULTANT_HIGHEST_QUALIFICATION: '',
      //   MATH: '',
      //   LANGUAGE: '',
      //   OTHER_LANGUAGE: '',
      //   SELECTED_PROFESIONAL_CERT: '',
      //   ADVANCE_LEVEL_DOCS: [],
      //   SPM_DOCS: [],
      //   SPMV_DOCS: [],
      //   STPM_DOCS: [],
      //   DIPLOMA_DOCS: [],
      //   DEGREE_DOCS: [],
      //   DEGREE_MAJOR: '',
      //   DEGREE_MINOR: '',
      //   DIPLOMA_SPECIFY: '',
      //   ORDINARY_LEVEL_DOCS: [],
      //   FILE_PROFESIONAL_CERT: '',
      //   SUBJECT: '',
      //   OTHER_SUBJECT: '',
      //   SUBJECT1: '',
      //   SUBJECT2: '',
      //   SUBJECT3: '',
      //   PROFESSIONAL_CERTIFICATE: '',
      //   PROFESSIONAL_CFP_DOCS: [],
      //   PROFESSIONAL_IFP_DOCS: [],
      //   PROFESSIONAL_RFP_DOCS: [],
      //   PROFESSIONAL_SRFP_DOCS: [],
      // },

      educations: [
        {
          CONSULTANT_EDUCATIONAL_QUALIFICATION_ID: '',
          CONSULTANT_ID: this.savedConsultantData.CONSULTANT_ID,
          CONSULTANT_HIGHEST_QUALIFICATION: '',
          EDUCATIONAL_QUALIFICATON_DOCS: [],
          DEGREE_MAJOR: '',
          DEGREE_MINOR: '',
          DIPLOMA_SPECIFY: '',
          CA_DOCUMENT_ID: '',
        }
      ],

      subjects: [
        {
          SUBJECT_NAME: '',
        },
      ],

      math: [
        { name: 'YES', value: '1' },
        { name: 'NO', value: '0' },
      ],
      credit_subjects: [
        { name: 'CREDIT IN SEJARAH', value: '1' },
        { name: 'CREDIT IN PENDIDIKAN ISLAM', value: '2' },
        { name: 'OTHERS', value: '3' },
      ],
      // certificates: [
      //   { name: 'CERTIFIED FINANCIAL PLANNER (CFP)', value: '1' },
      //   { name: 'ISLAMIC FINANCIAL PLANNER (IFP)', value: '2' },
      //   { name: 'REGISTERED FINANCIAL PLANNER (RFP)', value: '3' },
      //   { name: 'SHARIAH REGISTERED FINANCIAL PLANNER (SRFP)', value: '4' },
      // ],

      formOptions: {
        validateAfterChanged: true,
      },

      educationSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                accept: '.pdf',
                theme: 'list',
                multiple: false,
                text: 'Choose a File',
                model: 'EDUCATIONAL_QUALIFICATON_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
                hint: 'Accepted format : (.pdf)',
              },
            ],
          },
        ],
      },

      professionalCertificateSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                accept: '.pdf',
                theme: 'list',
                multiple: true,
                text: 'Choose a File',
                model: 'PROFESSIONAL_CERTIFICATE_DOCS',
                type: 'vfg-consultant-custom-multiple-file',
                required: false,
                hint: 'Accepted format : (.pdf)',
              },
            ],
          },
        ],
      },
    }
  },

  methods: {
    getDataToSave () {
      const dataToSave = {
        SUBJECTS: this.subjects,
      }
      return dataToSave
    },

    onCreditLanguageSelected () {
      var language = this.model.LANGUAGE
      if (language != 677) {
        this.model.OTHER_LANGUAGE = ''
      }
    },

    addEducation () {
      this.educations.push({
        CONSULTANT_EDUCATIONAL_QUALIFICATION_ID: '',
        CONSULTANT_ID: this.savedConsultantData.CONSULTANT_ID,
        CONSULTANT_HIGHEST_QUALIFICATION: '',
        EDUCATIONAL_QUALIFICATON_DOCS: [],
        DEGREE_MAJOR: '',
        DEGREE_MINOR: '',
        DIPLOMA_SPECIFY: '',
        CA_DOCUMENT_ID: '',
      });
    },

    deleteEducation(education){
      if(education.CONSULTANT_EDUCATIONAL_QUALIFICATION_ID){
        if(confirm('Are you sure to delete your saved Qualification?')){
          services02module2.deleteSavedQualificationData(education.CONSULTANT_EDUCATIONAL_QUALIFICATION_ID, education.CA_DOCUMENT_ID);
          this.educations.splice(this.educations.indexOf(education), 1);
        }
      } else {
        this.educations.splice(this.educations.indexOf(education), 1)
      }
    },

    addSubject () {
      if (this.subjects.length >= 6) {
        alert('You cannnot add more than 6 Subjects')
        return
      };

      this.subjects.push({
        SUBJECT_NAME: '',
      })
    },

    deleteSubject (subject) {
      if (subject.CONSULTANT_CREDIT_OTHER_SUBJECT_ID) {
        if (confirm('Are you sure to delete your saved Credit Subject?')) {
          services02module2.deleteSavedCreditSubject(subject.CONSULTANT_CREDIT_OTHER_SUBJECT_ID)
          this.subjects.splice(this.subjects.indexOf(subject), 1)
        }
      } else {
        this.subjects.splice(this.subjects.indexOf(subject), 1)
      }
    },

    // Upload Consultant Qualifications Data
    saveConsultantQualification: async function () {
      const items = this.educations
      const formData = new FormData()
      for (let i = 0; i < items.length; i++) {
        for (const key of Object.keys(items[i])) {
          // console.log('Data Loaded...', items[i][key]);
          if (key === 'EDUCATIONAL_QUALIFICATON_DOCS') {
            if (items[i].EDUCATIONAL_QUALIFICATON_DOCS != null) {
              for (let j = 0; j < items[i].EDUCATIONAL_QUALIFICATON_DOCS.length; j++) {
                formData.append(`items[${i}][${key}][` + j + ']', this.stringifyDataIfComplexObject(items[i].EDUCATIONAL_QUALIFICATON_DOCS[j]))
              }
            }
          } else {
            formData.append(`items[${i}][${key}]`, items[i][key])
          }
        }
      }
      services02module2.uploadConsultantQualification(formData)
      .then((response) => {
          this.loadConsultantQualificationDatas();
      });
    },

    stringifyDataIfComplexObject (data) {
      console.log('Add Education', data)
      if ('docID' in data) {
        return JSON.stringify(data)
      } else {
        return data
      }
    },

    // Upload Consultant Qualifications Docs
    // saveConsultantQualificationDocument: async function() {
    //   const fileRecords = this.educations;
    //   fileRecords.forEach((element, index) => {
    //     let files = [];
    //     element.forEach((item, index) => {
    //       files[index] = item.file;
    //     });
    //     const data = new FormData();
    //     //File upload
    //     if (files.length != 0) {
    //       for (let i = 0; i < files.length; i++) {
    //         data.append("DOC_BLOB[]", files[i]);
    //       }
    //     }
    //     data.append("CONSULTANT_ID", this.savedConsultantData.CONSULTANT_ID);
    //     data.append("TABLE_NAME", 'CONSULTANT_QUALIFICATION_DOCUMENT');
    //     data.append("FIELD_NAME", 'CONSULTANT_QUALIFICATION');
    //     services02module2.uploadConsultantDocuments(data);
    //   });
    // },

    // Upload Consultant Education Datas
    saveConsultantEducation: async function () {
      const data = new FormData()
      data.append('CONSULTANT_ID', this.savedConsultantData.CONSULTANT_ID)
      data.append('MATH', this.model.MATH == null ? '' : this.model.MATH)
      data.append('LANGUAGE', this.model.LANGUAGE == null ? '' : this.model.LANGUAGE)
      data.append('OTHER_LANGUAGE', this.model.OTHER_LANGUAGE == null ? '' : this.model.OTHER_LANGUAGE)
      data.append('CREDIT_SUBJECT', this.model.CREDIT_SUBJECT == null ? '' : this.model.CREDIT_SUBJECT)
      data.append('PROFESSIONAL_CERTIFICATE', this.model.PROFESSIONAL_CERTIFICATE == null ? '' : this.model.PROFESSIONAL_CERTIFICATE)

      if (this.document.PROFESSIONAL_CERTIFICATE_DOCS) {
        for (let i = 0; i < this.document.PROFESSIONAL_CERTIFICATE_DOCS.length; i++) {
          data.append('PROFESSIONAL_CERTIFICATE_DOCS[]', this.document.PROFESSIONAL_CERTIFICATE_DOCS[i])
        }
      }
      services02module2.uploadConsultantEducation(data)
    },

    mapDataSourceToModel () {
      this.model.MATH = this.model.MATH

      this.model.CONSULTANT_HIGHEST_QUALIFICATION =
        this.general_settings.CONSULTANT_QUALIFICATIONS.find(
          (item) =>
            item.CONSULTANT_QUALIFICATION_ID ===
            this.model.CONSULTANT_HIGHEST_QUALIFICATION,
        )

      this.model.LANGUAGE = this.general_settings.CREDIT_LANGUAGES.find(
        (item) => item.SETTING_GENERAL_ID === this.model.LANGUAGE,
      )

      if (this.model.PROFESSIONAL_CERTIFICATE) {
        this.model.SELECTED_PROFESIONAL_CERT =
          this.options_profesional_certs.find(
            (item) => item.NAME === this.model.PROFESSIONAL_CERTIFICATE_VALUE,
          )
      }
    },

    // for validaitons
    isValid (string) {
      return string.length > 4 // your validation criteria goes here
    },
    isRequiredValid (string) {
      return string.length > 0 // your validation criteria goes here
    },
    isNricOrPassportNoValid (string) {
      return string.length > 5 // your validation criteria goes here
    },
    isValidEmail (email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    },

    loadConsultantQualificationDatas: async function(){
      const response = await services02module2.getConsultantQualification(this.savedConsultantData.CONSULTANT_ID);
      if(response){
          this.educations = response;
          if(this.educations.length<=0){
            this.educations.push({
              CONSULTANT_EDUCATIONAL_QUALIFICATION_ID: '',
              CONSULTANT_ID: this.savedConsultantData.CONSULTANT_ID,
              CONSULTANT_HIGHEST_QUALIFICATION: '',
              EDUCATIONAL_QUALIFICATON_DOCS: [],
              DEGREE_MAJOR: '',
              DEGREE_MINOR: '',
              DIPLOMA_SPECIFY: '',
              CA_DOCUMENT_ID: '',
            });
          }
          this.getQualificationDocuments();
      }
    },

    getProfessionalCertificateDocs: async function() {
      const response = await services02module2.getConsultantDocuments(this.savedConsultantData.CONSULTANT_ID, 'CONSULTANT_PROFESSIONAL_CERTIFICATE_DOCUMENT');
      response.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')

        el.DOC_BLOB = new File(
          [el.DOC_BLOB],
          el.DOC_ORIGINAL_NAME,
          {
            type: el.DOC_BLOB.type,
          },
        )

        const data = {
          docID: el.CA_DOCUMENT_ID,
          name: el.DOC_ORIGINAL_NAME,
          size: el.DOC_FILESIZE,
          type: el.DOC_FILETYPE,
          ext: 'exe',
          url: window.URL.createObjectURL(el.DOC_BLOB),
        }

        this.document.PROFESSIONAL_CERTIFICATE_DOCS.push(data)
      })
    },

    getQualificationDocuments: async function () {
      const items = this.educations
      if (items.length >= 1) {
        for (let i = 0; i < items.length; i++) {
          if(items[i].CA_DOCUMENT_ID){
            const response = await services02module2.getConsultantDocuments('', '', '', items[i].CA_DOCUMENT_ID);
            response.forEach(el => {
              el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, 'application/pdf')

              el.DOC_BLOB = new File(
                [el.DOC_BLOB],
                el.DOC_ORIGINAL_NAME,
                {
                  type: el.DOC_BLOB.type,
                },
              )

              const data = {
                docID: el.CA_DOCUMENT_ID,
                name: el.DOC_ORIGINAL_NAME,
                size: el.DOC_FILESIZE,
                type: el.DOC_FILETYPE,
                ext: 'exe',
                url: window.URL.createObjectURL(el.DOC_BLOB),
              }

              this.educations[i].EDUCATIONAL_QUALIFICATON_DOCS = []
              this.educations[i].EDUCATIONAL_QUALIFICATON_DOCS.push(data)
            })
          }
        }
      }
    },

    b64toBlobPDF (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      var byteCharacters = atob(b64Data)
      var byteArrays = []

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)

        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        var byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      return new File(byteArrays, 'pot', { type: contentType })
    },
  },

  created () {
    if (this.savedConsultantEducationData) {
      this.model = _.cloneDeep(this.savedConsultantEducationData)
    }

    if (this.consultantCreditSubject.length >= 1) {
      this.subjects = _.cloneDeep(this.consultantCreditSubject)
    }

    // if(this.consultantQualificationDatas.length>=1){
    //   this.educations = _.cloneDeep(this.consultantQualificationDatas);
    // }
    // if(this.consultantQualificationDatas){
    //   this.getQualificationDocuments();
    // }

    if(this.savedConsultantData){
      this.loadConsultantQualificationDatas();

      this.getProfessionalCertificateDocs();
    }
  },

  mounted(){

  },

  computed: {
    selected_credit_language_state () {
      const language_options = this.general_settings.CREDIT_LANGUAGES
      const item = language_options.find(
        (item) => item.SETTING_GENERAL_ID === this.model.model.LANGUAGE,
      )
      return item
    },

    selected_highest_qualification_state () {
      const qual_options = this.general_settings.CONSULTANT_QUALIFICATIONS
      const item = qual_options.find(
        (item) =>
          item.CONSULTANT_QUALIFICATION_ID ===
          this.model.CONSULTANT_HIGHEST_QUALIFICATION,
      )
      return item
    },
  },
}
</script>

<style></style>
