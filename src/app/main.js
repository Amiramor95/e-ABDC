// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { ColorThemePlugin } from '../services/vuestic-ui'
import store from '../store/index'
import router from '../router/index'

import { VuesticPlugin } from '../services/vuestic-ui/components'
import '../i18n/index'
import YmapPlugin from 'vue-yandex-maps'
import VueClipboard from 'vue-clipboard2'
import { VudalPlugin } from 'vudal'
import $ from 'jquery'

import '../metrics'
import '../registerServiceWorker'

import { consoleBuildInfo } from 'vue-cli-plugin-build-info/plugin'

import XLSX from 'xlsx'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
import 'vue-form-generator/dist/vfg-core.css'
import Tabs from 'vue-tabs-with-active-line'
import { BootstrapVue, IconsPlugin, EmbedPlugin } from 'bootstrap-vue'
import VueFileAgent from 'vue-file-agent'
import Count from '../components/count/count'
import koolreport from '../components/koolreport'
import topPDF from '../components/pdf-viewer/topPDF'
import bottomPDF from '../components/pdf-viewer/bottomPDF'
import excelUpload from '../components/excel-upload'
import Pdf from '../components/pdf-viewer/pdf'
import excelToCsv from '../components/excel/index'
import downloadExcel from '../components/excel/index-single'
import downloadSession from '../components/excel/download-session'
import multiDownloadExcel from '../components/excel/index-multi'

import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue'
import VuetablePaginationDropdown from 'vuetable-2/src/components/VuetablePaginationDropdown.vue'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo.vue'
import VuetablePaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin.vue'
import VuetablePaginationInfoMixin from 'vuetable-2/src/components/VuetablePaginationInfoMixin.vue'

import VaDataTableExtended from '../components/va-datatable-extended/VaDataTableExtended'

import vtable from '../components/vue-table'

import Page from 'v-page'

import sidebar from '../components/sidebar'
import card from '../components/card/card'
import pendingtask from '../components/pendingTask/index'
import chart from '../components/chart/chart'
import barChart from '../components/chart/barChart'
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import listIcons from '../components/icon-list/listIcons'

import pdf from 'vue-pdf'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'

import { VueEditor, Quill } from 'vue2-editor'
import Datepicker from 'vuejs-datepicker'
import { ToggleButton } from 'vue-js-toggle-button'
import VfgPageRoute from '../pages/component/VfgPageRoute'
import VfgSearch from '../pages/component/VfgSearch'
import VfgTheMask from '../pages/component/VfgTheMask.vue'
import VfgTheMask2 from '../pages/component/VfgTheMask2.vue'
import VfgTheMask3 from '../pages/component/VfgTheMask3.vue'
import VfgFunctionalDate from '../pages/component/VfgFunctionalCalendar.vue'
import VfgFunctionalDate2 from '../pages/component/VfgFunctionalCalendar2.vue'

import VueTheMask from 'vue-the-mask'
import VfgCustomInput from '../pages/component/VfgCustomInput.vue'

import toast from '../components/alert/toast'

import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

import VueApexCharts from 'vue-apexcharts'
import VfgCustomTacInput from '../pages/component/VfgCustomTacInput.vue'
import VfgCustomUpload from '../pages/component/VfgCustomUpload.vue'
import VfgCustomFile from '../pages/component/VfgCustomFile.vue'
import VfgCustomFile2 from '../pages/component/VfgCustomFile2.vue'
import VfgCustomFileView from '../pages/component/VfgCustomFileView.vue'
import VfgCustomFileView2 from '../pages/component/VfgCustomFileView2.vue'
import VfgCustomMultipleFile from '../pages/component/VfgCustomMultipleFile.vue'
import VfgConsultantCustomMultipleFile from '../pages/component/VfgConsultantCustomMultipleFile.vue'
import VfgConsultantTerminationFile from '../pages/component/VfgConsultantTerminationFile.vue'
import VfgResignationCustomMultipleFile from '../pages/component/VfgResignationCustomMultipleFile.vue'
import VfgCustomMultipleFileCircular from '../pages/component/VfgCustomMultipleFileCircular.vue'
import VfgCustomMultipleFileEdit from '../pages/component/VfgCustomMultipleFileEdit.vue'
import VfgCustomMultipleFileEditCpd from '../pages/component/VfgCustomMultipleFileEditCpd.vue'
import VfgCustomMultipleFileEditSuspend from '../pages/component/VfgCustomMultipleFileEditSuspend.vue'
import VfgCustomMultipleFileEditDivestment from '../pages/component/VfgCustomMultipleFileEditDivestment.vue'
import VfgCustomMultipleFileEditAppeal from '../pages/component/VfgCustomMultipleFileEditAppeal.vue'
import VfgCustomMultipleFileEditAppealApproval from '../pages/component/VfgCustomMultipleFileEditAppealApproval.vue'
import VfgCustomMultipleFileCircularEdit from '../pages/component/VfgCustomMultipleFileCircularEdit.vue'
import VfgCustomMultipleFileEditFMS from '../pages/component/VfgCustomMultipleFileEditFMS.vue'
import VfgCustomCheckbox from '../pages/component/VfgCustomCheckbox.vue'
import VfgCustomCheckbox2 from '../pages/component/VfgCustomCheckbox2.vue'
import VfgCustomCheckboxRefund from '../pages/component/VfgCustomCheckboxRefund.vue'
import VfgCustomCurrencyInput from '../pages/component/VfgCustomCurrencyInput.vue'
import VfgCustomFileExcel from '../pages/component/VfgCustomFileExcel.vue'
import VfgDateForwardCalendar from '../pages/component/VfgDateForwardCalendar.vue'
import VfgCustomFileEditAuthorizationLetter from '../pages/component/VfgCustomFileEditAuthorizationLetter.vue'
import VfgCustomMultipleFileEditCease from '../pages/component/VfgCustomMultipleFileEditCease.vue'
import VfgCustomMultipleFileEditFimmCease from '../pages/component/VfgCustomMultipleFileEditFimmCease.vue'
import VfgCustomMultipleFileEditAppealApprovalCpd from '../pages/component/VfgCustomMultipleFileEditAppealApprovalCpd.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueToast from 'vue-toast-notification'
// Import one of the available themes
// import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css'
import VueMyToasts from 'vue-my-toasts'
import BootstrapComponent from 'vue-my-toasts/src/components/toasts/BootstrapComponent'
import VueCurrencyInput from 'vue-currency-input'
// import buttonapprove from 'src/components/button-custom/button-approve.vue'
// import TailwindComponent from 'vue-my-toasts/src/components/toasts/TailwindComponent'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import VueJsonToCsv from 'vue-json-to-csv'
import VfgTimePicker from '../pages/component/VfgTimePicker'
import VfgCustomMultipleFileEditAppealApprovalWriting
from '../pages/component/VfgCustomMultipleFileEditAppealApprovalWriting'
import VfgCustomMultipleFileGeneral from '../pages/component/VfgCustomMultipleFileGeneral'
import VfgConsultantCustomProfilePhoto from '../pages/component/VfgConsultantCustomProfilePhoto'
import VfgCustomNRIC from '../pages/component/VfgCustomNRIC'
import VfgCustomFileViewGeneral from '../pages/component/VfgCustomFileViewGeneral'
import VfgConsultantCustomMultipleFile2 from '../pages/component/VfgConsultantCustomMultipleFile2'
import VfgCustomEmailOtp from '../pages/component/VfgCustomEmailOtp'
import VfgProfileUpdateTacInputEmail from '../pages/component/VfgProfileUpdateTacInputEmail'
import VfgCustomFileDistributor from '../pages/component/VfgCustomFileDistributor'
import VfgCustomTacInputEmail from '../pages/component/VfgCustomTacInputEmail.vue'
import VfgCustomTacInputForgot from '../pages/component/VfgCustomTacInputForgotPassword.vue'
Vue.use(VueMyToasts, {
  component: BootstrapComponent,
  options: {
    width: '100px',
    position: 'top-right',
    padding: '1rem',
  },
})
Vue.component('va-data-table-extended', VaDataTableExtended)
Vue.use(VueCurrencyInput)
Vue.use(Page)
Vue.use(VueToast)
Vue.component('ClipLoader', ClipLoader)
Vue.component('field-vfg-custom-currencyInput', VfgCustomCurrencyInput)
Vue.component('field-vfg-custom-checkbox', VfgCustomCheckbox)
Vue.component('field-vfg-custom-checkbox2', VfgCustomCheckbox2)
Vue.component('field-vfg-custom-checkboxRefund', VfgCustomCheckboxRefund)
Vue.component('field-vfg-custom-file', VfgCustomFile)

Vue.component('field-vfg-custom-file-distributor', VfgCustomFileDistributor)


Vue.component('field-vfg-custom-nric', VfgCustomNRIC)
Vue.component('field-vfg-custom-file2', VfgCustomFile2)
Vue.component('field-vfg-custom-file-excel', VfgCustomFileExcel)
Vue.component('field-vfg-custom-multiple-file', VfgCustomMultipleFile)
Vue.component('field-vfg-consultant-custom-multiple-file', VfgConsultantCustomMultipleFile)
Vue.component('field-vfg-consultant-custom-multiple-file2', VfgConsultantCustomMultipleFile2)
Vue.component('field-vfg-consultant-termination-file', VfgConsultantTerminationFile)
Vue.component('field-vfg-consultant-custom-profile-photo', VfgConsultantCustomProfilePhoto)
Vue.component('field-vfg-resignation-custom-multiple-file', VfgResignationCustomMultipleFile)
Vue.component('field-vfg-custom-multiple-file-circular', VfgCustomMultipleFileCircular)
Vue.component('field-vfg-custom-multiple-file-edit', VfgCustomMultipleFileEdit)
Vue.component('field-vfg-custom-multiple-file-edit-cpd', VfgCustomMultipleFileEditCpd)
Vue.component('field-vfg-custom-multiple-file-edit-Divestment', VfgCustomMultipleFileEditDivestment)
Vue.component('field-vfg-custom-multiple-file-edit-suspend', VfgCustomMultipleFileEditSuspend)
Vue.component('field-vfg-custom-multiple-file-edit-appeal', VfgCustomMultipleFileEditAppeal)
Vue.component('field-vfg-custom-multiple-file-edit-appeal-approval', VfgCustomMultipleFileEditAppealApproval)
Vue.component('field-vfg-custom-multiple-file-edit', VfgCustomMultipleFileCircularEdit)
Vue.component('field-vfg-custom-file-edit-authorizationLetter', VfgCustomFileEditAuthorizationLetter)
Vue.component('field-vfg-custom-file-view', VfgCustomFileView)
Vue.component('field-vfg-custom-file-view2', VfgCustomFileView2)
Vue.component('field-vfg-custom-file-view-general', VfgCustomFileViewGeneral)
Vue.component('field-vfg-custom-multiple-file-edit-fimmcease', VfgCustomMultipleFileEditFimmCease)
Vue.component('field-vfg-custom-multiple-file-edit-cease', VfgCustomMultipleFileEditCease)
Vue.component('field-vfg-custom-multiple-file-fms', VfgCustomMultipleFileEditFMS)
Vue.component('field-vfg-custom-multiple-file-general', VfgCustomMultipleFileGeneral)
Vue.component('field-vfg-custom-upload', VfgCustomUpload)
Vue.component('field-vfg-custom-input', VfgCustomInput)
Vue.component('field-vfg-custom-Tacinput', VfgCustomTacInput)
Vue.component('field-vfg-custom-emailotp', VfgCustomEmailOtp)
Vue.component('field-vfg-profile-update-emailotp', VfgProfileUpdateTacInputEmail)
Vue.component('field-vfg-custom-multiple-file-edit-appeal-approvalCpd', VfgCustomMultipleFileEditAppealApprovalCpd)
Vue.component('field-vfg-custom-Tacinput-email', VfgCustomTacInputEmail)
Vue.component('field-vfg-custom-Tacinput-forgotpassword', VfgCustomTacInputForgot)

Vue.component('field-vfg-custom-multiple-file-edit-appeal-approvalWriting', VfgCustomMultipleFileEditAppealApprovalWriting)

Vue.use(VueTheMask)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(PerfectScrollbar)
Vue.component('field-vfg-the-mask', VfgTheMask)
Vue.component('field-vfg-the-mask2', VfgTheMask2)
Vue.component('field-vfg-the-mask3', VfgTheMask3)
Vue.component('field-vfg-page-route', VfgPageRoute)
Vue.component('field-vfg-search', VfgSearch)
Vue.component('Count', Count)
Vue.component('koolreport', koolreport)
Vue.component('sidebar', sidebar)
Vue.component('card', card)
Vue.component('pending-task', pendingtask)
Vue.component('chart', chart)
Vue.component('barChart', barChart)
Vue.component('Pdf', Pdf)
Vue.component('topPDF', topPDF)
Vue.component('bottomPDF', bottomPDF)
Vue.component('excelUpload', excelUpload)
Vue.component('excelToCsv', excelToCsv)
Vue.component('downloadExcel', downloadExcel)
Vue.component('multiDownloadExcel', multiDownloadExcel)
Vue.component('downloadSession', downloadSession)

Vue.component('Vuetable', Vuetable)
Vue.component('VuetablePagination', VuetablePagination)
Vue.component('VuetablePaginationDropdown', VuetablePaginationDropdown)
Vue.component('VuetablePaginationInfo', VuetablePaginationInfo)
Vue.component('VuetablePaginationMixin', VuetablePaginationMixin)
Vue.component('VuetablePaginationInfoMixin', VuetablePaginationInfoMixin)

Vue.component('vtable', vtable)
Vue.component('listIcons', listIcons)
Vue.component('field-vfg-functional-date', VfgFunctionalDate)
Vue.component('field-vfg-functional-date2', VfgFunctionalDate2)
Vue.component('field-vfg-time-picker', VfgTimePicker)
Vue.component('field-vfg-date-forward-calendar', VfgDateForwardCalendar)
Vue.use(VueFormWizard)

Vue.component('ToggleButton', ToggleButton)
consoleBuildInfo()
Vue.component('pdf', pdf)
Vue.component('datepicker', Datepicker)
Vue.component('vue-editor', VueEditor)
Vue.use(VueEditor, Quill)
Vue.use(Vuetable)
Vue.use(Multiselect)
Vue.component('multiselect', Multiselect)
Vue.component('Vuetable', Vuetable)
Vue.component('VueFileAgent', VueFileAgent)
// Vue.compoenent(buttoncustom)
Vue.use(VueFileAgent)
Vue.use(VueFileAgentStyles)
Vue.use(VudalPlugin)
Vue.component('vudal', VudalPlugin)
Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueClipboard)
Vue.use($)
Vue.use(EmbedPlugin)

Vue.use(VueJsonToCsv)

Vue.component(Tabs)

Vue.use(XLSX)

Vue.use(VueFormGenerator)
    // Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(ColorThemePlugin, {
    // override colors here.
})

Vue.config.errorHandler = err => {
    console.log('Exception ERROR: ', err)
}
Vue.config.refreshIntervalId = null
    // Koolreport Server Url
//Vue.config.KoolServerURL = 'http://localhost:7000/api/module0/';
Vue.config.KoolServerURL = 'https://lfcs-dev.fimm.com.my/api/module0/'
// Vue.config.KoolServerURL = 'https://lfcs-staging.fimm.com.my/api/module0/';

router.beforeEach((to, from, next) => {
    store.commit('setLoading', true)
    next()
})

router.afterEach((to, from) => {
    store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    toast,
    render: h => h(App),
})