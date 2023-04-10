/* eslint-disable no-debugger, no-console */
<template>
  <div class="">
    <vudal name="showStaticModalOK" class="widthModal">
      <div class="content">
        <p>Your submission has been submitted, please wait for approval.</p>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Ok
          </button>
        </div>
      </div>
    </vudal>
    <vudal name="showStaticModalSaveAsDraft" class="widthModal">
      <div class="content">
        <p>Your submission has been save as draft.</p>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Ok
          </button>
        </div>
      </div>
    </vudal>
    <vudal name="showErrorModalOk" class="widthModal">
      <div class="content">
        <p style="color:red;">{{errorMessage}}</p>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Ok
          </button>
        </div>
      </div>
    </vudal>
    <vudal name="showStaticModal" class="widthModal">
      <div class="content">
        <vue-form-generator
          :model="model"
          :schema="declarationSchema"
          :options="formOptions"
          ref="declarationRef"
          @model-updated="onModelUpdated"
        >
        </vue-form-generator>
      </div>
      <div class="actions">
        <button
          type="button"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Disagree
        </button>
        <button
          @click="submitDistributor"
          type="button"
          class="vudal-btn mr-2 btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Agree
        </button>
      </div>
    </vudal>

    <va-inner-loading :loading="isLoad">
      <div class="">
        <vudal name="simpleModal" class="widthModal">
          <div class="header">
            <i class="close icon">&times;</i>
            <br />
          </div>
          <div>
            <va-card>
              <div>
                <horizontal-scroll>
                  <va-button-toggle
                    :round="false"
                    color="primary"
                    v-model="tabValue"
                    :options="options"
                  />
                </horizontal-scroll>
              </div>
              <br />
              <div v-if="tabValue === 1" class="tabcontent">
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%;"><b>Distributor Name</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_NAME }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Registration Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_REGI_NUM1 }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>New Registration Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_REGI_NUM2 }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Date of Incorporation</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.DIST_DATE_INCORP }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Type of Setup</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_TYPE_SETUP == 1">
                        Public Limited Company / Berhad
                      </td>
                      <td v-if="model.DIST_TYPE_SETUP == 2">
                        Private Limited Company / Sendirian Berhad
                      </td>
                    </tr>
                    <tr v-if="model.DIST_TYPE_SETUP == 1">
                      <td style="width: 20%;"><b>Upload SSM Form 8</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        <div v-for="(document, index) in model.ssmForm8" :key="index">
                          <a
                            v-bind:href="document.url"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            View
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="model.DIST_TYPE_SETUP == 2">
                      <td style="width: 20%;"><b>SSM Form 9</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        <div v-for="(document, index) in model.ssmForm9" :key="index">
                          <a
                            v-bind:href="document.url"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            View
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="model.ssmForm13.length > 0">
                      <td style="width: 20%;"><b>SSM Form 13</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        <div v-for="(document, index) in model.ssmForm13" :key="index">
                          <a
                            v-bind:href="document.url"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            View
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Registered Address</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.DIST_ADDR_1 }} {{ model.DIST_ADDR_2 }}
                        {{ model.DIST_ADDR_3 }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Registered Country</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_COUNTRY.SET_PARAM }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Registered State</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_COUNTRY.SET_CODE == 'MY'">
                        {{ model.DIST_STATE.SET_PARAM }}
                      </td>
                      <td v-if="model.DIST_COUNTRY.SET_CODE != 'MY'">
                        {{ model.DIST_STATE }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Registered City</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_COUNTRY.SET_CODE == 'MY'">
                        {{ model.DIST_CITY.SET_CITY_NAME }}
                      </td>
                      <td v-if="model.DIST_COUNTRY.SET_CODE != 'MY'">
                        {{ model.DIST_CITY }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Registered Postal</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_COUNTRY.SET_CODE == 'MY'">
                        {{ model.DIST_POSTAL.POSTCODE_NO }}
                      </td>
                      <td v-if="model.DIST_COUNTRY.SET_CODE != 'MY'">
                        {{ model.DIST_POSTAL }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Office Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_PHONE_NUMBER && model.DIST_PHONE_NUMBER!=null & model.DIST_PHONE_NUMBER!=''">
                        0{{
                          model.DIST_PHONE_NUMBER.substring(0, 1) +
                            "-" +
                            model.DIST_PHONE_NUMBER.substring(1, 10)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Extension Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_PHONE_EXTENSION }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Fax Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_FAX_NUMBER && model.DIST_FAX_NUMBER!=null & model.DIST_FAX_NUMBER!=''">
                        0{{
                          model.DIST_FAX_NUMBER.substring(0, 1) +
                            "-" +
                            model.DIST_FAX_NUMBER.substring(1, 10)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_MOBILE_NUMBER && model.DIST_MOBILE_NUMBER!=null & model.DIST_MOBILE_NUMBER!=''">
                        0{{
                          model.DIST_MOBILE_NUMBER.substring(0, 2) +
                            "-" +
                            model.DIST_MOBILE_NUMBER.substring(2, 11)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Email Address</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_EMAIL }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Company Website URL</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_COMPANY_WEBSITE }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Application Type</b></td>
                      <td style="width: 2%;">:</td>
                      <!-- <td></td> -->
                      <td v-if="model.applicationType.DIST_TYPE_NAME != null">
                        {{ model.applicationType.DIST_TYPE_NAME }}
                      </td>
                      <!-- {{ model.applicationType.DIST_TYPE_NAME }} -->
                      <!-- need to fix this -->
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Scheme / Product</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_SCHEME }}</td>
                      <!-- need to fix this -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="tabValue === 2" class="tabcontent">
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%;">
                        <b>Financial Status (Total Paid-Up Capital (RM))</b>
                      </td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_PAID_UP_CAPITAL }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Type of Structure</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_TYPE_STRUCTURE == 1">
                        Single-Tier
                      </td>
                      <td v-if="model.DIST_TYPE_STRUCTURE == 2">
                        Multi-Tier
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Marketing Approach</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_MARKETING_APPROACH == 1">
                        Direct
                      </td>
                      <td v-if="model.DIST_MARKETING_APPROACH == 2">
                        Nominee
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;">
                        <b>Proposed number of Distribution Points</b>
                      </td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_NUM_DIST_POINT }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;">
                        <b>Proposed number of Consultants</b>
                      </td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_NUM_CONSULTANT }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Indemnity of Insurance</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_INSURANCE }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;">
                        <b>Expiry date for Indemnity of Insurance</b>
                      </td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.DIST_DATE_INCORP }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="tabValue === 3" class="tabcontent">
                <h4>CEO Profile</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%;"><b>Name</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.CEO_REPR_SALUTATION.USER_SAL_NAME }}
                        {{ model.CEO_REPR_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Position</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.CEO_REPR_POSITION }}</td>
                    </tr>
                    <tr v-if="model.CEO_REPR_CITIZEN == 1">
                      <td style="width: 20%;"><b>NRIC No</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.CEO_REPR_NRIC && model.CEO_REPR_NRIC!=null & model.CEO_REPR_NRIC!=''">
                        {{
                          model.CEO_REPR_NRIC.substring(0, 6) +
                            "-" +
                            model.CEO_REPR_NRIC.substring(6, 8) +
                            "-" +
                            model.CEO_REPR_NRIC.substring(8, 13)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr v-if="model.CEO_REPR_CITIZEN == 2">
                      <td style="width: 20%;"><b>Passport No</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.CEO_REPR_PASS_NUM }}</td>
                    </tr>
                    <tr v-if="model.CEO_REPR_CITIZEN == 2">
                      <td style="width: 20%;"><b>Passport Expiry Date</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.CEO_REPR_PASS_EXP }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Office Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.CEO_REPR_TELEPHONE && model.CEO_REPR_TELEPHONE!=null & model.CEO_REPR_TELEPHONE!=''">
                        0{{
                          model.CEO_REPR_TELEPHONE.substring(0, 1) +
                            "-" +
                            model.CEO_REPR_TELEPHONE.substring(1, 10)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Extension Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.CEO_REPR_PHONE_EXTENSION }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.CEO_REPR_MOBILE_NUMBER && model.CEO_REPR_MOBILE_NUMBER!=null & model.CEO_REPR_MOBILE_NUMBER!=''">
                        01{{
                          model.CEO_REPR_MOBILE_NUMBER.substring(0, 1) +
                            "-" +
                            model.CEO_REPR_MOBILE_NUMBER.substring(1, 11)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Email</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.CEO_REPR_EMAIL }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <h4>List of Director</h4>
                <va-card>
                  <va-data-table :fields="fields" :data="filteredData">
                    <!-- A virtual column -->
                    <template slot="no" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                    </template>
                  </va-data-table>
                </va-card>

                <vue-form-generator
                  :model="model"
                  :schema="thirdTabSchemaUpload"
                  :options="formOptions"
                  ref="thirdTabFormUpload"
                  @model-updated="onModelUpdated"
                >
                </vue-form-generator>
                <br />
              </div>
              <div v-if="tabValue === 4" class="tabcontent">
                <h4>Authorised Representative</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%;"><b>Name</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.AR_REPR_SALUTATION.USER_SAL_NAME }}
                        {{ model.AR_REPR_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Position</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AR_REPR_POSITION }}</td>
                    </tr>
                    <tr v-if="model.AR_REPR_CITIZEN == 1">
                      <td style="width: 20%;"><b>NRIC No</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.AR_REPR_NRIC && model.AR_REPR_NRIC!=null & model.AR_REPR_NRIC!=''">
                        {{
                          model.AR_REPR_NRIC.substring(0, 6) +
                            "-" +
                            model.AR_REPR_NRIC.substring(6, 8) +
                            "-" +
                            model.AR_REPR_NRIC.substring(8, 13)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr v-if="model.AR_REPR_CITIZEN == 2">
                      <td style="width: 20%;"><b>Passport No</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AR_REPR_PASS_NUM }}</td>
                    </tr>
                    <tr v-if="model.AR_REPR_CITIZEN == 2">
                      <td style="width: 20%;"><b>Passport Expiry Date</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AR_REPR_PASS_EXP }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Office Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.AR_REPR_TELEPHONE && model.AR_REPR_TELEPHONE!=null & model.AR_REPR_TELEPHONE!=''">
                        0{{
                          model.AR_REPR_TELEPHONE.substring(0, 1) +
                            "-" +
                            model.AR_REPR_TELEPHONE.substring(1, 10)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Extension Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AR_REPR_PHONE_EXTENSION }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.AR_REPR_MOBILE_NUMBER && model.AR_REPR_MOBILE_NUMBER!=null & model.AR_REPR_MOBILE_NUMBER!=''">
                        01{{
                          model.AR_REPR_MOBILE_NUMBER.substring(0, 1) +
                            "-" +
                            model.AR_REPR_MOBILE_NUMBER.substring(1, 11)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Email</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AR_REPR_EMAIL }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;">
                        <b
                          >Board of Directors' Resolution approving the
                          appointment of the AR</b
                        >
                      </td>
                      <td style="width: 2%;">:</td>
                      <td>
                        <div v-for="(document, index) in model.BODApprove" :key="index">
                          <a
                            v-bind:href="document.url"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            View
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <h4>Alternate Authorised Representative</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%;"><b>Name</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.AAR_REPR_SALUTATION.USER_SAL_NAME }}
                        {{ model.AAR_REPR_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Position</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AAR_REPR_POSITION }}</td>
                    </tr>
                    <tr v-if="model.AAR_REPR_CITIZEN == 1">
                      <td style="width: 20%;"><b>NRIC No</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.AAR_REPR_NRIC && model.AAR_REPR_NRIC!=null & model.AAR_REPR_NRIC!=''">
                        {{
                          model.AAR_REPR_NRIC.substring(0, 6) +
                            "-" +
                            model.AAR_REPR_NRIC.substring(6, 8) +
                            "-" +
                            model.AAR_REPR_NRIC.substring(8, 13)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr v-if="model.AAR_REPR_CITIZEN == 2">
                      <td style="width: 20%;"><b>Passport No</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AAR_REPR_PASS_NUM }}</td>
                    </tr>
                    <tr v-if="model.AAR_REPR_CITIZEN == 2">
                      <td style="width: 20%;"><b>Passport Expiry Date</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AAR_REPR_PASS_EXP }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Office Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.AAR_REPR_TELEPHONE && model.AAR_REPR_TELEPHONE!=null & model.AAR_REPR_TELEPHONE!=''">
                        0{{
                          model.AAR_REPR_TELEPHONE.substring(0, 1) +
                            "-" +
                            model.AAR_REPR_TELEPHONE.substring(1, 10)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Extension Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AAR_REPR_PHONE_EXTENSION }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.AAR_REPR_MOBILE_NUMBER && model.AAR_REPR_MOBILE_NUMBER!=null & model.AAR_REPR_MOBILE_NUMBER!=''">
                        01{{
                          model.AAR_REPR_MOBILE_NUMBER.substring(0, 1) +
                            "-" +
                            model.AAR_REPR_MOBILE_NUMBER.substring(1, 11)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Email</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.AAR_REPR_EMAIL }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="tabValue === 5" class="tabcontent">
                <div
                  v-if="
                    model.applicationType.DISTRIBUTOR_TYPE_ID == 4 ||
                      model.applicationType.DISTRIBUTOR_TYPE_ID == 5
                  "
                >
                  <h4>Financial Institution</h4>
                  <table class="table">
                    <tr>
                      <td style="width: 20%;">
                        <b>Financial Institution</b>
                      </td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.DIST_FINANCIAL_INSTITUTION == 1">
                        YES
                      </td>
                      <td v-if="model.DIST_FINANCIAL_INSTITUTION == 2">
                        NO
                      </td>
                    </tr>
                  </table>

                  <br />
                  <h4>Financial Planner</h4>
                  <table class="table">
                    <tr>
                      <td style="width: 20%;">
                        <b>Financial Planner's Name</b>
                      </td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.FINANCIAL_PLANNER_SALUTATION.USER_SAL_NAME }}
                        {{ model.FINANCIAL_PLANNER_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;">
                        <b>CMSRL Number</b>
                      </td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.CSMRL_NUMBER }}</td>
                    </tr>
                    <tr v-if="model.FINANCIAL_PLANNER_CITIZEN == 1">
                      <td style="width: 20%;"><b>NRIC No</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.FINANCIAL_PLANNER_NRIC && model.FINANCIAL_PLANNER_NRIC!=null & model.FINANCIAL_PLANNER_NRIC!=''">
                        {{
                          model.FINANCIAL_PLANNER_NRIC.substring(0, 6) +
                            "-" +
                            model.FINANCIAL_PLANNER_NRIC.substring(6, 8) +
                            "-" +
                            model.FINANCIAL_PLANNER_NRIC.substring(8, 13)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr v-if="model.FINANCIAL_PLANNER_CITIZEN == 2">
                      <td style="width: 20%;"><b>Passport No</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.FINANCIAL_PLANNER_PASS_NUM }}</td>
                    </tr>
                    <tr v-if="model.AAR_REPR_CITIZEN == 2">
                      <td style="width: 20%;"><b>Passport Expiry Date</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.FINANCIAL_PLANNER_PASS_EXP }}</td>
                    </tr>
                  </table>
                </div>
                <br />
                <h4>Head of Department, Compliance Department</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%;"><b>Name</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.COMPL_SALUTATION.USER_SAL_NAME }}
                        {{ model.COMPL_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Office Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.COMPL_TELEPHONE && model.COMPL_TELEPHONE!=null & model.COMPL_TELEPHONE!=''">
                        0{{
                          model.COMPL_TELEPHONE.substring(0, 1) +
                            "-" +
                            model.COMPL_TELEPHONE.substring(1, 10)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Extension Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.COMPL_PHONE_EXTENSION }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.COMPL_MOBILE_NUMBER && model.COMPL_MOBILE_NUMBER!=null & model.COMPL_MOBILE_NUMBER!=''">
                        01{{
                          model.COMPL_MOBILE_NUMBER.substring(0, 1) +
                            "-" +
                            model.COMPL_MOBILE_NUMBER.substring(1, 11)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Email</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.COMPL_EMAIL }}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <h4>Head of Department UTS Distributor, Operation Department</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%;"><b>Name</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.UTS_SALUTATION.USER_SAL_NAME }}
                        {{ model.UTS_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Office Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.UTS_TELEPHONE && model.UTS_TELEPHONE!=null & model.UTS_TELEPHONE!=''">
                        0{{
                          model.UTS_TELEPHONE.substring(0, 1) +
                            "-" +
                            model.UTS_TELEPHONE.substring(1, 10)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Extension Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.UTS_PHONE_EXTENSION }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.UTS_MOBILE_NUMBER && model.UTS_MOBILE_NUMBER!=null & model.UTS_MOBILE_NUMBER!=''">
                        01{{
                          model.UTS_MOBILE_NUMBER.substring(0, 1) +
                            "-" +
                            model.UTS_MOBILE_NUMBER.substring(1, 11)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Email</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.UTS_EMAIL }}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <h4>Head of Department PRS Distributor, Operation Department</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%;"><b>Name</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.PRS_SALUTATION.USER_SAL_NAME }}
                        {{ model.PRS_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Office Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.PRS_TELEPHONE && model.PRS_TELEPHONE!=null & model.PRS_TELEPHONE!=''">
                        0{{
                          model.PRS_TELEPHONE.substring(0, 1) +
                            "-" +
                            model.PRS_TELEPHONE.substring(1, 10)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Extension Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.PRS_PHONE_EXTENSION }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.PRS_MOBILE_NUMBER && model.PRS_MOBILE_NUMBER!=null & model.PRS_MOBILE_NUMBER!=''">
                        01{{
                          model.PRS_MOBILE_NUMBER.substring(0, 1) +
                            "-" +
                            model.PRS_MOBILE_NUMBER.substring(1, 11)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Email</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.PRS_EMAIL }}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <h4>Head of Department, Training Department</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td style="width: 20%;"><b>Name</b></td>
                      <td style="width: 2%;">:</td>
                      <td>
                        {{ model.TRAIN_SALUTATION.USER_SAL_NAME }}
                        {{ model.TRAIN_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Office Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.TRAIN_TELEPHONE && model.TRAIN_TELEPHONE!=null & model.TRAIN_TELEPHONE!=''">
                        0{{
                          model.TRAIN_TELEPHONE.substring(0, 1) +
                            "-" +
                            model.TRAIN_TELEPHONE.substring(1, 10)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Extension Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.TRAIN_PHONE_EXTENSION }}</td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Mobile Phone Number</b></td>
                      <td style="width: 2%;">:</td>
                      <td v-if="model.TRAIN_MOBILE_NUMBER && model.TRAIN_MOBILE_NUMBER!=null & model.TRAIN_MOBILE_NUMBER!=''">
                        01{{
                          model.TRAIN_MOBILE_NUMBER.substring(0, 1) +
                            "-" +
                            model.TRAIN_MOBILE_NUMBER.substring(1, 11)
                        }}
                      </td>
                      <td v-else></td>
                    </tr>
                    <tr>
                      <td style="width: 20%;"><b>Email</b></td>
                      <td style="width: 2%;">:</td>
                      <td>{{ model.TRAIN_EMAIL }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="tabValue === 6" class="tabcontent">
                <va-data-table
                  :showPagination="false"
                  :fields="fieldsFile1"
                  :data="additionalList"
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>
                  <template slot="actions" slot-scope="row">
                    <div id="app">
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :multiple="false"
                        :deletable="true"
                        :linkable="true"
                        :editable="false"
                        :accept="'.pdf'"
                        :maxSize="'2MB'"
                        :maxFiles="8"
                        :helpText="'Select files'"
                        :errorText="{
                          type: 'Please select images, videos, pdf or zip files',
                          size: 'You selected a larger file!'
                        }"
                        :thumbnailSize="120"
                        :theme="'list'"
                        @select="
                          filesSelected(
                            $event,
                            row.rowData.fileRecords,
                            row.rowData.MANAGE_REQUIRED_DOCUMENT_ID
                          )
                        "
                        v-model="row.rowData.fileRecords"
                      ></VueFileAgent>
                    </div>
                  </template>
                </va-data-table>
                <div>
                  <vue-form-generator
                      :model="model"
                      :schema="additionalDocumentSchema"
                      :options="formOptions"
                      @model-updated="onModelUpdated"
                      ref="additionalDocumentSchema"
                    >
                  </vue-form-generator>
                  <!-- <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :multiple="true"
                    :deletable="true"
                    :editable="false"
                    :accept="'.pdf'"
                    :maxSize="'2MB'"
                    :maxFiles="8"
                    :helpText="'Select files'"
                    :errorText="{
                      type: 'Please select images, videos, pdf or zip files',
                      size: 'You selected a larger file!'
                    }"
                    :thumbnailSize="120"
                    :theme="'list'"
                    @select="filesSelected2($event)"
                    @beforedelete="onBeforeDelete2($event, 8)"
                    v-model="fileRecords"
                  ></VueFileAgent> -->
                </div>
              </div>
            </va-card>
          </div>
          <div class="actions">
            <div class="cancel vudal-btn">Close</div>
          </div>
        </vudal>
        <vudal name="simpleModalEdit" class="widthModal">
          <div class="header">
            Edit Director Info
            <i class="close icon">&times;</i>
            <br />
          </div>
          <div class="content">
            <vue-form-generator
              :model="model"
              :schema="editDirectorSchema"
              :options="formOptions"
              ref="editDirForm"
              @model-updated="onModelUpdated"
            />
          </div>
          <div class="actions">
            <button
              type="button"
              class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
            >
              <i class="fa fa-times" /> &nbsp; Close
            </button>
            <button
              @click="updateDirector"
              type="button"
              class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
            >
              <i class="fa fa-edit" /> &nbsp; Edit
            </button>
          </div>
        </vudal>
        <br />
        <div class="row">
          <div class="col-12">
            <va-card>
              <form-wizard
                @on-complete="onComplete"
                color="#FF5050"
                error-color="#a94442"
                finish-button-text="Submit"
                ref="wizardForm"
              >
                <h3 slot="title"></h3>
                <tab-content
                  icon="fa fa-university"
                  title="1. Distributor Profile"
                >
                  <br />
                  <vue-form-generator
                    :model="model"
                    :schema="firstTabSchema"
                    :options="formOptions"
                    ref="firstTabForm"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
                </tab-content>
                <tab-content icon="fa fa-navicon" title="2. Details information">
                  <br />
                  <vue-form-generator
                    :model="model"
                    :schema="firstTabAddSchema"
                    :options="formOptions"
                    ref="detailInfoForm"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
                </tab-content>

                <tab-content icon="fa fa-user" title="3. CEO and Director">
                  <br />
                  <vue-form-generator
                    :model="model"
                    :schema="thirdTabSchemaCEO"
                    :options="formOptions"
                    ref="thirdTabFormCEO"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
                  <br />
                  <vue-form-generator
                    :model="model"
                    :schema="thirdTabSchemaDIR"
                    :options="formOptions"
                    ref="thirdTabFormDIR"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
                  <br />
                  <div class="text-center">
                    <button
                      @click="addDirector"
                      type="button"
                      class="btn btn-warning btn-fill btn-md"
                    >
                      <i class="fa fa-plus" /> &nbsp; Add
                    </button>
                  </div>
                  <br />
                  <va-card>
                    <va-data-table :fields="fields" :data="filteredData">
                      <!-- A virtual column -->
                      <template slot="no" slot-scope="row">
                        {{ row.rowIndex + 1 }}
                      </template>
                      <template slot="actions" slot-scope="props">
                        <h4 class="mt-2">
                          <span
                            @click="deleteDir(props)"
                            class="badge badge-danger mr-1"
                          >
                            <i class="fa fa-trash"></i
                          ></span>
                          <span
                            @click="editDirector(props.rowData)"
                            class="badge badge-primary mr-1"
                          >
                            <i class="fa fa-edit"></i
                          ></span>
                        </h4>
                      </template>
                    </va-data-table>
                  </va-card>
                  <br />
                  <vue-form-generator
                    :model="model"
                    :schema="thirdTabSchemaUpload"
                    :options="formOptions"
                    ref="thirdTabFormUpload"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
                  <br />
                </tab-content>
                <tab-content icon="fa fa-user-circle-o" title="4. AR and AAR">
                  <br />
                  <vue-form-generator
                    :model="model"
                    :schema="secondTabSchema"
                    :options="formOptions"
                    ref="ARForm"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>

                  <br /><br /><br />
                </tab-content>
                <tab-content icon="fa fa-info" title="5. Additional Information">
                  <br />
                  <div
                    v-if="
                      this.model.applicationType.DISTRIBUTOR_TYPE_ID == 4 ||
                        this.model.applicationType.DISTRIBUTOR_TYPE_ID == 5
                    "
                  >
                    <legend>
                      Financial Institution
                      <i
                        v-b-tooltip.hover.right
                        title="Financial Institution which refers to Registered Person specified in the Third Column under item (1) (g) Part 1 of Schedule 4 of the CAPITAL MARKETS AND SERVICES ACT 2007 (CMSA)."
                        class="fa fa-info-circle"
                      ></i>
                    </legend>
                    <br />
                    <vue-form-generator
                      :model="model"
                      :schema="AISchema5"
                      :options="formOptions"
                      ref="AIForm5"
                      @model-updated="onModelUpdated"
                    >
                    </vue-form-generator>
                  </div>

                  <br />
                  <div
                    v-if="
                      model.applicationType.DISTRIBUTOR_TYPE_ID === 4 ||
                        model.applicationType.DISTRIBUTOR_TYPE_ID === 5
                    "
                  >
                    <legend>Financial Planner</legend>
                    <br />
                    <vue-form-generator
                      :model="model"
                      :schema="AISchema6"
                      :options="formOptions"
                      ref="AIForm5"
                      @model-updated="onModelUpdated"
                    >
                    </vue-form-generator>
                  </div>

                  <br />
                  <vue-form-generator
                    :model="model"
                    :schema="AISchema1"
                    :options="formOptions"
                    ref="AIForm1"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>
                  <br />
                  <div
                      v-if="
                        model.applicationType.DISTRIBUTOR_TYPE_ID === 1 ||
                        model.applicationType.DISTRIBUTOR_TYPE_ID === 3 ||
                        model.applicationType.DISTRIBUTOR_TYPE_ID === 5
                      "
                      >
                      <vue-form-generator
                        :model="model"
                        :schema="AISchema2"
                        :options="formOptions"
                        ref="AIForm2"
                        @model-updated="onModelUpdated"
                      >
                      </vue-form-generator>
                  </div>

                  <br />
                  <div
                    v-if="
                      model.applicationType.DISTRIBUTOR_TYPE_ID === 2 ||
                      model.applicationType.DISTRIBUTOR_TYPE_ID === 4 ||
                      model.applicationType.DISTRIBUTOR_TYPE_ID === 6
                    "
                  >
                    <vue-form-generator
                      :model="model"
                      :schema="AISchema3"
                      :options="formOptions"
                      ref="AIForm2"
                      @model-updated="onModelUpdated"
                    >
                    </vue-form-generator>
                  </div>
                  <br />

                  <vue-form-generator
                    :model="model"
                    :schema="AISchema4"
                    :options="formOptions"
                    ref="AIForm4"
                    @model-updated="onModelUpdated"
                  >
                  </vue-form-generator>

                  <br /><br /><br />
                </tab-content>

                <tab-content
                  icon="fa fa-file-text"
                  title="6. Additional Document Upload"
                >
                  <va-data-table
                    :showPagination="false"
                    :fields="fieldsFile1"
                    :data="additionalList"
                  >
                    <template slot="no" slot-scope="row">
                      {{ row.rowIndex + 1 }}
                    </template>
                    <template slot="actions" slot-scope="row">
                      <div id="app">
                        <VueFileAgent
                          :uploadUrl="'https://example.com'"
                          :uploadHeaders="{}"
                          :multiple="false"
                          :deletable="true"
                          :linkable="true"
                          :editable="false"
                          :accept="'.pdf'"
                          :maxSize="'2MB'"
                          :maxFiles="8"
                          :helpText="'Select files'"
                          :errorText="{
                            type:
                              'Please select images, videos, pdf or zip files',
                            size: 'You selected a larger file!'
                          }"
                          :thumbnailSize="120"
                          :theme="'list'"
                          @select="
                            filesSelected(
                              $event,
                              row.rowData.fileRecords,
                              row.rowData.MANAGE_REQUIRED_DOCUMENT_ID
                            )
                          "
                          v-model="row.rowData.fileRecords"
                        ></VueFileAgent>
                      </div>
                    </template>
                  </va-data-table>
                  <div>
                    <vue-form-generator
                      :model="model"
                      :schema="additionalDocumentSchema"
                      :options="formOptions"
                      @model-updated="onModelUpdated"
                      ref="additionalDocumentSchema"
                    >
                    </vue-form-generator>
                    <!-- <VueFileAgent
                      :uploadUrl="'https://example.com'"
                      :uploadHeaders="{}"
                      :multiple="true"
                      :deletable="true"
                      :editable="false"
                      :linkable="true"
                      :required="true"
                      :accept="'.pdf'"
                      :maxSize="'2MB'"
                      :maxFiles="8"
                      :helpText="'Select files'"
                      :errorText="{
                        type: 'Please select images, videos, pdf or zip files',
                        size: 'You selected a larger file!'
                      }"
                      :thumbnailSize="120"
                      :theme="'list'"
                      @select="filesSelected2($event)"
                      @beforedelete="onBeforeDelete2($event, 8)"
                      v-model="fileRecords"
                    ></VueFileAgent> -->
                  </div>
                </tab-content>
                <br />
                <template
                  slot="footer"
                  slot-scope="{ activeTabIndex, isLastStep, nextTab, prevTab }"
                >
                  <div class="float-left">
                    <table>
                      <tr>
                        <td style="padding: 0 7px 0 0;">
                          <button
                            v-if="activeTabIndex < 1"
                            @click="back"
                            type="button"
                            class="btn btn-primary btn-fill btn-md"
                          >
                            <i class="fa fa-step-backward" /> &nbsp; Previous
                          </button>
                          &nbsp;
                        </td>
                        <td style="padding: 0 5px 0 0;">
                          &nbsp;
                          <button
                            v-if="activeTabIndex > 0"
                            @click="prevTab"
                            type="button"
                            class="btn btn-primary btn-fill btn-md"
                          >
                            <i class="fa fa-step-backward" /> &nbsp; Previous
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="float-right">
                                          <!-- 8=RETURNED BY MANAGER / RETURNED BY RD -->
                    <button
                      @click="submit(1)"
                      v-if="isShowDraft && (model.APPROVAL_STATUS==null || model.APPROVAL_STATUS=='' || model.APPROVAL_STATUS==8 || model.APPROVAL_STATUS==7)"
                      type="button"
                      class="btn btn-info btn-fill btn-md"
                    >
                      <i class="fa fa-edit" /> &nbsp;Save as Draft
                    </button>
                    <button
                      v-if="isLastStep"
                      @click="showmodal"
                      type="button"
                      class="ml-2 btn btn-warning btn-fill btn-md"
                    >
                      <i class="fa fa-play-circle" /> &nbsp;Preview
                    </button>
                    <button
                      v-if="!isLastStep"
                      @click="nextTab"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                      Next &nbsp; <i class="fa fa-step-forward" />
                    </button>
                    <!-- <button
                      v-if="isLastStep && isShow"
                      @click="beginSubmit"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                      Submit
                    </button> -->
                    <button
                      v-if="isLastStep && (model.APPROVAL_STATUS==null || model.APPROVAL_STATUS=='' || model.APPROVAL_STATUS==8 || model.APPROVAL_STATUS==7)"
                      @click="beginSubmit"
                      type="button"
                      class="ml-2 btn btn-primary btn-fill btn-md"
                    >
                      Submit
                    </button>
                  </div>
                </template>
              </form-wizard>
            </va-card>
          </div>
        </div>
      </div>
    </va-inner-loading>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import Vudal from "vudal";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg-core.css";
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
import * as services06Module0 from "../../../app/module0/services06";
import * as services06Module1 from "../../../app/module1/services06";
import * as servicesModule6 from "../../../app/module6/services05";
import moment from "moment";
import { parse } from "vue-currency-input";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueFormGenerator);
Vue.use(VueFormWizard);
Vue.component(Vudal);
// register globally
Vue.component("multiselect", Multiselect);

export default {
  watch: {
    "model.ssmForm9": function(value) {}
  },

  computed: {
    // numberValue() {
    //   return parse(this.value, this.options);
    // }
    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No",
          width: "2%"
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: "DIR_NAME_DISPLAY",
          title: "Name",
          width: "35%"
        },
        {
          name: "DIR_NRIC",
          title: "NRIC No",
          width: "10%"
        },
        {
          name: "DIR_PASSPORT",
          title: "Passport Number",
          width: "10%"
        },
        {
          name: "DIR_PASSPORT_EXPIRY",
          title: "Passport Expiry Date",
          width: "10%"
        },
        {
          name: "DIR_DATE_EFFECTIVE_DISPLAY",
          title: "Effective Date",
          width: "10%"
        },
        {
          name: "DIR_DATE_END_DISPLAY",
          title: "End Date",
          width: "10%"
        },
        {
          name: "__slot:actions",
          title: "Action"
          // dataClass: "float-right"
        }
      ];
    },
    filteredData() {
      return this.directorList;
    },

    fieldsFile1() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No",
          width: "30px"
        },
        {
          name: "REQ_DOCU_NAME", // "REQ_DOCU_NAME",
          title: "Name",
          width: "50%"
        },
        {
          name: "__slot:actions",
          title: "Choose File"
          // dataClass: "float-right"
        }
      ];
    },
    filteredDataFile1() {
      return this.uploadFileItems1;
    },

    fieldsFile2() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No",
          width: "30px"
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: "fileName",
          title: "Name",
          width: "50%"
        },
        {
          name: "__slot:actions",
          title: "Choose File"
          // dataClass: "float-right"
        }
      ];
    },
    filteredDataFile2() {
      return this.uploadFileItems2;
    },
    fieldsFile3() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No",
          width: "30px"
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: "fileName",
          title: "Name",
          width: "50%"
        },
        {
          name: "__slot:actions",
          title: "Choose File"
          // dataClass: "float-right"
        }
      ];
    },
    filteredDataFile3() {
      return this.uploadFileItems3;
    }
  },
  components: {
    Vudal,
    HorizontalScroll
  },
  mounted() {
    // this.$refs.wizard.maxStep = 5;
    // this.$refs.wizard.navigateToTab(5)
    console.log("begin");
    console.log("Done Get Distributor Detail");
    this.getUserSalutation();
    console.log("Done get salutation");
    this.getCountry();
    this.getDefaultCountry();

    this.getDocumentAdditional();
    this.getDocumentProposal();

    this.getBallance();
    this.getIssueingBank();
    this.getApplicationType();

    this.getDistributorById();

    // active all tab
    var wizard = this.$refs.wizardForm;
    wizard.activateAll();

    this.showStaticModalOK = false;
    this.showStaticModalSaveAsDraft = false;
    this.showErrorModalOK = false;
  },
  props: {
    value: File
  },
  data() {
    return {
      errorMessage:'',
      showStaticModalOK: true,
      showErrorModalOK: true,
      showStaticModalSaveAsDraft: true,
      isLoad: false,
      isShow: true,
      isShowDraft: true,
      distributorProfileDetails: '',
      RecordBank: [],
      companyLogo: [],
      ssmForm8: "",
      ssmForm9: "",
      ssmForm13: "",
      uploadCSMRL: "",
      uploadCSMRLorMOFLicense: "",
      BODApprove: "",
      receipt: "",
      additionalList: [],
      fileDeleted: [],
      uploadFileOject: [],
      uploadFileOject2: "",
      uploadFileOjectId: [],
      proposalList: [],
      tempArray: [],
      deletedDir: [],
      details: [],
      updateDistributor: false,
      pdfURL: "blob:http://localhost:8080/03ae069e-59ff-44ac-946a-e130c4fcd6e3",
      fileRecords: [],
      fileRecords2: [],
      fileRecords3: [],
      fileRecordsForUpload: [],
      fileRecordsForUpload2: [],
      fileRecordsForUpload3: [],
      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: {
        "X-Test-Header": "vue-file-agent"
      },
      state: [],
      country: [],
      options: [
        { label: "Distributor Profile", value: 1 },
        { label: "Details Information", value: 2 },
        { label: "CEO and Director", value: 3 },
        { label: "AR and AAR", value: 4 },
        { label: "Additional Information", value: 5 },
        { label: "Uploaded Document", value: 6 }
      ],
      tabValue: 1,
      activePage: 4,
      activetab: 1,
      applicantPhoto: "",
      show: false,
      show_second: false,
      show_third: false,
      modalClass: "modal-90per",
      uploadedFileFields: [
        {
          key: "actions",
          label: ""
        },
        // A column that needs custom formatting
        {
          key: "fileName",
          label: "Document"
        },
        {
          key: "file",
          label: "Action"
        }
      ],
      uploadFileFields: [
        // A virtual column that doesn't exist in items
        {
          key: "actions",
          label: ""
        },
        // A column that needs custom formatting
        {
          key: "fileName",
          label: "Document"
        },
        {
          key: "chooseFile",
          label: "Choose File"
        }
      ],

      uploadFileItems: [
        {
          id: "1",
          fileName: "Distributor Logo",
          type: "photo",
          filePath: "",
          selected: false
        },
        {
          id: "2",
          fileName:
            "Board of Directors' Resolution approving the appointment of the AR",
          type: "file",
          filePath: "",
          selected: false
        },
        {
          id: "3",
          fileName:
            " Certified true copy of relevant CMSL and approval that verify the eligibility of the applicant (if applicable)",
          type: "file",
          filePath: "",
          selected: false
        },
        {
          id: "4",
          fileName: "Payment of application and annual fees",
          type: "file",
          filePath: "",
          selected: false
        }
      ],
      uploadFileItems1: [
        {
          id: "1",
          fileName: "Policy governing Sales Conduct / Activities ",
          type: "file",
          filePath: "",
          fileRecords: [],
          fileRecordsForUpload: [],
          selected: false
        },
        {
          id: "2",
          fileName: "Policy on promotional Materials ",
          type: "file",
          filePath: "",
          fileRecords: [],
          fileRecordsForUpload: [],
          selected: false
        },
        {
          id: "3",
          fileName: "Policy on Unitholder’s Rights and Protection ",
          type: "file",
          filePath: "",
          fileRecords: [],
          fileRecordsForUpload: [],
          selected: false
        },
        {
          id: "4",
          fileName: "Conflict of Interest Management",
          type: "file",
          filePath: "",
          fileRecords: [],
          fileRecordsForUpload: [],
          selected: false
        },
        {
          id: "5",
          fileName: "Conflict of Interest Management",
          type: "file",
          filePath: "",
          fileRecords: [],
          fileRecordsForUpload: [],
          selected: false
        },
        {
          id: "6",
          fileName: "Risk Management ",
          type: "file",
          filePath: "",
          fileRecords: [],
          fileRecordsForUpload: [],
          selected: false
        },
        {
          id: "7",
          fileName: "Complaint Handling and Disciplinary matrix ",
          type: "file",
          filePath: "",
          fileRecords: [],
          fileRecordsForUpload: [],
          selected: false
        },
        {
          id: "8",
          fileName:
            "Other Policies – upload related policy available (i.e. AMLCFT, PDPA, etc.) ",
          type: "file",
          filePath: "",
          fileRecords: [],
          fileRecordsForUpload: [],
          selected: false
        }
      ],
      uploadFileItems2: [],
      currentPage: 1,
      filter: null,
      directorList: [],
      fieldsDirList: [
        {
          key: "index",
          label: "No"
        },
        // A column that needs custom formatting
        {
          key: "name",
          label: "Name"
        },
        {
          key: "DIR_icNo",
          label: "IC No."
        },
        {
          key: "DIR_passsportNumber",
          label: "Passport Number"
        },
        {
          key: "DIR_passportExpiryDate",
          label: "Passport Expiry Date"
        },
        {
          key: "DIR_effectiveDate",
          label: "Effective Date"
        },
        {
          key: "DIR_endDate",
          label: "End Date"
        }
      ],
      showView: false,
      contactPersonValue: null,
      visibleIc: true,
      visiblePassport: false,
      visibleIcDir: true,
      visiblePassportDir: false,
      visibleIcAAR: true,
      visiblePassportAAR: false,
      visiblePassportCEO: false,
      visibleIcCEO: true,
      visiblePassportOther: false,
      visibleIcOther: true,
      visibleIcEditDIR: true,
      visiblePassportEditDIR: false,
      visibleIcDIR: true,
      visiblePassporDIR: false,
      visibleDIST_INSURANCE: false,
      visibleDIST_SCHEME: false,
      visibleDIST_FIN_INST: false,

      visibleFinancialPlannerName: false,
      visibleFINANCIALPLANNERNRIC: true,
      visibleFINANCIALPLANNERPASSNUM: false,
      visibleCSMRLNumber: false,
      visibleuploadCSMRL: false,
      visibleuploadCSMRLorMOFLicense: false,

      disableDIST_TYPE_STRUCTURE: false,
      disableDIST_MARKETING_APPROACH: false,

      visibleEmailTac: false,

      // transType:[
      //   {
      //     name: "Malaysian",
      //     value: "1",
      //     selected: true
      //   },
      // ],
      citizenship: [
        {
          name: "Malaysian",
          value: 1,
          selected: true
        },
        {
          name: "Non Malaysian",
          value: 2
        }
      ],
      postcode: [],
      city: [],
      states: "",
      applicationType: [
        // {
        //   name: "Member",
        //   value: "1"
        // },
        // {
        //   name: "IUTA",
        //   value: "2"
        // },
        // {
        //   name: "CUTA",
        //   value: "3"
        // }
      ],
      setupType: [
        { value: 1, name: "Public Limited Company / Berhad " },
        { value: 2, name: "Private Limited Company / Sendirian Berhad " }
      ],
      salutations: [],
      transType: [
        {
          name: "ONLINE TRANSACTION",
          value: 1
        },
        {
          name: "CASH DEPOSIT",
          value: 2
        },
        {
          name: "CHEQUE DEPOSIT",
          value: 3
        }
      ],
      department: [],
      structureType: [
        { value: 1, name: "Single-tier" },
        { value: 2, name: "Multi-tier" }
      ],
      approachType: [
        { value: 1, name: "Direct" },
        { value: 2, name: "Nominee" }
      ],
      radioYesNo: [
        { value: 1, name: "Yes" },
        { value: 2, name: "No" }
      ],
      model: {
        PUBLISH_STATUS: '',
        APPROVAL_STATUS : '',

        TOTAL_AMOUNT_APPLICATION: "",
        show1: true,
        details: "",
        //* *Particulars of Applicant (Corporate)*/
        fileRecordsForUpload: "",
        receipt: [],
        BODApprove: [],
        ssmForm8: [],
        ssmForm9: [],
        ssmForm13: [],
        fileRecords: [],
        DIST_PUBLISH_STATUS: "",
        companyLogo: [],
        DISTRIBUTOR_ID: "",
        DIST_NAME: "",
        DIST_REGI_NUM1: "",
        DIST_REGI_NUM2: "",
        DIST_DATE_INCORP: "",
        DIST_TYPE_SETUP: "1",
        DIST_PHONE_NUMBER: "",
        DIST_PHONE_EXTENSION: null,
        DIST_MOBILE_NUMBER: "",
        DIST_EMAIL: "",
        GENERATED_TAC: "",
        EMAIL_TAC: "",
        DIST_FAX_NUMBER: "",
        DIST_COMPANY_WEBSITE: "",

        DIST_ADDR_1: "",
        DIST_ADDR_2: "",
        DIST_ADDR_3: "",
        DIST_POSTAL: "",
        DIST_COUNTRY: "",
        DIST_CITY: "",
        DIST_STATE: "",
        ADDRESS_isBIZADDRESS: false,
        DIST_BIZ_ADDR_1: "",
        DIST_BIZ_ADDR_2: "",
        DIST_BIZ_ADDR_3: "",
        DIST_BIZ_POSTAL: "",
        DIST_BIZ_COUNTRY: "",
        DIST_BIZ_CITY: "",
        DIST_BIZ_STATE: "",
        applicationType: { DIST_TYPE_NAME: "Please Select" },
        DIST_SCHEME: "",
        uploadCSMRL: [],
        uploadCSMRLorMOFLicense: [],

        DIST_FINANCIAL_INSTITUTION: "",
        DIST_PAID_UP_CAPITAL: "",
        DIST_TYPE_STRUCTURE: 1,
        DIST_MARKETING_APPROACH: 1,
        DIST_NUM_DIST_POINT: "",
        DIST_NUM_CONSULTANT: "",
        DIST_INSURANCE: "",
        DIST_EXPIRED_DATE: null,
        DIST_INSURANCE_POLICY: [],

        //* *Authorised Representative(s) */
        AR_REPR_SALUTATION: "",
        AR_REPR_NAME: "",
        AR_REPR_POSITION: "",
        AR_REPR_NRIC: "",
        AR_REPR_PASS_NUM: "",
        AR_REPR_PASS_EXP: null,
        AR_REPR_CITIZEN: "1",
        AR_REPR_TELEPHONE: "",
        AR_REPR_PHONE_EXTENSION: "",
        AR_REPR_MOBILE_NUMBER: "",
        AR_REPR_EMAIL: "",
        //* *Alternate Authorised Representative(s) */
        AAR_REPR_SALUTATION: "",
        AAR_REPR_NAME: "",
        AAR_REPR_POSITION: "",
        AAR_REPR_NRIC: "",
        AAR_REPR_PASS_NUM: "",
        AAR_REPR_PASS_EXP: null,
        AAR_REPR_CITIZEN: "1",
        AAR_REPR_TELEPHONE: "",
        AAR_REPR_PHONE_EXTENSION: "",
        AAR_REPR_MOBILE_NUMBER: "",
        AAR_REPR_EMAIL: "",
        //* *Login Info Authorised Representative(s) */
        LI_AR_memberId: "",
        LI_AR_password: "",
        LI_AR_confirmPassword: "",
        //* *Login Info Alternate Authorised Representative(s) */
        LI_AAR_memberId: "",
        LI_AAR_password: "",
        LI_AAR_confirmPassword: "",
        //* *Additional Information */

        FINANCIAL_PLANNER_SALUTATION: "",
        FINANCIAL_PLANNER_NAME: "",
        CSMRL_NUMBER: "",
        FINANCIAL_PLANNER_TELEPHONE: "",
        FINANCIAL_PLANNER_PHONE_EXTENSION: "",
        FINANCIAL_PLANNER_EMAIL: "",
        FINANCIAL_PLANNER_MOBILE_NUMBER: "",

        COMPL_SALUTATION: "",
        COMPL_NAME: "",
        COMPL_TELEPHONE: "",
        COMPL_PHONE_EXTENSION: "",
        COMPL_EMAIL: "",
        COMPL_MOBILE_NUMBER: "",

        UTS_SALUTATION: "",
        UTS_NAME: "",
        UTS_TELEPHONE: "",
        UTS_PHONE_EXTENSION: "",
        UTS_EMAIL: "",
        UTS_MOBILE_NUMBER: "",

        PRS_SALUTATION: "",
        PRS_NAME: "",
        PRS_TELEPHONE: "",
        PRS_PHONE_EXTENSION: "",
        PRS_EMAIL: "",
        PRS_MOBILE_NUMBER: "",

        TRAIN_SALUTATION: "",
        TRAIN_NAME: "",
        TRAIN_TELEPHONE: "",
        TRAIN_PHONE_EXTENSION: "",
        TRAIN_EMAIL: "",
        TRAIN_MOBILE_NUMBER: "",

        //* *Director detail */
        DIST_DIR_ID: "",
        DIR_SALUTATION: "",
        DIR_NAME: "",
        DIR_CITIZEN: "1",
        DIR_NRIC: "",
        DIR_PASSPORT: "",
        DIR_PASSPORT_EXPIRY: "",
        DIR_DATE_EFFECTIVE: "",
        DIR_DATE_END: "",

        EDIT_DIST_DIR_ID: "",
        EDIT_DIR_SALUTATION: "",
        EDIT_DIR_NAME: "",
        EDIT_DIR_CITIZEN: "1",
        EDIT_DIR_NRIC: "",
        EDIT_DIR_PASSPORT: "",
        EDIT_DIR_PASSPORT_EXPIRY: "",
        EDIT_DIR_DATE_EFFECTIVE: "",
        EDIT_DIR_DATE_END: "",

        ssmForm49: [],
        complianceDeclaration: [],
        ssmForm24: [],

        //* * Ceo Detail */
        CEO_isRepresentative: false,
        CEO_REPR_SALUTATION: "",
        CEO_REPR_NAME: "",
        CEO_REPR_POSITION: "",
        CEO_REPR_NRIC: "",
        CEO_REPR_PASS_NUM: "",
        CEO_REPR_PASS_EXP: null,
        CEO_REPR_CITIZEN: 1,
        CEO_REPR_TELEPHONE: "",
        CEO_REPR_PHONE_EXTENSION: "",
        CEO_REPR_MOBILE_NUMBER: "",
        CEO_REPR_EMAIL: "",

        //* * Other Detail */
        Other_salutation: "",
        Other_firstName: "",
        Other_middleName: "",
        Other_LastName: "",
        Other_position: "",
        Other_icNo: "",
        Other_passport: "",
        Other_passportExpiryDate: null,
        Other_citizenship: "1",
        Other_address: "",
        Other_address2: "",
        Other_postcode: "",
        Other_country: "",
        Other_city: "",
        Other_state: "",
        Other_telNo: "",
        Other_faxNo: "",
        Other_email: "",

        //* * payment detail */
        IssueBank: [],
        DIST_TRANS_REF: "",
        DIST_TRANS_DATE: null,
        DIST_TRANS_TYPE: "",
        DIST_ACC_AMOUNT: ""
      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true
      },

      previewfirstTabSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Upload SSM Form 8",
                text: "Choose a File",
                model: "ssmForm8",
                multiple: false,
                type: "vfg-custom-file-distributor",
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return model.DIST_TYPE_SETUP == "1";
                }
              },
              {
                labels: "Upload SSM Form 9",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                text: "Choose a File",
                model: "ssmForm9",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return model.DIST_TYPE_SETUP == "2";
                }
              }
            ]
          }
        ]
      },

      firstTabSchema: {
        groups: [
          {
            styleClasses: "row",
            // legend: "Create Company Profile",
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "Distributor Name",
                model: "DIST_NAME",
                placeholder: "Enter distributor name",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                labels: "Company Logo",
                accept: ".PNG,.JPG,.JPEG",
                multiple: false,
                text: "Choose a File",
                model: "companyLogo",
                type: "vfg-custom-upload",
                styleClasses: "col-md-2",
                required: false,
              },
              {
                type: "input",
                inputType: "text",
                label: "Registration Number",
                model: "DIST_REGI_NUM1",
                placeholder: "Enter distributor registration number",
                required: false,
                // validator: "string",
                styleClasses: "col-md-4"
              },
              {
                type: "input",
                inputType: "text",
                label: "New Registration Number",
                model: "DIST_REGI_NUM2",
                placeholder: "Enter new distributor registration number",
                required: true,
                // validator: "string",
                styleClasses: "col-md-3"
              },
              {
                labels: "Date of Incorporation",
                type: "vfg-functional-date",
                placeholder: "Enter date",
                model: "DIST_DATE_INCORP",
                disabled: false,
                noLabel: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-3",
                required: true,
                validator: "required"
              },
              {
                type: "radios",
                label: "Type of Setup",
                model: "DIST_TYPE_SETUP",
                required: true,
                validator: "required",
                styleClasses: "col-md-12 display-inline",
                values: () => {
                  return this.setupType;
                }
              },
              {
                labels: "Upload SSM Form 8",
                text: "Choose a File",
                model: "ssmForm8",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return model.DIST_TYPE_SETUP == "1";
                }
              },
              {
                labels: "Upload SSM Form 9",
                text: "Choose a File",
                model: "ssmForm9",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return model.DIST_TYPE_SETUP == "2";
                }
              },
              // {
              //   labels: "Upload SSM Form 9",
              //   accept: ".pdf,.xlsx,.xls",
              //   multiple: false,
              //   text: "Choose a File",
              //   model: "ssmForm9",
              //   type: "vfg-custom-multiple-file",
              //   styleClasses: "col-md-12",
              //   visible: (model, field, form) => {
              //     return model.DIST_TYPE_SETUP == "2";
              //   }
              // },
              {
                labels: "Upload SSM Form 13 (If Applicable)",
                text: "Choose a File",
                model: "ssmForm13",
                multiple: false,
                type: "vfg-custom-file-distributor",
                styleClasses: "col-md-12"
              },
              {
                label: "Registered Address",
                styleClasses: "h3"
              },
              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "DIST_ADDR_1",
                placeholder: "Enter street address",
                hint: "Street Address",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                model: "DIST_ADDR_2",
                placeholder: "Enter street address",
                hint: "Street Address line 2",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                model: "DIST_ADDR_3",
                placeholder: "Enter street address",
                hint: "Street Address line 3",
                styleClasses: "col-md-12"
              },
              {
                type: "vueMultiSelect",
                model: "DIST_COUNTRY",
                label: "Country",
                placeholder: "Enter Your Country",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_PARAM",
                  label: "SET_PARAM",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.country;
                }
              },
              {
                label: "State",
                type: "input",
                inputType: "text",
                model: "DIST_STATE",
                placeholder: "Enter Your State",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE != "MY";
                }
              },
              {
                type: "vueMultiSelect",
                model: "DIST_STATE",
                label: "State",
                placeholder: "Select Your state",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_PARAM",
                  label: "SET_PARAM",
                  searchable: true
                },
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.state;
                }
              },
              {
                type: "vueMultiSelect",
                model: "DIST_CITY",
                label: "City",
                placeholder: "Enter Your City",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_CITY_NAME",
                  label: "SET_CITY_NAME",
                  searchable: true
                },
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.city;
                }
              },
              {
                label: "City",
                type: "input",
                inputType: "text",
                model: "DIST_CITY",
                placeholder: "Enter Your City",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE != "MY";
                }
              },
              {
                label: "Postcode",
                type: "input",
                inputType: "text",
                model: "DIST_POSTAL",
                placeholder: "Enter Your Postcode",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE != "MY";
                }
              },
              {
                type: "vueMultiSelect",
                model: "DIST_POSTAL",
                label: "Postcode",
                placeholder: "Enter Your Postcode",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "POSTCODE",
                  label: "POSTCODE",
                  searchable: true
                },
                visible: (model, field, form) => {
                  return model.DIST_COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.postcode;
                }
              },
              {
                labels: "",
                model: "ADDRESS_isBIZADDRESS",
                type: "vfg-custom-checkbox2",
                placeholder: "",
                styleClasses: "col-md-6",
                required: true,
                validator: "required"
              },
              {
                label: "Business Address",
                styleClasses: "h3"
              },
              {
                type: "input",
                inputType: "text",
                label: "Address",
                model: "DIST_BIZ_ADDR_1",
                placeholder: "Enter street address",
                hint: "Street Address",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                model: "DIST_BIZ_ADDR_2",
                placeholder: "Enter street address",
                hint: "Street Address line 2",
                styleClasses: "col-md-12"
              },
              {
                type: "input",
                inputType: "text",
                model: "DIST_BIZ_ADDR_3",
                placeholder: "Enter street address",
                hint: "Street Address line 3",
                styleClasses: "col-md-12"
              },
              {
                type: "vueMultiSelect",
                model: "DIST_BIZ_COUNTRY",
                label: "Country",
                placeholder: "Enter Your Country",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_PARAM",
                  label: "SET_PARAM",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.country;
                }
              },
              {
                label: "State",
                type: "input",
                inputType: "text",
                model: "DIST_BIZ_STATE",
                placeholder: "Enter Your State",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.DIST_BIZ_COUNTRY.SET_CODE != "MY";
                }
              },
              {
                type: "vueMultiSelect",
                model: "DIST_BIZ_STATE",
                label: "State",
                placeholder: "Select Your state",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_PARAM",
                  label: "SET_PARAM",
                  searchable: true
                },
                visible: (model, field, form) => {
                  return model.DIST_BIZ_COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.state;
                }
              },
              {
                type: "vueMultiSelect",
                model: "DIST_BIZ_CITY",
                label: "City",
                placeholder: "Enter Your City",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SET_CITY_NAME",
                  label: "SET_CITY_NAME",
                  searchable: true
                },
                visible: (model, field, form) => {
                  return model.DIST_BIZ_COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.city;
                }
              },
              {
                label: "City",
                type: "input",
                inputType: "text",
                model: "DIST_BIZ_CITY",
                placeholder: "Enter Your City",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.DIST_BIZ_COUNTRY.SET_CODE != "MY";
                }
              },
              {
                label: "Postcode",
                type: "input",
                inputType: "text",
                model: "DIST_BIZ_POSTAL",
                placeholder: "Enter Your Postcode",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                visible: (model, field, form) => {
                  return model.DIST_BIZ_COUNTRY.SET_CODE != "MY";
                }
              },
              {
                type: "vueMultiSelect",
                model: "DIST_BIZ_POSTAL",
                label: "Postcode",
                placeholder: "Enter Your Postcode",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "POSTCODE",
                  label: "POSTCODE",
                  searchable: true
                },
                visible: (model, field, form) => {
                  return model.DIST_BIZ_COUNTRY.SET_CODE == "MY";
                },
                values: (model, schema) => {
                  return this.postcode;
                }
              },
              {
                labels: "Office Phone Number",
                model: "DIST_PHONE_NUMBER",
                type: "vfg-the-mask",
                placeholder: "Enter office phone number",
                // mask: "######-##-####",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              {
                type: "input",
                inputType: "string",
                label: "Extension Number",
                model: "DIST_PHONE_EXTENSION",
                placeholder: "Enter extension number",
                required: false,
                styleClasses: "col-md-6"
              },
              {
                labels: "Fax Number",
                model: "DIST_FAX_NUMBER",
                type: "vfg-the-mask2",
                placeholder: "Enter fax number",
                // mask: "######-##-####",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              {
                labels: "Mobile Phone Number",
                model: "DIST_MOBILE_NUMBER",
                type: "vfg-the-mask2",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              },
              {
                type: "input",
                inputType: "email",
                label: "Email Address",
                model: "DIST_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                labels: 'Request Email OTP',
                model: 'EMAIL_TAC',
                type: 'vfg-profile-update-emailotp',
                placeholder: 'Enter TAC number',
                styleClasses: 'col-md-6',
                required: true,
                validator: 'string',
                visible: (model, field, form) => {
                  return this.visibleEmailTac
                },
              },
              {
                type: "input",
                inputType: "text",
                label: "Company Website URL",
                model: "DIST_COMPANY_WEBSITE",
                placeholder: "Enter company website",
                required: false,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Product / Scheme",
                model: "DIST_SCHEME",
                placeholder: "-",
                required: false,
                disabled: true,
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.visibleDIST_SCHEME;
                }
              },
              {
                labels: "Upload CMSL",
                accept: ".pdf,.xlsx,.xls",
                multiple: false,
                text: "Choose a File",
                model: "uploadCSMRL",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return this.visibleuploadCSMRL;
                }
              },
              {
                labels: "Upload CMSL or Ministry of Finance’s (MOF) License",
                accept: ".pdf,.xlsx,.xls",
                multiple: true,
                text: "Choose a File",
                model: "uploadCSMRLorMOFLicense",
                type: "vfg-custom-multiple-file",
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return this.visibleuploadCSMRLorMOFLicense;
                }
              }
            ]
          }
        ]
      },
      firstTabAddSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                label: "Financial Status (Total Paid-Up Capital (RM))",
                model: "DIST_PAID_UP_CAPITAL",
                type: "vfg-custom-currencyInput",
                placeholder: "Enter amount",
                styleClasses: "col-md-12",
                required: true,
                validator: "required"
              },
              {
                type: "radios",
                label: "Type of Structure",
                model: "DIST_TYPE_STRUCTURE",
                required: true,
                validator: "required",
                styleClasses: "col-md-8 display-inline",
                values: () => {
                  return this.structureType;
                },
                disabled: (model, field, form) => {
                  return this.disableDIST_TYPE_STRUCTURE;
                }
              },
              {
                type: "radios",
                label: "Marketing Approach",
                model: "DIST_MARKETING_APPROACH",
                required: true,
                validator: "required",
                styleClasses: "col-md-8 display-inline",
                values: () => {
                  return this.approachType;
                },
                disabled: (model, field, form) => {
                  return this.disableDIST_MARKETING_APPROACH;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Proposed number of Distribution Points ",
                model: "DIST_NUM_DIST_POINT",
                placeholder: "Enter Proposed number of Distribution Points",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Proposed number of Consultants ",
                model: "DIST_NUM_CONSULTANT",
                placeholder: "Enter Proposed number of Consultants",
                required: true,
                validator: "required",
                styleClasses: "col-md-6"
              },
              {
                label: "Indemnity of Insurance",
                model: "DIST_INSURANCE",
                type: "vfg-custom-currencyInput",
                placeholder: "Enter Indemnity of Insurance",
                styleClasses: "col-md-6",
                // required: true,
                // validator: "required"
                visible: (model, field, form) => {
                  return this.visibleDIST_INSURANCE;
                }
              },
              {
                labels: "Expiry Date For Indemnity of Insurance",
                type: "vfg-functional-date",
                placeholder: "Enter date",
                model: "DIST_EXPIRED_DATE",
                noLabel: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-6",
                // required: true,
                // validator: "required",
                visible: (model, field, form) => {
                  return this.visibleDIST_INSURANCE;
                }
              },
              {
                labels: "Upload Policy",
                text: "Choose a File",
                model: "DIST_INSURANCE_POLICY",
                type: "vfg-custom-file",
                styleClasses: "col-md-12",
                visible: (model, field, form) => {
                  return this.visibleDIST_INSURANCE;
                }
              }
            ]
          }
        ]
      },
      secondTabSchema: {
        groups: [
          {
            styleClasses: "row",
            legend: "A. Authorised Representative",
            fields: [
              {
                type: "vueMultiSelect",
                model: "AR_REPR_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Name (As per NRIC)",
                model: "AR_REPR_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9"
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Middle Name",
              //   model: "middleName",
              //   placeholder: "Please enter name",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-4"
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Last Name",
              //   model: "LastName",
              //   placeholder: "Please enter name",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-4"
              // },
              {
                type: "input",
                inputType: "text",
                label: "Position",
                model: "AR_REPR_POSITION",
                placeholder: "Enter position",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                type: "radios",
                label: "Citizenship",
                model: "AR_REPR_CITIZEN",
                required: true,
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-3 display-inline"
              },
              {
                labels: "NRIC Number",
                model: "AR_REPR_NRIC",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC Number",
                mask: "######-##-####",
                styleClasses: "col-md-9",
                required: true,
                validator: ["required", this.validateIC],
                visible: (model, field, form) => {
                  return model.AR_REPR_CITIZEN == "1";
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport No.",
                model: "AR_REPR_PASS_NUM",
                placeholder: "Enter Passport No.",
                required: true,
                validator: "string",
                styleClasses: "col-md-5",
                visible: (model, field, form) => {
                  return model.AR_REPR_CITIZEN == "2";
                }
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport Expiry Date",
                model: "AR_REPR_PASS_EXP",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return model.AR_citizenship == "2";
                },
                required: true,
                validator: ["required", this.validateExpiryDate]
              },
              {
                labels: "Office Phone Number",
                model: "AR_REPR_TELEPHONE",
                type: "vfg-the-mask",
                placeholder: "Enter office phone number",
                // mask: "######-##-####",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              {
                type: "input",
                inputType: "text",
                label: "Extension Number",
                model: "AR_REPR_PHONE_EXTENSION",
                placeholder: "Enter extension number",
                required: false,
                styleClasses: "col-md-6"
              },
              {
                labels: "Mobile Phone Number",
                model: "AR_REPR_MOBILE_NUMBER",
                type: "vfg-the-mask2",
                placeholder: "Enter mobile phone number",
                // mask: "######-##-####",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              },
              {
                type: "input",
                inputType: "email",
                label: "Email Address",
                model: "AR_REPR_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                labels:
                  "Upload Board of Directors' Resolution approving the appointment of the AR",
                text: "Choose a File",
                model: "BODApprove",
                multiple: false,
                type: "vfg-custom-file-distributor",
                styleClasses: "col-md-12"
              }
            ]
          },
          {
            styleClasses: "row",
            legend: "B. Alternate Authorised Representative",
            fields: [
              {
                type: "vueMultiSelect",
                model: "AAR_REPR_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Name (As per NRIC)",
                model: "AAR_REPR_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9"
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Middle Name",
              //   model: "AAR_middleName",
              //   placeholder: "Please enter name",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-4"
              // },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Last Name",
              //   model: "AAR_LastName",
              //   placeholder: "Please enter name",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-4"
              // },
              {
                type: "input",
                inputType: "text",
                label: "Position",
                model: "AAR_REPR_POSITION",
                placeholder: "Enter position",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                type: "radios",
                label: "Citizenship",
                model: "AAR_REPR_CITIZEN",
                required: true,
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-3 display-inline"
              },
              {
                labels: "NRIC Number",
                model: "AAR_REPR_NRIC",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC Number",
                mask: "######-##-####",
                styleClasses: "col-md-9",
                validator: [this.validateIC],
                visible: (model, field, form) => {
                  return model.AAR_REPR_CITIZEN == "1";
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport No.",
                model: "AAR_REPR_PASS_NUM",
                placeholder: "Enter Passport No.",
                required: false,
                validator: "string",
                styleClasses: "col-md-5",
                visible: (model, field, form) => {
                  return model.AAR_REPR_CITIZEN == "2";
                }
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date2",
                placeholder: "Passport Expiry Date",
                model: "AAR_REPR_PASS_EXP",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return model.AAR_REPR_CITIZEN == "2";
                },
                required: false,
                validator: ["required", this.validateExpiryDate]
              },
              {
                labels: "Office Phone Number",
                model: "AAR_REPR_TELEPHONE",
                type: "vfg-the-mask",
                placeholder: "Enter office phone number",
                // mask: "######-##-####",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              {
                type: "input",
                inputType: "text",
                label: "Extension Number",
                model: "AAR_REPR_PHONE_EXTENSION",
                placeholder: "Enter extension number",
                required: false,
                styleClasses: "col-md-6"
              },
              {
                labels: "Mobile Phone Number",
                model: "AAR_REPR_MOBILE_NUMBER",
                type: "vfg-the-mask2",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              },
              {
                type: "input",
                inputType: "email",
                label: "Email Address",
                model: "AAR_REPR_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              }
            ]
          }
        ]
      },
      thirdTabSchemaUpload: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                labels: "Upload SSM Form 49",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "ssmForm49",
                type: "vfg-custom-file-distributor",
                styleClasses: "col-md-12"
              },
              {
                labels: "Upload Compliance Declaration",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "complianceDeclaration",
                type: "vfg-custom-file-distributor",
                styleClasses: "col-md-12"
              },
              {
                labels: "Upload SSM Form 24",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "ssmForm24",
                type: "vfg-custom-file-distributor",
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },
      editDirectorSchema: {
        groups: [
          {
            styleClasses: "row mt-2",
            fields: [
              {
                type: "vueMultiSelect",
                model: "EDIT_DIR_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "EDIT_DIR_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9"
              },
              {
                type: "radios",
                label: "Citizenship",
                model: "EDIT_DIR_CITIZEN",
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-3 display-inline",
                required: true,
                validator: "required"
              },
              {
                labels: "NRIC Number",
                model: "EDIT_DIR_NRIC",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC No.",
                mask: "######-##-####",
                required: true,
                validator: ["required", this.validateIC],
                styleClasses: "col-md-9",
                visible: (model, field, form) => {
                  return model.EDIT_DIR_CITIZEN == 1;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport No.",
                model: "EDIT_DIR_PASSPORT",
                placeholder: "Enter Passport No.",
                required: true,
                validator: "string",
                styleClasses: "col-md-5",
                visible: (model, field, form) => {
                  return model.EDIT_DIR_CITIZEN == 2;
                }
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport Expiry Date",
                model: "EDIT_DIR_PASSPORT_EXPIRY",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return model.EDIT_DIR_CITIZEN == 2;
                },
                required: true,
                validator: "required"
              },
              {
                labels: "Effective Date",
                type: "vfg-functional-date",
                placeholder: "Select effective date",
                model: "EDIT_DIR_DATE_EFFECTIVE",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                validator: "required"
              },
              {
                labels: "End Date",
                type: "vfg-functional-date2",
                placeholder: "Select End Date",
                model: "EDIT_DIR_DATE_END",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                validator: "required"
              }
            ]
          }
        ]
      },
      thirdTabSchemaDIR: {
        groups: [
          {
            styleClasses: "row mt-2",
            legend: "Director Details",
            fields: [
              {
                type: "vueMultiSelect",
                model: "DIR_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "DIR_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9"
              },
              {
                type: "radios",
                label: "Citizenship",
                model: "DIR_CITIZEN",
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-3 display-inline",
                required: true,
                validator: "required"
              },
              {
                labels: "NRIC Number",
                model: "DIR_NRIC",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC No.",
                mask: "######-##-####",
                required: true,
                validator: ["required", this.validateIC],
                styleClasses: "col-md-9",
                visible: (model, field, form) => {
                  return model.DIR_CITIZEN == 1;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport No.",
                model: "DIR_PASSPORT",
                placeholder: "Enter Passport No.",
                required: true,
                validator: "string",
                styleClasses: "col-md-5",
                visible: (model, field, form) => {
                  return model.DIR_CITIZEN == 2;
                }
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport Expiry Date",
                model: "DIR_PASSPORT_EXPIRY",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return model.DIR_CITIZEN == 2;
                },
                required: true,
                validator: "required"
              },
              {
                labels: "Effective Date",
                type: "vfg-functional-date",
                placeholder: "Select effective date",
                model: "DIR_DATE_EFFECTIVE",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-6",
                required: false,
                validator: "required"
              },
              {
                labels: "End Date",
                type: "vfg-functional-date2",
                placeholder: "Select End Date",
                model: "DIR_DATE_END",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-6",
                required: false,
                validator: "required"
              }
            ]
          }
        ]
      },
      thirdTabSchemaCEO: {
        groups: [
          {
            styleClasses: "row",
            legend: "CEO Profile",
            fields: [
              {
                type: "vueMultiSelect",
                model: "CEO_REPR_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "CEO_REPR_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9"
              },
              {
                type: "input",
                inputType: "text",
                label: "Position",
                model: "CEO_REPR_POSITION",
                placeholder: "Enter position",
                required: true,
                validator: "string",
                styleClasses: "col-md-12"
              },
              {
                type: "radios",
                label: "Citizenship",
                model: "CEO_REPR_CITIZEN",
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-3 display-inline",
                required: true,
                validator: "required"
              },
              {
                labels: "NRIC Number",
                model: "CEO_REPR_NRIC",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC No.",
                mask: "######-##-####",
                required: true,
                validator: ["required", this.validateIC],
                styleClasses: "col-md-9",
                visible: (model, field, form) => {
                  return model.CEO_REPR_CITIZEN == 1;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport No.",
                model: "CEO_REPR_PASS_NUM",
                placeholder: "Enter Passport No.",
                required: true,
                validator: "string",
                styleClasses: "col-md-5",
                visible: (model, field, form) => {
                  return model.CEO_REPR_CITIZEN == 2;
                }
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport Expiry Date",
                model: "CEO_REPR_PASS_EXP",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return model.CEO_REPR_CITIZEN == 2;
                },
                required: true,
                validator: "required"
              },
              {
                labels: "Office Phone Number",
                model: "CEO_REPR_TELEPHONE",
                type: "vfg-the-mask",
                placeholder: "Enter office phone number",
                // mask: "######-##-####",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              {
                type: "input",
                inputType: "text",
                label: "Extension Number",
                model: "CEO_REPR_PHONE_EXTENSION",
                placeholder: "Enter extension number",
                required: false,
                styleClasses: "col-md-6"
              },
              {
                labels: "Mobile Phone Number",
                model: "CEO_REPR_MOBILE_NUMBER",
                type: "vfg-the-mask2",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              // {
              //   type: "input",
              //   inputType: "text",
              //   label: "Telephone Number",
              //   model: "CEO_telNo",
              //   placeholder: "Enter telephone number",
              //   required: true,
              //   validator: "string",
              //   styleClasses: "col-md-6"
              // },
              {
                type: "input",
                inputType: "email",
                label: "Email Address",
                model: "CEO_REPR_EMAIL",
                placeholder: "Enter email address",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                labels: "",
                model: "CEO_isRepresentative",
                type: "vfg-custom-checkbox",
                placeholder: "Enter telephone number",
                styleClasses: "col-md-6",
                required: true,
                validator: "required"
              }
            ]
          }
        ]
      },

      AISchema1: {
        groups: [
          {
            styleClasses: "row",
            legend: "Head of Department, Compliance Department",
            fields: [
              {
                type: "vueMultiSelect",
                model: "COMPL_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "COMPL_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9"
              },
              {
                labels: "Office Phone Number",
                model: "COMPL_TELEPHONE",
                type: "vfg-the-mask",
                placeholder: "Enter office phone number",
                // mask: "######-##-####",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              {
                type: "input",
                inputType: "text",
                label: "Extension Number",
                model: "COMPL_PHONE_EXTENSION",
                placeholder: "Enter telephone number",
                required: false,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Email Address",
                model: "COMPL_EMAIL",
                placeholder: "Enter telephone number",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                labels: "Mobile Phone Number",
                model: "COMPL_MOBILE_NUMBER",
                type: "vfg-the-mask2",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              }
            ]
          }
        ]
      },

      AISchema2: {
        groups: [
          {
            styleClasses: "row",
            legend: "Head of Department UTS Distributor & Operation Department",
            fields: [
              {
                type: "vueMultiSelect",
                model: "UTS_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "UTS_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9"
              },
              {
                labels: "Office Phone Number",
                model: "UTS_TELEPHONE",
                type: "vfg-the-mask",
                placeholder: "Enter office phone number",
                // mask: "######-##-####",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              {
                type: "input",
                inputType: "text",
                label: "Extension Number",
                model: "UTS_PHONE_EXTENSION",
                placeholder: "Enter telephone number",
                required: false,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Email Address",
                model: "UTS_EMAIL",
                placeholder: "Enter telephone number",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                labels: "Mobile Phone Number",
                model: "UTS_MOBILE_NUMBER",
                type: "vfg-the-mask2",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              }
            ]
          }
        ]
      },

      AISchema5: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "Financial Institution",
                model: "DIST_FINANCIAL_INSTITUTION",
                required: true,
                validator: "required",
                styleClasses: "col-md-8 display-inline",
                values: () => {
                  return this.radioYesNo;
                },
                visible: (model, field, form) => {
                  return this.visibleDIST_FIN_INST;
                }
              }
            ]
          }
        ]
      },
      AISchema6: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "FINANCIAL_PLANNER_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Financial Planner's Name",
                model: "FINANCIAL_PLANNER_NAME",
                placeholder: "Enter financial planner name",
                required: false,
                validator: "string",
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.visibleFinancialPlannerName;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "CMSRL Number",
                model: "CSMRL_NUMBER",
                placeholder: "Enter CMSRL number",
                required: false,
                styleClasses: "col-md-6",
                visible: (model, field, form) => {
                  return this.visibleCSMRLNumber;
                }
              },

              {
                type: "radios",
                label: "Citizenship",
                model: "FINANCIAL_PLANNER_CITIZEN",
                values: () => {
                  return this.citizenship;
                },
                styleClasses: "col-md-3 display-inline",
                required: true,
                validator: "required"
              },
              {
                labels: "NRIC Number",
                model: "FINANCIAL_PLANNER_NRIC",
                type: "vfg-the-mask",
                placeholder: "Enter NRIC No.",
                mask: "######-##-####",
                required: true,
                validator: ["required", this.validateIC],
                styleClasses: "col-md-9",
                visible: (model, field, form) => {
                  return model.FINANCIAL_PLANNER_CITIZEN == "1";
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Passport No.",
                model: "FINANCIAL_PLANNER_PASS_NUM",
                placeholder: "Enter Passport No.",
                required: true,
                validator: "string",
                styleClasses: "col-md-5",
                visible: (model, field, form) => {
                  return model.FINANCIAL_PLANNER_CITIZEN == "2";
                }
              },
              {
                labels: "Passport Expiry Date",
                type: "vfg-functional-date",
                placeholder: "Passport Expiry Date",
                model: "FINANCIAL_PLANNER_PASS_EXP",
                noLabel: true,
                noClearButton: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-4",
                visible: (model, field, form) => {
                  return model.FINANCIAL_PLANNER_CITIZEN == "2";
                },
                required: true,
                validator: "required"
              }
            ]
          }
        ]
      },
      AISchema3: {
        groups: [
          {
            styleClasses: "row",
            legend: "Head of Department PRS Distributor & Operation Department",
            fields: [
              {
                type: "vueMultiSelect",
                model: "PRS_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "PRS_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9"
              },
              {
                labels: "Office Phone Number",
                model: "PRS_TELEPHONE",
                type: "vfg-the-mask",
                placeholder: "Enter office phone number",
                // mask: "######-##-####",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              {
                type: "input",
                inputType: "text",
                label: "Extension Number",
                model: "PRS_PHONE_EXTENSION",
                placeholder: "Enter telephone number",
                required: false,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Email Address",
                model: "PRS_EMAIL",
                placeholder: "Enter telephone number",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                labels: "Mobile Phone Number",
                model: "PRS_MOBILE_NUMBER",
                type: "vfg-the-mask2",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              }
            ]
          }
        ]
      },

      AISchema4: {
        groups: [
          {
            styleClasses: "row",
            legend: "Head of Department, Training Department",
            fields: [
              {
                type: "vueMultiSelect",
                model: "TRAIN_SALUTATION",
                label: "Salutation",
                placeholder: "Enter Your Salutation",
                required: true,
                validator: "required",
                styleClasses: "col-md-3",
                selectOptions: {
                  multiple: false,
                  key: "USER_SAL_NAME",
                  label: "USER_SAL_NAME",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.salutations;
                }
              },
              {
                type: "input",
                inputType: "text",
                label: "Name",
                model: "TRAIN_NAME",
                placeholder: "Please enter name",
                required: true,
                validator: "string",
                styleClasses: "col-md-9"
              },
              {
                labels: "Office Phone Number",
                model: "TRAIN_TELEPHONE",
                type: "vfg-the-mask",
                placeholder: "Enter office phone number",
                // mask: "######-##-####",
                mask: "0#-########",
                styleClasses: "col-md-6",
                required: false,
                validator: "string"
              },
              {
                type: "input",
                inputType: "text",
                label: "Extension Number",
                model: "TRAIN_PHONE_EXTENSION",
                placeholder: "Enter telephone number",
                required: false,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                type: "input",
                inputType: "text",
                label: "Email Address",
                model: "TRAIN_EMAIL",
                placeholder: "Enter telephone number",
                required: true,
                validator: "string",
                styleClasses: "col-md-6"
              },
              {
                labels: "Mobile Phone Number",
                model: "TRAIN_MOBILE_NUMBER",
                type: "vfg-the-mask2",
                placeholder: "Enter telephone number",
                // mask: "######-##-####",
                mask: "01#-########",
                styleClasses: "col-md-6",
                required: true,
                validator: "string"
              }
            ]
          }
        ]
      },

      fifthTabSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "vueMultiSelect",
                model: "IssueBank",
                label: "Issuing Bank",
                placeholder: "Select Issuing Bank",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "SETTING_GENERAL_ID", // id yg nak simpan
                  label: "SET_PARAM", // value nak display
                  searchable: true
                },
                values: (model, schema) => {
                  return this.RecordBank; // get value
                },
                disabled: true,
              },
              {
                type: "input",
                inputType: "text",
                label: "Reference No",
                model: "DIST_TRANS_REF",
                required: true,
                validator: "string",
                styleClasses: "col-md-6",
                disabled: true,
              },
              {
                labels: "Transaction Date",
                type: "vfg-functional-date",
                placeholder: "Enter date",
                model: "DIST_TRANS_DATE",
                noLabel: true,
                format: "dd-MMM-yyyy",
                styleClasses: "col-md-6",
                required: true,
                validator: "required",
                disabled: true,
              },
              {
                type: "vueMultiSelect",
                model: "DIST_TRANS_TYPE",
                label: "Transaction Type",
                placeholder: "Choose transaction type",
                required: true,
                validator: "required",
                styleClasses: "col-md-6",
                selectOptions: {
                  multiple: false,
                  key: "name",
                  label: "name",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.transType;
                },
                disabled: true,
              },
              {
                label: "Amount",
                model: "DIST_ACC_AMOUNT",
                type: "vfg-custom-currencyInput",
                placeholder: "Enter amount",
                styleClasses: "col-md-6",
                required: true,
                disabled: true,
                readonly : true,
                validator: ["required", this.validateFeeAmount],
              },
              {
                labels: "Payment Advice",
                text: "Choose a File",
                model: "receipt",
                required: true,
                type: "vfg-custom-file2",
                styleClasses: "col-md-12",
                disabled: true,
              }
            ]
          }
        ]
      },

      additionalDocumentSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "fileRecords",
                type: "vfg-custom-multiple-file-general",
                hint: "Accepted format : (.pdf)",
                required: false
              }
            ]
          }
        ]
      },

      declarationSchema: {
        groups: [
          {
            styleClasses: ["row col"],
            legend: "",
            fields: [
              {
                type: "checkbox",
                model: "AI_term1",
                required: true,
                validator: "required",
                styleClasses: "col-sm-1 mt-1"
              },
              {
                type: "label",
                label:
                  "We agree to abide by the applicable Terms and Conditions  of use for this system and relevant laws and rules issued by FIMM.",
                validator: "required",
                styleClasses: "col-sm-11"
              }
            ]
          },
          {
            styleClasses: ["row col"],
            legend: "",
            fields: [
              {
                type: "checkbox",
                model: "AI_term2",
                required: true,
                validator: "required",
                styleClasses: "col-sm-1 mt-1"
              },
              {
                type: "label",
                label:
                  "We hereby confirm that the information given herein and in any other document provided by us for purposes of our application and registration with FIMM is true and accurate.",
                // validator: "required",
                styleClasses: "col-sm-11"
              }
            ]
          },
          {
            styleClasses: ["row col"],
            legend: "",
            fields: [
              {
                type: "checkbox",
                model: "AI_term3",
                required: true,
                validator: "required",
                styleClasses: "col-sm-1 mt-1"
              },
              {
                type: "label",
                label:
                  "Further, we hereby confirm and under take to ensure that, pursuant to the Personal Data Protection Act 2010, we have the consent of our officers, employees and unit trust consultants for the disclosure to and use by FIMM of their personal data.",
                // validator: "required",
                styleClasses: "col-sm-11"
              }
            ]
          }
        ]
      },
      distTypeFeeTabSchema: {
        groups: [
          {
            styleClasses: ["row col"],
            legend: "",
            fields: [
              {
                type: "label",
                label: "Total Amount For Application",
                styleClasses: "col-md-4"
              },
              {
                type: "label",
                model: "TOTAL_AMOUNT_APPLICATION",
                styleClasses: "col-md-2"
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    async back() {
      try{
        this.$router.push("/distributor/distributor-profile");
      } catch (e) {
        console.log(e);
      }
    },
    proceedToDashboard() {
      this.$router.push("/distributor/dashboard");
    },
    showOverlay(show) {
      Event.$emit("distributor-details-registration:overlay", show);
    },
    getBlobFile: function(fileRecords) {
      // console.log(fileRecords);
      // var FileSaver = require("file-saver");
      // FileSaver.saveAs(fileRecords);
      // console.log(fileRecords);
      // console.log(JSON.stringify(fileRecords));
      //alert(fileRecords);
      // const blob = new Blob([response.data], { type: "xls,xlsx" });
      // const link = document.createElement("a");
      // link.href = window.URL.createObjectURL(
      //   "blob:http://localhost:8080/8b8b27f0-0a0b-4b0e-92a0-2be87e513aca"
      // );
      // link.download = 'try.pdf';
      // link.click();
      // window.URL.createObjectURL(
      //   "blob:http://localhost:8080/8b8b27f0-0a0b-4b0e-92a0-2be87e513aca"
      // );
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

      console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },
    deleteUploadedFile: function(fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.uploadFileOject = [];
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
    },
    filesSelected: function(fileRecordsNewlySelected, fileRecords, docId) {
      this.uploadFileOject = [];
      this.uploadFileOjectId.push(docId);
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        // var data = {

        // alert(this.docIdArray[i])
        //   docId: docId,
        //   file: this.fileRecordsForUpload[i].file
        // };

        // this.uploadFileOject[i]['docId'] = this.docIdArray[i];
        // this.uploadFileOject[i]['file'] = this.fileRecordsForUpload[i].file;

        //  this.uploadFileOject.push(data);
        // this.uploadFileOject.push({docId:this.fileRecordsForUpload[i].file})
        //  this.uploadFileOjectId.push(this.docIdArray[i]);
        this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      }
    },
    filesSelected2: function(fileRecordsNewlySelected) {
      // alert(docId)
      // this.docIdArray.push(docId);

      // this.uploadFileOject2 = [];
      // this.uploadFileOjectId.push(docId);
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      var i;
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        this.uploadFileOject2 = this.fileRecordsForUpload[i].file;
        // var data = {

        // alert(this.docIdArray[i])
        //   docId: docId,
        //   file: this.fileRecordsForUpload[i].file
        // };

        // this.uploadFileOject[i]['docId'] = this.docIdArray[i];
        // this.uploadFileOject[i]['file'] = this.fileRecordsForUpload[i].file;

        //  this.uploadFileOject.push(data);
        // this.uploadFileOject.push({docId:this.fileRecordsForUpload[i].file})
        //  this.uploadFileOjectId.push(this.docIdArray[i]);
        // this.uploadFileOject2.push(this.fileRecordsForUpload[i].file);
      }
    },
    onBeforeDelete: function(fileRecord, fileRecords, docId) {
      //alert(docId);
      // alert(fileRecordsForUpload);
      this.fileDeleted = [];
      this.fileDeleted.push(docId);
      // alert("here");
      // console.log(this.fileRecordsForUpload);
      // var i = this.fileRecordsForUpload.indexOf(fileRecord);
      // //if (i !== -1) {
      // // queued file, not yet uploaded. Just remove from the arrays
      // this.fileRecordsForUpload.splice(i, 1);
      // var k = fileRecords.indexOf(fileRecord);
      // if (k !== -1) fileRecords.splice(k, 1);
      // this.uploadFileOject = [];
      // for (i = 0; i < this.fileRecordsForUpload.length; i++) {
      //   this.uploadFileOject.push(this.fileRecordsForUpload[i].file);
      // }
      // } else {
      //   if (confirm("Are you sure you want to delete?")) {
      //     alert(JSON.stringify(fileRecord));
      // this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
      //   }
      // }
    },
    onBeforeDelete2: function(fileRecord, group) {
      //alert(fileRecordsForUpload);
      this.fileDeleted = [];
      this.fileDeleted.push(group);
    },
    fileDeleted: function(fileRecord, fileRecords, docId) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
    //validate fee amount
    validateFeeAmount(value) {
      const submitamount = Number(
        this.model.DIST_ACC_AMOUNT.replace(/[^0-9.-]+/g, "")
      );
      console.log(submitamount);
      const pendingamount = this.details.TOTAL_AMOUNT_APPLICATION;
      console.log(pendingamount);

      // compare
      if (submitamount > pendingamount) {
        return ["More Then Pending Amount"];
      }
      if (submitamount < pendingamount) {
        return ["Less Then Pending Amount"];
      }
    },
    // get issueing bank
    getIssueingBank: async function() {
      const response = await services06Module1.getIssueingBank();
      this.RecordBank = response;
    },
    // get distributor fee
    async getDistFee(data) {
      const response = await services06Module0.getDistFee(data);
      console.log(JSON.stringify(response));
      this.model.TOTAL_AMOUNT_APPLICATION = response;
    },
    // Get ballance
    async getBallance() {
      const response = await services06Module1.distributor_fee();
      this.details = response;
    },
    async getDocumentAdditional() {
      const data = {
        REQ_DOCU_TYPE: 2,
        MANAGE_SUBMODULE_ID: 1
      };
      const response = await services06Module0.getDocumentByType(data);
    },
    async getDocumentProposal() {
      const user = localStorage.getItem("user");
      const data = {
        REQ_DOCU_TYPE: 1,
        MANAGE_SUBMODULE_ID: 1,
        DISTRIBUTOR_ID: JSON.parse(user).USER_DIST_ID
      };
      const response = await services06Module0.getDocumentProposal(data);
      this.proposalList = response.dataProposal;
      this.proposalList.forEach(item => {
        item.list.forEach(element => {
          element.DOCU_BLOB = this.b64toBlobPDF(
            element.DOCU_BLOB,
            "application/pdf"
          );
          console.log("mula");
          console.log(element.DOCU_BLOB); // <----- cuba tgk ini
          console.log("habis");
          element.DOCU_BLOB = new File(
            [element.DOCU_BLOB],
            element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
            { type: element.DOCU_BLOB.type }
          );
          console.log(element.DOCU_BLOB);
          const data = {
            name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
            size: element.DOCU_FILESIZE,
            type: element.DOCU_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCU_BLOB)
          };

          element.fileRecords.push(data);
        });
      });
      this.additionalList = response.dataAdditional;
      this.additionalList.forEach(element => {
        element.DOCU_BLOB = this.b64toBlobPDF(
          element.DOCU_BLOB,
          "application/pdf"
        );
        console.log("mula");
        console.log(element.DOCU_BLOB); // <----- cuba tgk ini
        console.log("habis");
        element.DOCU_BLOB = new File(
          [element.DOCU_BLOB],
          element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          { type: element.DOCU_BLOB.type }
        );
        console.log(element.DOCU_BLOB);
        // element.fileRecords.push(element.DOCU_BLOB);
        // alert(element.DOCU_BLOB.name);
        const data = {
          name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          size: element.DOCU_FILESIZE,
          type: element.DOCU_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOCU_BLOB)
        };
        element.fileRecords.push(data);
      });
    },
    // async getDocumentProposalUpdate() {
    //   const user = localStorage.getItem("user");
    //   const data = {
    //     REQ_DOCU_TYPE: 1,
    //     MANAGE_SUBMODULE_ID: 1,
    //     DISTRIBUTOR_ID: JSON.parse(user).USER_DIST_ID
    //   };
    //   const response = await services06Module0.getDocumentProposalUpdate(data);
    //   this.proposalList = response.dataProposal;
    //   this.proposalList.forEach(item => {
    //     item.list.forEach(element => {
    //       element.DOCU_BLOB = this.b64toBlobPDF(
    //         element.DOCU_BLOB,
    //         "application/pdf"
    //       );
    //       console.log("mula");
    //       console.log(element.DOCU_BLOB); // <----- cuba tgk ini
    //       console.log("habis");
    //       element.DOCU_BLOB = new File(
    //         [element.DOCU_BLOB],
    //         element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
    //         { type: element.DOCU_BLOB.type }
    //       );
    //       console.log(element.DOCU_BLOB);
    //       const data = {
    //         name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
    //         size: element.DOCU_FILESIZE,
    //         type: element.DOCU_FILETYPE,
    //         ext: "exe",
    //         url: window.URL.createObjectURL(element.DOCU_BLOB)
    //       };
    //       element.fileRecords.push(data);
    //     });
    //   });
    //   this.additionalList = response.dataAdditional;
    //   this.additionalList.forEach(element => {
    //     element.DOCU_BLOB = this.b64toBlobPDF(
    //       element.DOCU_BLOB,
    //       "application/pdf"
    //     );
    //     console.log("mula");
    //     console.log(element.DOCU_BLOB); // <----- cuba tgk ini
    //     console.log("habis");
    //     element.DOCU_BLOB = new File(
    //       [element.DOCU_BLOB],
    //       element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
    //       { type: element.DOCU_BLOB.type }
    //     );
    //     console.log(element.DOCU_BLOB);
    //     // element.fileRecords.push(element.DOCU_BLOB);
    //     // alert(element.DOCU_BLOB.name);
    //     const data = {
    //       name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
    //       size: element.DOCU_FILESIZE,
    //       type: element.DOCU_FILETYPE,
    //       ext: "exe",
    //       url: window.URL.createObjectURL(element.DOCU_BLOB)
    //     };
    //     element.fileRecords.push(data);
    //   });
    // },
    async getDocumentProposalUpdate() {
      const user = localStorage.getItem("user");
      const data = {
        REQ_DOCU_TYPE: 1,
        MANAGE_SUBMODULE_ID: 1,
        // DISTRIBUTOR_ID: JSON.parse(user).USER_DIST_ID,
        DISTRIBUTOR_ID:this.model.DISTRIBUTOR_ID,
      };
      const response = await services06Module0.getDocumentProposalData(data);
      //console.log("This is response :", JSON.stringify(response));
      this.proposalList = response.dataProposal;
      console.log("All Files Here", this.proposalList);
      this.proposalList.forEach((item) => {
        if(item.list.length > 0){
          item.list.forEach((element) => {
            if(element.DOCU_BLOB != ""){
              element.DOCU_BLOB = this.b64toBlobPDF(
                element.DOCU_BLOB,
                "application/pdf"
              );
              console.log("mula");
              console.log(element.DOCU_BLOB); // <----- cuba tgk ini
              console.log("habis");
              element.DOCU_BLOB = new File(
                [element.DOCU_BLOB],
                element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
                { type: element.DOCU_BLOB.type }
              );
              // alert(element.DOCU_BLOB);
              const data = {
                name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
                size: element.DOCU_FILESIZE,
                type: element.DOCU_FILETYPE,
                ext: "exe",
                url: window.URL.createObjectURL(element.DOCU_BLOB),
              };
              console.log(data);
              element.fileRecords.push(data);
              console.log("fileRecords", element.fileRecords);
            }
          });
        }

      });
      this.additionalList = response.dataAdditional;
      console.log(
        "This is additional list :",
        JSON.stringify(this.additionalList)
      );
      this.additionalList.forEach((element) => {
        element.DOCU_BLOB = this.b64toBlobPDF(
          element.DOCU_BLOB,
          "application/pdf"
        );
        element.DOCU_BLOB = new File(
          [element.DOCU_BLOB],
          element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          { type: element.DOCU_BLOB.type }
        );
        console.log(element.DOCU_BLOB);
        // element.fileRecords.push(element.DOCU_BLOB);
        // alert(element.DOCU_BLOB.name);
        const data = {
          name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          size: element.DOCU_FILESIZE,
          type: element.DOCU_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOCU_BLOB),
        };
        element.fileRecords.push(data);
      });
    },

    async beginSubmit() {
      try {
        console.log("Begin");
        this.$modals.showStaticModal.$show();
        console.log("after show vudal");
      } catch (e) {
        console.log(e);
      }

      // this.submitDistributor();
    },
    async submitDistributor() {
      if (!this.$refs.declarationRef.validate()) {
        if (!this.$refs.firstTabForm.validate()) {
          if (!this.$refs.detailInfoForm.validate()) {
            if (!this.$refs.thirdTabFormCEO.validate()) {
              if (!this.$refs.ARForm.validate()) {
                if (!this.$refs.ARForm.validate()) {
                  if (!this.$refs.ARForm.validate()) {
                    if (!this.$refs.AIForm1.validate()) {
                      if (!this.$refs.AIForm1.validate()) {
                        if (!this.$refs.AIForm2.validate()) {
                          if (!this.$refs.AIForm3.validate()) {
                            if (!this.$refs.fifthTabForm.validate()) {
                              if (!this.$refs.detailInfoForm.validate()) {
                              } else {
                                // alert("submit");
                                this.submit(2);
                              }
                            } else {
                              //alert("submit");
                              this.submit(2);
                            }
                          } else {
                            // alert("submit");
                            this.submit(2);
                          }
                        } else {
                          //alert("submit");
                          this.submit(2);
                        }
                      } else {
                        //alert("submit");
                        this.submit(2);
                      }
                    } else {
                      // alert("submit");
                      this.submit(2);
                    }
                  } else {
                    // alert("submit");
                    this.submit(2);
                  }
                } else {
                  //alert("submit");
                  this.submit(2);
                }
              } else {
                //alert("submit");
                this.submit(2);
              }
            } else {
              //alert("submit");
              this.submit(2);
            }
          } else {
            // alert("submit");
            this.submit(2);
          }
        } else {
          // alert("submit");
          this.submit(2);
        }
      } else {
        this.submit(2);
      }
    },
    dataURItoBlob(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    editDirector(data) {
      console.log(JSON.stringify(data));
      this.model.DIST_DIR_ID = data.DIST_DIR_ID;
      this.model.EDIT_DIR_SALUTATION = {
        USER_SAL_NAME: data.USER_SAL_NAME,
        USER_SAL_ID: data.USER_SAL_ID
      };
      this.model.EDIT_DIR_NAME = data.DIR_NAME;
      this.model.EDIT_DIR_CITIZENSHIP = data.DIR_CITIZENSHIP;
      this.model.EDIT_DIR_NRIC = data.DIR_NRIC;
      this.model.EDIT_DIR_EFFECTIVE = data.DIR_DATE_EFFECTIVE;
      this.model.EDIT_DIR_DATE_END = data.DIR_DATE_END;
      this.$modals.simpleModalEdit.$show();
      // this.directorList = [];
      // this.tempArray = this.directorList;

      var tempdirectorInfo = {
        DIR_NAME: this.model.EDIT_DIR_NAME,
        DIR_CITIZENSHIP: this.model.EDIT_DIR_CITIZENSHIP,
        DIR_NRIC: this.model.EDIT_DIR_NRIC,
        DIR_DATE_EFFECTIVE: this.model.EDIT_DIR_EFFECTIVE,
        DIR_DATE_END: this.model.EDIT_DIR_DATE_END
      };

      // this.tempArray.unshift(tempdirectorInfo);
      // alert(JSON.stringify(this.tempArray));

      // this.directorList = this.tempArray;

      // alert(JSON.stringify(this.directorList));
      // data.DIR_NAME = "kaskjdsfhs";
    },
    updateDirector() {
      // this.directorList = this.tempArray;
      console.log("temp Array : " + JSON.stringify(this.tempArray));

      // this.tempArray.DIR_NAME = this.model.EDIT_DIR_NAME;
      // this.tempArray.DIR_CITIZENSHIP = this.model.EDIT_DIR_CITIZENSHIP;
      // this.tempArray.DIR_DATE_NRIC = this.model.EDIT_DIR_DATE_NRIC;
      // this.tempArray.DIR_DATE_EFFECTIVE = this.model.EDIT_DIR_EFFECTIVE;
      // this.tempArray.DIR_DATE_END = this.model.EDIT_DIR_DATE_END;
      var tempdirectorInfoNew = {
        DIST_DIR_ID: 29,
        DIR_NAME: this.model.EDIT_DIR_NAME,
        DIR_CITIZENSHIP: this.model.EDIT_DIR_CITIZENSHIP,
        DIR_NRIC: this.model.EDIT_DIR_NRIC,
        DIR_DATE_EFFECTIVE: this.model.EDIT_DIR_EFFECTIVE,
        DIR_DATE_END: this.model.EDIT_DIR_DATE_END
      };

      this.tempArray.unshift(tempdirectorInfoNew);

      console.log("New Temp Array : " + JSON.stringify(this.tempArray));

      const replacedItems = this.directorList.map(
        obj =>
          this.tempArray.find(o => o.DIST_DIR_ID === obj.DIST_DIR_ID) || obj
      );

      // var replacedItems = this.directorList.map(
      //   u=> u.DIST_DIR_ID !== this.tempArray.DIST_DIR_ID ? u : tempArray
      // );

      console.log(JSON.stringify(replacedItems));
      console.log(JSON.stringify(this.directorList));
      // this.tempArray.clear();
    },
    async deleteDir(data) {
      if (data.rowData.DIST_DIR_ID != "") {
        this.deletedDir.unshift(data.rowData);
      }
      this.directorList.splice(data.rowIndex, 1);
    },
    async getDistributorById() {
      const vm = this;
      this.isShow = true;
      this.isShowDraft = true;
      this.isLoad = true;
      const user = localStorage.getItem("user");
      const response = await services06Module1.getDistributorByIdforUpdateProfile(
        JSON.parse(user).user_id,
        1 //1: UPFATE PROFILE 2:REGISTER NEW LICENSE
      );
      this.distributorProfileDetails = response;
      if (response == null) {
        this.updateDistributor = false;
      } else {
        this.model.PUBLISH_STATUS = response.PUBLISH_STATUS;
        this.model.APPROVAL_STATUS = response.APPROVAL_STATUS;
        this.model.DIST_PUBLISH_STATUS = response.DIST_PUBLISH_STATUS;
        this.model.DIST_NAME = response.DIST_NAME;
        this.model.DISTRIBUTOR_ID = response.DISTRIBUTOR_ID;
        this.getDocumentProposalUpdate();
        this.model.DIST_NAME = response.DIST_NAME;
        this.model.DIST_REGI_NUM1 = response.DIST_REGI_NUM1;
        this.model.DIST_REGI_NUM2 = response.DIST_REGI_NUM2;
        this.model.DIST_DATE_INCORP = moment(response.DIST_DATE_INCORP).format("DD-MM-YYYY");
        this.model.DIST_TYPE_SETUP = response.DIST_TYPE_SETUP;
        this.model.DIST_PHONE_NUMBER = response.DIST_PHONE_NUMBER;
        this.model.DIST_PHONE_EXTENSION = response.DIST_PHONE_EXTENSION;
        this.model.DIST_MOBILE_NUMBER = response.DIST_MOBILE_NUMBER;
        this.model.DIST_EMAIL = response.DIST_EMAIL;
        this.model.DIST_FAX_NUMBER = response.DIST_FAX_NUMBER;
        this.model.DIST_COMPANY_WEBSITE = response.DIST_COMPANY_WEBSITE;
        this.model.DIST_ADDR_1 = response.DIST_ADDR_1;
        this.model.DIST_ADDR_2 = response.DIST_ADDR_2;
        this.model.DIST_ADDR_3 = response.DIST_ADDR_3;
        this.model.DIST_COUNTRY = {
          SETTING_GENERAL_ID: response.COUNTRY_ID,
          SET_CODE: response.SET_CODE_COUNTRY,
          SET_PARAM: response.SET_PARAM_COUNTRY
        };
        if (response.DIST_TYPE != null) {
          this.model.applicationType = {
            DISTRIBUTOR_TYPE_ID: response.DISTRIBUTOR_TYPE_ID,
            DIST_TYPE_NAME: response.DIST_TYPE_NAME
          };
        }
        if (this.model.DIST_COUNTRY.SET_CODE == "MY") {
          if (response.SET_PARAM_STATE != null) {
            this.model.DIST_STATE = {
              SETTING_GENERAL_ID: response.STATE_ID,
              SET_PARAM: response.SET_PARAM_STATE
            };
            this.getCity(response.STATE_ID);
          }
          if (response.SET_CITY_NAME != null) {
            this.model.DIST_CITY = {
              SETTING_CITY_ID: response.SETTING_CITY_ID,
              SET_CITY_NAME: response.SET_CITY_NAME
            };
            this.getPostcode(response.SETTING_CITY_ID);
          }
          if (response.POSTCODE_NO != null) {
            this.model.DIST_POSTAL = {
              SETTING_POSTCODE_ID: response.POSTCODE_NO,
              POSTCODE_NO: response.POSTCODE_NO
            };
          }
        } else {
          this.model.DIST_STATE = response.DIST_STATE2;
          this.model.DIST_CITY = response.DIST_CITY2;
          this.model.DIST_POSTAL = response.DIST_POSTAL2;
        }
        // biz address
        this.model.DIST_BIZ_ADDR_1 = response.DIST_BIZ_ADDR_1;
        this.model.DIST_BIZ_ADDR_2 = response.DIST_BIZ_ADDR_2;
        this.model.DIST_BIZ_ADDR_3 = response.DIST_BIZ_ADDR_3;
        this.model.DIST_BIZ_COUNTRY = {
          SETTING_GENERAL_ID: response.COUNTRY_ID,
          SET_CODE: response.SET_CODE_COUNTRY,
          SET_PARAM: response.SET_PARAM_COUNTRY
        };
        if (this.model.DIST_BIZ_COUNTRY.SET_CODE == "MY") {
          if (response.SET_PARAM_STATE != null) {
            this.model.DIST_BIZ_STATE = {
              SETTING_GENERAL_ID: response.STATE_ID,
              SET_PARAM: response.SET_PARAM_STATE
            };
            this.getCity(response.STATE_ID);
          }
          if (response.SET_BIZ_CITY_NAME != null) {
            this.model.DIST_BIZ_CITY = {
              SETTING_CITY_ID: response.SETTING_CITY_ID,
              SET_CITY_NAME: response.SET_CITY_NAME
            };
            this.getPostcode(response.SETTING_CITY_ID);
          }
          if (response.POSTCODE_NO != null) {
            this.model.DIST_BIZ_POSTAL = {
              SETTING_POSTCODE_ID: response.POSTCODE_NO,
              POSTCODE_NO: response.POSTCODE_NO
            };
          }
        } else {
          this.model.DIST_BIZ_STATE = response.DIST_BIZ_STATE2;
          this.model.DIST_BIZ_CITY = response.DIST_BIZ_CITY2;
          this.model.DIST_BIZ_POSTAL = response.DIST_BIZ_POSTAL2;
        }

        this.model.DIST_FINANCIAL_INSTITUTION =
          response.DIST_FINANCIAL_INSTITUTION;
        this.model.DIST_TYPE_STRUCTURE = response.DIST_TYPE_STRUCTURE;
        this.model.DIST_MARKETING_APPROACH = response.DIST_MARKETING_APPROACH;
        this.model.DIST_PAID_UP_CAPITAL = response.DIST_PAID_UP_CAPITAL;
        this.model.DIST_NUM_DIST_POINT = response.DIST_NUM_DIST_POINT;
        this.model.DIST_NUM_CONSULTANT = response.DIST_NUM_CONSULTANT;
        this.model.DIST_INSURANCE = response.DIST_INSURANCE;

        response.DATAREPR.forEach(element => {
          if (element.REPR_TYPE === "CEO") {
            if (element.USER_SAL_NAME != null) {
              this.model.CEO_REPR_SALUTATION = {
                USER_SAL_ID: element.USER_SAL_ID,
                USER_SAL_NAME: element.USER_SAL_NAME
              };
            }
            this.model.CEO_REPR_NAME = element.REPR_NAME;
            this.model.CEO_REPR_POSITION = element.REPR_POSITION;
            this.model.CEO_REPR_CITIZEN = element.REPR_CITIZEN;
            this.model.CEO_REPR_NRIC = element.REPR_NRIC;
            this.model.CEO_REPR_PASS_NUM = element.REPR_PASS_NUM;
            this.model.CEO_REPR_PASS_EXP = element.REPR_PASS_EXP;
            this.model.CEO_REPR_TELEPHONE = element.REPR_TELEPHONE;
            this.model.CEO_REPR_PHONE_EXTENSION = element.REPR_PHONE_EXTENSION;
            this.model.CEO_REPR_MOBILE_NUMBER = element.REPR_MOBILE_NUMBER;
            this.model.CEO_REPR_EMAIL = element.REPR_EMAIL;
            this.model.CEO_isRepresentative = element.IS_REPRESENTATIVE;
          } else if (element.REPR_TYPE == "AR") {
            if (element.USER_SAL_NAME != null) {
              this.model.AR_REPR_SALUTATION = {
                USER_SAL_ID: element.USER_SAL_ID,
                USER_SAL_NAME: element.USER_SAL_NAME
              };
            }
            this.model.AR_REPR_NAME = element.REPR_NAME;
            this.model.AR_REPR_POSITION = element.REPR_POSITION;
            this.model.AR_REPR_CITIZEN = element.REPR_CITIZEN;
            this.model.AR_REPR_NRIC = element.REPR_NRIC;
            this.model.AR_REPR_PASS_NUM = element.REPR_PASS_NUM;
            this.model.AR_REPR_PASS_EXP = element.REPR_PASS_EXP;
            this.model.AR_REPR_TELEPHONE = element.REPR_TELEPHONE;
            this.model.AR_REPR_PHONE_EXTENSION = element.REPR_PHONE_EXTENSION;
            this.model.AR_REPR_MOBILE_NUMBER = element.REPR_MOBILE_NUMBER;
            this.model.AR_REPR_EMAIL = element.REPR_EMAIL;
          } else if (element.REPR_TYPE == "AAR") {
            if (element.USER_SAL_NAME != null) {
              this.model.AAR_REPR_SALUTATION = {
                USER_SAL_ID: element.USER_SAL_ID,
                USER_SAL_NAME: element.USER_SAL_NAME
              };
            }
            this.model.AAR_REPR_NAME = element.REPR_NAME;
            this.model.AAR_REPR_POSITION = element.REPR_POSITION;
            this.model.AAR_REPR_CITIZEN = element.REPR_CITIZEN;
            this.model.AAR_REPR_NRIC = element.REPR_NRIC;
            this.model.AAR_REPR_PASS_NUM = element.REPR_PASS_NUM;
            this.model.AAR_REPR_PASS_EXP = element.REPR_PASS_EXP;
            this.model.AAR_REPR_TELEPHONE = element.REPR_TELEPHONE;
            this.model.AAR_REPR_PHONE_EXTENSION = element.REPR_PHONE_EXTENSION;
            this.model.AAR_REPR_MOBILE_NUMBER = element.REPR_MOBILE_NUMBER;
            this.model.AAR_REPR_EMAIL = element.REPR_EMAIL;
          }
        });

        // Financial Planner

        response.DATAAI.forEach(element => {
          if (element.ADD_TYPE == "HOD_COMPL") {
            if (element.USER_SAL_NAME != null) {
              this.model.COMPL_SALUTATION = {
                USER_SAL_ID: element.USER_SAL_ID,
                USER_SAL_NAME: element.USER_SAL_NAME
              };
            }
            this.model.COMPL_NAME = element.ADD_NAME;
            this.model.COMPL_TELEPHONE = element.ADD_TELEPHONE;
            this.model.COMPL_PHONE_EXTENSION = element.ADD_PHONE_EXTENSION;
            this.model.COMPL_EMAIL = element.ADD_EMAIL;
            this.model.COMPL_MOBILE_NUMBER = element.ADD_MOBILE_NUMBER;
          } else if (element.ADD_TYPE == "HOD_PRS") {
            if (element.USER_SAL_NAME != null) {
              this.model.PRS_SALUTATION = {
                USER_SAL_ID: element.USER_SAL_ID,
                USER_SAL_NAME: element.USER_SAL_NAME
              };
            }
            this.model.PRS_NAME = element.ADD_NAME;
            this.model.PRS_TELEPHONE = element.ADD_TELEPHONE;
            this.model.PRS_PHONE_EXTENSION = element.ADD_PHONE_EXTENSION;
            this.model.PRS_EMAIL = element.ADD_EMAIL;
            this.model.PRS_MOBILE_NUMBER = element.ADD_MOBILE_NUMBER;
          } else if (element.ADD_TYPE == "HOD_UTS") {
            if (element.USER_SAL_NAME != null) {
              this.model.UTS_SALUTATION = {
                USER_SAL_ID: element.USER_SAL_ID,
                USER_SAL_NAME: element.USER_SAL_NAME
              };
            }
            this.model.UTS_NAME = element.ADD_NAME;
            this.model.UTS_TELEPHONE = element.ADD_TELEPHONE;
            this.model.UTS_PHONE_EXTENSION = element.ADD_PHONE_EXTENSION;
            this.model.UTS_EMAIL = element.ADD_EMAIL;
            this.model.UTS_MOBILE_NUMBER = element.ADD_MOBILE_NUMBER;
          } else if (element.ADD_TYPE == "HOD_TRAIN") {
            if (element.USER_SAL_NAME != null) {
              this.model.TRAIN_SALUTATION = {
                USER_SAL_ID: element.USER_SAL_ID,
                USER_SAL_NAME: element.USER_SAL_NAME
              };
            }
            this.model.TRAIN_NAME = element.ADD_NAME;
            this.model.TRAIN_TELEPHONE = element.ADD_TELEPHONE;
            this.model.TRAIN_PHONE_EXTENSION = element.ADD_PHONE_EXTENSION;
            this.model.TRAIN_EMAIL = element.ADD_EMAIL;
            this.model.TRAIN_MOBILE_NUMBER = element.ADD_MOBILE_NUMBER;
          }
        });

        this.model.IssueBank = {
          SETTING_GENERAL_ID: response.BANKID,
          SET_PARAM: response.IssueBank
        };
        this.model.DIST_TRANS_REF = response.DIST_TRANS_REF;
        this.model.DIST_TRANS_DATE = response.DIST_TRANS_DATE;
        this.model.DIST_ACC_AMOUNT = response.DIST_ACC_AMOUNT;

        if (response.DIST_TRANS_TYPE == 1) {
          this.model.DIST_TRANS_TYPE = { name: "ONLINE TRANSACTION", value: 1 };
        } else if (response.DIST_TRANS_TYPE == 2) {
          this.model.DIST_TRANS_TYPE = { name: "CASH DEPOSIT", value: 2 };
        } else if (response.DIST_TRANS_TYPE == 3) {
          this.model.DIST_TRANS_TYPE = { name: "CHEQUE DEPOSIT", value: 3 };
        }
        this.directorList = response.DATADIR;

        this.updateDistributor = true;

        if(response.DATADOC && response.DATADOC.length>=1){
          response.DATADOC.forEach(element => {
            // console.log(element.DOCU_BLOB);
            element.DOCU_BLOB = this.b64toBlobPDF(
              element.DOCU_BLOB,
              element.DOCU_MIMETYPE
            );
            //console.log(element.DOCU_BLOB); // <----- cuba tgk ini
            element.DOCU_BLOB = new File(
              [element.DOCU_BLOB],
              element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
              { type: element.DOCU_BLOB.type }
            );
            const data = {
              name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
              size: element.DOCU_FILESIZE,
              type: element.DOCU_FILETYPE,
              ext: "exe",
              url: window.URL.createObjectURL(element.DOCU_BLOB)
            };
            //console.log("data blob : " + data);
            if (element.DOCU_GROUP == 8) {
              this.model.fileRecords = [];
              this.model.fileRecords.push(data);
            } else if (element.DOCU_GROUP == 3) {
              this.companyLogo = element.DOCU_BLOB;
              this.model.companyLogo = [];
              this.model.companyLogo.push(data);
            } else if (element.DOCU_GROUP == 5) {
              this.ssmForm8 = element.DOCU_BLOB;
              this.model.ssmForm8 = [];
              this.model.ssmForm8.push(data);
            } else if (element.DOCU_GROUP == 4) {
              this.ssmForm9 = element.DOCU_BLOB;
              this.model.ssmForm9 = [];
              this.model.ssmForm9.push(data);
            } else if (element.DOCU_GROUP == 7) {
              this.receipt = element.DOCU_BLOB;
              this.model.receipt = [];
              this.model.receipt.push(data);
            } else if (element.DOCU_GROUP == 6) {
              this.BODApprove = element.DOCU_BLOB;
              this.model.BODApprove = [];
              this.model.BODApprove.push(data);
            } else if (element.DOCU_GROUP == 9) {
              this.ssmForm13 = element.DOCU_BLOB;
              this.model.ssmForm13 = [];
              this.model.ssmForm13.push(data);
            } else if (element.DOCU_GROUP == 10) {
              this.uploadCSMRL = element.DOCU_BLOB;
              this.model.uploadCSMRL = [];
              this.model.uploadCSMRL.push(data);
            } else if (element.DOCU_GROUP == 11) {
              this.uploadCSMRLorMOFLicense = element.DOCU_BLOB;
              this.model.uploadCSMRLorMOFLicense = [];
              this.model.uploadCSMRLorMOFLicense.push(data);
            } else if (element.DOCU_GROUP == 12) {
              this.ssmForm49 = element.DOCU_BLOB;
              this.model.ssmForm49 = [];
              this.model.ssmForm49.push(data);
            } else if (element.DOCU_GROUP == 13) {
              this.complianceDeclaration = element.DOCU_BLOB;
              this.model.complianceDeclaration= [];
              this.model.complianceDeclaration.push(data);
            } else if (element.DOCU_GROUP == 14) {
              this.ssmForm24 = element.DOCU_BLOB;
              this.model.ssmForm24 = [];
              this.model.ssmForm24.push(data);
            }
          });
        }
      }

      this.isLoad = false; //off page loader
    },
    async getUserSalutation() {
      const response = await services06Module1.getUserSalutation();
      this.salutations = response;
    },
    validateExpiryDate(value) {
      console.log("value : " + value);
      if (value != null) {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds() +
          " GMT";
        const dateTime = date + " " + time;

        const unixTimeNow = Date.parse(dateTime);
        console.log(unixTimeNow);

        // date expiry
        const expiryDate = value;
        const dateExpiry =
          expiryDate.getFullYear() +
          "-" +
          (expiryDate.getMonth() + 1) +
          "-" +
          expiryDate.getDate();
        const timeExpiry =
          expiryDate.getHours() +
          ":" +
          expiryDate.getMinutes() +
          ":" +
          expiryDate.getSeconds() +
          " GMT";
        const dateTimeExpiry = dateExpiry + " " + timeExpiry;
        const unixTimeExpiryDate = Date.parse(dateTimeExpiry);
        console.log(unixTimeExpiryDate);

        // compare
        if (unixTimeExpiryDate < unixTimeNow) {
          console.log("expired");
          return ["Expired"];
        } else {
          console.log("not expired");
          // return ["Expired"];
        }
      } else {
        console.log("ssdfdsf");
      }
    },
    async getApplicationType() {
      console.log("app type");
      const response = await services06Module0.getApplicationType();
      this.applicationType = response;
    },
    async getCountry() {
      const response = await services06Module0.getSettingGeneral("COUNTRY");
      this.country = response;
      this.getState(this.country.SETTING_GENERAL_ID);
    },
    async getCity(data) {
      // const data = {
      //   SETTING_GENERAL_ID: data
      // };
      const response = await services06Module0.getCity(data);
      this.city = response;
    },
    async getPostcode(data) {
      const response = await services06Module0.getPostcodeByID(data);
      this.postcode = response;
    },
    async getState(id) {
      const data = {
        SETTING_GENERAL_ID: id,
        SET_TYPE: "STATE"
      };
      const response = await services06Module0.getStateById(data);
      this.state = response;
    },
    async getDefaultCountry() {
      try {
        const response = await services06Module0.getDefaultCountry();
        this.model.DIST_COUNTRY = response;
      } catch (error) {
        console.log(error);
      }
    },
    async submit(status) {
      const vm = this;
      const user = localStorage.getItem("user");
      const data = new FormData();
      this.isShow = true;
      this.isShowDraft = true;
      console.log(this.model.companyLogo);
      console.log(this.uploadFileOject);
      // alert(JSON.stringify(this.uploadFileOject));
      // this.proposalList.forEach(item => {
      //   item.list.forEach(element => {
      //     data.append("FILEOBJECT[]", element.DOCU_BLOB);
      //     data.append("FILEOBJECTID[]", element.MANAGE_REQUIRED_DOCUMENT_ID);
      //   });
      // });

      //Distributor Profile
      if (this.uploadFileOject.length != 0) {
        for (let i = 0; i < this.uploadFileOject.length; i++) {
          data.append(
            "FILEOBJECTID[]",
            JSON.stringify(this.uploadFileOjectId[i])
          );
          data.append("FILEOBJECT[]", this.uploadFileOject[i]);
        }
      }
      data.append("FILEOBJECT2", this.uploadFileOject2);
      data.append("additionalDoc", this.model.fileRecords);
      data.append("companyLogo", this.model.companyLogo);
      data.append("ssmForm8", this.model.ssmForm8);
      data.append("ssmForm9", this.model.ssmForm9);
      data.append("ssmForm13", this.model.ssmForm13);
      data.append("BODApprove", this.model.BODApprove);
      data.append("receipt", this.model.receipt);
      data.append("USER_ID", JSON.parse(user).user_id);
      data.append("DIST_NAME", this.model.DIST_NAME ?? "");
      data.append("DIST_REGI_NUM1", this.model.DIST_REGI_NUM1 ?? "");
      data.append("DIST_REGI_NUM2", this.model.DIST_REGI_NUM2 ?? "");
      data.append("DIST_DATE_INCORP", this.model.DIST_DATE_INCORP != null ? moment(this.model.DIST_DATE_INCORP).format("YYYY-MM-DD") : null);
      data.append("DIST_TYPE_SETUP", this.model.DIST_TYPE_SETUP ?? "");
      data.append(
        "DIST_PHONE_NUMBER",
        this.model.DIST_PHONE_NUMBER != null ? this.model.DIST_PHONE_NUMBER : ""
      );
      data.append(
        "DIST_PHONE_EXTENSION",
        this.model.DIST_PHONE_EXTENSION ?? ""
      );
      data.append("DIST_FAX_NUMBER", this.model.DIST_FAX_NUMBER ?? "");
      data.append("DIST_MOBILE_NUMBER", this.model.DIST_MOBILE_NUMBER ?? "");
      data.append("DIST_EMAIL", this.model.DIST_EMAIL ?? "");
      data.append(
        "DIST_COMPANY_WEBSITE",
        this.model.DIST_COMPANY_WEBSITE ?? ""
      );

      //Registered Address
      data.append("DIST_COUNTRY", this.model.DIST_COUNTRY ? this.model.DIST_COUNTRY.SETTING_GENERAL_ID : "");
      data.append("COUNTRY_CODE", this.model.DIST_COUNTRY ? this.model.DIST_COUNTRY.SET_CODE : "");
      if(this.model.DIST_COUNTRY && this.model.DIST_COUNTRY.SET_CODE){
        if(this.model.DIST_COUNTRY.SET_CODE == "MY"){
          data.append("DIST_STATE", this.model.DIST_STATE ? this.model.DIST_STATE.SETTING_GENERAL_ID : "")
          data.append("DIST_CITY", this.model.DIST_CITY ? this.model.DIST_CITY.SETTING_CITY_ID : "")
          data.append("DIST_POSTAL", this.model.DIST_POSTAL ? this.model.DIST_POSTAL.POSTCODE_ID : "")
        }else{
          data.append("DIST_STATE", this.model.DIST_STATE ? this.model.DIST_STATE.SETTING_GENERAL_ID : "")
          data.append("DIST_CITY", this.model.DIST_CITY ? this.model.DIST_CITY.SETTING_CITY_ID : "")
          data.append("DIST_POSTAL", this.model.DIST_POSTAL ? this.model.DIST_POSTAL.POSTCODE_ID : "")
        }
      }else{
        data.append("DIST_STATE", this.model.DIST_STATE ? this.model.DIST_STATE.SETTING_GENERAL_ID : "")
          data.append("DIST_CITY", this.model.DIST_CITY ? this.model.DIST_CITY.SETTING_CITY_ID : "")
          data.append("DIST_POSTAL", this.model.DIST_POSTAL ? this.model.DIST_POSTAL.POSTCODE_ID : "")
      }

      data.append("DIST_ADDR_1", this.model.DIST_ADDR_1 ?? "");
      data.append("DIST_ADDR_2", this.model.DIST_ADDR_2 ?? "");
      data.append("DIST_ADDR_3", this.model.DIST_ADDR_3 ?? "");

      //Business Address - biz address
      data.append(
        "DIST_BIZ_COUNTRY",
        this.model.DIST_BIZ_COUNTRY ? this.model.DIST_BIZ_COUNTRY.SETTING_GENERAL_ID : ""
      );
      data.append("BIZ_COUNTRY_CODE", this.model.DIST_BIZ_COUNTRY ? this.model.DIST_BIZ_COUNTRY.SET_CODE : "");
      if(this.model.DIST_BIZ_COUNTRY && this.model.DIST_BIZ_COUNTRY.SET_CODE){
        if(this.model.DIST_BIZ_COUNTRY.SET_CODE == "MY"){
          data.append("DIST_BIZ_STATE", this.model.DIST_BIZ_STATE ? this.model.DIST_BIZ_STATE.SETTING_GENERAL_ID : "")
          data.append("DIST_BIZ_CITY", this.model.DIST_BIZ_CITY ? this.model.DIST_BIZ_CITY.SETTING_CITY_ID : "")
          data.append("DIST_BIZ_POSTAL", this.model.DIST_BIZ_POSTAL? this.model.DIST_BIZ_POSTAL.POSTCODE_ID : "")
        }else{
          data.append("DIST_BIZ_STATE", this.model.DIST_BIZ_STATE ? this.model.DIST_BIZ_STATE.SETTING_GENERAL_ID : "")
          data.append("DIST_BIZ_CITY", this.model.DIST_BIZ_CITY ? this.model.DIST_BIZ_CITY.SETTING_CITY_ID : "")
          data.append("DIST_BIZ_POSTAL", this.model.DIST_BIZ_POSTAL? this.model.DIST_BIZ_POSTAL.POSTCODE_ID : "")
        }
      }else{
        data.append("DIST_BIZ_STATE", this.model.DIST_BIZ_STATE ? this.model.DIST_BIZ_STATE.SETTING_GENERAL_ID : "")
        data.append("DIST_BIZ_CITY", this.model.DIST_BIZ_CITY ? this.model.DIST_BIZ_CITY.SETTING_CITY_ID : "")
        data.append("DIST_BIZ_POSTAL", this.model.DIST_BIZ_POSTAL? this.model.DIST_BIZ_POSTAL.POSTCODE_ID : "")
      }

      data.append("DIST_BIZ_ADDR_1", this.model.DIST_BIZ_ADDR_1 ?? "");
      data.append("DIST_BIZ_ADDR_2", this.model.DIST_BIZ_ADDR_2 ?? "");
      data.append("DIST_BIZ_ADDR_3", this.model.DIST_BIZ_ADDR_3 ?? "");

      //Details Information
      this.model.DIST_PAID_UP_CAPITAL = this.model.DIST_PAID_UP_CAPITAL;
      // .replace(
      //   /\s/gi,
      //   ""
      // );
      data.append(
        "DIST_FINANCIAL_INSTITUTION",
        this.model.DIST_FINANCIAL_INSTITUTION ?? ""
      );
      data.append(
        "DIST_PAID_UP_CAPITAL",
        this.model.DIST_PAID_UP_CAPITAL ?? ""
      );
      data.append("DIST_TYPE_STRUCTURE", this.model.DIST_TYPE_STRUCTURE ?? "");
      data.append(
        "DIST_MARKETING_APPROACH",
        this.model.DIST_MARKETING_APPROACH ?? ""
      );
      data.append("DIST_NUM_DIST_POINT", this.model.DIST_NUM_DIST_POINT ?? "");
      data.append("DIST_NUM_CONSULTANT", this.model.DIST_NUM_CONSULTANT ?? "");
      data.append("DIST_INSURANCE", this.model.DIST_INSURANCE ?? "");
      data.append("DIST_EXPIRED_DATE", this.model.DIST_EXPIRED_DATE != null ? moment(this.model.DIST_EXPIRED_DATE).format("YYYY-MM-DD") : null);
      data.append("DIST_INSURANCE_POLICY", this.model.DIST_INSURANCE_POLICY);

      //* * CEO */
      data.append("CEO_REPR_TYPE", "CEO");
      data.append("CEO_REPR_SALUTATION", this.model.CEO_REPR_SALUTATION != "" ? this.model.CEO_REPR_SALUTATION.USER_SAL_ID : null);
      data.append("CEO_REPR_NAME", this.model.CEO_REPR_NAME ?? "");
      data.append("CEO_REPR_POSITION", this.model.CEO_REPR_POSITION ?? "");
      data.append("CEO_REPR_NRIC", this.model.CEO_REPR_NRIC ?? "");
      data.append("CEO_REPR_PASS_NUM", this.model.CEO_REPR_PASS_NUM ?? "");
      data.append("CEO_REPR_PASS_EXP", this.model.CEO_REPR_PASS_EXP != null ? moment(this.model.CEO_REPR_PASS_EXP).format("YYYY-MM-DD") : null);
      data.append("CEO_REPR_CITIZEN", this.model.CEO_REPR_CITIZEN ?? "");
      data.append("CEO_REPR_TELEPHONE", this.model.CEO_REPR_MOBILE_NUMBER ?? "");
      data.append(
        "CEO_REPR_PHONE_EXTENSION",
        this.model.CEO_REPR_PHONE_EXTENSION ?? ""
      );
      data.append(
        "CEO_REPR_MOBILE_NUMBER",
        this.model.CEO_REPR_MOBILE_NUMBER ?? ""
      );
      data.append("CEO_REPR_EMAIL", this.model.CEO_REPR_EMAIL ?? "");

      //* * director list */
      data.append("DIR_LIST", JSON.stringify(this.directorList));

      //* *Section3 upload doc */
      data.append("ssmForm49", this.model.ssmForm49);
      data.append("complianceDeclaration", this.model.complianceDeclaration);
      data.append("ssmForm24", this.model.ssmForm24);

      //* * AR */
      data.append("AR_REPR_TYPE", "AR");
      data.append("AR_REPR_SALUTATION", this.model.AR_REPR_SALUTATION != "" ? this.model.AR_REPR_SALUTATION.USER_SAL_ID : null);
      data.append("AR_REPR_NAME", this.model.AR_REPR_NAME ?? "");
      data.append("AR_REPR_POSITION", this.model.AR_REPR_POSITION ?? "");
      data.append("AR_REPR_NRIC", this.model.AR_REPR_NRIC ?? "");
      data.append("AR_REPR_PASS_NUM", this.model.AR_REPR_PASS_NUM ?? "");
      data.append("AR_REPR_PASS_EXP", this.model.AR_REPR_PASS_EXP != null ? moment(this.model.AR_REPR_PASS_EXP).format("YYYY-MM-DD") : null);
      data.append("AR_REPR_CITIZEN", this.model.AR_REPR_CITIZEN ?? "");
      data.append("AR_REPR_TELEPHONE", this.model.AR_REPR_TELEPHONE ?? "");
      data.append(
        "AR_REPR_PHONE_EXTENSION",
        this.model.AR_REPR_PHONE_EXTENSION ?? ""
      );
      data.append(
        "AR_REPR_MOBILE_NUMBER",
        this.model.AR_REPR_MOBILE_NUMBER ?? ""
      );
      data.append("AR_REPR_EMAIL", this.model.AR_REPR_EMAIL ?? "");

      // //** AAR */
      data.append("AAR_REPR_TYPE", "AAR");
      data.append("AAR_REPR_SALUTATION", this.model.AAR_REPR_SALUTATION != "" ? this.model.AAR_REPR_SALUTATION.USER_SAL_ID : null);
      data.append("AAR_REPR_NAME", this.model.AAR_REPR_NAME ?? "");
      data.append("AAR_REPR_POSITION", this.model.AAR_REPR_POSITION ?? "");
      data.append("AAR_REPR_NRIC", this.model.AAR_REPR_NRIC ?? "");
      data.append("AAR_REPR_PASS_NUM", this.model.AAR_REPR_PASS_NUM ?? "");
      data.append("AAR_REPR_PASS_EXP", this.model.AAR_REPR_PASS_EXP != null ? moment(this.model.AAR_REPR_PASS_EXP).format("YYYY-MM-DD") : null);
      data.append("AAR_REPR_CITIZEN", this.model.AAR_REPR_CITIZEN ?? "");
      data.append("AAR_REPR_TELEPHONE", this.model.AAR_REPR_TELEPHONE ?? "");
      data.append(
        "AAR_REPR_PHONE_EXTENSION",
        this.model.AAR_REPR_PHONE_EXTENSION ?? ""
      );
      data.append(
        "AAR_REPR_MOBILE_NUMBER",
        this.model.AAR_REPR_MOBILE_NUMBER ?? ""
      );
      data.append("AAR_REPR_EMAIL", this.model.AAR_REPR_EMAIL ?? "");

      //* * Financial Planner */
      data.append(
        "DIST_FINANCIAL_INSTITUTION",
        this.model.DIST_FINANCIAL_INSTITUTION ?? ""
      );
      data.append(
        "DIST_FP_SALUTATION",
        this.model.FINANCIAL_PLANNER_SALUTATION.USER_SAL_ID ?? ""
      );
      data.append("DIST_FP_NAME", this.model.FINANCIAL_PLANNER_NAME ?? "");
      data.append("DIST_FP_CSMRL", this.model.CSMRL_NUMBER ?? "");
      data.append(
        "DIST_FP_CITIZEN",
        this.model.FINANCIAL_PLANNER_CITIZEN ?? ""
      );
      data.append("DIST_FP_NRIC", this.model.FINANCIAL_PLANNER_NRIC ?? "");
      data.append(
        "DIST_FP_PASS_NUM",
        this.model.FINANCIAL_PLANNER_PASS_NUM ?? ""
      );
      this.model.FINANCIAL_PLANNER_PASS_EXP != null
        ? data.append(
            "DIST_FP_PASS_EXPIRY",
            moment(this.model.FINANCIAL_PLANNER_PASS_EXP).format("YYYY-MM-DD")
          )
        : null;
      //* * HOD_COMPL */
      data.append("COMPL_TYPE", "HOD_COMPL");
      data.append("COMPL_SALUTATION", this.model.COMPL_SALUTATION != "" ? this.model.COMPL_SALUTATION.USER_SAL_ID : null);
      data.append("COMPL_NAME", this.model.COMPL_NAME ?? "");
      data.append("COMPL_TELEPHONE", this.model.COMPL_TELEPHONE ?? "");
      data.append(
        "COMPL_PHONE_EXTENSION",
        this.model.COMPL_PHONE_EXTENSION ?? ""
      );
      data.append("COMPL_EMAIL", this.model.COMPL_EMAIL ?? "");
      data.append("COMPL_MOBILE_NUMBER", this.model.COMPL_MOBILE_NUMBER ?? "");

      // //** HOD_UTS */
      data.append("UTS_TYPE", "HOD_UTS");
      data.append("UTS_SALUTATION", this.model.UTS_SALUTATION != "" ? this.model.UTS_SALUTATION.USER_SAL_ID : null);
      data.append("UTS_NAME", this.model.UTS_NAME ?? "");
      data.append("UTS_TELEPHONE", this.model.UTS_TELEPHONE ?? "");
      data.append("UTS_PHONE_EXTENSION", this.model.UTS_PHONE_EXTENSION ?? "");
      data.append("UTS_EMAIL", this.model.UTS_EMAIL ?? "");
      data.append("UTS_MOBILE_NUMBER", this.model.UTS_MOBILE_NUMBER ?? "");

      // //** HOD_PRS */
      data.append("PRS_TYPE", "HOD_PRS");
      data.append("PRS_SALUTATION", this.model.PRS_SALUTATION != "" ? this.model.PRS_SALUTATION.USER_SAL_ID : null);
      data.append("PRS_NAME", this.model.PRS_NAME ?? "");
      data.append("PRS_TELEPHONE", this.model.PRS_TELEPHONE ?? "");
      data.append("PRS_PHONE_EXTENSION", this.model.PRS_PHONE_EXTENSION ?? "");
      data.append("PRS_EMAIL", this.model.PRS_EMAIL ?? "");
      data.append("PRS_MOBILE_NUMBER", this.model.PRS_MOBILE_NUMBER ?? "");

      // //** HOD_TRAIN */
      data.append("TRAIN_TYPE", "HOD_TRAIN");
      data.append("TRAIN_SALUTATION", this.model.TRAIN_SALUTATION != "" ? this.model.TRAIN_SALUTATION.USER_SAL_ID : null);
      data.append("TRAIN_NAME", this.model.TRAIN_NAME ?? "");
      data.append("TRAIN_TELEPHONE", this.model.TRAIN_TELEPHONE ?? "");
      data.append(
        "TRAIN_PHONE_EXTENSION",
        this.model.TRAIN_PHONE_EXTENSION ?? ""
      );
      data.append("TRAIN_EMAIL", this.model.TRAIN_EMAIL ?? "");
      data.append("TRAIN_MOBILE_NUMBER", this.model.TRAIN_MOBILE_NUMBER ?? "");

      data.append("DIST_PUBLISH_STATUS", status);
      this.$modals.showStaticModal.$hide();
      try {
        if (status == 1) {
          if (this.distributorProfileDetails.DIST_EMAIL !== this.model.DIST_EMAIL) {
              if (this.model.EMAIL_TAC === null || this.model.EMAIL_TAC === "" ) {
                alert('Please enter OTP to confirm email change')
              }else if(this.model.GENERATED_TAC != this.model.EMAIL_TAC){
                alert('You entered wrong OTP')
              }else{
                vm.showOverlay(true);
                this.isLoad = true;
                // const response = await services06Module1
                // .createDistributorProfile(data);
                data.append("DISTRIBUTOR_ID", this.model.DISTRIBUTOR_ID);
                data.append("PUBLISH_STATUS", 0); //Save as Draft
                //data.append("TS_ID", 0); //Draft
                data.append("DIST_TEMP_CATEGORY", 1); // 1: UPFATE PROFILE 2:REGISTER NEW LICENSE
                const response = await services06Module1.updateDistributorProfile(
                  data
                );
                this.isLoad = false;
                this.$modals.showStaticModalSaveAsDraft.$show();
                this.isShow = false;
                this.getDistributorById();
              }
          }else{
              vm.showOverlay(true);
              this.isLoad = true;
              // const response = await services06Module1
              // .createDistributorProfile(data);
              data.append("DISTRIBUTOR_ID", this.model.DISTRIBUTOR_ID);
              data.append("PUBLISH_STATUS", 0); //Save as Draft
              //data.append("TS_ID", 0); //Draft
              data.append("DIST_TEMP_CATEGORY", 1);
              const response = await services06Module1.updateDistributorProfile(
                data
              );
              this.isLoad = false;
              this.$modals.showStaticModalSaveAsDraft.$show();
              this.isShow = true;
              this.getDistributorById();
          }
        } else {
          if (this.updateDistributor == false) {
            if (this.distributorProfileDetails.DIST_EMAIL !== this.model.DIST_EMAIL) {
              if (this.model.EMAIL_TAC === null || this.model.EMAIL_TAC === "" ) {
                alert('Please enter OTP to confirm email change')
              }else if(this.model.GENERATED_TAC != this.model.EMAIL_TAC){
                alert('You entered wrong OTP')
              }else{
                this.isLoad = true;
                data.append("DISTRIBUTOR_ID", this.model.DISTRIBUTOR_ID);
                data.append("PUBLISH_STATUS", 1); //Submit
                data.append("TS_ID", 2); //New Entry
                data.append("DIST_TEMP_CATEGORY", 1);
                data.append("APPR_GROUP_ID_MANAGER", "1");  //Approval Group ID for Notification to MANAGER OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
                vm.showOverlay(true);
                const response = await services06Module1.updateDistributorProfile(
                  data
                );
                this.isLoad = false;
                this.$modals.showStaticModalOK.$show();
                this.isShow = false;
                this.isShowDraft = false;
                this.getDistributorById();
              }
            }else{
                this.isLoad = true;
                data.append("DISTRIBUTOR_ID", this.model.DISTRIBUTOR_ID);
                data.append("PUBLISH_STATUS", 1); //Submit
                data.append("TS_ID", 2); //New Entry
                data.append("DIST_TEMP_CATEGORY", 1);
                data.append("APPR_GROUP_ID_MANAGER", "1");  //Approval Group ID for Notification to MANAGER OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
                vm.showOverlay(true);
                const response = await services06Module1.updateDistributorProfile(
                  data
                );
                this.isLoad = false;
                this.$modals.showStaticModalOK.$show();
                this.isShow = false;
                this.isShowDraft = false;
                this.getDistributorById();
            }
          } else {
            if (this.distributorProfileDetails.DIST_EMAIL !== this.model.DIST_EMAIL) {
              if (this.model.EMAIL_TAC === null || this.model.EMAIL_TAC === "" ) {
                  alert('Please enter OTP to confirm email change')
                }else if(this.model.GENERATED_TAC != this.model.EMAIL_TAC){
                  alert('You entered wrong OTP')
                }else{
                  this.isLoad = true;
                  data.append("PUBLISH_STATUS", 1); //Submit
                  data.append("TS_ID", 2); //New Entry
                  data.append("DIST_TEMP_CATEGORY", 1);
                  data.append("APPR_GROUP_ID_MANAGER", "1");  //Approval Group ID for Notification to MANAGER OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
                  data.append("DELETED_DIR", JSON.stringify(this.deletedDir));
                  data.append("DISTRIBUTOR_ID", this.model.DISTRIBUTOR_ID);
                  data.append("FILEDELETED", JSON.stringify(this.fileDeleted));
                  //data.append("_method", "PUT");
                  this.isShow = false;
                  this.isShowDraft = false;
                  const response = await services06Module1.updateDistributorProfile(data);
                  this.isLoad = false;
                  this.$modals.showStaticModal.$hide();
                  this.$modals.showStaticModalOK.$show();
                  this.getDistributorById();
                }
              }else{
                this.isLoad = true;
                data.append("PUBLISH_STATUS", 1); //Submit
                data.append("TS_ID", 2); //New Entry
                data.append("DIST_TEMP_CATEGORY", 1);
                data.append("APPR_GROUP_ID_MANAGER", "1");  //Approval Group ID for Notification to MANAGER OF DISTRIBUTOR in am/DISTRIBUTOR_MANAGE_GROUP
                data.append("DELETED_DIR", JSON.stringify(this.deletedDir));
                data.append("DISTRIBUTOR_ID", this.model.DISTRIBUTOR_ID);
                data.append("FILEDELETED", JSON.stringify(this.fileDeleted));
                //data.append("_method", "PUT");
                this.isShow = false;
                this.isShowDraft = false;

                const response = await services06Module1.updateDistributorProfile(data);
                this.isLoad = false;
                this.$modals.showStaticModal.$hide();
                this.$modals.showStaticModalOK.$show();
                this.getDistributorById();
              }
          }
        }
      } catch (error) {
        this.isLoad = false;
        console.log(error);
        this.errorMessage = error.message
        this.$modals.showErrorModalOk.$show();
        this.isShow = true;
      }
    },
    showmodal() {
      this.$modals.simpleModal.$show();
    },
    uploadImage(item) {
      item.selected = true;
      if (item.type === "photo") {
        console.log(this.$refs.applicantPhoto.files[0]);
        this.applicantPhoto = this.$refs.applicantPhoto.files[0];
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            this.$refs.applicantPhotoDisplay.src = reader.result;
          }.bind(this),
          false
        );

        reader.readAsDataURL(this.applicantPhoto);
        console.log(item.selected);
        // item.selected = true;
      }
    },
    uploadFile() {
      // console.log(this.$refs.file.files[0]);
      if (this.$refs.file.files[0] !== undefined) {
        this.showView = true;
      } else {
        this.showView = false;
      }
    },

    addDirector() {
      if (this.$refs.thirdTabFormDIR.validate()) {
        var dirdateend = " ";
        if (this.model.DIR_DATE_END == null) {
          dirdateend = "-";
        } else {
          dirdateend = moment(this.model.DIR_DATE_END).format("DD-MMM-YYYY");
        }
        console.log(JSON.stringify(dirdateend));
        var directorInfo = {
          DIST_DIR_ID: "",
          DIR_SALUTATION: this.model.DIR_SALUTATION.USER_SAL_ID,
          USER_SAL_NAME: this.model.DIR_SALUTATION.USER_SAL_NAME,
          DIR_NAME: this.model.DIR_NAME,
          DIR_NAME_DISPLAY:
            this.model.DIR_SALUTATION.USER_SAL_NAME + " " + this.model.DIR_NAME,
          DIR_CITIZEN: this.model.DIR_CITIZEN.value,
          DIR_NRIC:
            this.model.DIR_NRIC.substring(0, 6) +
            "-" +
            this.model.DIR_NRIC.substring(6, 8) +
            "-" +
            this.model.DIR_NRIC.substring(8, 12), // this.model.DIR_icNo,
          DIR_PASSPORT: this.model.DIR_PASSPORT,
          DIR_PASSPORT_EXPIRY_DATE: this.model.DIR_PASSPORT_EXPIRY_DATE,
          DIR_DATE_EFFECTIVE: moment(this.model.DIR_DATE_EFFECTIVE).format(
            "YYYY-MM-DD"
          ),
          DIR_DATE_END: dirdateend,
          DIR_DATE_EFFECTIVE_DISPLAY: moment(
            this.model.DIR_DATE_EFFECTIVE
          ).format("DD-MMM-YYYY"),
          DIR_DATE_END_DISPLAY: dirdateend
        };
        this.directorList.unshift(directorInfo);
        console.log(JSON.stringify(this.directorList));
        (this.model.DIR_NAME = ""),
          (this.model.DIR_NRIC = ""),
          (this.model.DIR_DATE_EFFECTIVE = ""),
          (this.model.DIR_DATE_END = "");
      }
      console.log(JSON.stringify(dirdateend));
    },
    validateIC(value) {
      //* * must contain letter only (lowercase and uppercase) */
      const expression1 = /^[0-9]+$/;
      if (value.length != 12) {
        return ["NRIC number must contain 12 digit"];
      }
      // let expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/;
      // //** must contain at least one uppercase letter, one lower case letter and one number */
      // let expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character */
      // let expression5 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      // let expression6 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/;

      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        // this.passwordStrength = "";
        return ["Ic must contain number only"];
      }
    },
    async validateRegNo(value) {
      value.replace(/\s/, "");
    },
    onModelUpdated(newVal, schema) {
      console.log(newVal);

      if (schema === "AR_citizenship") {
        if (newVal === 1) {
          this.visiblePassport = false;
          this.visibleIc = true;
        } else {
          this.visiblePassport = true;
          this.visibleIc = false;
        }
      } else if (schema === "AAR_citizenship") {
        if (newVal === 1) {
          this.visiblePassportAAR = false;
          this.visibleIcAAR = true;
        } else {
          this.visiblePassportAAR = true;
          this.visibleIcAAR = false;
        }
      } else if (schema === "AI_contactPerson") {
        console.log("valuee :" + newVal);
        if (newVal != null) {
          this.contactPersonValue = newVal.value;
        } else {
          this.contactPersonValue = null;
        }
      } else if (schema === "FINANCIAL_PLANNER_CITIZEN") {
        console.log("valuee :" + newVal);
        if (newVal === 1) {
          this.visibleFINANCIALPLANNERPASSNUM = false;
          this.visibleFINANCIALPLANNERNRIC = true;
        } else {
          this.visibleFINANCIALPLANNERPASSNUM = true;
          this.visibleFINANCIALPLANNERNRIC = false;
        }
      } else if (schema === "CEO_REPR_CITIZEN") {
        if (newVal === 1) {
          this.visiblePassportCEO = false;
          this.visibleIcCEO = true;
        } else {
          this.visiblePassportCEO = true;
          this.visibleIcCEO = false;
        }
      } else if (schema === "Other_citizenship") {
        if (newVal === 1) {
          this.visiblePassportOther = false;
          this.visibleIcOther = true;
        } else {
          this.visiblePassportOther = true;
          this.visibleIcOther = false;
        }
      } else if (schema === "DIR_citizenship") {
        if (newVal === 1) {
          this.visiblePassportDIR = false;
          this.visibleIcDIR = true;
        } else {
          this.visiblePassportDIR = true;
          this.visibleIcDIR = false;
        }
      } else if (schema === "EDIT_DIR_citizenship") {
        if (newVal === 1) {
          this.visiblePassportEditDIR = false;
          this.visibleIcEditDIR = true;
        } else {
          this.visiblePassportEditDIR = true;
          this.visibleIcEditDIR = false;
        }
      } else if (schema === "applicationType") {
        console.log(
          "dd for application type : " +
            this.model.applicationType.DISTRIBUTOR_TYPE_ID
        );
        if (this.model.applicationType.DISTRIBUTOR_TYPE_ID === 1) {
          //UTMC
          console.log("this is 1 - UTMC");
          this.model.DIST_TYPE_STRUCTURE = 2;
          this.model.DIST_MARKETING_APPROACH = 1;
          this.visibleFinancialPlannerName = false;
          this.visibleCSMRLNumber = false;
          this.visibleuploadCSMRL = true;
          this.visibleuploadCSMRLorMOFLicense = false;
          this.visibleDIST_FIN_INST = false;
          this.model.DIST_SCHEME = "UTS";
          this.visibleDIST_SCHEME = true;
          this.visibleDIST_INSURANCE = false;
          this.disableDIST_TYPE_STRUCTURE = false;
          this.disableDIST_MARKETING_APPROACH = true;
          this.getDistFee(this.model.applicationType.DISTRIBUTOR_TYPE_ID);
          console.log("end");
        } else if (this.model.applicationType.DISTRIBUTOR_TYPE_ID === 2) {
          //PRP
          console.log("this is 2 - PRP");
          this.model.DIST_TYPE_STRUCTURE = 2;
          this.model.DIST_MARKETING_APPROACH = 1;
          this.visibleFinancialPlannerName = false;
          this.visibleCSMRLNumber = false;
          this.visibleuploadCSMRL = true;
          this.visibleuploadCSMRLorMOFLicense = false;
          this.visibleDIST_FIN_INST = false;
          this.model.DIST_SCHEME = "PRS";
          this.visibleDIST_SCHEME = true;
          this.visibleDIST_INSURANCE = false;
          this.disableDIST_TYPE_STRUCTURE = false;
          this.disableDIST_MARKETING_APPROACH = true;
          this.getDistFee(this.model.applicationType.DISTRIBUTOR_TYPE_ID);
        } else if (this.model.applicationType.DISTRIBUTOR_TYPE_ID === 3) {
          //IUTA
          console.log("this is 3 - IUTA");
          this.model.DIST_TYPE_STRUCTURE = 1;
          this.visibleFinancialPlannerName = false;
          this.visibleCSMRLNumber = false;
          this.visibleuploadCSMRL = false;
          this.visibleuploadCSMRLorMOFLicense = true;
          this.visibleDIST_FIN_INST = false;
          this.model.DIST_SCHEME = "UTS";
          this.visibleDIST_SCHEME = true;
          this.visibleDIST_INSURANCE = false;
          this.disableDIST_TYPE_STRUCTURE = true;
          this.disableDIST_MARKETING_APPROACH = false;
          this.getDistFee(this.model.applicationType.DISTRIBUTOR_TYPE_ID);
        } else if (this.model.applicationType.DISTRIBUTOR_TYPE_ID === 4) {
          //CUTA
          console.log("this is 4 - CUTA");
          this.visibleFinancialPlannerName = true;
          this.model.DIST_MARKETING_APPROACH = 1;
          this.visibleCSMRLNumber = true;
          this.visibleuploadCSMRL = true;
          this.visibleuploadCSMRLorMOFLicense = false;
          this.visibleDIST_FIN_INST = true;
          this.model.DIST_SCHEME = "UTS";
          this.visibleDIST_INSURANCE = true;
          this.visibleDIST_SCHEME = true;
          this.disableDIST_TYPE_STRUCTURE = false;
          this.disableDIST_MARKETING_APPROACH = true;
          this.getDistFee(this.model.applicationType.DISTRIBUTOR_TYPE_ID);
        } else if (this.model.applicationType.DISTRIBUTOR_TYPE_ID === 5) {
          //CPRA
          console.log("this is 5 - CPRA");
          this.visibleFinancialPlannerName = true;
          this.model.DIST_MARKETING_APPROACH = 1;
          this.visibleCSMRLNumber = true;
          this.visibleuploadCSMRL = true;
          this.visibleuploadCSMRLorMOFLicense = false;
          this.visibleDIST_FIN_INST = true;
          this.model.DIST_SCHEME = "PRS";
          this.visibleDIST_INSURANCE = true;
          this.visibleDIST_SCHEME = true;
          this.disableDIST_TYPE_STRUCTURE = false;
          this.disableDIST_MARKETING_APPROACH = true;
          this.getDistFee(this.model.applicationType.DISTRIBUTOR_TYPE_ID);
        } else if (this.model.applicationType.DISTRIBUTOR_TYPE_ID === 6) {
          //IPRA
          console.log("this is 6 - IPRA");
          this.model.DIST_TYPE_STRUCTURE = 1;
          this.visibleFinancialPlannerName = false;
          this.visibleCSMRLNumber = false;
          this.visibleuploadCSMRL = false;
          this.visibleuploadCSMRLorMOFLicense = true;
          this.visibleDIST_FIN_INST = false;
          this.model.DIST_SCHEME = "PRS";
          this.visibleDIST_INSURANCE = false;
          this.visibleDIST_SCHEME = true;
          this.disableDIST_TYPE_STRUCTURE = true;
          this.disableDIST_MARKETING_APPROACH = false;
          this.getDistFee(this.model.applicationType.DISTRIBUTOR_TYPE_ID);
        } else {
          console.log("this is else");
          this.visibleFinancialPlannerName = false;
          this.visibleCSMRLNumber = false;
          this.visibleuploadCSMRL = false;
          this.visibleuploadCSMRLorMOFLicense = false;
          this.visibleDIST_FIN_INST = false;
          this.visibleDIST_SCHEME = false;
        }
      } else if (schema === "DIST_COUNTRY") {
        this.model.DIST_POSTAL = null;
        this.city = [];
        this.model.DIST_CITY = null;
        this.model.DIST_STATE = null;
        if (newVal.SET_CODE === "MY") {
          // this.getPostcode();
          // this.getState(newVal.SETTING_GENERAL_ID);
        }
      } else if (schema === "DIST_POSTAL") {
        // this.model.city = null;
        //  this.model.state = null;
        if (this.model.DIST_COUNTRY.SET_CODE === "MY") {
          this.getCity(this.model.DIST_POSTAL.SETTING_CITY_ID);
        }
      } else if (schema === "DIST_CITY") {
        if (this.model.DIST_COUNTRY.SET_CODE === "MY") {
          this.getPostcode(this.model.DIST_CITY.SETTING_CITY_ID);
        }
      } else if (schema === "DIST_STATE") {
        // this.model.city = null;
        if (this.model.DIST_COUNTRY.SET_CODE === "MY") {
          this.getCity(this.model.DIST_STATE.SETTING_GENERAL_ID);
        }
      } else if (schema === "DIST_BIZ_COUNTRY") {
        this.model.DIST_BIZ_POSTAL = null;
        this.city = [];
        this.model.DIST_BIZ_CITY = null;
        this.model.DIST_BIZ_STATE = null;
        if (newVal.SET_CODE === "MY") {
          // this.getPostcode();
          // this.getState(newVal.SETTING_GENERAL_ID);
        }
      } else if (schema === "DIST_BIZ_POSTAL") {
        // this.model.city = null;
        //  this.model.state = null;
        if (this.model.DIST_BIZ_COUNTRY.SET_CODE === "MY") {
          this.getCity(this.model.DIST_POSTAL.SETTING_CITY_ID);
        }
      } else if (schema === "DIST_BIZ_CITY") {
        if (this.model.DIST_BIZ_COUNTRY.SET_CODE === "MY") {
          this.getPostcode(this.model.DIST_CITY.SETTING_CITY_ID);
        }
      } else if (schema === "DIST_BIZ_STATE") {
        // this.model.city = null;
        if (this.model.DIST_BIZ_COUNTRY.SET_CODE === "MY") {
          this.getCity(this.model.DIST_BIZ_STATE.SETTING_GENERAL_ID);
        }
      } else if (schema == "fileRecordsForUpload") {
        console.log("custom upload");
        console.log(this.model.fileRecordsForUpload);
      } else if (schema == "CEO_isRepresentative") {
        console.log(newVal);
        if (newVal == true) {
          (this.model.AR_REPR_SALUTATION = this.model.CEO_REPR_SALUTATION),
            (this.model.AR_REPR_NAME = this.model.CEO_REPR_NAME),
            (this.model.AR_REPR_POSITION = this.model.CEO_REPR_POSITION),
            (this.model.AR_REPR_NRIC = this.model.CEO_REPR_NRIC),
            (this.model.AR_REPR_PASS_NUM = this.model.CEO_REPR_PASS_NUM),
            (this.model.AR_REPR_PASS_EXP = this.model.CEO_REPR_PASS_EXP),
            (this.model.AR_REPR_CITIZEN = this.model.CEO_REPR_CITIZEN),
            (this.model.AR_REPR_TELEPHONE = this.model.CEO_REPR_TELEPHONE),
            (this.model.AR_REPR_PHONE_EXTENSION = this.model.CEO_REPR_PHONE_EXTENSION),
            (this.model.AR_REPR_MOBILE_NUMBER = this.model.CEO_REPR_MOBILE_NUMBER),
            (this.model.AR_REPR_EMAIL = this.model.CEO_REPR_EMAIL);
        } else if (newVal == false) {
          (this.model.AR_REPR_SALUTATION = ""),
            (this.model.AR_REPR_NAME = ""),
            (this.model.AR_REPR_POSITION = ""),
            (this.model.AR_REPR_NRIC = ""),
            (this.model.AR_REPR_PASS_NUM = ""),
            (this.model.AR_REPR_PASS_EXP = ""),
            (this.model.AR_REPR_CITIZEN = ""),
            (this.model.AR_REPR_TELEPHONE = ""),
            (this.model.AR_REPR_PHONE_EXTENSION = ""),
            (this.model.AR_REPR_MOBILE_NUMBER = ""),
            (this.model.AR_REPR_EMAIL = "");
        }
      } else if (schema == "ADDRESS_isBIZADDRESS") {
        console.log(newVal);
        if (newVal == true) {
          (this.model.DIST_BIZ_ADDR_1 = this.model.DIST_ADDR_1),
            (this.model.DIST_BIZ_ADDR_2 = this.model.DIST_ADDR_2),
            (this.model.DIST_BIZ_ADDR_3 = this.model.DIST_ADDR_3),
            (this.model.DIST_BIZ_POSTAL = this.model.DIST_POSTAL),
            (this.model.DIST_BIZ_COUNTRY = this.model.DIST_COUNTRY),
            (this.model.DIST_BIZ_CITY = this.model.DIST_CITY),
            (this.model.DIST_BIZ_STATE = this.model.DIST_STATE);
        } else if (newVal == false) {
          (this.model.DIST_BIZ_ADDR_1 = ""),
            (this.model.DIST_BIZ_ADDR_2 = ""),
            (this.model.DIST_BIZ_ADDR_3 = ""),
            (this.model.DIST_BIZ_POSTAL = ""),
            (this.model.DIST_BIZ_COUNTRY = ""),
            (this.model.DIST_BIZ_CITY = ""),
            (this.model.DIST_BIZ_STATE = "");
        }
      } else if (schema == "DIST_NAME") {
        this.model.DIST_NAME = String(newVal).toUpperCase();
      } else if (schema == "AAR_REPR_NAME") {
        this.model.AAR_REPR_NAME = String(newVal).toUpperCase();
      } else if (schema == "CEO_REPR_NAME") {
        this.model.CEO_REPR_NAME = String(newVal).toUpperCase();
      } else if (schema == "COMPL_NAME") {
        this.model.COMPL_NAME = String(newVal).toUpperCase();
      } else if (schema == "UTS_NAME") {
        this.model.UTS_NAME = String(newVal).toUpperCase();
      } else if (schema == "PRS_NAME") {
        this.model.PRS_NAME = String(newVal).toUpperCase();
      } else if (schema == "TRAIN_NAME") {
        this.model.TRAIN_NAME = String(newVal).toUpperCase();
      } else if (schema == "AR_REPR_POSITION") {
        this.model.AR_REPR_POSITION = String(newVal).toUpperCase();
      } else if (schema == "AAR_REPR_POSITION") {
        this.model.AAR_REPR_POSITION = String(newVal).toUpperCase();
      } else if (schema == "CEO_REPR_POSITION") {
        this.model.CEO_REPR_POSITION = String(newVal).toUpperCase();
      } else if (schema == "DIST_REGI_NUM1") {
        this.model.DIST_REGI_NUM1 = String(newVal)
          .toUpperCase()
          .replace(/ /g, "");
      } else if (schema == "DIST_REGI_NUM2") {
        this.model.DIST_REGI_NUM2 = String(newVal)
          .toUpperCase()
          .replace(/ /g, "");
      } else if (schema == "DIST_EMAIL") {
        //this.model.DIST_EMAIL = String(newVal).toUpperCase();
        if (this.distributorProfileDetails.DIST_EMAIL !== this.model.DIST_EMAIL) {
          this.visibleEmailTac = true;
        }else{
          this.visibleEmailTac = false;
        }
      } else if (schema == "AR_REPR_EMAIL") {
        this.model.AR_REPR_EMAIL = String(newVal).toUpperCase();
      } else if (schema == "AAR_REPR_EMAIL") {
        this.model.AAR_REPR_EMAIL = String(newVal).toUpperCase();
      } else if (schema == "COMPL_EMAIL") {
        this.model.COMPL_EMAIL = String(newVal).toUpperCase();
      } else if (schema == "UTS_EMAIL") {
        this.model.UTS_EMAIL = String(newVal).toUpperCase();
      } else if (schema == "PRS_EMAIL") {
        this.model.PRS_EMAIL = String(newVal).toUpperCase();
      } else if (schema == "TRAIN_EMAIL") {
        this.model.TRAIN_EMAIL = String(newVal).toUpperCase();
      } else if (schema == "CEO_REPR_EMAIL") {
        this.model.CEO_REPR_EMAIL = String(newVal).toUpperCase();
      } else if (schema == "OTHER_EMAIL") {
        this.model.OTHER_EMAIL = String(newVal).toUpperCase();
      } else if (schema == "DIST_ADDR_1") {
        this.model.DIST_ADDR_1 = String(newVal).toUpperCase();
      } else if (schema == "DIST_ADDR_2") {
        this.model.DIST_ADDR_2 = String(newVal).toUpperCase();
      } else if (schema == "DIST_ADDR_3") {
        this.model.DIST_ADDR_3 = String(newVal).toUpperCase();
      } else if (schema == "DIR_NAME") {
        this.model.DIR_NAME = String(newVal).toUpperCase();
      } else if (schema == "EDIT_DIR_NAME") {
        this.model.EDIT_DIR_NAME = String(newVal).toUpperCase();
      } else if (schema == "FINANCIAL_PLANNER_NAME") {
        this.model.FINANCIAL_PLANNER_NAME = String(newVal).toUpperCase();
      }
      //  else if (schema == "DIR_NAME_NEW") {
      //   this.model.DIR_NAME_NEW = String(newVal).toUpperCase();
      // }
    },
    handleFileChange(e) {
      this.$emit("input", e.target.files[0]);
      this.fileName1 = e.target.files[0].name;
      console.log(e.target.files[0].name);
      // if (this.$refs.fileName1.files[0]) {
      //   console.log(this.$refs.fileName1.files[0].name);
      //   this.model.fileName1 = this.$refs.fileName1.files[0].name;
      // }
      // if (this.$refs.fileName2.files[0]) {
      //   console.log(this.$refs.fileName2.files[0].name);
      //   this.model.fileName2 = this.$refs.fileName2.files[0].name;
      // }
      // if (this.$refs.fileName3.files[0]) {
      //   console.log(this.$refs.fileName3.files[0].name);
      //   this.model.fileName3 = this.$refs.fileName3.files[0].name;
      // }
      // if (this.$refs.fileName4.files[0]) {
      //   console.log(this.$refs.fileName4.files[0].name);
      //   this.model.fileName4 = this.$refs.fileName4.files[0].name;
      // }
    },
    onComplete() {
      alert(JSON.stringify(this.model));
      // this.$router.push("/admin/director-details");
    },
    validatePassword(value) {
      //* * must contain letter only (lowercase and uppercase) */
      const expression1 = /^[a-zA-Z]+$/;
      // eslint-disable-next-line no-unused-vars
      const expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/;
      //* * must contain at least one uppercase letter, one lower case letter and one number */
      // eslint-disable-next-line no-unused-vars
      const expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/;
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character */
      // eslint-disable-next-line no-unused-vars
      const expression5 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      // eslint-disable-next-line no-unused-vars
      const expression6 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/;

      console.log(expression1.test(value));
      if (!expression1.test(value)) {
        this.passwordStrength = "";
        return ["Password must contain letter only"];
      }
    },
    isEqualTo(value, field, model) {
      // eslint-disable-next-line no-undef
      if (!_.has(field, "equals")) return ["Confirm password is required"];
      // eslint-disable-next-line no-undef
      const a = _.get(model, _.get(field, "equals"));
      const b = value;
      // eslint-disable-next-line no-undef
      if (_.isEqual(a, b)) return [];
      return ["Password do not match"];
    },
    validateFirstTab() {
      return this.$refs.firstTabForm.validate();
    },
    validateFirstAddTab() {
      return this.$refs.firstAddTabForm.validate();
    },
    validateSecondTab: function() {
      return this.$refs.secondTabForm.validate();
    },
    validateThirdTab: function() {
      if (this.$refs.thirdTabFormCEO.validate()) {
        if (this.directorList.length == 0) {
          console.log("no director");
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
      // return this.$refs.thirdTabFormCEO.validate();
    },
    validateFourthTab() {
      return this.$refs.fourthTabForm.validate();
    },
    validateFifthTab() {
      return this.$refs.fifthTabForm.validate();
    },
    validateDeclarationSchema() {
      return this.$refs.declarationRef.validate();
    }
  }
};
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
.display-inline label {
  display: inline !important;
  padding: 5px;
}
.app-layout__main {
  background: #e8e8e8;
}
.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px; // hide bottom border
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
<style scoped>
.widthModal {
  width: 80%;
}
.width {
  width: 100%;
}
.widthName {
  width: 5%;
}
</style>
