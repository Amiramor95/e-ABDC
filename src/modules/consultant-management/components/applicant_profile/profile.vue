<template>
  <div>
    <table id="consultant-profile" class="table table-striped">
      <tbody v-if="consultantData">
        <!-- Profile Pic -->
        <tr>
          <td>Profile Photo</td>
          <td>
            <div v-for="photo in model2.PROFILE_PHOTO" :key="photo.docID">
              <img :src="photo.url" width="100">
            </div>
          </td>
        </tr>

        <!-- Personal Details -->
        <tr>
          <td style="width: 25%">Name</td>
          <td>{{ consultantData.CONSULTANT_NAME }}</td>
        </tr>

        <tr>
          <td>Citizenship</td>
          <td>{{ consultantData.CONSULTANT_CITIZEN_VALUE }}</td>
        </tr>

        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'MALAYSIAN' && consultantData.CONSULTANT_NRIC">
          <td>New NRIC Number</td>
          <td>{{ consultantData.CONSULTANT_NRIC }}</td>
        </tr>

        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'MALAYSIAN' && consultantData.CONSULTANT_NRIC_OLD">
          <td>Old NRIC Number</td>
          <td>{{ consultantData.CONSULTANT_NRIC_OLD }}</td>
        </tr>

        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'NON-MALAYSIAN' && consultantData.CONSULTANT_PASSPORT_NO">
          <td>Passport no</td>
          <td>{{ consultantData.CONSULTANT_PASSPORT_NO }}</td>
        </tr>

        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'NON-MALAYSIAN' && consultantData.CONSULTANT_PASSPORT_EXPIRY_NO">
          <td>Passport Expiry Date</td>
          <td>{{ date(consultantData.CONSULTANT_PASSPORT_EXPIRY_NO) }}</td>
        </tr>

        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'MALAYSIAN'">
          <td colspan="4" style="font-weight:bold;">
            NRIC Photos
          </td>
        </tr>

        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'MALAYSIAN'">
          <td>NRIC Photo (Front)</td>
          <td>
            <vue-form-generator
              :model="model2"
              :schema="NricFrontFileSchema"
              :options="formOptions"
              ref="nricFrontFileSchema"
            >
            </vue-form-generator>
          </td>
        </tr>

        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'MALAYSIAN'">
          <td>NRIC Photo (Back)</td>
          <td>
            <vue-form-generator
              :model="model2"
              :schema="NricBackFileSchema"
              :options="formOptions"
              ref="nricBackFileSchema"
            >
            </vue-form-generator>
          </td>
        </tr>

        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'NON-MALAYSIAN'">
          <td colspan="4" style="font-weight:bold;">
            Passport Photo
          </td>
        </tr>

        <tr v-if="consultantData.CONSULTANT_CITIZEN_VALUE == 'NON-MALAYSIAN'">
          <td>Passport Photo</td>
          <td>
            <vue-form-generator
              :model="model2"
              :schema="PassportPhotoSchema"
              :options="formOptions"
              ref="passportPhotoSchema"
            >
            </vue-form-generator>
          </td>
        </tr>

        <tr>
          <td>Gender</td>
          <td>{{ consultantData.CONSULTANT_GENDER_VALUE }}</td>
        </tr>

        <tr>
          <td>Date of Birth</td>
          <td>{{ date(consultantData.CONSULTANT_DOB) }}</td>
        </tr>

        <tr>
          <td>Race</td>
          <td>{{ consultantData.CONSULTANT_RACE_VALUE }}
            <span v-if="consultantData.CONSULTANT_RACE_VALUE=='OTHERS'"> - {{consultantData.CONSULTANT_OTHER_RACE}}</span>
          </td>
        </tr>

        <tr>
          <td>Mobile Phone Number</td>
          <td>{{ consultantData.CONSULTANT_MOBILE_NO }}</td>
        </tr>

        <tr>
          <td>House Number</td>
          <td>{{ consultantData.CONSULTANT_HOUSE_NO }}</td>
        </tr>

        <tr>
          <td>Email</td>
          <td>{{ consultantData.CONSULTANT_EMAIL }}</td>
        </tr>

        <tr>
          <td>Consultant Highest Qualification</td>
          <td>{{ consultantData.CONSULTANT_HIGHEST_QUAL_VALUE }}</td>
        </tr>

        <tr>
          <td>Consultant Status</td>
          <td v-if="consultantData.COMBINED_LICENSE_STATUS">
            {{ consultantData.CONSULTANT_COMBINED_STATUS }}
          </td>
          <td v-else>{{ consultantData.CONSULTANT_STATUS }}</td>
        </tr>

        <!-- Highest Qualification -->
        <tr>
          <td colspan="6" style="font-weight:bold;">
            Educational Qualifications
          </td>
        </tr>

        <tr v-for="(qualification, qindex) in qualifications" :key="qindex">
          <td v-if="qindex!=0">{{qualification.QUAL_NAME}}</td>
          <td v-if="qindex!=0">
            <vue-form-generator
              :model="qualification"
              :schema="qualificationSchema"
              :options="formOptions"
              ref="qualificationSchema"
            >
            </vue-form-generator>

            <div v-if="qualification.CONSULTANT_HIGHEST_QUALIFICATION==11" class="ml-3 mt-3">
              <p><strong>Major in :</strong> <span class="text-uppercase">{{qualification.DEGREE_MAJOR}}</span></p>
              <p><strong>Minor in :</strong> <span class="text-uppercase">{{qualification.DEGREE_MINOR}}</span></p>
            </div>

            <div v-if="qualification.CONSULTANT_HIGHEST_QUALIFICATION==12" class="ml-3 mt-3">
              <p><strong>Detail :</strong> <span class="text-uppercase">{{qualification.DIPLOMA_SPECIFY}}</span></p>
            </div>
          </td>
        </tr>

        <tr v-if="consultantData.educational_qualifications && consultantData.educational_qualifications.length<1">
          <td>No any Educational Qualification added.</td>
          <td></td>
        </tr>

        <!-- SPM -->
        <tr v-if="education">
          <td colspan="6" style="font-weight:bold;">
            SPM
          </td>
        </tr>

        <tr v-if="education">
          <td>Credit in Mathemathic</td>
          <td v-if="education.MATH==1">
            YES
          </td>
          <td v-else>NO</td>
        </tr>

        <tr v-if="education">
          <td>Credit in language</td>
          <td>
            {{consultantData.CREDIT_LANGUAGE}} <span v-if="education.LANGUAGE==677"> - {{education.OTHER_LANGUAGE}}</span>
          </td>
        </tr>

        <tr v-if="education">
          <td>Credit in other Subject</td>
          <td v-if="education.CREDIT_SUBJECT==1">
            CREDIT IN SEJARAH
          </td>
          <td v-if="education.CREDIT_SUBJECT==2">
            CREDIT IN PENDIDIKAN ISLAM
          </td>
          <td v-if="education.CREDIT_SUBJECT==3">
            OTHERS
          </td>
        </tr>

        <tr v-if="credit_other_subjects.length>0">
          <td>Subjects</td>
          <td>
            <div>
              <span v-for="(subject, sindex) in credit_other_subjects" :key="sindex" class="d-block">
                {{++sindex}}. {{subject.SUBJECT_NAME}}
              </span>
            </div>
          </td>
        </tr>

        <!-- Professional Certificates -->
        <tr v-if="education.PROFESSIONAL_CERTIFICATE">
          <td colspan="4" style="font-weight:bold;">
            Professional Certificates
          </td>
        </tr>

        <tr v-if="education.PROFESSIONAL_CERTIFICATE">
          <td v-if="education.PROFESSIONAL_CERTIFICATE==1">
            Certified Financial Planner (CFP)
          </td>
          <td v-if="education.PROFESSIONAL_CERTIFICATE==2">
            Islamic Financial Planner (IFP)
          </td>
          <td v-if="education.PROFESSIONAL_CERTIFICATE==3">
            Registered Financial Planner (RFP)
          </td>
          <td v-if="education.PROFESSIONAL_CERTIFICATE==4">
            Shariah Registered Financial Planner (SRFP)
          </td>

          <td>
            <vue-form-generator
              :model="model2"
              :schema="professionalCertificatesSchema"
              :options="formOptions"
              ref="professionalCertificatesLoad"
            >
            </vue-form-generator>
          </td>
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
            {{consultantData.CORRESPONDENT_COUNTRY}}
          </td>
        </tr>
        <tr>
          <td>State</td>
          <td>
            {{consultantData.CORRESPONDENT_STATE}}
          </td>
        </tr>
        <tr>
          <td>City</td>
          <td>
            {{consultantData.CORRESPONDENT_CITY}}
          </td>
        </tr>
        <tr>
          <td>Postcode</td>
          <td>
            {{ consultantData.CORRESPONDENT_POSTAL }}
          </td>
        </tr>
        <tr>
          <td>Address</td>
          <td>
            {{ consultantData.CONSULTANT_CORRESPONDENT_ADDR1 }}
          </td>
        </tr>
        <tr v-if="consultantData.CONSULTANT_CORRESPONDENT_ADDR2">
          <td>Address 2</td>
          <td>
            {{ consultantData.CONSULTANT_CORRESPONDENT_ADDR2 }}
          </td>
        </tr>
        <tr v-if="consultantData.CONSULTANT_CORRESPONDENT_ADDR3">
          <td>Address 3</td>
          <td>
            {{ consultantData.CONSULTANT_CORRESPONDENT_ADDR3 }}
          </td>
        </tr>

        <!-- Permanent Address -->
        <tr>
          <td colspan="4" style="font-weight:bold;">
            Permanent Address
          </td>
        </tr>

        <tr>
          <td>Country</td>
          <td>
            {{consultantData.PERMANENT_COUNTRY}}
          </td>
        </tr>
        <tr>
          <td>State</td>
          <td>
            {{consultantData.PERMANENT_STATE}}
          </td>
        </tr>
        <tr>
          <td>City</td>
          <td>
            {{consultantData.PERMANENT_CITY}}
          </td>
        </tr>
        <tr>
          <td>Postcode</td>
          <td>
            {{ consultantData.PERMANENT_POSTAL }}
          </td>
        </tr>
        <tr>
          <td>Address</td>
          <td>
            {{ consultantData.CONSULTANT_PERMANENT_ADDR1 }}
          </td>
        </tr>
        <tr v-if="consultantData.CONSULTANT_PERMANENT_ADDR2 ">
          <td>Address 2</td>
          <td>
            {{ consultantData.CONSULTANT_PERMANENT_ADDR2 }}
          </td>
        </tr>
        <tr v-if="consultantData.CONSULTANT_PERMANENT_ADDR3">
          <td>Address 3</td>
          <td>
            {{ consultantData.CONSULTANT_PERMANENT_ADDR3 }}
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import * as services02module2 from '@/app/module2/services02'
import * as services04Module2 from '../../../../app/module2/services04'
export default {
  props: {
    // The parameters the component accepts
    consultantData: Object,
  },

  data () {
    return {

      model2: {
        PROFILE_PHOTO: [],
        NRIC_FRONT_DOCUMENT: [],
        NRIC_BACK_DOCUMENT: [],
        CONSULTANT_PASSPORT_PHOTO: [],
        PROFESSIONAL_CERTIFICATE_DOCS: [],
      },

      qualifications: [],
      education: '',
      credit_other_subjects: [],

      NricFrontFileSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                multiple: true,
                text: 'Choose a File',
                model: 'NRIC_FRONT_DOCUMENT',
                type: 'vfg-custom-file-view2',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

      NricBackFileSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                multiple: true,
                text: 'Choose a File',
                model: 'NRIC_BACK_DOCUMENT',
                type: 'vfg-custom-file-view2',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

      PassportPhotoSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                multiple: true,
                text: 'Choose a File',
                model: 'CONSULTANT_PASSPORT_PHOTO',
                type: 'vfg-custom-file-view2',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

      qualificationSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                multiple: true,
                text: 'Choose a File',
                model: 'EDUCATIONAL_QUALIFICATON_DOCS',
                type: 'vfg-custom-file-view2',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

      professionalCertificatesSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                theme: 'list',
                multiple: true,
                text: 'Choose a File',
                model: 'PROFESSIONAL_CERTIFICATE_DOCS',
                type: 'vfg-custom-file-view2',
                styleClasses: 'col-md-12',
                required: false,
                disabled: true,
              },
            ],
          },
        ],
      },

      model: {
        CMSRL: '',
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    }
  },

  created () {
    if (this.consultantData) {
      this.getProfileDocuments()
    }

    if (this.distributorId) {
      this.checkDistributorType(this.distributorId)
    }

    if (this.consultantData.consultant_education) {
      this.education = this.consultantData.consultant_education

      if (this.consultantData.consultant_education.PROFESSIONAL_CERTIFICATE) {
        this.getProfessionalCertificates()
      }
    }

    if (this.consultantData.educational_qualifications && this.consultantData.educational_qualifications.length >= 1) {
      this.qualifications = _.cloneDeep(this.consultantData.educational_qualifications)
    }

    if (this.consultantData.educational_qualifications) {
      this.getQualificationDocuments()
    }

    if (this.consultantData.credit_subjects) {
      this.credit_other_subjects = this.consultantData.credit_subjects
    }
  },

  methods: {
    date: function (date) {
      return moment(date).format('DD-MMM-yyyy')
    },

    getProfileDocuments: async function () {
      const response = await services02module2.getConsultantDocuments(this.consultantData.CONSULTANT_ID)
      response.forEach(el => {
        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, el.DOC_MIMETYPE)

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

        if (el.TABLE_NAME == 'CONSULTANT_PROFILE_PHOTO') {
          this.model2.PROFILE_PHOTO.push(data)
        } else if (el.TABLE_NAME == 'CONSULTANT_NRIC_PHOTO_FRONT') {
          this.model2.NRIC_FRONT_DOCUMENT.push(data)
        } else if (el.TABLE_NAME == 'CONSULTANT_NRIC_PHOTO_BACK') {
          this.model2.NRIC_BACK_DOCUMENT.push(data)
        } else if (el.TABLE_NAME == 'CONSULTANT_PASSPORT_PHOTO') {
          this.model2.CONSULTANT_PASSPORT_PHOTO.push(data)
        }
      })
    },

    getQualificationDocuments: async function () {
      const items = this.qualifications
      if (items.length >= 1) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].CA_DOCUMENT_ID) {
            const response = await services02module2.getConsultantDocuments('', '', '', items[i].CA_DOCUMENT_ID)
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

              this.qualifications[i].EDUCATIONAL_QUALIFICATON_DOCS = []
              this.qualifications[i].EDUCATIONAL_QUALIFICATON_DOCS.push(data)
            })
          }
        }
      }
    },

    getProfessionalCertificates: async function () {
      const response = await services02module2.getConsultantDocuments(this.consultantData.CONSULTANT_ID, 'CONSULTANT_PROFESSIONAL_CERTIFICATE_DOCUMENT')
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

        this.model2.PROFESSIONAL_CERTIFICATE_DOCS.push(data)
      })
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
}
</script>

<style>
</style>
