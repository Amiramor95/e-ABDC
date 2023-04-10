<template>
  <div class="flex xs12 md12 xl12">
    <va-inner-loading :loading="isLoad">
      <vudal name="showStaticModalOK" class="widthModal">
        <div class="content">
          <p>Your submission has been submitted, please wait for review.</p>
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
      <vudal name="showInstructionModal" class="widthModal">
        <div class="content">
          <p>Please insert your remark for this distributor Update.</p>
        </div>
        <div class="actions">
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-success btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Ok
          </button>
        </div>
      </vudal>
      <vudal name="showConfirmModal" class="widthModal">
        <div class="content">
          <p>Verify that data is submitted correctly?</p>
        </div>
        <div class="actions">
          <button
            @click="submit(0)"
            type="button"
            class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
          >
            <i class="fa fa-times" /> &nbsp; No
          </button>
          <button
            type="button"
            class="cancel vudal-btn mr-2 btn btn-success btn-fill btn-md"
          >
            <i class="fa fa-edit" /> &nbsp; Yes
          </button>
        </div>
      </vudal>
      <va-card
        class="striped-tabled-with-hover"
        body-classes="table-full-width table-responsive"
      >
        <h4 slot="header" class="card-title">
          Details of Distributor
        </h4>
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
          <div>
            <div v-if="currentTab === 'tab1'">
              <div>
                <br />
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th style="width: 20%"><b>Details</b></th>
                      <th style="width: 2%"><b>:</b></th>
                      <th class="type1">
                        <b>OLD DATA</b>
                      </th>
                      <th class="type1">
                        <b>NEW DATA</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="width: 20%">Company Logo</td>
                      <td style="width: 2%">:</td>
                      <td class="type1">
                        <div v-for="(logo1, index) in companyLogo" :key="index">
                            <img :src="logo1.url" width="auto" height="100">
                        </div>
                      </td>
                      <td class="type2">
                        <div v-for="(logo2, index) in companyLogoTemp" :key="index">
                            <img :src="logo2.url" width="auto" height="100">
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 20%">Distributor Name</td>
                      <td style="width: 1%">:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_NAME }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_NAME }}
                      </td>
                    </tr>
                    <tr>
                      <td>Registration Number</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_REGI_NUM1 }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_REGI_NUM1 }}
                      </td>
                    </tr>
                    <tr>
                      <td>New Registration Number</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_REGI_NUM2 }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_REGI_NUM2 }}
                      </td>
                    </tr>
                    <tr>
                      <td>Date of Incorporation</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_DATE_INCORP }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_DATE_INCORP }}
                      </td>
                    </tr>
                    <tr>
                      <td>Type of Setup</td>
                      <td>:</td>
                      <td class="type1">
                        <span v-if="this.distributorDetail.DIST_TYPE_SETUP == 1">PUBLIC LIMITED COMPANY / BERHAD</span>
                        <span v-if="this.distributorDetail.DIST_TYPE_SETUP == 2">PRIVATE LIMITED COMPANY / SENDIRIAN BERHAD</span>
                      </td>

                      <td class="type2">
                        <span v-if="this.distributorDetailTemp.DIST_TYPE_SETUP == 1">PUBLIC LIMITED COMPANY / BERHAD</span>
                        <span v-if="this.distributorDetailTemp.DIST_TYPE_SETUP == 2">PRIVATE LIMITED COMPANY / SENDIRIAN BERHAD</span>
                      </td>
                    </tr>

                    <tr>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_TYPE_SETUP == 1"
                      >
                        SSM Form 8
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_TYPE_SETUP == 2"
                      >
                        SSM Form 9
                      </td>
                      <td style="width: 2%;">:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_TYPE_SETUP == 2"
                      >
                        <VueFileAgent
                          :uploadUrl="'https://example.com'"
                          :uploadHeaders="{}"
                          :downloadable="false"
                          :readonly="true"
                          :multiple="false"
                          :deletable="false"
                          :editable="false"
                          :linkable="true"
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
                          v-model="ssmForm9"
                        ></VueFileAgent>
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_TYPE_SETUP == 1"
                      >
                        <VueFileAgent
                          :uploadUrl="'https://example.com'"
                          :uploadHeaders="{}"
                          :downloadable="false"
                          :readonly="true"
                          :multiple="false"
                          :deletable="false"
                          :editable="false"
                          :linkable="true"
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
                          v-model="ssmForm8"
                        ></VueFileAgent>
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetail.DIST_TYPE_SETUP == 2"
                      >
                        <VueFileAgent
                          :uploadUrl="'https://example.com'"
                          :uploadHeaders="{}"
                          :downloadable="false"
                          :readonly="true"
                          :multiple="false"
                          :deletable="false"
                          :editable="false"
                          :linkable="true"
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
                          v-model="ssmForm9Temp"
                        ></VueFileAgent>
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetail.DIST_TYPE_SETUP == 1"
                      >
                        <VueFileAgent
                          :uploadUrl="'https://example.com'"
                          :uploadHeaders="{}"
                          :downloadable="false"
                          :readonly="true"
                          :multiple="false"
                          :deletable="false"
                          :editable="false"
                          :linkable="true"
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
                          v-model="ssmForm8Temp"
                        ></VueFileAgent>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        SSM Form 13
                      </td>
                      <td style="width: 2%;">:</td>
                      <td class="type1" v-if="ssmForm13.length > 0 ">
                        <VueFileAgent
                          :uploadUrl="'https://example.com'"
                          :uploadHeaders="{}"
                          :downloadable="false"
                          :readonly="true"
                          :multiple="false"
                          :deletable="false"
                          :editable="false"
                          :linkable="true"
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
                          v-model="ssmForm13"
                        ></VueFileAgent>
                      </td>
                      <td class="type2">
                        <VueFileAgent
                          :uploadUrl="'https://example.com'"
                          :uploadHeaders="{}"
                          :downloadable="false"
                          :readonly="true"
                          :multiple="false"
                          :deletable="false"
                          :editable="false"
                          :linkable="true"
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
                          v-model="ssmForm13Temp"
                        ></VueFileAgent>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" style="font-weight:bold;">
                        Registered Address
                      </td>
                    </tr>

                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_ADDR_1 }}
                        {{ this.distributorDetail.DIST_ADDR_2 }}
                        {{ this.distributorDetail.DIST_ADDR_3 }}
                      </td>

                      <td class="type2">
                        <span v-if="this.distributorDetailTemp.DIST_ADDR_1 != '-' && this.distributorDetailTemp.DIST_ADDR_1 !=null">
                          {{ this.distributorDetailTemp.DIST_ADDR_1 }},
                        </span>

                        <span v-if="this.distributorDetailTemp.DIST_ADDR_2 != '-' && this.distributorDetailTemp.DIST_ADDR_2 !=null">
                          {{ this.distributorDetailTemp.DIST_ADDR_2 }},
                        </span>

                        <span v-if="this.distributorDetailTemp.DIST_ADDR_3 != '-' && this.distributorDetailTemp.DIST_ADDR_3 !=null">
                          {{ this.distributorDetailTemp.DIST_ADDR_3 }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Country</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.SET_PARAM_COUNTRY }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.SET_PARAM_COUNTRY }}
                      </td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetail.SET_PARAM_STATE }}
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetail.DIST_STATE2 }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetailTemp.SET_PARAM_STATE }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetailTemp.DIST_STATE2 }}
                      </td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetail.SET_CITY_NAME }}
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetail.DIST_CITY2 }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetailTemp.SET_CITY_NAME }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetailTemp.DIST_CITY2 }}
                      </td>
                    </tr>
                    <tr>
                      <td>Postal</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetail.POSTCODE_NO }}
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetail.DIST_POSTAL2 }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetailTemp.POSTCODE_NO }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetailTemp.DIST_POSTAL2 }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" style="font-weight:bold;">
                        Business Address
                      </td>
                    </tr>

                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_BIZ_ADDR_1 }}
                        {{ this.distributorDetail.DIST_BIZ_ADDR_2 }}
                        {{ this.distributorDetail.DIST_BIZ_ADDR_3 }}
                      </td>
                      <td class="type2">
                        <span v-if="this.distributorDetailTemp.DIST_BIZ_ADDR_1 != '-' && this.distributorDetailTemp.DIST_BIZ_ADDR_1 !=null">
                          {{ this.distributorDetailTemp.DIST_BIZ_ADDR_1 }},
                        </span>

                        <span v-if="this.distributorDetailTemp.DIST_BIZ_ADDR_2 != '-' && this.distributorDetailTemp.DIST_BIZ_ADDR_2 !=null">
                          {{ this.distributorDetailTemp.DIST_BIZ_ADDR_2 }},
                        </span>

                        <span v-if="this.distributorDetailTemp.DIST_BIZ_ADDR_3 != '-' && this.distributorDetailTemp.DIST_BIZ_ADDR_3 !=null">
                          {{ this.distributorDetailTemp.DIST_BIZ_ADDR_3 }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Country</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.SET_PARAM_COUNTRY }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.SET_PARAM_COUNTRY }}
                      </td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetail.SET_PARAM_STATE }}
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetail.DIST_STATE2 }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetailTemp.SET_PARAM_STATE }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetailTemp.DIST_STATE2 }}
                      </td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetail.SET_CITY_NAME }}
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetail.DIST_CITY2 }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetailTemp.SET_CITY_NAME }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetailTemp.DIST_CITY2 }}
                      </td>
                    </tr>
                    <tr>
                      <td>Postal</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetail.POSTCODE_NO }}
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetail.DIST_POSTAL2 }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                      >
                        {{ this.distributorDetailTemp.POSTCODE_NO }}
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                      >
                        {{ this.distributorDetailTemp.DIST_POSTAL2 }}
                      </td>
                    </tr>
                    <tr>
                      <td>Office Phone Number</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="
                          this.distributorDetail.DIST_PHONE_NUMBER == null ||
                            this.distributorDetail.DIST_PHONE_NUMBER == '-'
                        "
                      >
                        -
                      </td>
                      <td class="type1">
                        <span v-if="this.distributorDetail.DIST_PHONE_NUMBER != '-' && this.distributorDetail.DIST_PHONE_NUMBER !=null">
                          0{{
                            this.distributorDetail.DIST_PHONE_NUMBER.substring(
                              0,
                              1
                            )
                          }}-{{
                            this.distributorDetail.DIST_PHONE_NUMBER.substring(
                              1,
                              10
                            )
                          }}
                        </span>
                      </td>
                      <td class="type2">
                        <span v-if="this.distributorDetailTemp.DIST_PHONE_NUMBER != '-' && this.distributorDetailTemp.DIST_PHONE_NUMBER !=null">
                          0{{
                            this.distributorDetailTemp.DIST_PHONE_NUMBER.substring(
                              0,
                              1
                            )
                          }}-{{
                            this.distributorDetailTemp.DIST_PHONE_NUMBER.substring(
                              1,
                              10
                            )
                          }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Extension Number</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_PHONE_EXTENSION }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_PHONE_EXTENSION }}
                      </td>
                    </tr>
                    <tr>
                      <td>Fax Number</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="
                          this.distributorDetail.DIST_FAX_NUMBER == null ||
                            this.distributorDetail.DIST_FAX_NUMBER == '-'
                        "
                      >
                        -
                      </td>
                      <td class="type1">
                        <span v-if="this.distributorDetail.DIST_FAX_NUMBER != '-' && this.distributorDetail.DIST_FAX_NUMBER != null">
                          0{{
                            this.distributorDetail.DIST_FAX_NUMBER.substring(0, 1)
                          }}-{{
                            this.distributorDetail.DIST_FAX_NUMBER.substring(1, 10)
                          }}
                        </span>
                      </td>
                      <td class="type2">
                        <span v-if="this.distributorDetailTemp.DIST_FAX_NUMBER != '-' && this.distributorDetailTemp.DIST_FAX_NUMBER != null">
                          0{{
                            this.distributorDetailTemp.DIST_FAX_NUMBER.substring(
                              0,
                              1
                            )
                          }}-{{
                            this.distributorDetailTemp.DIST_FAX_NUMBER.substring(
                              1,
                              10
                            )
                          }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Mobile Phone Number</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="
                          this.distributorDetail.DIST_MOBILE_NUMBER == null ||
                            this.distributorDetail.DIST_MOBILE_NUMBER == '-'
                        "
                      >
                        -
                      </td>
                      <td class="type1">
                        <span v-if="this.distributorDetail.DIST_MOBILE_NUMBER != '-' && this.distributorDetail.DIST_MOBILE_NUMBER != null">
                          01{{
                            distributorDetail.DIST_MOBILE_NUMBER.substring(0, 1)
                          }}-{{
                            distributorDetail.DIST_MOBILE_NUMBER.substring(1, 10)
                          }}
                        </span>
                      </td>
                      <td class="type2">
                        <span v-if="this.distributorDetailTemp.DIST_MOBILE_NUMBER != '-' && this.distributorDetailTemp.DIST_MOBILE_NUMBER != null">
                          01{{
                            distributorDetailTemp.DIST_MOBILE_NUMBER.substring(
                              0,
                              1
                            )
                          }}-{{
                            distributorDetailTemp.DIST_MOBILE_NUMBER.substring(
                              1,
                              10
                            )
                          }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Email Address</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_EMAIL }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_EMAIL }}
                      </td>
                    </tr>
                    <tr>
                      <td>Company Website URL</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_COMPANY_WEBSITE != null"
                      >
                        {{ this.distributorDetail.DIST_COMPANY_WEBSITE }}
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_COMPANY_WEBSITE == null"
                      >
                        -
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_COMPANY_WEBSITE }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="content">
                <h4 slot="header" class="card-title">
                  Section Review
                </h4>
                <br />
                <vue-form-generator
                  :model="model"
                  :schema="remarkProfileschema"
                  :options="formOptions"
                  @model-updated="onModelUpdated"
                  ref="statusForm"
                >
                </vue-form-generator>
                <br />
                <!-- <div id="app"> -->
                <!-- <VueFileAgent
                  :uploadUrl="'https://example.com'"
                  :uploadHeaders="{}"
                  ref="vueFileAgent"
                  :theme="'list'"
                  :multiple="false"
                  :deletable="true"
                  :meta="true"
                  :linkable="true"
                  :accept="'.pdf,.doc,.docx,.ods'"
                  :maxSize="'2MB'"
                  :helpText="'Choose document'"
                  :errorText="{
                    type: 'Invalid file type. Only pdf Allowed',
                    size: 'Files should not exceed 2MB in size'
                  }"
                  v-model="fileRemark"
                  @select="filesSelected($event, 1)"
                ></VueFileAgent> -->
                <!-- </div> -->
              </div>
              <br />
            </div>

            <div v-if="currentTab === 'tab2'">
              <div>
                <br />
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th style="width: 20%"><b>Details</b></th>
                      <th style="width: 2%"><b>:</b></th>
                      <th class="type1">
                        <b>OLD DATA</b>
                      </th>
                      <th class="type1">
                        <b>NEW DATA</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="width: 20%">
                        Financial Status (Total Paid-Up Capital (RM))
                      </td>
                      <td style="width: 1%">:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_PAID_UP_CAPITAL }}
                      </td>
                      <td class="type2">
                        <span v-if="this.distributorDetailTemp.DIST_PAID_UP_CAPITAL != '-' && this.distributorDetailTemp.DIST_PAID_UP_CAPITAL !=null">
                          {{ this.distributorDetailTemp.DIST_PAID_UP_CAPITAL }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Type of Structure</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_TYPE_STRUCTURE == 1"
                      >
                        SINGLE-TIER
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_TYPE_STRUCTURE == 2"
                      >
                        MULTI-TIER
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.DIST_TYPE_STRUCTURE == 1"
                      >
                        SINGLE-TIER
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.DIST_TYPE_STRUCTURE == 2"
                      >
                        MULTI-TIER
                      </td>
                    </tr>
                    <tr>
                      <td>Marketing Approach</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_MARKETING_APPROACH == 1"
                      >
                        DIRECT
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_MARKETING_APPROACH == 2"
                      >
                        NOMINEE
                      </td>
                      <td
                        class="type2"
                        v-if="
                          this.distributorDetailTemp.DIST_MARKETING_APPROACH == 1
                        "
                      >
                        DIRECT
                      </td>
                      <td
                        class="type2"
                        v-if="
                          this.distributorDetailTemp.DIST_MARKETING_APPROACH == 2
                        "
                      >
                        NOMINEE
                      </td>
                    </tr>
                    <tr>
                      <td>Proposed No. of Distribution Point</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_NUM_DIST_POINT }}
                      </td>

                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_NUM_DIST_POINT }}
                      </td>
                    </tr>
                    <tr>
                      <td>Proposed Number of Consultant</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_NUM_CONSULTANT }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_NUM_CONSULTANT }}
                      </td>
                    </tr>
                    <tr>
                      <td>Indemnity of Insurance</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_INSURANCE }}
                      </td>
                      <td class="type2">
                        <span v-if="this.distributorDetailTemp.DIST_INSURANCE != '-' && this.distributorDetailTemp.DIST_INSURANCE !=null">
                          {{ this.distributorDetailTemp.DIST_INSURANCE }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Expiry Date For Indemnity of Insurance</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_DATE_INCORP }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_DATE_INCORP }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 slot="header" class="card-title">
                Section Review
              </h4>
              <br />
              <vue-form-generator
                :model="model"
                :schema="remarkDIschema"
                :options="formOptions"
                @model-updated="onModelUpdated"
                ref="statusForm"
              >
              </vue-form-generator>
              <br />
            </div>

            <div v-if="currentTab === 'tab3'">
              <br />
              <div>
                <button
                  :class="visibleCeoDetails ? null : 'collapsed'"
                  :aria-expanded="visibleCeoDetails ? 'true' : 'false'"
                  aria-controls="collapse-ceo"
                  @click="visibleCeoDetails = !visibleCeoDetails"
                  type="button"
                  class="btn btn-warning btn-fill btn-md"
                >
                  CEO Profile &nbsp;
                  <i class="fa fa-caret-square-o-down" />
                </button>
                &nbsp;
                <button
                  :class="visibleDirectorDetails ? null : 'collapsed'"
                  :aria-expanded="visibleDirectorDetails ? 'true' : 'false'"
                  aria-controls="collapse-director"
                  @click="visibleDirectorDetails = !visibleDirectorDetails"
                  type="button"
                  class="btn btn-warning btn-fill btn-md"
                >
                  Director Details &nbsp;
                  <i class="fa fa-caret-square-o-down" />
                </button>
                <br />
                <b-collapse id="collapse-ceo" v-model="visibleCeoDetails"  class="mt-2">
                  <br />
                  <h4>CEO Profile</h4>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ distributorRprCEO.USER_SAL_NAME }}
                          {{ distributorRprCEO.REPR_NAME }}
                        </td>
                        <td class="type2">
                          <span v-if="this.distributorRprTempCEO.USER_SAL_NAME != '-' && this.distributorRprTempCEO.USER_SAL_NAME !=null">
                            {{ distributorRprTempCEO.USER_SAL_NAME }}
                          </span>
                          <span v-else>{{ distributorRprCEO.USER_SAL_NAME }}</span>
                          <span v-if="this.distributorRprTempCEO.REPR_NAME != '-' && this.distributorRprTempCEO.REPR_NAME !=null">
                            {{ distributorRprTempCEO.REPR_NAME }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>:</td>
                        <td class="type1">{{ distributorRprCEO.REPR_POSITION }}</td>
                        <td class="type2">
                          <span v-if="this.distributorRprTempCEO.REPR_POSITION != '-' && this.distributorRprTempCEO.REPR_POSITION !=null">
                            {{ distributorRprTempCEO.REPR_POSITION }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>NRIC No</td>
                        <td>:</td>
                        <td class="type1">
                          <span v-if="distributorRprCEO.REPR_CITIZEN == 1">
                              <span v-if="this.distributorRprCEO.REPR_NRIC != '-' && this.distributorRprCEO.REPR_NRIC !=null">
                                {{
                                  distributorRprCEO.REPR_NRIC.substring(0, 6) +
                                    "-" +
                                    distributorRprCEO.REPR_NRIC.substring(6, 8) +
                                    "-" +
                                    distributorRprCEO.REPR_NRIC.substring(8, 13)
                                }}
                              </span>
                            </span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempCEO.REPR_CITIZEN == 1">
                            <span v-if="this.distributorRprTempCEO.REPR_NRIC != '-' && this.distributorRprTempCEO.REPR_NRIC !=null">
                              {{
                                distributorRprTempCEO.REPR_NRIC.substring(0, 6) +
                                  "-" +
                                  distributorRprTempCEO.REPR_NRIC.substring(6, 8) +
                                  "-" +
                                  distributorRprTempCEO.REPR_NRIC.substring(8, 13)
                              }}
                            </span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td><b>Passport No</b></td>
                        <td>:</td>
                        <td class="type1" >
                          <span v-if="distributorRprCEO.REPR_CITIZEN == 2">{{ distributorRprCEO.REPR_PASS_NUM }}</span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempCEO.REPR_CITIZEN == 2">
                            <span v-if="this.distributorRprTempCEO.REPR_PASS_NUM != '-' && this.distributorRprTempCEO.REPR_PASS_NUM !=null">
                              {{ distributorRprTempCEO.REPR_PASS_NUM }}
                            </span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td><b>Passport Expiry Date</b></td>
                        <td>:</td>
                        <td class="type1">
                          <span v-if="distributorRprCEO.REPR_CITIZEN == 2">{{ distributorRprCEO.REPR_PASS_EXP }}</span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempCEO.REPR_CITIZEN == 2">
                            <span v-if="this.distributorRprTempCEO.REPR_PASS_EXP != '-' && this.distributorRprTempCEO.REPR_PASS_EXP !=null">
                              {{ distributorRprTempCEO.REPR_PASS_EXP }}
                            </span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <td
                          v-if="
                            distributorRprCEO.REPR_TELEPHONE == null ||
                              distributorRprCEO.REPR_TELEPHONE == '-'
                          "
                        >
                          -
                        </td>
                        <td class="type1" v-if="distributorRprCEO.REPR_TELEPHONE != '-' && distributorRprCEO.REPR_TELEPHONE != null">
                          <span>
                            0{{ distributorRprCEO.REPR_TELEPHONE.substring(0,1) }}-{{ distributorRprCEO.REPR_TELEPHONE.substring(1,10) }}
                          </span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempCEO.REPR_TELEPHONE != '-' && distributorRprTempCEO.REPR_TELEPHONE != null">
                            0{{ distributorRprTempCEO.REPR_TELEPHONE.substring(0,1) }}-{{ distributorRprTempCEO.REPR_TELEPHONE.substring(1,10) }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td
                          v-if="
                            distributorRprCEO.REPR_PHONE_EXTENSION == null ||
                              distributorRprCEO.REPR_PHONE_EXTENSION == '-'
                          "
                        >
                          -
                        </td>
                        <td class="type1" v-if="distributorRprCEO.REPR_PHONE_EXTENSION != '-' && distributorRprCEO.REPR_PHONE_EXTENSION != null">
                            {{ distributorRprCEO.REPR_PHONE_EXTENSION }}
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempCEO.REPR_PHONE_EXTENSION != '-' && distributorRprTempCEO.REPR_PHONE_EXTENSION != null">
                            {{ distributorRprTempCEO.REPR_PHONE_EXTENSION }}
                          </span>
                        </td>
                      </tr>

                     <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>

                        <td
                          v-if="
                            distributorRprCEO.REPR_MOBILE_NUMBER == null ||
                              distributorRprCEO.REPR_MOBILE_NUMBER == '-'
                          "
                        >
                          -
                        </td>
                        <td class="type1" v-if="distributorRprCEO.REPR_MOBILE_NUMBER != '-' && distributorRprCEO.REPR_MOBILE_NUMBER != null">
                          <span>
                            0{{ distributorRprCEO.REPR_MOBILE_NUMBER.substring(0,2) }}-{{ distributorRprCEO.REPR_MOBILE_NUMBER.substring(2,10) }}
                          </span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempCEO.REPR_MOBILE_NUMBER != '-' && distributorRprTempCEO.REPR_MOBILE_NUMBER != null">
                            0{{ distributorRprTempCEO.REPR_MOBILE_NUMBER.substring(0,2) }}-{{ distributorRprTempCEO.REPR_MOBILE_NUMBER.substring(2,10) }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td class="type1">{{ distributorRprCEO.REPR_EMAIL }}</td>
                        <td class="type2">
                          <span v-if="distributorRprTempCEO.REPR_EMAIL != '-' && distributorRprTempCEO.REPR_EMAIL != null">
                            {{ distributorRprTempCEO.REPR_EMAIL }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </b-collapse>
                <b-collapse id="collapse-director" v-model="visibleDirectorDetails"  class="mt-2">
                  <br />
                  <h4>Director Details</h4>
                  <table class="table">
                    <tbody>
                      <tr style="background-color: lightgrey">
                        <th>No</th>
                        <th>Name</th>
                        <th>NRIC No</th>
                        <th>Effective Date</th>
                        <th>End Date</th>
                      </tr>
                      <tr
                        v-for="(item, index) in this.distributorDetail.DATADIR"
                        :key="index"
                      >
                        <td style="width: 10%">{{ index + 1 }}</td>
                        <td style="width: 30%">
                          {{ item.DIR_NAME_DISPLAY }}
                        </td>
                        <td style="width: 20%"> {{
                          (item.DIR_NRIC) ? (
                          item.DIR_NRIC.substring(0, 6) +
                          "-" +
                          item.DIR_NRIC.substring(6, 8) +
                          "-" +
                          item.DIR_NRIC.substring(8, 13)
                          ) : ''
                          }}</td>
                        <td style="width: 20%">
                          {{ item.DIR_DATE_EFFECTIVE_DISPLAY }}
                        </td>
                        <td style="width: 20%">
                          {{ item.DIR_DATE_END_DISPLAY }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </b-collapse>
              </div>
              <br />
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th style="width: 20%"><b>Details</b></th>
                    <th style="width: 2%"><b>:</b></th>
                    <th class="type1">
                      <b>OLD DATA</b>
                    </th>
                    <th class="type1">
                      <b>NEW DATA</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="width: 20%">
                      SSM Form 49
                    </td>
                    <td style="width: 2%">:</td>
                    <td class="type1">
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="ssmForm49"
                      ></VueFileAgent>
                    </td>
                    <td class="type2">
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="ssmForm49Temp"
                      ></VueFileAgent>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 20%">
                      Compliance Declaration
                    </td>
                    <td style="width: 2%">:</td>
                    <td class="type1">
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="complianceDeclaration"
                      ></VueFileAgent>
                    </td>
                    <td class="type2">
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="complianceDeclarationTemp"
                      ></VueFileAgent>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 20%">
                      SSM Form 24
                    </td>
                    <td style="width: 2%">:</td>
                    <td class="type1">
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="ssmForm24"
                      ></VueFileAgent>
                    </td>
                    <td class="type2">
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="ssmForm24Temp"
                      ></VueFileAgent>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />

              <h4 slot="header" class="card-title">
                Section Review
              </h4>
              <br />
              <div>
                <vue-form-generator
                  :model="model"
                  :schema="remarkCEOnDIRschema"
                  :options="formOptions"
                  @model-updated="onModelUpdated"
                  ref="statusForm"
                >
                </vue-form-generator>
              </div>
              <br />
            </div>

            <div v-if="currentTab === 'tab4'">
              <div>
                <br />
                <button
                  v-b-toggle.collapse-AR
                  type="button"
                  class="btn btn-warning btn-fill btn-md"
                >
                  Authorised Representative &nbsp;
                  <i class="fa fa-caret-square-o-down" />
                </button>
                &nbsp;
                <button
                  v-b-toggle.collapse-AAR
                  type="button"
                  class="btn btn-warning btn-fill btn-md"
                >
                  Alternate Authorised Representative &nbsp;
                  <i class="fa fa-caret-square-o-down" />
                </button>

                <b-collapse id="collapse-AR" class="mt-2">
                  <br />
                  <h4>Authorised Representative (AR)</h4>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ distributorRprAR.USER_SAL_NAME }}
                          {{ distributorRprAR.REPR_NAME }}
                        </td>
                        <td class="type2">
                          <span v-if="this.distributorRprTempAR.USER_SAL_NAME != '-' && this.distributorRprTempAR.USER_SAL_NAME !=null">
                            {{ distributorRprTempAR.USER_SAL_NAME }}
                          </span>
                          <span v-else>{{ distributorRprAR.USER_SAL_NAME }}</span>
                          <span v-if="this.distributorRprTempAR.REPR_NAME != '-' && this.distributorRprTempAR.REPR_NAME !=null">
                            {{ distributorRprTempAR.REPR_NAME }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>:</td>
                        <td class="type1">{{ distributorRprAR.REPR_POSITION }}</td>
                        <td class="type2">
                          <span v-if="this.distributorRprTempAR.REPR_POSITION != '-' && this.distributorRprTempAR.REPR_POSITION !=null">
                            {{ distributorRprTempAR.REPR_POSITION }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>NRIC No</td>
                        <td>:</td>
                        <td class="type1">
                          <span v-if="distributorRprAR.REPR_CITIZEN == 1">
                              <span v-if="this.distributorRprAR.REPR_NRIC != '-' && this.distributorRprAR.REPR_NRIC !=null">
                                {{
                                  distributorRprAR.REPR_NRIC.substring(0, 6) +
                                    "-" +
                                    distributorRprAR.REPR_NRIC.substring(6, 8) +
                                    "-" +
                                    distributorRprAR.REPR_NRIC.substring(8, 13)
                                }}
                              </span>
                            </span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAR.REPR_CITIZEN == 1">
                            <span v-if="this.distributorRprTempAR.REPR_NRIC != '-' && this.distributorRprTempAR.REPR_NRIC !=null">
                              {{
                                distributorRprTempAR.REPR_NRIC.substring(0, 6) +
                                  "-" +
                                  distributorRprTempAR.REPR_NRIC.substring(6, 8) +
                                  "-" +
                                  distributorRprTempAR.REPR_NRIC.substring(8, 13)
                              }}
                            </span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td><b>Passport No</b></td>
                        <td>:</td>
                        <td class="type1" >
                          <span v-if="distributorRprAR.REPR_CITIZEN == 2">{{ distributorRprAR.REPR_PASS_NUM }}</span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAR.REPR_CITIZEN == 2">
                            <span v-if="this.distributorRprTempAR.REPR_PASS_NUM != '-' && this.distributorRprTempAR.REPR_PASS_NUM !=null">
                              {{ distributorRprTempAR.REPR_PASS_NUM }}
                            </span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td><b>Passport Expiry Date</b></td>
                        <td>:</td>
                        <td class="type1">
                          <span v-if="distributorRprAR.REPR_CITIZEN == 2">{{ distributorRprAR.REPR_PASS_EXP }}</span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAR.REPR_CITIZEN == 2">
                            <span v-if="this.distributorRprTempAR.REPR_PASS_EXP != '-' && this.distributorRprTempAR.REPR_PASS_EXP !=null">
                              {{ distributorRprTempAR.REPR_PASS_EXP }}
                            </span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <td
                          v-if="
                            distributorRprAR.REPR_TELEPHONE == null ||
                              distributorRprAR.REPR_TELEPHONE == '-'
                          "
                        >
                          -
                        </td>
                        <td class="type1" v-if="distributorRprAR.REPR_TELEPHONE != '-' && distributorRprAR.REPR_TELEPHONE != null">
                          <span>
                            0{{ distributorRprAR.REPR_TELEPHONE.substring(0,1) }}-{{ distributorRprAR.REPR_TELEPHONE.substring(1,10) }}
                          </span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAR.REPR_TELEPHONE != '-' && distributorRprTempAR.REPR_TELEPHONE != null">
                            0{{ distributorRprTempAR.REPR_TELEPHONE.substring(0,1) }}-{{ distributorRprTempAR.REPR_TELEPHONE.substring(1,10) }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td
                          v-if="
                            distributorRprAR.REPR_PHONE_EXTENSION == null ||
                              distributorRprAR.REPR_PHONE_EXTENSION == '-'
                          "
                        >
                          -
                        </td>
                        <td class="type1" v-if="distributorRprAR.REPR_PHONE_EXTENSION != '-' && distributorRprAR.REPR_PHONE_EXTENSION != null">
                            {{ distributorRprAR.REPR_PHONE_EXTENSION }}
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAR.REPR_PHONE_EXTENSION != '-' && distributorRprTempAR.REPR_PHONE_EXTENSION != null">
                            {{ distributorRprTempAR.REPR_PHONE_EXTENSION }}
                          </span>
                        </td>
                      </tr>

                     <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>

                        <td
                          v-if="
                            distributorRprAR.REPR_MOBILE_NUMBER == null ||
                              distributorRprAR.REPR_MOBILE_NUMBER == '-'
                          "
                        >
                          -
                        </td>
                        <td class="type1" v-if="distributorRprAR.REPR_MOBILE_NUMBER != '-' && distributorRprAR.REPR_MOBILE_NUMBER != null">
                          <span>
                            0{{ distributorRprAR.REPR_MOBILE_NUMBER.substring(0,2) }}-{{ distributorRprAR.REPR_MOBILE_NUMBER.substring(2,10) }}
                          </span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAR.REPR_MOBILE_NUMBER != '-' && distributorRprTempAR.REPR_MOBILE_NUMBER != null">
                            0{{ distributorRprTempAR.REPR_MOBILE_NUMBER.substring(0,2) }}-{{ distributorRprTempAR.REPR_MOBILE_NUMBER.substring(2,10) }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td class="type1">{{ distributorRprAR.REPR_EMAIL }}</td>
                        <td class="type2">
                          <span v-if="distributorRprTempAR.REPR_EMAIL != '-' && distributorRprTempAR.REPR_EMAIL != null">
                            {{ distributorRprTempAR.REPR_EMAIL }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </b-collapse>

                <b-collapse id="collapse-AAR" class="mt-2">
                  <br />
                  <h4>Alternative Representative (AAR)</h4>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ distributorRprAAR.USER_SAL_NAME }}
                          {{ distributorRprAAR.REPR_NAME }}
                        </td>
                        <td class="type2">
                          <span v-if="this.distributorRprTempAAR.USER_SAL_NAME != '-' && this.distributorRprTempAAR.USER_SAL_NAME !=null">
                            {{ distributorRprTempAAR.USER_SAL_NAME }}
                          </span>
                          <span v-else>{{ distributorRprAAR.USER_SAL_NAME }}</span>
                          <span v-if="this.distributorRprTempAAR.REPR_NAME != '-' && this.distributorRprTempAAR.REPR_NAME !=null">
                            {{ distributorRprTempAAR.REPR_NAME }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>:</td>
                        <td class="type1">{{ distributorRprAAR.REPR_POSITION }}</td>
                        <td class="type2">
                          <span v-if="this.distributorRprTempAAR.REPR_POSITION != '-' && this.distributorRprTempAAR.REPR_POSITION !=null">
                            {{ distributorRprTempAAR.REPR_POSITION }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>NRIC No</td>
                        <td>:</td>
                        <td class="type1">
                          <span v-if="distributorRprAAR.REPR_CITIZEN == 1">
                              <span v-if="this.distributorRprAAR.REPR_NRIC != '-' && this.distributorRprAAR.REPR_NRIC !=null">
                                {{
                                  distributorRprAAR.REPR_NRIC.substring(0, 6) +
                                    "-" +
                                    distributorRprAAR.REPR_NRIC.substring(6, 8) +
                                    "-" +
                                    distributorRprAAR.REPR_NRIC.substring(8, 13)
                                }}
                              </span>
                            </span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAAR.REPR_CITIZEN == 1">
                            <span v-if="this.distributorRprTempAAR.REPR_NRIC != '-' && this.distributorRprTempAAR.REPR_NRIC !=null">
                              {{
                                distributorRprTempAAR.REPR_NRIC.substring(0, 6) +
                                  "-" +
                                  distributorRprTempAAR.REPR_NRIC.substring(6, 8) +
                                  "-" +
                                  distributorRprTempAAR.REPR_NRIC.substring(8, 13)
                              }}
                            </span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td><b>Passport No</b></td>
                        <td>:</td>
                        <td class="type1" >
                          <span v-if="distributorRprAAR.REPR_CITIZEN == 2">{{ distributorRprAAR.REPR_PASS_NUM }}</span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAAR.REPR_CITIZEN == 2">
                            <span v-if="this.distributorRprTempAAR.REPR_PASS_NUM != '-' && this.distributorRprTempAAR.REPR_PASS_NUM !=null">
                              {{ distributorRprTempAAR.REPR_PASS_NUM }}
                            </span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td><b>Passport Expiry Date</b></td>
                        <td>:</td>
                        <td class="type1">
                          <span v-if="distributorRprAAR.REPR_CITIZEN == 2">{{ distributorRprAAR.REPR_PASS_EXP }}</span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAAR.REPR_CITIZEN == 2">
                            <span v-if="this.distributorRprTempAAR.REPR_PASS_EXP != '-' && this.distributorRprTempAAR.REPR_PASS_EXP !=null">
                              {{ distributorRprTempAAR.REPR_PASS_EXP }}
                            </span>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <td
                          v-if="
                            distributorRprAAR.REPR_TELEPHONE == null ||
                              distributorRprAAR.REPR_TELEPHONE == '-'
                          "
                        >
                          -
                        </td>
                        <td class="type1" v-if="distributorRprAAR.REPR_TELEPHONE != '-' && distributorRprAAR.REPR_TELEPHONE != null">
                          <span>
                            0{{ distributorRprAAR.REPR_TELEPHONE.substring(0,1) }}-{{ distributorRprAAR.REPR_TELEPHONE.substring(1,10) }}
                          </span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAAR.REPR_TELEPHONE != '-' && distributorRprTempAAR.REPR_TELEPHONE != null">
                            0{{ distributorRprTempAAR.REPR_TELEPHONE.substring(0,1) }}-{{ distributorRprTempAAR.REPR_TELEPHONE.substring(1,10) }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td
                          v-if="
                            distributorRprAAR.REPR_PHONE_EXTENSION == null ||
                              distributorRprAAR.REPR_PHONE_EXTENSION == '-'
                          "
                        >
                          -
                        </td>
                        <td class="type1" v-if="distributorRprAAR.REPR_PHONE_EXTENSION != '-' && distributorRprAAR.REPR_PHONE_EXTENSION != null">
                            {{ distributorRprAAR.REPR_PHONE_EXTENSION }}
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAAR.REPR_PHONE_EXTENSION != '-' && distributorRprTempAAR.REPR_PHONE_EXTENSION != null">
                            {{ distributorRprTempAAR.REPR_PHONE_EXTENSION }}
                          </span>
                        </td>
                      </tr>

                     <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>

                        <td
                          v-if="
                            distributorRprAAR.REPR_MOBILE_NUMBER == null ||
                              distributorRprAAR.REPR_MOBILE_NUMBER == '-'
                          "
                        >
                          -
                        </td>
                        <td class="type1" v-if="distributorRprAAR.REPR_MOBILE_NUMBER != '-' && distributorRprAAR.REPR_MOBILE_NUMBER != null">
                          <span>
                            0{{ distributorRprAAR.REPR_MOBILE_NUMBER.substring(0,2) }}-{{ distributorRprAAR.REPR_MOBILE_NUMBER.substring(2,10) }}
                          </span>
                        </td>
                        <td class="type2">
                          <span v-if="distributorRprTempAAR.REPR_MOBILE_NUMBER != '-' && distributorRprTempAAR.REPR_MOBILE_NUMBER != null">
                            0{{ distributorRprTempAAR.REPR_MOBILE_NUMBER.substring(0,2) }}-{{ distributorRprTempAAR.REPR_MOBILE_NUMBER.substring(2,10) }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td class="type1">{{ distributorRprAAR.REPR_EMAIL }}</td>
                        <td class="type2">
                          <span v-if="distributorRprTempAAR.REPR_EMAIL != '-' && distributorRprTempAAR.REPR_EMAIL != null">
                            {{ distributorRprTempAAR.REPR_EMAIL }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </b-collapse>
              </div>

              <div>
                <br />
                <h4 slot="header" class="card-title">
                  Section Review
                </h4>
                <br />
                <div>
                  <vue-form-generator
                    :model="model"
                    :schema="remarkARnAARschema"
                    :options="formOptions"
                    @model-updated="onModelUpdated"
                    ref="statusForm"
                  >
                  </vue-form-generator>
                </div>
                <br />
              </div>
            </div>

            <div v-if="currentTab === 'tab5'">
              <div>
                <br />
                <div class="row">
                  <div class="flex xs3 md4">
                    <!-- Financial Institution -->
                    <button
                      v-b-toggle.collapse-financial
                      type="button"
                      class="btn btn-warning btn-fill btn-md"
                    >
                      Financial Institution &nbsp;
                      <i class="fa fa-caret-square-o-down" />
                    </button>
                  </div>
                  <div class="flex xs3 md4">
                    <!-- Financial Planner -->
                    <button
                      v-b-toggle.collapse-planner
                      type="button"
                      class="btn btn-warning btn-fill btn-md"
                    >
                      Financial Planner &nbsp;
                      <i class="fa fa-caret-square-o-down" />
                    </button>
                  </div>
                  <div class="flex xs3 md4">
                    <!-- Head of Department, Compliance Department -->
                    <button
                      v-b-toggle.collapse-compl
                      type="button"
                      class="btn btn-warning btn-fill btn-md"
                    >
                      Head of Department, Compliance Department &nbsp;
                      <i class="fa fa-caret-square-o-down" />
                    </button>
                  </div>
                  <div class="flex xs3 md4">
                    <!-- Head of Department UTS Distributor, Operation Department -->
                    <button
                      v-b-toggle.collapse-uts
                      type="button"
                      class="btn btn-warning btn-fill btn-md"
                    >
                      Head of Department UTS Distributor, Operation Department
                      &nbsp;
                      <i class="fa fa-caret-square-o-down" />
                    </button>
                  </div>
                  <div class="flex xs3 md4">
                    <!-- Head of Department PRS Distributor, Operation Department -->
                    <button
                      v-b-toggle.collapse-prs
                      type="button"
                      class="btn btn-warning btn-fill btn-md"
                    >
                      Head of Department PRS Distributor, Operation Department
                      &nbsp;
                      <i class="fa fa-caret-square-o-down" />
                    </button>
                  </div>
                  <div class="flex xs3 md4">
                    <!-- Head of Department, Training Department -->
                    <button
                      v-b-toggle.collapse-train
                      type="button"
                      class="btn btn-warning btn-fill btn-md"
                    >
                      Head of Department, Training Department &nbsp;
                      <i class="fa fa-caret-square-o-down" />
                    </button>
                  </div>
                </div>

                <!-- <b-collapse id="collapse-financial" class="mt-2">
                  <br />
                  <h4>Financial Institution</h4>
                  <table class="table table-striped">
                    <tbody
                      v-for="(item, index) in this.distributorDetail.DATAFP"
                      :key="index"
                    >
                      <div
                        v-if="
                          this.distributorDetail.DIST_TYPE_NAME == '4' ||
                            this.distributorDetail.DIST_TYPE_NAME == '5'
                        "
                      >
                        <tr>
                          <td style="width: 20%">Financial Institution</td>
                          <td style="width: 1%">:</td>
                          <td
                            class="type1"
                            v-if="item.DIST_FINANCIAL_INSTITUTION == 1"
                          >
                            Yes
                          </td>
                          <td
                            class="type1"
                            v-if="item.DIST_FINANCIAL_INSTITUTION == 2"
                          >
                            No
                          </td>

                          <td
                            v-if="
                              item.DIST_FINANCIAL_INSTITUTION == null ||
                                model.DIST_FINANCIAL_INSTITUTION == ''
                            "
                          >
                            -
                          </td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                </b-collapse>

                <b-collapse id="collapse-planner" class="mt-2">
                  <br />
                  <h4>Financial Planner</h4>
                  <table class="table table-striped">
                    <tbody
                      v-for="(item, index) in this.distributorDetail.DATAFP"
                      :key="index"
                    >
                      <div
                        v-if="
                          this.distributorDetail.DIST_TYPE_NAME == '4' ||
                            this.distributorDetail.DIST_TYPE_NAME == '5'
                        "
                      >
                        <tr>
                          <td style="width: 20%">Name</td>
                          <td style="width: 1%">:</td>
                          <td class="type1">
                            {{ item.DIST_FP_SALUTATION }}
                            {{ item.DIST_FP_NAME }}
                          </td>

                          <td
                            v-if="
                              (item.DIST_FP_SALUTATION == null &&
                                item.DIST_FP_NAME == null) ||
                                (item.DIST_FP_SALUTATION == '' &&
                                  item.DIST_FP_NAME == '')
                            "
                          >
                            -
                          </td>
                        </tr>
                        <tr>
                          <td>CMSRL Number</td>
                          <td>:</td>
                          <td class="type1" v-if="item.DIST_FP_CSMRL != null">
                            {{ item.DIST_FP_CSMRL }}
                          </td>
                          <td v-if="item.DIST_FP_CSMRL == null">-</td>
                        </tr>
                        <tr v-if="item.DIST_FP_CITIZEN == 1">
                          <td>NRIC No</td>
                          <td>:</td>
                          <td class="type1">
                            {{
                              item.DIST_FP_NRIC.substring(0, 6) +
                                "-" +
                                item.DIST_FP_NRIC.substring(6, 8) +
                                "-" +
                                item.DIST_FP_NRIC.substring(8, 13)
                            }}
                          </td>
                        </tr>
                        <tr v-if="item.DIST_FP_CITIZEN == 2">
                          <td><b>Passport No</b></td>
                          <td>:</td>
                          <td class="type1">{{ item.DIST_FP_PASS_NUM }}</td>
                        </tr>
                        <tr v-if="item.DIST_FP_CITIZEN == 2">
                          <td><b>Passport Expiry Date</b></td>
                          <td>:</td>
                          <td class="type1">
                            {{ item.DIST_FP_PASS_EXPIRY }}
                          </td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                </b-collapse> -->

                <b-collapse id="collapse-compl" class="mt-2">
                  <br />
                  <h4>Head of Department, Compliance Department</h4>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ distributorAddInfoHOD_COMPL.USER_SAL_NAME }}
                          {{ distributorAddInfoHOD_COMPL.ADD_NAME }}
                        </td>
                        <td class="type2">
                          <span v-if="this.distributorAddInfoTempHOD_COMPL.USER_SAL_NAME != '-' && this.distributorAddInfoTempHOD_COMPL.USER_SAL_NAME !=null">
                            {{ distributorAddInfoTempHOD_COMPL.USER_SAL_NAME }}
                          </span>
                          <span v-else>{{ distributorAddInfoHOD_COMPL.USER_SAL_NAME }}</span>
                          <span v-if="this.distributorAddInfoTempHOD_COMPL.ADD_NAME != '-' && this.distributorAddInfoTempHOD_COMPL.ADD_NAME !=null">
                            {{ distributorAddInfoTempHOD_COMPL.ADD_NAME }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                          <td>Office Phone Number</td>
                          <td>:</td>
                          <td v-if="distributorAddInfoHOD_COMPL.ADD_TELEPHONE == null || distributorAddInfoHOD_COMPL.ADD_TELEPHONE == '-' || distributorAddInfoHOD_COMPL.ADD_TELEPHONE == ''">
                            -
                          </td>
                          <td class="type1" v-if="distributorAddInfoHOD_COMPL.ADD_TELEPHONE != null && distributorAddInfoHOD_COMPL.ADD_TELEPHONE != '-' && distributorAddInfoHOD_COMPL.ADD_TELEPHONE != ''">
                            0{{ distributorAddInfoHOD_COMPL.ADD_TELEPHONE.substring(0, 1) }}-{{
                              distributorAddInfoHOD_COMPL.ADD_TELEPHONE.substring(1, 10)
                            }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_COMPL.ADD_TELEPHONE != null && distributorAddInfoTempHOD_COMPL.ADD_TELEPHONE != '-' && distributorAddInfoTempHOD_COMPL.ADD_TELEPHONE != ''">
                              0{{ distributorAddInfoTempHOD_COMPL.ADD_TELEPHONE.substring(0, 1) }}-{{
                                distributorAddInfoTempHOD_COMPL.ADD_TELEPHONE.substring(1, 10)
                              }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Extension Number</td>
                          <td>:</td>
                          <td class="type1">
                            {{ distributorAddInfoHOD_COMPL.ADD_PHONE_EXTENSION }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_COMPL.ADD_PHONE_EXTENSION != null && distributorAddInfoTempHOD_COMPL.ADD_PHONE_EXTENSION != '-' && distributorAddInfoTempHOD_COMPL.ADD_PHONE_EXTENSION != ''">
                              {{ distributorAddInfoTempHOD_COMPL.ADD_PHONE_EXTENSION }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Mobile Phone Number</td>
                          <td>:</td>
                          <td v-if="distributorAddInfoHOD_COMPL.ADD_MOBILE_NUMBER == null || distributorAddInfoHOD_COMPL.ADD_MOBILE_NUMBER == '-' || distributorAddInfoHOD_COMPL.ADD_MOBILE_NUMBER == ''">
                            -
                          </td>

                          <td class="type1" v-if="distributorAddInfoHOD_COMPL.ADD_MOBILE_NUMBER != null && distributorAddInfoHOD_COMPL.ADD_MOBILE_NUMBER != '-' && distributorAddInfoHOD_COMPL.ADD_MOBILE_NUMBER != ''">
                            0{{ distributorAddInfoHOD_COMPL.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                              distributorAddInfoHOD_COMPL.ADD_MOBILE_NUMBER.substring(2, 10)
                            }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_COMPL.ADD_TELEPHONE != null && distributorAddInfoTempHOD_COMPL.ADD_TELEPHONE != '-' && distributorAddInfoTempHOD_COMPL.ADD_TELEPHONE != ''">
                              0{{ distributorAddInfoTempHOD_COMPL.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                                distributorAddInfoTempHOD_COMPL.ADD_MOBILE_NUMBER.substring(2, 10)
                              }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Email</td>
                          <td>:</td>
                          <td class="type1">{{ distributorAddInfoHOD_COMPL.ADD_EMAIL }}</td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_COMPL.ADD_EMAIL != '-' && distributorAddInfoTempHOD_COMPL.ADD_EMAIL != null">
                              {{ distributorAddInfoTempHOD_COMPL.ADD_EMAIL }}
                            </span>
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </b-collapse>

                <b-collapse id="collapse-uts" class="mt-2">
                  <br />
                  <h4>
                    Head of Department UTS Distributor, Operation Department
                  </h4>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ distributorAddInfoHOD_UTS.USER_SAL_NAME }}
                          {{ distributorAddInfoHOD_UTS.ADD_NAME }}
                        </td>
                        <td class="type2">
                          <span v-if="this.distributorAddInfoTempHOD_UTS.USER_SAL_NAME != '-' && this.distributorAddInfoTempHOD_UTS.USER_SAL_NAME !=null">
                            {{ distributorAddInfoTempHOD_UTS.USER_SAL_NAME }}
                          </span>
                          <span v-else>{{ distributorAddInfoHOD_UTS.USER_SAL_NAME }}</span>
                          <span v-if="this.distributorAddInfoTempHOD_UTS.ADD_NAME != '-' && this.distributorAddInfoTempHOD_UTS.ADD_NAME !=null">
                            {{ distributorAddInfoTempHOD_UTS.ADD_NAME }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                          <td>Office Phone Number</td>
                          <td>:</td>
                          <td v-if="distributorAddInfoHOD_UTS.ADD_TELEPHONE == null || distributorAddInfoHOD_UTS.ADD_TELEPHONE == '-' || distributorAddInfoHOD_UTS.ADD_TELEPHONE == ''">
                            -
                          </td>
                          <td class="type1" v-if="distributorAddInfoHOD_UTS.ADD_TELEPHONE != null && distributorAddInfoHOD_UTS.ADD_TELEPHONE != '-' && distributorAddInfoHOD_UTS.ADD_TELEPHONE != ''">
                            0{{ distributorAddInfoHOD_UTS.ADD_TELEPHONE.substring(0, 1) }}-{{
                              distributorAddInfoHOD_UTS.ADD_TELEPHONE.substring(1, 10)
                            }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_UTS.ADD_TELEPHONE != null && distributorAddInfoTempHOD_UTS.ADD_TELEPHONE != '-' && distributorAddInfoTempHOD_UTS.ADD_TELEPHONE != ''">
                              0{{ distributorAddInfoTempHOD_UTS.ADD_TELEPHONE.substring(0, 1) }}-{{
                                distributorAddInfoTempHOD_UTS.ADD_TELEPHONE.substring(1, 10)
                              }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Extension Number</td>
                          <td>:</td>
                          <td class="type1">
                            {{ distributorAddInfoHOD_UTS.ADD_PHONE_EXTENSION }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_UTS.ADD_PHONE_EXTENSION != null && distributorAddInfoTempHOD_UTS.ADD_PHONE_EXTENSION != '-' && distributorAddInfoTempHOD_UTS.ADD_PHONE_EXTENSION != ''">
                              {{ distributorAddInfoTempHOD_UTS.ADD_PHONE_EXTENSION }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Mobile Phone Number</td>
                          <td>:</td>
                          <td v-if="distributorAddInfoHOD_UTS.ADD_MOBILE_NUMBER == null || distributorAddInfoHOD_UTS.ADD_MOBILE_NUMBER == '-' || distributorAddInfoHOD_UTS.ADD_MOBILE_NUMBER == ''">
                            -
                          </td>

                          <td class="type1" v-if="distributorAddInfoHOD_UTS.ADD_MOBILE_NUMBER != null && distributorAddInfoHOD_UTS.ADD_MOBILE_NUMBER != '-' && distributorAddInfoHOD_UTS.ADD_MOBILE_NUMBER != ''">
                            0{{ distributorAddInfoHOD_UTS.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                              distributorAddInfoHOD_UTS.ADD_MOBILE_NUMBER.substring(2, 10)
                            }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_UTS.ADD_TELEPHONE != null && distributorAddInfoTempHOD_UTS.ADD_TELEPHONE != '-' && distributorAddInfoTempHOD_UTS.ADD_TELEPHONE != ''">
                              0{{ distributorAddInfoTempHOD_UTS.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                                distributorAddInfoTempHOD_UTS.ADD_MOBILE_NUMBER.substring(2, 10)
                              }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Email</td>
                          <td>:</td>
                          <td class="type1">{{ distributorAddInfoHOD_UTS.ADD_EMAIL }}</td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_UTS.ADD_EMAIL != '-' && distributorAddInfoTempHOD_UTS.ADD_EMAIL != null">
                              {{ distributorAddInfoTempHOD_UTS.ADD_EMAIL }}
                            </span>
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </b-collapse>

                <b-collapse id="collapse-prs" class="mt-2">
                  <br />
                  <h4>
                    Head of Department PRS Distributor, Operation Department
                  </h4>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ distributorAddInfoHOD_PRS.USER_SAL_NAME }}
                          {{ distributorAddInfoHOD_PRS.ADD_NAME }}
                        </td>
                        <td class="type2">
                          <span v-if="this.distributorAddInfoTempHOD_PRS.USER_SAL_NAME != '-' && this.distributorAddInfoTempHOD_PRS.USER_SAL_NAME !=null">
                            {{ distributorAddInfoTempHOD_PRS.USER_SAL_NAME }}
                          </span>
                          <span v-else>{{ distributorAddInfoHOD_PRS.USER_SAL_NAME }}</span>
                          <span v-if="this.distributorAddInfoTempHOD_PRS.ADD_NAME != '-' && this.distributorAddInfoTempHOD_PRS.ADD_NAME !=null">
                            {{ distributorAddInfoTempHOD_PRS.ADD_NAME }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                          <td>Office Phone Number</td>
                          <td>:</td>
                          <td v-if="distributorAddInfoHOD_PRS.ADD_TELEPHONE == null || distributorAddInfoHOD_PRS.ADD_TELEPHONE == '-' || distributorAddInfoHOD_PRS.ADD_TELEPHONE == ''">
                            -
                          </td>
                          <td class="type1" v-if="distributorAddInfoHOD_PRS.ADD_TELEPHONE != null && distributorAddInfoHOD_PRS.ADD_TELEPHONE != '-' && distributorAddInfoHOD_PRS.ADD_TELEPHONE != ''">
                            0{{ distributorAddInfoHOD_PRS.ADD_TELEPHONE.substring(0, 1) }}-{{
                              distributorAddInfoHOD_PRS.ADD_TELEPHONE.substring(1, 10)
                            }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_PRS.ADD_TELEPHONE != null && distributorAddInfoTempHOD_PRS.ADD_TELEPHONE != '-' && distributorAddInfoTempHOD_PRS.ADD_TELEPHONE != ''">
                              0{{ distributorAddInfoTempHOD_PRS.ADD_TELEPHONE.substring(0, 1) }}-{{
                                distributorAddInfoTempHOD_PRS.ADD_TELEPHONE.substring(1, 10)
                              }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Extension Number</td>
                          <td>:</td>
                          <td class="type1">
                            {{ distributorAddInfoHOD_PRS.ADD_PHONE_EXTENSION }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_PRS.ADD_PHONE_EXTENSION != null && distributorAddInfoTempHOD_PRS.ADD_PHONE_EXTENSION != '-' && distributorAddInfoTempHOD_PRS.ADD_PHONE_EXTENSION != ''">
                              {{ distributorAddInfoTempHOD_PRS.ADD_PHONE_EXTENSION }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Mobile Phone Number</td>
                          <td>:</td>
                          <td v-if="distributorAddInfoHOD_PRS.ADD_MOBILE_NUMBER == null || distributorAddInfoHOD_PRS.ADD_MOBILE_NUMBER == '-' || distributorAddInfoHOD_PRS.ADD_MOBILE_NUMBER == ''">
                            -
                          </td>

                          <td class="type1" v-if="distributorAddInfoHOD_PRS.ADD_MOBILE_NUMBER != null && distributorAddInfoHOD_PRS.ADD_MOBILE_NUMBER != '-' && distributorAddInfoHOD_PRS.ADD_MOBILE_NUMBER != ''">
                            0{{ distributorAddInfoHOD_PRS.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                              distributorAddInfoHOD_PRS.ADD_MOBILE_NUMBER.substring(2, 10)
                            }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_PRS.ADD_TELEPHONE != null && distributorAddInfoTempHOD_PRS.ADD_TELEPHONE != '-' && distributorAddInfoTempHOD_PRS.ADD_TELEPHONE != ''">
                              0{{ distributorAddInfoTempHOD_PRS.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                                distributorAddInfoTempHOD_PRS.ADD_MOBILE_NUMBER.substring(2, 10)
                              }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Email</td>
                          <td>:</td>
                          <td class="type1">{{ distributorAddInfoHOD_PRS.ADD_EMAIL }}</td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_PRS.ADD_EMAIL != '-' && distributorAddInfoTempHOD_PRS.ADD_EMAIL != null">
                              {{ distributorAddInfoTempHOD_PRS.ADD_EMAIL }}
                            </span>
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </b-collapse>

                <b-collapse id="collapse-train" class="mt-2">
                  <br />
                  <h4>Head of Department, Training Department</h4>
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ distributorAddInfoHOD_TRAIN.USER_SAL_NAME }}
                          {{ distributorAddInfoHOD_TRAIN.ADD_NAME }}
                        </td>
                        <td class="type2">
                          <span v-if="this.distributorAddInfoTempHOD_TRAIN.USER_SAL_NAME != '-' && this.distributorAddInfoTempHOD_TRAIN.USER_SAL_NAME !=null">
                            {{ distributorAddInfoTempHOD_TRAIN.USER_SAL_NAME }}
                          </span>
                          <span v-else>{{ distributorAddInfoHOD_TRAIN.USER_SAL_NAME }}</span>
                          <span v-if="this.distributorAddInfoTempHOD_TRAIN.ADD_NAME != '-' && this.distributorAddInfoTempHOD_TRAIN.ADD_NAME !=null">
                            {{ distributorAddInfoTempHOD_TRAIN.ADD_NAME }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                          <td>Office Phone Number</td>
                          <td>:</td>
                          <td v-if="distributorAddInfoHOD_TRAIN.ADD_TELEPHONE == null || distributorAddInfoHOD_TRAIN.ADD_TELEPHONE == '-' || distributorAddInfoHOD_TRAIN.ADD_TELEPHONE == ''">
                            -
                          </td>
                          <td class="type1" v-if="distributorAddInfoHOD_TRAIN.ADD_TELEPHONE != null && distributorAddInfoHOD_TRAIN.ADD_TELEPHONE != '-' && distributorAddInfoHOD_TRAIN.ADD_TELEPHONE != ''">
                            0{{ distributorAddInfoHOD_TRAIN.ADD_TELEPHONE.substring(0, 1) }}-{{
                              distributorAddInfoHOD_TRAIN.ADD_TELEPHONE.substring(1, 10)
                            }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_TRAIN.ADD_TELEPHONE != null && distributorAddInfoTempHOD_TRAIN.ADD_TELEPHONE != '-' && distributorAddInfoTempHOD_TRAIN.ADD_TELEPHONE != ''">
                              0{{ distributorAddInfoTempHOD_TRAIN.ADD_TELEPHONE.substring(0, 1) }}-{{
                                distributorAddInfoTempHOD_TRAIN.ADD_TELEPHONE.substring(1, 10)
                              }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Extension Number</td>
                          <td>:</td>
                          <td class="type1">
                            {{ distributorAddInfoHOD_TRAIN.ADD_PHONE_EXTENSION }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_TRAIN.ADD_PHONE_EXTENSION != null && distributorAddInfoTempHOD_TRAIN.ADD_PHONE_EXTENSION != '-' && distributorAddInfoTempHOD_TRAIN.ADD_PHONE_EXTENSION != ''">
                              {{ distributorAddInfoTempHOD_TRAIN.ADD_PHONE_EXTENSION }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Mobile Phone Number</td>
                          <td>:</td>
                          <td v-if="distributorAddInfoHOD_TRAIN.ADD_MOBILE_NUMBER == null || distributorAddInfoHOD_TRAIN.ADD_MOBILE_NUMBER == '-' || distributorAddInfoHOD_TRAIN.ADD_MOBILE_NUMBER == ''">
                            -
                          </td>

                          <td class="type1" v-if="distributorAddInfoHOD_TRAIN.ADD_MOBILE_NUMBER != null && distributorAddInfoHOD_TRAIN.ADD_MOBILE_NUMBER != '-' && distributorAddInfoHOD_TRAIN.ADD_MOBILE_NUMBER != ''">
                            0{{ distributorAddInfoHOD_TRAIN.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                              distributorAddInfoHOD_TRAIN.ADD_MOBILE_NUMBER.substring(2, 10)
                            }}
                          </td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_TRAIN.ADD_TELEPHONE != null && distributorAddInfoTempHOD_TRAIN.ADD_TELEPHONE != '-' && distributorAddInfoTempHOD_TRAIN.ADD_TELEPHONE != ''">
                              0{{ distributorAddInfoTempHOD_TRAIN.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                                distributorAddInfoTempHOD_TRAIN.ADD_MOBILE_NUMBER.substring(2, 10)
                              }}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td>Email</td>
                          <td>:</td>
                          <td class="type1">{{ distributorAddInfoHOD_TRAIN.ADD_EMAIL }}</td>
                          <td class="type2">
                            <span v-if="distributorAddInfoTempHOD_TRAIN.ADD_EMAIL != '-' && distributorAddInfoTempHOD_TRAIN.ADD_EMAIL != null">
                              {{ distributorAddInfoTempHOD_TRAIN.ADD_EMAIL }}
                            </span>
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </b-collapse>
              </div>
              <br />

              <h4 slot="header" class="card-title">
                Section Review
              </h4>
              <br />
              <div>
                <vue-form-generator
                  :model="model"
                  :schema="remarkADDINFOschema"
                  :options="formOptions"
                  @model-updated="onModelUpdated"
                  ref="statusForm"
                >
                </vue-form-generator>
              </div>
              <br />
            </div>

            <div v-if="currentTab === 'tab8'">
              <br />
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
                      :deletable="false"
                      :readonly="true"
                      :linkable="true"
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
                <template slot="remark" slot-scope="row">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Enter Remark"
                    v-model="row.rowData.DOCU_REMARK"
                  ></textarea>
                </template>
              </va-data-table>
              <div>
                <h5>Previous Documents</h5>
                <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :downloadable="false"
                    :readonly="true"
                    :multiple="false"
                    :deletable="false"
                    :editable="false"
                    :linkable="true"
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
                    v-model="fileRecords"
                  ></VueFileAgent>
              </div>
              <div>
                <h5 class="mt-4">New Uploaded Documents</h5>
                <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :downloadable="false"
                    :readonly="true"
                    :multiple="false"
                    :deletable="false"
                    :editable="false"
                    :linkable="true"
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
                    v-model="fileRecordsTemp"
                  ></VueFileAgent>
              </div>
              <br />
            </div>
          </div>
        </div>

        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="update"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="100%"
          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <div>
              <h5>Distributor Profile</h5>
              <br />
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width: 20%">Distributor Name</td>
                    <td style="width: 1%">:</td>
                    <td class="type1">
                      {{ this.distributorDetail.DIST_NAME }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.DIST_NAME }}
                    </td>
                  </tr>
                  <tr>
                    <td>Registration Number</td>
                    <td>:</td>
                    <td class="type1">
                      {{ this.distributorDetail.DIST_REGI_NUM1 }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.DIST_REGI_NUM1 }}
                    </td>
                  </tr>
                  <tr>
                    <td>New Registration Number</td>
                    <td>:</td>
                    <td class="type1">
                      {{ this.distributorDetail.DIST_REGI_NUM2 }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.DIST_REGI_NUM2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Date of Incorporation</td>
                    <td>:</td>
                    <td class="type1">
                      {{ this.distributorDetail.DIST_DATE_INCORP }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.DIST_DATE_INCORP }}
                    </td>
                  </tr>
                  <tr>
                    <td>Type of Setup</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_TYPE_SETUP == 1"
                    >
                      PUBLIC LIMITED COMPANY / BERHAD
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_TYPE_SETUP == 2"
                    >
                      PRIVATE LIMITED COMPANY / SENDIRIAN BERHAD
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.DIST_TYPE_SETUP == 1"
                    >
                      PUBLIC LIMITED COMPANY / BERHAD
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.DIST_TYPE_SETUP == 2"
                    >
                      PRIVATE LIMITED COMPANY / SENDIRIAN BERHAD
                    </td>
                  </tr>

                  <tr>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_TYPE_SETUP == 1"
                    >
                      SSM Form 8
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_TYPE_SETUP == 2"
                    >
                      SSM Form 9
                    </td>
                    <!-- <td class="type2" v-if="this.distributorDetailTemp.DIST_TYPE_SETUP == 1">
                        SSM Form 8
                      </td>
                      <td class="type2" v-if="this.distributorDetailTemp.DIST_TYPE_SETUP == 2">
                        SSM Form 9
                      </td> -->
                    <td style="width: 2%;">:</td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_TYPE_SETUP == 2"
                    >
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="ssmForm9"
                      ></VueFileAgent>
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_TYPE_SETUP == 1"
                    >
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="ssmForm8"
                      ></VueFileAgent>
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.DIST_TYPE_SETUP == 2"
                    >
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="ssmForm9Temp"
                      ></VueFileAgent>
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.DIST_TYPE_SETUP == 1"
                    >
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :readonly="true"
                        :multiple="false"
                        :deletable="false"
                        :editable="false"
                        :linkable="true"
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
                        v-model="ssmForm8Temp"
                      ></VueFileAgent>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="4" style="font-weight:bold;">
                      Registered Address
                    </td>
                  </tr>

                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td class="type1">
                      {{ this.distributorDetail.DIST_ADDR_1 }}
                      {{ this.distributorDetail.DIST_ADDR_2 }}
                      {{ this.distributorDetail.DIST_ADDR_3 }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.DIST_ADDR_1 }}
                      {{ this.distributorDetailTemp.DIST_ADDR_2 }}
                      {{ this.distributorDetailTemp.DIST_ADDR_3 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>:</td>
                    <td class="type1">
                      {{ this.distributorDetail.SET_PARAM_COUNTRY }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.SET_PARAM_COUNTRY }}
                    </td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetail.SET_PARAM_STATE }}
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetail.DIST_STATE2 }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetailTemp.SET_PARAM_STATE }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetailTemp.DIST_STATE2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetail.SET_CITY_NAME }}
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetail.DIST_CITY2 }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetailTemp.SET_CITY_NAME }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetailTemp.DIST_CITY2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Postal</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetail.POSTCODE_NO }}
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetail.DIST_POSTAL2 }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetailTemp.POSTCODE_NO }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetailTemp.DIST_POSTAL2 }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" style="font-weight:bold;">
                      Business Address
                    </td>
                  </tr>

                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td class="type1">
                      {{ this.distributorDetail.DIST_BIZ_ADDR_1 }}
                      {{ this.distributorDetail.DIST_BIZ_ADDR_2 }}
                      {{ this.distributorDetail.DIST_BIZ_ADDR_3 }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.DIST_BIZ_ADDR_1 }}
                      {{ this.distributorDetailTemp.DIST_BIZ_ADDR_2 }}
                      {{ this.distributorDetailTemp.DIST_BIZ_ADDR_3 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>:</td>
                    <td class="type1">
                      {{ this.distributorDetail.SET_PARAM_COUNTRY }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.SET_PARAM_COUNTRY }}
                    </td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetail.SET_PARAM_STATE }}
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetail.DIST_STATE2 }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetailTemp.SET_PARAM_STATE }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetailTemp.DIST_STATE2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetail.SET_CITY_NAME }}
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetail.DIST_CITY2 }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetailTemp.SET_CITY_NAME }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetailTemp.DIST_CITY2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Postal</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetail.POSTCODE_NO }}
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetail.DIST_POSTAL2 }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY == 'MY'"
                    >
                      {{ this.distributorDetailTemp.POSTCODE_NO }}
                    </td>
                    <td
                      class="type2"
                      v-if="this.distributorDetailTemp.SET_CODE_COUNTRY != 'MY'"
                    >
                      {{ this.distributorDetailTemp.DIST_POSTAL2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Office Phone Number</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="
                        this.distributorDetail.DIST_PHONE_NUMBER == null ||
                          this.distributorDetail.DIST_PHONE_NUMBER == '-'
                      "
                    >
                      -
                    </td>
                    <!-- <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_PHONE_NUMBER != '-'"
                    >
                      0{{
                        this.distributorDetail.DIST_PHONE_NUMBER.substring(0, 1)
                      }}-{{
                        this.distributorDetail.DIST_PHONE_NUMBER.substring(1, 10)
                      }}
                    </td>
                    <td class="type2">
                      0{{
                        this.distributorDetailTemp.DIST_PHONE_NUMBER.substring(
                          0,
                          1
                        )
                      }}-{{
                        this.distributorDetailTemp.DIST_PHONE_NUMBER.substring(
                          1,
                          10
                        )
                      }}
                    </td> -->
                  </tr>
                  <tr>
                    <td>Extension Number</td>
                    <td>:</td>
                    <td class="type1">
                      {{ this.distributorDetail.DIST_PHONE_EXTENSION }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.DIST_PHONE_EXTENSION }}
                    </td>
                  </tr>
                  <tr>
                    <td>Fax Number</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="
                        this.distributorDetail.DIST_FAX_NUMBER == null ||
                          this.distributorDetail.DIST_FAX_NUMBER == '-'
                      "
                    >
                      -
                    </td>
                    <!-- <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_FAX_NUMBER != '-'"
                    >
                      0{{
                        this.distributorDetail.DIST_FAX_NUMBER.substring(0, 1)
                      }}-{{
                        this.distributorDetail.DIST_FAX_NUMBER.substring(1, 10)
                      }}
                    </td>
                    <td class="type2">
                      0{{
                        this.distributorDetailTemp.DIST_FAX_NUMBER.substring(
                          0,
                          1
                        )
                      }}-{{
                        this.distributorDetailTemp.DIST_FAX_NUMBER.substring(
                          1,
                          10
                        )
                      }}
                    </td> -->
                  </tr>
                  <tr>
                    <td>Mobile Phone Number</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="
                        this.distributorDetail.DIST_MOBILE_NUMBER == null ||
                          this.distributorDetail.DIST_MOBILE_NUMBER == '-'
                      "
                    >
                      -
                    </td>
                    <!-- <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_MOBILE_NUMBER != '-'"
                    >
                      01{{
                        distributorDetail.DIST_MOBILE_NUMBER.substring(0, 1)
                      }}-{{
                        distributorDetail.DIST_MOBILE_NUMBER.substring(1, 10)
                      }}
                    </td>
                    <td class="type2">
                      01{{
                        distributorDetailTemp.DIST_MOBILE_NUMBER.substring(0, 1)
                      }}-{{
                        distributorDetailTemp.DIST_MOBILE_NUMBER.substring(1, 10)
                      }}
                    </td> -->
                  </tr>
                  <tr>
                    <td>Email Address</td>
                    <td>:</td>
                    <td class="type1">
                      {{ this.distributorDetail.DIST_EMAIL }}
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.DIST_EMAIL }}
                    </td>
                  </tr>
                  <tr>
                    <td>Company Website URL</td>
                    <td>:</td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_COMPANY_WEBSITE != null"
                    >
                      {{ this.distributorDetail.DIST_COMPANY_WEBSITE }}
                    </td>
                    <td
                      class="type1"
                      v-if="this.distributorDetail.DIST_COMPANY_WEBSITE == null"
                    >
                      -
                    </td>
                    <td class="type2">
                      {{ this.distributorDetailTemp.DIST_COMPANY_WEBSITE }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h5>Details Information</h5>
              <br />
              <div>
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td style="width: 20%">
                        Financial Status (Total Paid-Up Capital (RM))
                      </td>
                      <td style="width: 1%">:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_PAID_UP_CAPITAL }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_PAID_UP_CAPITAL }}
                      </td>
                    </tr>
                    <tr>
                      <td>Type of Structure</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_TYPE_STRUCTURE == 1"
                      >
                        SINGLE-TIER
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_TYPE_STRUCTURE == 2"
                      >
                        MULTI-TIER
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.DIST_TYPE_STRUCTURE == 1"
                      >
                        SINGLE-TIER
                      </td>
                      <td
                        class="type2"
                        v-if="this.distributorDetailTemp.DIST_TYPE_STRUCTURE == 2"
                      >
                        MULTI-TIER
                      </td>
                    </tr>
                    <tr>
                      <td>Marketing Approach</td>
                      <td>:</td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_MARKETING_APPROACH == 1"
                      >
                        DIRECT
                      </td>
                      <td
                        class="type1"
                        v-if="this.distributorDetail.DIST_MARKETING_APPROACH == 2"
                      >
                        NOMINEE
                      </td>
                      <td
                        class="type2"
                        v-if="
                          this.distributorDetailTemp.DIST_MARKETING_APPROACH == 1
                        "
                      >
                        DIRECT
                      </td>
                      <td
                        class="type2"
                        v-if="
                          this.distributorDetailTemp.DIST_MARKETING_APPROACH == 2
                        "
                      >
                        NOMINEE
                      </td>
                    </tr>
                    <tr>
                      <td>Proposed No. of Distribution Point</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_NUM_DIST_POINT }}
                      </td>

                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_NUM_DIST_POINT }}
                      </td>
                    </tr>
                    <tr>
                      <td>Proposed Number of Consultant</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_NUM_CONSULTANT }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_NUM_CONSULTANT }}
                      </td>
                    </tr>
                    <tr>
                      <td>Indemnity of Insurance</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_INSURANCE }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_INSURANCE }}
                      </td>
                    </tr>
                    <tr>
                      <td>Expiry Date For Indemnity of Insurance</td>
                      <td>:</td>
                      <td class="type1">
                        {{ this.distributorDetail.DIST_DATE_INCORP }}
                      </td>
                      <td class="type2">
                        {{ this.distributorDetailTemp.DIST_DATE_INCORP }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h5>Ceo &#038; Director</h5>
              <br />
              <div>
                <br />
                <h4>CEO Profile</h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAREPR"
                    :key="index"
                  >
                    <div v-if="item.REPR_TYPE == 'CEO'">
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td>
                          {{ item.USER_SAL_NAME }}
                          {{ item.REPR_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>:</td>
                        <td>{{ item.REPR_POSITION }}</td>
                      </tr>
                      <tr v-if="item.REPR_CITIZEN == 1">
                        <td>NRIC No</td>
                        <td>:</td>
                        <!-- <td>
                          {{
                            item.REPR_NRIC.substring(0, 6) +
                              "-" +
                              item.REPR_NRIC.substring(6, 8) +
                              "-" +
                              item.REPR_NRIC.substring(8, 13)
                          }}
                        </td> -->
                      </tr>
                      <tr v-if="item.REPR_CITIZEN == 2">
                        <td><b>Passport No</b></td>
                        <td>:</td>
                        <td>{{ item.REPR_PASS_NUM }}</td>
                      </tr>
                      <tr v-if="item.REPR_CITIZEN == 2">
                        <td><b>Passport Expiry Date</b></td>
                        <td>:</td>
                        <td>{{ item.REPR_PASS_EXP }}</td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>

                        <td
                          v-if="
                            item.REPR_TELEPHONE == null ||
                              item.REPR_TELEPHONE == '-'
                          "
                        >
                          -
                        </td>
                        <!-- <td v-if="item.REPR_TELEPHONE != '-'">
                            0{{ item.REPR_TELEPHONE.substring(0,1) }}-{{ item.REPR_TELEPHONE.substring(1,10) }}
                          </td> -->
                      </tr>
                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td
                          v-if="
                            item.REPR_PHONE_EXTENSION == null ||
                              item.REPR_PHONE_EXTENSION == '-'
                          "
                        >
                          -
                        </td>
                        <!-- <td v-if="ITEM.REPR_PHONE_EXTENSION != '-'">{{ item.REPR_PHONE_EXTENSION }}</td> -->
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>

                        <td
                          v-if="
                            item.REPR_MOBILE_NUMBER == null ||
                              item.REPR_MOBILE_NUMBER == '-'
                          "
                        >
                          -
                        </td>
                        <!-- <td v-if="item.REPR_MOBILE_NUMBER != '-'">
                            0{{ item.REPR_MOBILE_NUMBER.substring(0,2) }}-{{ item.REPR_MOBILE_NUMBER.substring(2,10) }}
                          </td> -->
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>{{ item.REPR_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
              <div>
                <br />
                <h4>Director Details</h4>
                <!-- <table class="table">
                  <tbody>
                    <tr style="background-color: lightgrey">
                      <th>No</th>
                      <th>Name</th>
                      <th>NRIC No</th>
                      <th>Effective Date</th>
                      <th>End Date</th>
                    </tr>
                    <tr
                      v-for="(item, index) in this.distributorDetail.DATADIR"
                      :key="index"
                    >
                      <td style="width: 10%">{{ index + 1 }}</td>
                      <td style="width: 30%">
                        {{ item.DIR_NAME_DISPLAY }}
                      </td>
                      <td>{{ itemTemp.DIR_NAME_DISPLAY }}</td>
                      <td style="width: 20%">{{ item.DIR_NRIC }}</td>
                      <td style="width: 20%">
                        {{ item.DIR_DATE_EFFECTIVE_DISPLAY }}
                      </td>
                      <td style="width: 20%">
                        {{ item.DIR_DATE_END_DISPLAY }}
                      </td>
                    </tr>
                  </tbody>
                </table> -->

                <table class="table">
                  <tbody>
                    <tr style="background-color: lightgrey">
                      <th>No</th>
                      <th>Name</th>
                      <th>NRIC No</th>
                      <th>Effective Date</th>
                      <th>End Date</th>
                    </tr>
                    <tr
                      v-for="(item, index) in this.distributorDetailTemp.DATADIR"
                      :key="index"
                    >
                      <td style="width: 10%">{{ index + 1 }}</td>
                      <td style="width: 30%">
                        {{ item.DIR_NAME_DISPLAY }}
                      </td>
                      <td style="width: 20%">{{ item.DIR_NRIC }}</td>
                      <td style="width: 20%">
                        {{ item.DIR_DATE_EFFECTIVE_DISPLAY }}
                      </td>
                      <td style="width: 20%">
                        {{ item.DIR_DATE_END_DISPLAY }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h5>AR and AAR</h5>
              <br />
              <div>
                <br />
                <h4>Authorised Representative (AR)</h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAREPR"
                    :key="index"
                  >
                    <div v-if="item.REPR_TYPE == 'AR'">
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td>
                          {{ item.USER_SAL_NAME }}
                          {{ item.REPR_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>:</td>
                        <td>{{ item.REPR_POSITION }}</td>
                      </tr>
                      <tr v-if="item.REPR_CITIZEN == 1">
                        <td>NRIC No</td>
                        <td>:</td>
                        <!-- <td v-if="item.REPR_NRIC != '-' || item.REPR_NRIC != ''">
                          {{
                            item.REPR_NRIC.substring(0, 6) +
                              "-" +
                              item.REPR_NRIC.substring(6, 8) +
                              "-" +
                              item.REPR_NRIC.substring(8, 13)
                          }}
                        </td> -->
                        <td v-if="item.REPR_NRIC == '-' || item.REPR_NRIC == ''">
                          -
                        </td>
                      </tr>
                      <tr v-if="item.REPR_CITIZEN == 2">
                        <td><b>Passport No</b></td>
                        <td>:</td>
                        <td>{{ item.REPR_PASS_NUM }}</td>
                      </tr>
                      <tr v-if="item.REPR_CITIZEN == 2">
                        <td><b>Passport Expiry Date</b></td>
                        <td>:</td>
                        <td>{{ item.REPR_PASS_EXP }}</td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <td v-if="item.REPR_TELEPHONE != '-'">
                          <!-- need to fix this  -->
                          <!-- 0{{ this.item.REPR_TELEPHONE.substring(0,1) }}-{{this.item.REPR_TELEPHONE.substring(1,10)}} -->
                        </td>
                        <td
                          v-if="
                            item.REPR_TELEPHONE == null ||
                              item.REPR_TELEPHONE == '-'
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td>{{ item.REPR_PHONE_EXTENSION }}</td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <!-- <td v-if="item.REPR_MOBILE_NUMBER != '-'">
                          01{{ item.REPR_MOBILE_NUMBER.substring(0, 1) }}-{{
                            item.REPR_MOBILE_NUMBER.substring(1, 10)
                          }}
                        </td> -->
                        <td
                          v-if="
                            item.REPR_MOBILE_NUMBER == null ||
                              item.REPR_MOBILE_NUMBER == '-'
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>{{ item.REPR_EMAIL }}</td>
                      </tr>
                      <tr>
                        <td>
                          Upload Board of Directors' Resolution approving the
                          appointment of the AR
                        </td>
                        <td>:</td>
                        <td>
                          <VueFileAgent
                            :uploadUrl="'https://example.com'"
                            :uploadHeaders="{}"
                            :downloadable="false"
                            :readonly="true"
                            :multiple="false"
                            :deletable="false"
                            :editable="false"
                            :linkable="true"
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
                            v-model="BODApprove"
                          ></VueFileAgent>
                        </td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
              <div>
                <br />
                <h4>Alternative Representative (AAR)</h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAREPR"
                    :key="index"
                  >
                    <div v-if="item.REPR_TYPE == 'AAR'">
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td>
                          {{ item.USER_SAL_NAME }}
                          {{ item.REPR_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>:</td>
                        <td>{{ item.REPR_POSITION }}</td>
                      </tr>
                      <tr v-if="item.REPR_CITIZEN == 1">
                        <td>NRIC No</td>
                        <td>:</td>
                        <!-- <td
                          v-if="
                            item.REPR_NRIC != '-' ||
                              item.REPR_NRIC != '' ||
                              item.REPR_NRIC > 3
                          "
                        >
                          {{
                            item.REPR_NRIC.substring(0, 6) +
                              "-" +
                              item.REPR_NRIC.substring(6, 8) +
                              "-" +
                              item.REPR_NRIC.substring(8, 13)
                          }}
                        </td> -->
                        <td v-if="item.REPR_NRIC == '-' || item.REPR_NRIC == ''">
                          -
                        </td>
                      </tr>
                      <tr v-if="item.REPR_CITIZEN == 2">
                        <td><b>Passport No</b></td>
                        <td>:</td>
                        <td>{{ item.REPR_PASS_NUM }}</td>
                      </tr>
                      <tr v-if="item.REPR_CITIZEN == 2">
                        <td><b>Passport Expiry Date</b></td>
                        <td>:</td>
                        <td>{{ item.REPR_PASS_EXP }}</td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <!-- <td v-if="item.REPR_TELEPHONE != null">
                            0{{this.item.REPR_TELEPHONE.substring(0,1) }}-{{this.item.REPR_TELEPHONE.substring(1,10)}}
                          </td> -->
                        <td
                          v-if="
                            item.REPR_TELEPHONE == null ||
                              item.REPR_TELEPHONE == '-'
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td>{{ item.REPR_PHONE_EXTENSION }}</td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <!-- <td v-if="item.REPR_MOBILE_NUMBER != '-'">
                          01{{ item.REPR_MOBILE_NUMBER.substring(0, 1) }}-{{
                            item.REPR_MOBILE_NUMBER.substring(1, 10)
                          }}
                        </td> -->
                        <td
                          v-if="
                            item.REPR_MOBILE_NUMBER == null ||
                              item.REPR_MOBILE_NUMBER == '-'
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>{{ item.REPR_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h5>Additional Information</h5>
              <br />
              <div>
                <br />
                <h4>Financial Institution</h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAFP"
                    :key="index"
                  >
                    <div
                      v-if="
                        this.distributorDetail.DIST_TYPE_NAME == '4' ||
                          this.distributorDetail.DIST_TYPE_NAME == '5'
                      "
                    >
                      <tr>
                        <td style="width: 20%">Financial Institution</td>
                        <td style="width: 1%">:</td>
                        <td
                          class="type1"
                          v-if="item.DIST_FINANCIAL_INSTITUTION == 1"
                        >
                          Yes
                        </td>
                        <td
                          class="type1"
                          v-if="item.DIST_FINANCIAL_INSTITUTION == 2"
                        >
                          No
                        </td>

                        <td
                          v-if="
                            item.DIST_FINANCIAL_INSTITUTION == null ||
                              model.DIST_FINANCIAL_INSTITUTION == ''
                          "
                        >
                          -
                        </td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
              <div>
                <br />
                <h4>Financial Planner</h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAFP"
                    :key="index"
                  >
                    <div
                      v-if="
                        this.distributorDetail.DIST_TYPE_NAME == '4' ||
                          this.distributorDetail.DIST_TYPE_NAME == '5'
                      "
                    >
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ item.DIST_FP_SALUTATION }}
                          {{ item.DIST_FP_NAME }}
                        </td>

                        <td
                          v-if="
                            (item.DIST_FP_SALUTATION == null &&
                              item.DIST_FP_NAME == null) ||
                              (item.DIST_FP_SALUTATION == '' &&
                                item.DIST_FP_NAME == '')
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>CMSRL Number</td>
                        <td>:</td>
                        <td class="type1" v-if="item.DIST_FP_CSMRL != null">
                          {{ item.DIST_FP_CSMRL }}
                        </td>
                        <td v-if="item.DIST_FP_CSMRL == null">-</td>
                      </tr>
                      <!-- <tr v-if="item.DIST_FP_CITIZEN == 1">
                        <td>NRIC No</td>
                        <td>:</td>
                        <td class="type1">
                          {{
                            item.DIST_FP_NRIC.substring(0, 6) +
                              "-" +
                              item.DIST_FP_NRIC.substring(6, 8) +
                              "-" +
                              item.DIST_FP_NRIC.substring(8, 13)
                          }}
                        </td>
                      </tr> -->
                      <tr v-if="item.DIST_FP_CITIZEN == 2">
                        <td><b>Passport No</b></td>
                        <td>:</td>
                        <td class="type1">{{ item.DIST_FP_PASS_NUM }}</td>
                      </tr>
                      <tr v-if="item.DIST_FP_CITIZEN == 2">
                        <td><b>Passport Expiry Date</b></td>
                        <td>:</td>
                        <td class="type1">
                          {{ item.DIST_FP_PASS_EXPIRY }}
                        </td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
              <div>
                <br />
                <h4>Head of Department, Compliance Department</h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAFP"
                    :key="index"
                  >
                    <div
                      v-if="item.ADD_TYPE == 'HOD_COMPL' || item.ADD_TYPE == '7'"
                    >
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ item.USER_SAL_NAME }}
                          {{ item.ADD_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <!-- <td class="type1" v-if="item.ADD_TELEPHONE != '-'">
                          0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                            item.ADD_TELEPHONE.substring(1, 10)
                          }}
                        </td> -->
                        <td
                          v-if="
                            item.ADD_TELEPHONE == null ||
                              item.ADD_TELEPHONE == '-' ||
                              item.ADD_TELEPHONE == ''
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td class="type1">
                          {{ item.ADD_PHONE_EXTENSION }}
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <!-- <td class="type1" v-if="item.ADD_MOBILE_NUMBER != '-'">
                          0{{ item.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                            item.ADD_MOBILE_NUMBER.substring(2, 10)
                          }}
                        </td> -->
                        <td
                          v-if="
                            item.ADD_MOBILE_NUMBER == null ||
                              item.ADD_MOBILE_NUMBER == '-' ||
                              item.ADD_MOBILE_NUMBER == ''
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td class="type1">{{ item.ADD_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
              <div>
                <br />
                <h4>
                  Head of Department UTS Distributor, Operation Department
                </h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAAI"
                    :key="index"
                  >
                    <div
                      v-if="item.ADD_TYPE == 'HOD_UTS' || item.ADD_TYPE == '21'"
                    >
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ item.USER_SAL_NAME }}
                          {{ item.ADD_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <!-- <td class="type1" v-if="item.ADD_TELEPHONE != '-'">
                          0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                            item.ADD_TELEPHONE.substring(1, 10)
                          }}
                        </td> -->
                        <td
                          v-if="
                            item.ADD_TELEPHONE == null ||
                              item.ADD_TELEPHONE == '-' ||
                              item.ADD_TELEPHONE == ''
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td class="type1">
                          {{ item.ADD_PHONE_EXTENSION }}
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <!-- <td class="type1" v-if="item.ADD_MOBILE_NUMBER != '-'">
                          0{{ item.ADD_MOBILE_NUMBER.substring(0, 1) }}-{{
                            item.ADD_MOBILE_NUMBER.substring(2, 10)
                          }}
                        </td> -->
                        <td
                          v-if="
                            item.ADD_MOBILE_NUMBER == null ||
                              item.ADD_MOBILE_NUMBER == '-' ||
                              item.ADD_MOBILE_NUMBER == ''
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td class="type1">{{ item.ADD_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
              <div>
                <br />
                <h4>
                  Head of Department PRS Distributor, Operation Department
                </h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAAI"
                    :key="index"
                  >
                    <div
                      v-if="item.ADD_TYPE == 'HOD_PRS' || item.ADD_TYPE == '17'"
                    >
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ item.USER_SAL_NAME }}
                          {{ item.ADD_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <!-- <td class="type1" v-if="item.ADD_TELEPHONE != '-'">
                          0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                            item.ADD_TELEPHONE.substring(1, 10)
                          }}
                        </td> -->
                        <td
                          v-if="
                            item.ADD_TELEPHONE == null ||
                              item.ADD_TELEPHONE == '-' ||
                              item.ADD_TELEPHONE == ''
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td class="type1">
                          {{ item.ADD_PHONE_EXTENSION }}
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <!-- <td class="type1" v-if="item.ADD_MOBILE_NUMBER != '-'">
                          0{{ item.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                            item.ADD_MOBILE_NUMBER.substring(2, 10)
                          }}
                        </td> -->
                        <td
                          v-if="
                            item.ADD_MOBILE_NUMBER == null ||
                              item.ADD_MOBILE_NUMBER == '-' ||
                              item.ADD_MOBILE_NUMBER == ''
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td class="type1">{{ item.ADD_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
              <div>
                <br />
                <h4>Head of Department, Training Department</h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAAI"
                    :key="index"
                  >
                    <div v-if="item.ADD_TYPE == 'HOD_TRAIN'">
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td class="type1">
                          {{ item.USER_SAL_NAME }}
                          {{ item.ADD_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <!-- <td class="type1" v-if="item.ADD_TELEPHONE != null">
                          0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                            item.ADD_TELEPHONE.substring(1, 10)
                          }}
                        </td> -->
                        <td v-if="item.ADD_TELEPHONE == null">-</td>
                      </tr>
                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td class="type1">
                          {{ item.ADD_PHONE_EXTENSION }}
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <!-- <td class="type1" v-if="item.ADD_MOBILE_NUMBER != '-'">
                          0{{ item.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                            item.ADD_MOBILE_NUMBER.substring(2, 10)
                          }}
                        </td> -->
                        <td
                          v-if="
                            item.ADD_MOBILE_NUMBER == null ||
                              item.ADD_MOBILE_NUMBER == '-' ||
                              item.ADD_MOBILE_NUMBER == ''
                          "
                        >
                          -
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td class="type1">{{ item.ADD_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h5>Uploaded Document</h5>
              <br />
              <div>
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
                        :deletable="false"
                        :readonly="true"
                        :linkable="true"
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
                  <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :multiple="false"
                    :deletable="false"
                    :readonly="true"
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
                    v-model="fileRecords"
                  ></VueFileAgent>
                </div>
              </div>
            </div>
          </section>
        </vue-html2pdf>

        <div>
          <div class="flex xs12 md12 xl8">
            <button
              @click="back"
              type="button"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
          </div>
          <div class="float-right">
            <button
              @click="download"
              type="button"
              style="background: #888888; color: #ffffff"
              class="mr-2 btn btn-fill btn-md"
            >
              <i class="fa fa-download" /> &nbsp; Download
            </button>
            <button
              @click="submit(6, 'Are you sure to save as Draft?')"
              type="button"
              class="mr-2 btn btn-info btn-fill btn-md"
              v-show="isShowSubmit"
            >
              <i class="fa fa-edit" /> &nbsp;Save as Draft
            </button>
            <button
              type="button"
              class="mr-2 btn btn-warning btn-fill btn-md"
              @click="submit(7, 'Are you sure to return?')"
              v-show="isShowReturn"
            >
              <i class="fa fa-reply" /> &nbsp; Return
            </button>
            <button
              @click="submit(3, 'Are you sure to approve?')"
              v-show="isShowSubmit"
              type="button"
              class="mr-2 btn btn-success btn-fill btn-md"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Approve
            </button>
          </div>
        </div>
      </va-card>

      <va-card class="mt-4">
        <div class="ml-2">
          Approval Log

          <button
            v-if="visibleLog"
            v-b-toggle.approval-log-distributor-update
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye-slash"></i>
          </button>
          <button
            v-else
            v-b-toggle.approval-log-distributor-update
            type="button"
            class="float-right btn-fill btn-md"
          >
            <i class="fa fa-eye"></i>
          </button>

          <hr />
          <b-collapse id="approval-log-distributor-update" class="mt-2" v-model="visibleLog">
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
              :fields="tableFields.approvalLog"
              :data="distributorDetailTemp.APPRLOG"
              no-data-label="No data found"
              :per-page="parseInt(perPage)"
              :datacount="distributorDetailTemp.APPRLOG.length"
              :dataperpage="parseInt(perPage)"
              clickable
            >
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="APPR_REMARK_PROFILE" slot-scope="props">
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
            <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">SECTION</th>
                    <th scope="col">Remarks</th>
                    <th scope="col">Document</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Distributor Profile</b></td>
                    <td>{{readApprovalRemark.APPROVAL_REMARK_PROFILE}}</td>
                    <td>
                      <vue-form-generator
                        :model="readAppRemark"
                        :schema="fileViewSchemaProfile"
                        :options="formOptions"
                        ref="fileViewSchemaProfile"
                      >
                      </vue-form-generator>
                    </td>
                  </tr>
                  <tr>
                    <td><b>Details Information</b></td>
                    <td>{{readApprovalRemark.APPROVAL_REMARK_DETAILINFO}}</td>
                    <td>
                      <vue-form-generator
                        :model="readAppRemark"
                        :schema="fileViewSchemaDetailInfo"
                        :options="formOptions"
                        ref="fileViewSchemaDetailInfo"
                      >
                      </vue-form-generator>
                    </td>
                  </tr>
                  <tr>
                    <td><b>CEO & Director</b></td>
                    <td>{{readApprovalRemark.APPROVAL_REMARK_CEOnDIR}}</td>
                    <td>
                      <vue-form-generator
                        :model="readAppRemark"
                        :schema="fileViewSchemaCeoAndDir"
                        :options="formOptions"
                        ref="fileViewSchemaCeoAndDir"
                      >
                      </vue-form-generator>
                    </td>
                  </tr>
                  <tr>
                    <td><b>AR and AAR</b></td>
                    <td>{{readApprovalRemark.APPROVAL_REMARK_ARnAAR}}</td>
                    <td>
                      <vue-form-generator
                        :model="readAppRemark"
                        :schema="fileViewSchemaArAndArr"
                        :options="formOptions"
                        ref="fileViewSchemaArAndArr"
                      >
                      </vue-form-generator>
                    </td>
                  </tr>
                  <tr>
                    <td><b>Additional Information</b></td>
                    <td>{{readApprovalRemark.APPROVAL_REMARK_ADDTIONALINFO}}</td>
                    <td>
                      <vue-form-generator
                        :model="readAppRemark"
                        :schema="fileViewSchemaAdditionalInfo"
                        :options="formOptions"
                        ref="fileViewSchemaAdditionalInfo"
                      >
                      </vue-form-generator>
                    </td>
                  </tr>
                  <tr>
                    <td><b>Payment</b></td>
                    <td>{{readApprovalRemark.APPROVAL_REMARK_PAYMENT}}</td>
                    <td>
                      <vue-form-generator
                        :model="readAppRemark"
                        :schema="fileViewSchemaPayment"
                        :options="formOptions"
                        ref="fileViewSchemaPayment"
                      >
                      </vue-form-generator>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      <br />
    </va-inner-loading>
  </div>
</template>
<script>
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import Vue from "vue";
import Tabs from "vue-tabs-with-active-line";
import * as services06Module1 from "../../../app/module1/services06";
import * as services06Module0 from "../../../app/module0/services06";
import * as currencyFormat from "../../../app/currencyFormat";
import * as fileServices from "../../../app/fileServices";
import { debounce } from "lodash";
import VueHtml2pdf from "vue-html2pdf";
import Vudal from "vudal";
const TABS = [
  {
    title: "Distributor Profile",
    value: "tab1"
  },
  {
    title: "Details Information",
    value: "tab2"
  },
  {
    title: "CEO & Director",
    value: "tab3"
  },
  {
    title: "AR and AAR",
    value: "tab4"
  },
  {
    title: "Additional Information",
    value: "tab5"
  },
  {
    title: "Uploaded Document",
    value: "tab8"
  }
];
const TABS2 = [
  {
    title: "Respond And Justification",
    value: "tab1"
  },
  {
    title: "Suspension Details",
    value: "tab2"
  }
];
export default {
  computed: {
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
          // width: "30px"
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: "REQ_DOCU_NAME", //"REQ_DOCU_NAME",
          title: "Name",
          width: "30%"
        },
        {
          name: "__slot:actions",
          title: "Document"
          // dataClass: "float-right"
        },
        {
          name: "__slot:remark",
          title: "Remark"
        }
      ];
    },

    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center"
        },
        {
          name: "__slot:no",
          title: "No"
        },
        {
          name: "APPROVAL_DATE",
          title: "Approval Date"
        },
        {
          name: "DPMT_NAME",
          title: "Department"
        },
        {
          name: "USER_NAME",
          title: "Creation By"
        },
        {
          name: "GROUP_NAME",
          title: "Group"
        },
        {
          name: "TS_PARAM",
          title: "Status"
        },
        {
          name: "__slot:actions",
          title: "Remark/Comment",
          width: "30px",
          dataClass: "justify-content-center"
        }
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.distributorDetail.APPRLOG;
      }

      return this.distributorDetail.APPRLOG.filter(item => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            v =>
              item.APPROVAL_DATE.toLowerCase().includes(v) ||
              item.DPMT_NAME.toLowerCase().includes(v) ||
              item.GROUP_NAME.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v)
          );
      });
    }
  },
  props: {
    dist_id: String
  },
  components: {
    Tabs,
    Vudal,
    VueHtml2pdf
  },

  mounted() {
    var data = localStorage.getItem(
      "distributor-UpdateDetails-SubmissionDetails-RDApproval"
    );
    this.approvalDetail = JSON.parse(data);
    //console.log(this.approvalDetail.DIST_TEMP_ID);
    this.getDistributorById(this.approvalDetail.DIST_ID);
  },

  data() {
    return {
      isLoad: false,
      disableRemark: false,
      isShowReturn: true,
      isShowSubmit: true,
      visibleLog: false,
      docFileRemark: "",
      docRemark: "",
      remarkDocProfile: [],
      remarkDocAddtInfo: [],
      remarkDocARnAAR: [],
      remarkDocCEOnDIR: [],
      remarkDocDetInfo: [],
      remarkDocPayment: [],

      uploadHeaders: {
        "X-Test-Header": "vue-file-agent"
      },

      excelname: "download-file",
      sheetname: "download-sheet",

      APPROVAL_REMARK_PROFILE: null,
      APPROVAL_REMARK_ADDTIONALINFO: null,
      APPROVAL_REMARK_ARnAAR: null,
      APPROVAL_REMARK_CEOnDIR: null,
      APPROVAL_REMARK_DETAILINFO: null,
      APPROVAL_REMARK_PAYMENT: null,

      term: null,
      perPage: "10",
      fileRecordsForUpload: [],
      approvalDetail: "",
      additionalList: [],

      distributorDetail: "",
      distributorDetailTemp: "",

      distributorRprCEO: '',
      distributorRprTempCEO: '',
      distributorRprAR: '',
      distributorRprTempAR: '',
      distributorRprAAR: '',
      distributorRprTempAAR: '',

      distributorAddInfoHOD_COMPL: '',
      distributorAddInfoTempHOD_COMPL: '',
      distributorAddInfoHOD_UTS: '',
      distributorAddInfoTempHOD_UTS: '',
      distributorAddInfoHOD_PRS: '',
      distributorAddInfoTempHOD_PRS: '',
      distributorAddInfoHOD_TRAIN: '',
      distributorAddInfoTempHOD_TRAIN: '',
      getRemark: "",
      tabs: TABS,
      currentTab: "tab1",
      readApprovalRemark: "",
      readAppRemark: {
        apprRemarkDOC1: [],
        apprRemarkDOC2: [],
        apprRemarkDOC3: [],
        apprRemarkDOC4: [],
        apprRemarkDOC5: [],
        apprRemarkDOC6: [],
      },

      tabs2: TABS2,
      currentTab2: "tab1",
      proposalList: [],
      fileRecords: [],
      companyLogo: [],
      ssmForm8: [],
      ssmForm9: [],
      receipt: [],
      BODApprove: [],
      ssmForm13: [],
      uploadCSMRL: [],
      uploadCSMRLorMOFLicense: [],
      ssmForm49: [],
      complianceDeclaration: [],
      ssmForm24: [],
      // fileRemark: [],
      // fileRemark2: [],
      // fileRemark3: [],
      // fileRemark4: [],
      // fileRemark5: [],
      // fileRemark6: [],

      proposalListTemp: [],
      fileRecordsTemp: [],
      companyLogoTemp: [],
      ssmForm8Temp: [],
      ssmForm9Temp: [],
      receiptTemp: [],
      BODApproveTemp: [],
      ssmForm13Temp: [],
      uploadCSMRLTemp: [],
      uploadCSMRLorMOFLicenseTemp: [],
      ssmForm49Temp: [],
      complianceDeclarationTemp: [],
      ssmForm24Temp: [],
      fileRemarkTemp: [],
      fileRemark2Temp: [],
      fileRemark3Temp: [],
      fileRemark4Temp: [],
      fileRemark5Temp: [],
      fileRemark6Temp: [],
      model: {
        remark: "",
        remark1: "",
        remark2: "",
        remark3: "",
        remark4: "",
        remark5: "",

        fileRemark: [],
        fileRemark2: [],
        fileRemark3: [],
        fileRemark4: [],
        fileRemark5: [],
        fileRemark6: [],
      },

      tableFields: {
        approvalLog: [
          {
            name: "__slot:no",
            title: "NO",
          },
          {
            name: "APPROVAL_DATE",
            title: "DATE",
            sortField: "APPROVAL_DATE",
          },
          {
            name: "GROUP_NAME",
            title: "Group",
            sortField: "GROUP_NAME",
          },
          // {
          //   name: "USER_NAME",
          //   title: "Create By",
          //   sortField: "USER_NAME",
          // },
          {
            name: "TS_PARAM",
            title: "Activity",
            sortField: "TS_PARAM",
          },
          {
            name: "__slot:APPR_REMARK_PROFILE",
            title: "Remarks/Comments",
            sortField: "APPR_REMARK_PROFILE",
          },
        ],
      },

      visibleCeoDetails: false,
      visibleDirectorDetails: false,
      remarkProfileschema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                label: "Remarks/ Comments",
                model: "remark",
                hint: "Max 500 characters",
                max: 500,
                rows: 4,
                required: false,
                validator: "string",
                disabled: (model, field, form) => {
                  return this.disableRemark;
                }
              },
              {
                //theme: 'list',
                //labels: "Upload Document",
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "fileRemark",
                type: "vfg-custom-multiple-file-general",
                hint: "Accepted format : (.pdf)",
                required: false
              }
            ]
          }
        ]
      },
      remarkDIschema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                label: "Remarks/ Comments",
                model: "remark1",
                hint: "Max 500 characters",
                max: 500,
                rows: 4,
                required: false,
                validator: "string",
                disabled: (model, field, form) => {
                  return this.disableRemark;
                },
                // styleClasses: "col-md-11"
              },
              {
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "fileRemark2",
                type: "vfg-custom-multiple-file-general",
                hint: "Accepted format : (.pdf)",
                required: false
              }
            ]
          }
        ]
      },
      remarkCEOnDIRschema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                label: "Remarks/ Comments",
                model: "remark2",
                hint: "Max 500 characters",
                max: 500,
                rows: 4,
                required: false,
                validator: "string",
                disabled: (model, field, form) => {
                  return this.disableRemark;
                }
                // styleClasses: "col-md-11"
              },
              {
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "fileRemark3",
                type: "vfg-custom-multiple-file-general",
                hint: "Accepted format : (.pdf)",
                required: false
              }
            ]
          }
        ]
      },
      remarkARnAARschema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                label: "Remarks/ Comments",
                model: "remark3",
                hint: "Max 500 characters",
                max: 500,
                rows: 4,
                required: false,
                validator: "string",
                disabled: (model, field, form) => {
                  return this.disableRemark;
                }
                // styleClasses: "col-md-11"
              },
              {
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "fileRemark4",
                type: "vfg-custom-multiple-file-general",
                hint: "Accepted format : (.pdf)",
                required: false
              }
            ]
          }
        ]
      },
      remarkADDINFOschema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                label: "Remarks/ Comments",
                model: "remark4",
                hint: "Max 500 characters",
                max: 500,
                rows: 4,
                required: false,
                validator: "string",
                disabled: (model, field, form) => {
                  return this.disableRemark;
                }
                // styleClasses: "col-md-11"
              },
              {
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "fileRemark5",
                type: "vfg-custom-multiple-file-general",
                hint: "Accepted format : (.pdf)",
                required: false
              }
            ]
          }
        ]
      },
      remarkPaymentschema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "textArea",
                label: "Remarks/ Comments",
                model: "remark5",
                hint: "Max 500 characters",
                max: 500,
                rows: 4,
                required: false,
                validator: "string",
                disabled: (model, field, form) => {
                  return this.disableRemark;
                }
                // styleClasses: "col-md-11"
              },
              {
                accept: ".pdf",
                multiple: false,
                text: "Choose a File",
                model: "fileRemark6",
                type: "vfg-custom-multiple-file-general",
                hint: "Accepted format : (.pdf)",
                required: false
              }
            ]
          }
        ]
      },

      fileViewSchemaProfile: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "apprRemarkDOC1",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },
      fileViewSchemaDetailInfo: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "apprRemarkDOC2",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },
      fileViewSchemaCeoAndDir: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "apprRemarkDOC3",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },
      fileViewSchemaArAndArr: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "apprRemarkDOC4",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },
      fileViewSchemaAdditionalInfo: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "apprRemarkDOC5",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },
      fileViewSchemaPayment: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                accept: ".pdf",
                multiple: true,
                text: "Choose a File",
                model: "apprRemarkDOC6",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false,
                disabled: true
              }
            ]
          }
        ]
      },

      formOptions: {
        //validateAfterLoad: false,
        validateAfterChanged: true
        //validateAsync: true,
      }
    };
  },

  methods: {
    async back() {
      this.$router.push(
        "/fimm/distributor-UpdateDetails-SubmissionList-RDApproval"
      );
    },
    download() {
      this.$refs.html2Pdf.generatePdf();
    },
    async readMore(data) {
      this.$modals.readMoreModal.$show();
      this.readApprovalRemark = data;
      if(this.readApprovalRemark.APPROVAL_DOC && this.readApprovalRemark.APPROVAL_DOC.length>=1){
        this.readApprovalRemark.APPROVAL_DOC.forEach(element => {
          element.DOCU_BLOB = fileServices.b64toBlobPDF(
            element.DOCU_BLOB,
            "application/pdf"
          );
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
          if (element.DOCU_TYPE == 1) { // 1: Profile, 2: Details Info, 3: CEO & Director Info, 4: AR / AAR Info, 5: Additional Info, 6: Payment Info
            this.readAppRemark.apprRemarkDOC1 = [];
            this.readAppRemark.apprRemarkDOC1.push(data);
          } else if (element.DOCU_TYPE == 2) {
            this.readAppRemark.apprRemarkDOC2 = [];
            this.readAppRemark.apprRemarkDOC2.push(data);
          } else if (element.DOCU_TYPE == 3) {
            this.readAppRemark.apprRemarkDOC3 = [];
            this.readAppRemark.apprRemarkDOC3.push(data);
          } else if (element.DOCU_TYPE == 4) {
            this.readAppRemark.apprRemarkDOC4 = [];
            this.readAppRemark.apprRemarkDOC4.push(data);
          } else if (element.DOCU_TYPE == 5) {
            this.readAppRemark.apprRemarkDOC5 = [];
            this.readAppRemark.apprRemarkDOC5.push(data);
          } else if (element.DOCU_TYPE == 6) {
            this.readAppRemark.apprRemarkDOC6 = [];
            this.readAppRemark.apprRemarkDOC6.push(data);
          }
        });
      }else{
        this.readAppRemark.apprRemarkDOC1 = [];
        this.readAppRemark.apprRemarkDOC2 = [];
        this.readAppRemark.apprRemarkDOC3 = [];
        this.readAppRemark.apprRemarkDOC4 = [];
        this.readAppRemark.apprRemarkDOC5 = [];
        this.readAppRemark.apprRemarkDOC6 = [];
      }
    },
    async details(data) {
      this.remarkDocProfile = [];
      this.remarkDocAddtInfo = [];
      this.remarkDocARnAAR = [];
      this.remarkDocCEOnDIR = [];
      this.remarkDocDetInfo = [];
      this.remarkDocPayment = [];
      const response = await services06Module1.getDistributorDocumentRemark(
        data.DIST_APPROVAL_ID
      );
      this.docFileRemark = response.dataDocument;
      this.docRemark = response.dataDocumentRemark;
      this.docFileRemark.forEach(element => {
        element.DOCU_BLOB = fileServices.b64toBlobPDF(
          element.DOCU_BLOB,
          "application/pdf"
        );
        element.DOCU_BLOB = new File(
          [element.DOCU_BLOB],
          element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          { type: element.DOCU_BLOB.type }
        );
        //console.log(element.DOCU_BLOB);
        const data = {
          name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          size: element.DOCU_FILESIZE,
          type: element.DOCU_FILETYPE,
          ext: "exe",
          url: window.URL.createObjectURL(element.DOCU_BLOB)
        };
        if (element.DOCU_TYPE == 1) {
          this.remarkDocProfile.push(data);
        } else if (element.DOCU_TYPE == 2) {
          this.remarkDocAddtInfo.push(data);
        } else if (element.DOCU_TYPE == 3) {
          this.remarkDocARnAAR.push(data);
        } else if (element.DOCU_TYPE == 4) {
          this.remarkDocCEOnDIR.push(data);
        } else if (element.DOCU_TYPE == 5) {
          this.remarkDocDetInfo.push(data);
        } else if (element.DOCU_TYPE == 6) {
          this.remarkDocPayment.push(data);
        }
      });
      this.APPROVAL_REMARK_PROFILE = data.APPROVAL_REMARK_PROFILE;
      this.APPROVAL_REMARK_ADDTIONALINFO = data.APPROVAL_REMARK_ADDTIONALINFO;
      this.APPROVAL_REMARK_ARnAAR = data.APPROVAL_REMARK_ARnAAR;
      this.APPROVAL_REMARK_CEOnDIR = data.APPROVAL_REMARK_CEOnDIR;
      this.APPROVAL_REMARK_DETAILINFO = data.APPROVAL_REMARK_DETAILINFO;
      this.APPROVAL_REMARK_PAYMENT = data.APPROVAL_REMARK_PAYMENT;
      this.$modals.remarkModal.$show();
    },
    getDistrDocumentRemark() {},
    search: debounce(function(term) {
      this.term = term;
    }, 400),
    filesSelected: function(fileRecordsNewlySelected, status) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      //alert(validFileRecords);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
      // alert(JSON.decode(this.fileRecordsForUpload));
      // alert(JSON.parse(this.fileRecordsForUpload));
      //console.log(fileRecordsNewlySelected);
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        if (status == 1) {
          // alert(JSON.decode(this.fileRecordsForUpload));
          // alert(JSON.decode(this.fileRecordsForUpload[i]));
          this.model.fileRemark = this.fileRecordsForUpload[i].file;

          //alert(JSON.decode(this.model.fileRemark));
        } else if (status == 2) {
          this.model.fileRemark2 = this.fileRecordsForUpload[i].file;
        } else if (status == 3) {
          this.model.fileRemark3 = this.fileRecordsForUpload[i].file;
        } else if (status == 4) {
          this.model.fileRemark4 = this.fileRecordsForUpload[i].file;
        } else if (status == 5) {
          this.model.fileRemark5 = this.fileRecordsForUpload[i].file;
        } else if (status == 6) {
          this.model.fileRemark6 = this.fileRecordsForUpload[i].file;
        }
      }
    },
    onBeforeDelete: function(fileRecord, status) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
        if (status == 1) {
          this.model.fileRemark = [];
        } else if (status == 2) {
          this.model.fileRemark2 = [];
        } else if (status == 3) {
          this.model.fileRemark3 = [];
        } else if (status4 == 4) {
          this.model.fileRemark4 = [];
        } else if (status == 5) {
          this.model.fileRemark5 = [];
        } else if (status == 6) {
          this.model.fileRemark6 = [];
        }
        var i;
        for (i = 0; i < this.fileRecordsForUpload.length; i++) {
          if (status == 1) {
            this.model.fileRemark.push(this.fileRecordsForUpload[i].file);
          } else if (status == 2) {
            this.model.fileRemark2.push(this.fileRecordsForUpload[i].file);
          } else if (status == 3) {
            this.model.fileRemark3.push(this.fileRecordsForUpload[i].file);
          } else if (status == 4) {
            this.model.fileRemark4.push(this.fileRecordsForUpload[i].file);
          } else if (status == 5) {
            this.model.fileRemark5.push(this.fileRecordsForUpload[i].file);
          } else if (status == 6) {
            this.model.fileRemark6.push(this.fileRecordsForUpload[i].file);
          }
        }
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    // fileDeleted: function(fileRecord) {
    //   var i = this.fileRecordsForUpload.indexOf(fileRecord);
    //   if (i !== -1) {
    //     this.fileRecordsForUpload.splice(i, 1);
    //   } else {
    //     this.deleteUploadedFile(fileRecord);
    //   }
    // },

    async submit(status, confirm_text) {
      if(confirm(confirm_text)){
        //this.$modals.showConfirmModal.$show();
        const user = localStorage.getItem("user");
        const distData = localStorage.getItem(
          "distributor-UpdateDetails-SubmissionDetails-RDApproval"
        );
        const data = new FormData();
        data.append("DIST_ID", JSON.parse(distData).DIST_ID);
        data.append("DIST_TEMP_ID", JSON.parse(distData).DIST_TEMP_ID);
        data.append("DIST_TYPE_ID", this.distributorDetail.DIST_TYPE_ID);
        data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
        data.append("APPROVAL_LEVEL_ID", JSON.parse(distData).APPROVAL_LEVEL_ID);
        data.append("APPROVAL_STATUS", status);
        data.append("APPROVAL_USER", JSON.parse(user).user_id);

        data.append("APPROVAL_REMARK_PROFILE", this.model.remark ? this.model.remark : '');
        //data.append("APPR_REMARK_DOCU_PROFILE[]", this.model.fileRemark);
        for (let i = 0; i < this.model.fileRemark.length; i++) {
            data.append("APPR_REMARK_DOCU_PROFILE[]", this.model.fileRemark[i]);
        }
        data.append('APPR_REMARK_DOCU_PROFILE_TYPE', 1); // 1: Profile, 2: Details Info, 3: CEO & Director Info, 4: AR / AAR Info, 5: Additional Info, 6: Payment Info

        data.append("APPROVAL_REMARK_DETAILINFO", this.model.remark1 ? this.model.remark1 : '');
        for (let i = 0; i < this.model.fileRemark2.length; i++) {
            data.append("APPR_REMARK_DOCU_DETAILINFO[]", this.model.fileRemark2[i]);
        }
        data.append('APPR_REMARK_DOCU_DETAILINFO_TYPE', 2);

        data.append("APPROVAL_REMARK_CEOnDIR", this.model.remark2 ? this.model.remark2 : '');
        for (let i = 0; i < this.model.fileRemark3.length; i++) {
            data.append("APPR_REMARK_DOCU_CEOnDIR[]", this.model.fileRemark3[i]);
        }
        data.append('APPR_REMARK_DOCU_CEOnDIR_TYPE', 3);

        data.append("APPROVAL_REMARK_ARnAAR", this.model.remark3 ? this.model.remark3 : '');
        for (let i = 0; i < this.model.fileRemark4.length; i++) {
            data.append("APPR_REMARK_DOCU_ARnAAR[]", this.model.fileRemark4[i]);
        }
        data.append('APPR_REMARK_DOCU_ARnAAR_TYPE', 4);

        data.append("APPROVAL_REMARK_ADDTIONALINFO", this.model.remark4 ? this.model.remark4 : '');
        for (let i = 0; i < this.model.fileRemark5.length; i++) {
            data.append("APPR_REMARK_DOCU_ADDITIONALINFO[]", this.model.fileRemark5[i]);
        }
        data.append('APPR_REMARK_DOCU_ADDITIONALINFO_TYPE', 5);

        data.append("APPROVAL_REMARK_PAYMENT", this.model.remark5? this.model.remark5 : '');
        for (let i = 0; i < this.model.fileRemark6.length; i++) {
            data.append("APPR_REMARK_DOCU_PAYMENT[]", this.model.fileRemark6[i]);
        }
        data.append('APPR_REMARK_DOCU_PAYMENT_TYPE', 6);

        data.append("DOCU_REMARK_LIST", JSON.stringify(this.proposalList));
        data.append("APPR_INDEX", JSON.parse(distData).APPR_INDEX);
        data.append("USER_TYPE", "RD");
        console.log(status);

        if(status == 6){
          this.isLoad = true;
          const response = await services06Module1.createFIMMUpdateReview(
            data
          );
          this.getDistributorById(this.approvalDetail.DIST_ID);
          //this.isLoad = false;
        }else if (status == 3) {
          this.isLoad = true;
          // console.log(approvalLevel);
          // data.append("APPR_LIST", JSON.stringify(approvalLevel));
          data.append("APPR_INDEX_CURRENT", this.approvalDetail.APPR_INDEX);
          const response = await services06Module1.createFIMMUpdateReview(
            data
          );
          this.isLoad = false;
          this.$router.go(-1);
        } else if (status == 7) {
          this.isLoad = true;
          const response = await services06Module1.createFIMMUpdateReview(
            data
          );
          this.isLoad = false;
          alert("This submission has been returned.");
          this.$router.go(-1);
        } else {
          console.log("cancel action");
        }
        // const response = await services06Module1.createDistributorReview(data);
        // this.$router.go(-1);
      }
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

      //console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },

    // // async getDistributorByIdTemp(dist_id,dist_temp_id) {
    //   async getDistributorByIdTemp(dist_id) {
    //   // alert (dist_temp_id);
    //   var data= {
    //     dist_id: dist_id,
    //     dist_temp_id: dist_temp_id
    //   };
    //   console.log(data);
    //   // const response = await services06Module1.getDistributorByIdApprTemp(data);

    async getDistributorById(dist_id) {
      this.isLoad = true;
      const response = await services06Module1.getDistributorByIdAppr(dist_id);
      this.distributorDetail = response;
      this.storeDistRprData();
      this.storeDistAddInfoData();

      this.getDistributorByIdTemp();

      if (this.approvalDetail.TS_ID == 15 || this.approvalDetail.TS_ID == 6) { // 15=Pending for FIMM Aproval, 6=Draft by FIMM
        this.disableRemark = false;
        this.isShowReturn = true;
        this.isShowSubmit = true;
      } else {
        this.disableRemark = true;
        this.isShowReturn = false;
        this.isShowSubmit = false;
      }
      // Create our number formatter.
      // const responseCurrency = await services06Module0.getCurrencyFormat("MYR");
      // const formatter = currencyFormat.currencyFormat(
      //   responseCurrency.SET_REMARK,
      //   responseCurrency.SET_PARAM
      // );
      // this.distributorDetail.DIST_PAID_UP_CAPITAL = formatter.format(
      //   this.distributorDetail.DIST_PAID_UP_CAPITAL
      // );
      // this.distributorDetail.DIST_ACC_AMOUNT = formatter.format(
      //   this.distributorDetail.DIST_ACC_AMOUNT
      // );
      if(response.DATADOC && response.DATADOC.length>=1){
        response.DATADOC.forEach(element => {
          element.DOCU_BLOB = fileServices.b64toBlobPDF(
            element.DOCU_BLOB,
            element.DOCU_MIMETYPE
          );
          //console.log(element.DOCU_BLOB); // <----- cuba tgk ini
          element.DOCU_BLOB = new File(
            [element.DOCU_BLOB],
            element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
            { type: element.DOCU_BLOB.type }
          );
          //console.log(element.DOCU_BLOB);
          const data = {
            name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
            size: element.DOCU_FILESIZE,
            type: element.DOCU_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCU_BLOB)
          };
          if (element.DOCU_GROUP == 8) {
            this.fileRecords = [];
            this.fileRecords.push(data);
          } else if (element.DOCU_GROUP == 3) {
            this.companyLogo = [];
            this.companyLogo.push(data);
          } else if (element.DOCU_GROUP == 5) {
            this.ssmForm8 = [];
            this.ssmForm8.push(data);
          } else if (element.DOCU_GROUP == 4) {
            this.ssmForm9 = [];
            this.ssmForm9.push(data);
          } else if (element.DOCU_GROUP == 7) {
            this.receipt = [];
            this.receipt.push(data);
          } else if (element.DOCU_GROUP == 6) {
            this.BODApprove = [];
            this.BODApprove.push(data);
          } else if (element.DOCU_GROUP == 9) {
            this.ssmForm13 = [];
            this.ssmForm13.push(data);
          } else if (element.DOCU_GROUP == 10) {
            this.uploadCSMRL = [];
            this.uploadCSMRL.push(data);
          } else if (element.DOCU_GROUP == 11) {
            this.uploadCSMRLorMOFLicense = [];
            this.uploadCSMRLorMOFLicense.push(data);
          } else if (element.DOCU_GROUP == 12) {
            this.ssmForm49 = [];
            this.ssmForm49.push(data);
          } else if (element.DOCU_GROUP == 13) {
            this.complianceDeclaration = [];
            this.complianceDeclaration.push(data);
          } else if (element.DOCU_GROUP == 14) {
            this.ssmForm24 = [];
            this.ssmForm24.push(data);
          }
        });
      }
    },

    async getDistributorByIdTemp() {
      var data = localStorage.getItem(
        "distributor-UpdateDetails-SubmissionDetails-RDApproval"
      );
      this.approvalDetail = JSON.parse(data);
      const datagetTemp = {
        dist_id: this.approvalDetail.DIST_ID,
        dist_temp_id: this.approvalDetail.DIST_TEMP_ID
      };
      const response = await services06Module1.getDistributorByIdApprTemp(
        datagetTemp
      );
      this.distributorDetailTemp = response;
      this.storeDistRprTempData();
      this.storeDistAddInfoTempData();

      //console.log(this.distributorDetailTemp);

      this.getDistributorApprovalRemark();
      this.getDocumentProposal();

      if(response.DATADOC && response.DATADOC.length>=1){
        response.DATADOC.forEach(element => {
          element.DOCU_BLOB = fileServices.b64toBlobPDF(
            element.DOCU_BLOB,
            element.DOCU_MIMETYPE
          );
          //console.log(element.DOCU_BLOB); // <----- cuba tgk ini
          element.DOCU_BLOB = new File(
            [element.DOCU_BLOB],
            element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
            { type: element.DOCU_BLOB.type }
          );
          //console.log(element.DOCU_BLOB);
          const data = {
            name: element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
            size: element.DOCU_FILESIZE,
            type: element.DOCU_FILETYPE,
            ext: "exe",
            url: window.URL.createObjectURL(element.DOCU_BLOB)
          };
          if (element.DOCU_GROUP == 8) {
            this.fileRecordsTemp = [];
            this.fileRecordsTemp.push(data);
          } else if (element.DOCU_GROUP == 3) {
            this.companyLogoTemp = [];
            this.companyLogoTemp.push(data);
          } else if (element.DOCU_GROUP == 5) {
            this.ssmForm8Temp = [];
            this.ssmForm8Temp.push(data);
          } else if (element.DOCU_GROUP == 4) {
            this.ssmForm9Temp = [];
            this.ssmForm9Temp.push(data);
          } else if (element.DOCU_GROUP == 7) {
            this.receiptTemp = [];l
            this.receiptTemp.push(data);
          } else if (element.DOCU_GROUP == 6) {
            this.BODApproveTemp = [];
            this.BODApproveTemp.push(data);
          } else if (element.DOCU_GROUP == 9) {
            this.ssmForm13Temp = [];
            this.ssmForm13Temp.push(data);
          } else if (element.DOCU_GROUP == 10) {
            this.uploadCSMRLTemp = [];
            this.uploadCSMRLTemp.push(data);
          } else if (element.DOCU_GROUP == 11) {
            this.uploadCSMRLorMOFLicenseTemp=[];
            this.uploadCSMRLorMOFLicenseTemp.push(data);
          } else if (element.DOCU_GROUP == 12) {
            this.ssmForm49Temp=[];
            this.ssmForm49Temp.push(data);
          } else if (element.DOCU_GROUP == 13) {
            this.complianceDeclarationTemp=[];
            this.complianceDeclarationTemp.push(data);
          } else if (element.DOCU_GROUP == 14) {
            this.ssmForm24Temp=[];
            this.ssmForm24Temp.push(data);
          }
        });
      }
      this.isLoad = false;
    },

    async getDistributorApprovalRemark() {
      const user = localStorage.getItem("user");
      const response = await services06Module1.getReviewRemark(this.approvalDetail.DIST_TEMP_ID, JSON.parse(user).USER_GROUP_ID);

      this.model.remark = response.APPROVAL_REMARK_PROFILE;
      this.model.remark1 = response.APPROVAL_REMARK_DETAILINFO;
      this.model.remark2 = response.APPROVAL_REMARK_CEOnDIR;
      this.model.remark3 = response.APPROVAL_REMARK_ARnAAR;
      this.model.remark4 = response.APPROVAL_REMARK_ADDTIONALINFO;

      if(response.REMARK_DOC){
        response.REMARK_DOC.forEach(element => {
          element.DOCU_BLOB = fileServices.b64toBlobPDF(
            element.DOCU_BLOB,
            "application/pdf"
          );
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
          if (element.DOCU_TYPE == 1) { // 1: Profile, 2: Details Info, 3: CEO & Director Info, 4: AR / AAR Info, 5: Additional Info, 6: Payment Info
            this.model.fileRemark = [];
            this.model.fileRemark.push(data);
          } else if (element.DOCU_TYPE == 2) {
            this.model.fileRemark2 = [];
            this.model.fileRemark2.push(data);
          } else if (element.DOCU_TYPE == 3) {
            this.model.fileRemark3 = [];
            this.model.fileRemark3.push(data);
          } else if (element.DOCU_TYPE == 4) {
            this.model.fileRemark4 = [];
            this.model.fileRemark4.push(data);
          } else if (element.DOCU_TYPE == 5) {
            this.model.fileRemark5 = [];
            this.model.fileRemark5.push(data);
          } else if (element.DOCU_TYPE == 6) {
            this.model.fileRemark6 = [];
            this.model.fileRemark6.push(data);
          }
        });
      }
    },

    storeDistRprData(){
      if(this.distributorDetail.DATAREPR){
        this.distributorDetail.DATAREPR.forEach(element => {
          if(element.REPR_TYPE=='CEO'){
              this.distributorRprCEO = element;
          }else if(element.REPR_TYPE=='AR'){
            this.distributorRprAR = element;
          }
          else if(element.REPR_TYPE=='AAR'){
            this.distributorRprAAR = element;
          }
        });
      }
    },

    storeDistRprTempData(){
      if(this.distributorDetailTemp.DATAREPR){
        this.distributorDetailTemp.DATAREPR.forEach(element => {
          if(element.REPR_TYPE=='CEO'){
              this.distributorRprTempCEO = element;
          }else if(element.REPR_TYPE=='AR'){
            this.distributorRprTempAR = element;
          }
          else if(element.REPR_TYPE=='AAR'){
            this.distributorRprTempAAR = element;
          }
        });
      }
    },

    storeDistAddInfoData(){
      if(this.distributorDetail.DATAAI){
        this.distributorDetail.DATAAI.forEach(element => {
          if(element.ADD_TYPE=='HOD_COMPL'){
              this.distributorAddInfoHOD_COMPL = element;
          }else if(element.ADD_TYPE=='HOD_UTS'){
            this.distributorAddInfoHOD_UTS = element;
          }
          else if(element.ADD_TYPE=='HOD_PRS'){
            this.distributorAddInfoHOD_PRS = element;
          }
          else if(element.ADD_TYPE=='HOD_TRAIN'){
            this.distributorAddInfoHOD_TRAIN = element;
          }
        });
      }
    },

    storeDistAddInfoTempData(){
      if(this.distributorDetailTemp.DATAAI){
        this.distributorDetailTemp.DATAAI.forEach(element => {
          if(element.ADD_TYPE=='HOD_COMPL'){
              this.distributorAddInfoTempHOD_COMPL = element;
          }else if(element.ADD_TYPE=='HOD_UTS'){
            this.distributorAddInfoTempHOD_UTS = element;
          }
          else if(element.ADD_TYPE=='HOD_PRS'){
            this.distributorAddInfoTempHOD_PRS = element;
          }
          else if(element.ADD_TYPE=='HOD_TRAIN'){
            this.distributorAddInfoTempHOD_TRAIN = element;
          }
        });
      }
    },

    async getDocumentProposal() {
      this.isLoad = true;

      const data = {
        REQ_DOCU_TYPE: 1,
        MANAGE_SUBMODULE_ID: 1,
        DISTRIBUTOR_ID: this.approvalDetail.DISTRIBUTOR_ID
      };
      const response = await services06Module0.getDocumentDataReview(data);
      this.proposalList = response.dataProposal;
      //console.log("this is document proposal:", this.proposalList);
      this.proposalList.forEach(item => {
        item.list.forEach(element => {
          // console.log(element.DOCU_BLOB);
          element.DOCU_BLOB = fileServices.b64toBlobPDF(
            element.DOCU_BLOB,
            "application/pdf"
          );
          //console.log(element.DOCU_BLOB); // <----- cuba tgk ini
          element.DOCU_BLOB = new File(
            [element.DOCU_BLOB],
            element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
            { type: element.DOCU_BLOB.type }
          );
          //console.log(element.DOCU_BLOB);
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
        element.DOCU_BLOB = fileServices.b64toBlobPDF(
          element.DOCU_BLOB,
          "application/pdf"
        );
        //console.log(element.DOCU_BLOB); // <----- cuba tgk ini
        element.DOCU_BLOB = new File(
          [element.DOCU_BLOB],
          element.DOCU_ORIGINAL_NAME + "." + element.DOCU_FILETYPE,
          { type: element.DOCU_BLOB.type }
        );
        //console.log(element.DOCU_BLOB);
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

      this.isLoad = false;
    },

    saveAsDraft() {},

    validatestatusForm() {
      return this.$refs.statusForm.validate();
    },
    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    handleClick2(newTab) {
      this.currentTab2 = newTab;
    },
    onModelUpdated(newVal, schema) {
      console.log(newVal);
      if (schema == "status") {
        this.model.applicationType = newVal;
        if (newVal == "2") {
          this.visibledatesuspension = true;
        } else this.visibledatesuspension = true;
      }
    }
  }
};
</script>

<style lang="scss">
.type1 {
  width: 30%;
}
.type2 {
  width: 30%;
  color: red;
}
.default-tabs {
  position: relative;
  margin: 0 auto;

  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;

    &__active {
      color: black;
    }

    &:hover {
      border-bottom: 2px solid gray;
      color: black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
.alignright {
  display: flex;
  justify-content: flex-end;
}

.alignleft {
  display: flex;
  justify-content: flex-start;
}
</style>

<style scoped>
.widthModal {
  width: 80%;
}
</style>
