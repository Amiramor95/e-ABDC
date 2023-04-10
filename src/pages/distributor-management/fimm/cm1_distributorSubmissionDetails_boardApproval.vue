<template>
  <div class="flex xs12 md12 xl12">
    <vudal name="readModal" class="widthModal">
      <div class="header">
        View Details<i class="close icon">&times;</i>
      </div>
      <div class="content text-center" >
        <img :src="this.model.logoUrl" >
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
    <vudal name="showInstructionModal" class="widthModal">
      <div class="content">
        <p>Please insert your remark for this distributor registration.</p>
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
          <i class="fa fa-times" /> &nbsp; Disagree
        </button>
        <button
          type="button"
          class="cancel vudal-btn mr-2 btn btn-success btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Agree
        </button>
      </div>
    </vudal>
    <vudal name="remarkModal" class="widthModal">
      <div class="header">
        Remark/Comment
        <i class="close icon">&times;</i>
        <br />
      </div>
      <div class="content">
        <table class="table">
          <tbody>
            <tr>
              <td style="width: 20%">Remark Distributor Profile</td>
              <td style="width: 1%">:</td>
              <td v-if="this.APPROVAL_REMARK_PROFILE != null">
                <div>
                  {{ this.APPROVAL_REMARK_PROFILE }}
                </div>
                <br />
                <div>
                  <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :downloadable="false"
                    :readonly="true"
                    :multiple="true"
                    :deletable="false"
                    :editable="false"
                    :linkable="true"
                    :accept="'.pdf'"
                    :maxSize="'2MB'"
                    :maxFiles="8"
                    :helpText="'Select files'"
                    :errorText="{
                      type: 'Please select images, videos, pdf or zip files',
                      size: 'You selected a larger file!',
                    }"
                    :thumbnailSize="120"
                    :theme="'list'"
                    v-model="remarkDocProfile"
                  ></VueFileAgent>
                </div>
              </td>
              <td v-if="this.APPROVAL_REMARK_PROFILE == null">-</td>
            </tr>
            <tr>
              <td style="width: 20%">Remark Details Information</td>
              <td style="width: 1%">:</td>
              <td v-if="this.APPROVAL_REMARK_DETAILINFO != null">
                <div>
                  {{ this.APPROVAL_REMARK_DETAILINFO }}
                </div>
                <br />
                <div>
                  <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :downloadable="false"
                    :readonly="true"
                    :multiple="true"
                    :deletable="false"
                    :editable="false"
                    :linkable="true"
                    :accept="'.pdf'"
                    :maxSize="'2MB'"
                    :maxFiles="8"
                    :helpText="'Select files'"
                    :errorText="{
                      type: 'Please select images, videos, pdf or zip files',
                      size: 'You selected a larger file!',
                    }"
                    :thumbnailSize="120"
                    :theme="'list'"
                    v-model="remarkDocDetInfo"
                  ></VueFileAgent>
                </div>
              </td>
              <td v-if="this.APPROVAL_REMARK_DETAILINFO == null">-</td>
            </tr>
            <tr>
              <td style="width: 20%">Remark CEO and Director</td>
              <td style="width: 1%">:</td>
              <td v-if="this.APPROVAL_REMARK_CEOnDIR != null">
                <div>
                  {{ this.APPROVAL_REMARK_CEOnDIR }}
                </div>
                <br />
                <div>
                  <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :downloadable="false"
                    :readonly="true"
                    :multiple="true"
                    :deletable="false"
                    :editable="false"
                    :linkable="true"
                    :accept="'.pdf'"
                    :maxSize="'2MB'"
                    :maxFiles="8"
                    :helpText="'Select files'"
                    :errorText="{
                      type: 'Please select images, videos, pdf or zip files',
                      size: 'You selected a larger file!',
                    }"
                    :thumbnailSize="120"
                    :theme="'list'"
                    v-model="remarkDocCEOnDIR"
                  ></VueFileAgent>
                </div>
              </td>
              <td v-if="this.APPROVAL_REMARK_CEOnDIR == null">-</td>
            </tr>
            <tr>
              <td style="width: 20%">Remark AR and AAR</td>
              <td style="width: 1%">:</td>
              <td v-if="this.APPROVAL_REMARK_ARnAAR != null">
                <div>
                  {{ this.APPROVAL_REMARK_ARnAAR }}
                </div>
                <br />
                <div>
                  <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :downloadable="false"
                    :readonly="true"
                    :multiple="true"
                    :deletable="false"
                    :editable="false"
                    :linkable="true"
                    :accept="'.pdf'"
                    :maxSize="'2MB'"
                    :maxFiles="8"
                    :helpText="'Select files'"
                    :errorText="{
                      type: 'Please select images, videos, pdf or zip files',
                      size: 'You selected a larger file!',
                    }"
                    :thumbnailSize="120"
                    :theme="'list'"
                    v-model="remarkDocARnAAR"
                  ></VueFileAgent>
                </div>
              </td>
              <td v-if="this.APPROVAL_REMARK_ARnAAR == null">-</td>
            </tr>
            <tr>
              <td style="width: 20%">Remark Additional Information</td>
              <td style="width: 1%">:</td>
              <td v-if="this.APPROVAL_REMARK_ADDTIONALINFO != null">
                <div>
                  {{ this.APPROVAL_REMARK_ADDTIONALINFO }}
                </div>
                <br />
                <div>
                  <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :downloadable="false"
                    :readonly="true"
                    :multiple="true"
                    :deletable="false"
                    :editable="false"
                    :linkable="true"
                    :accept="'.pdf'"
                    :maxSize="'2MB'"
                    :maxFiles="8"
                    :helpText="'Select files'"
                    :errorText="{
                      type: 'Please select images, videos, pdf or zip files',
                      size: 'You selected a larger file!',
                    }"
                    :thumbnailSize="120"
                    :theme="'list'"
                    v-model="remarkDocAddtInfo"
                  ></VueFileAgent>
                </div>
              </td>
              <td v-if="this.APPROVAL_REMARK_ADDTIONALINFO == null">-</td>
            </tr>
            <tr>
              <td style="width: 20%">Remark Payment Information</td>
              <td style="width: 1%">:</td>
              <td v-if="this.APPROVAL_REMARK_PAYMENT != null">
                <div>
                  {{ this.APPROVAL_REMARK_PAYMENT }}
                </div>
                <br />
                <div>
                  <VueFileAgent
                    :uploadUrl="'https://example.com'"
                    :uploadHeaders="{}"
                    :downloadable="false"
                    :readonly="true"
                    :multiple="true"
                    :deletable="false"
                    :editable="false"
                    :linkable="true"
                    :accept="'.pdf'"
                    :maxSize="'2MB'"
                    :maxFiles="8"
                    :helpText="'Select files'"
                    :errorText="{
                      type: 'Please select images, videos, pdf or zip files',
                      size: 'You selected a larger file!',
                    }"
                    :thumbnailSize="120"
                    :theme="'list'"
                    v-model="remarkDocPayment"
                  ></VueFileAgent>
                </div>
              </td>
              <td v-if="this.APPROVAL_REMARK_PAYMENT == null">-</td>
            </tr>
          </tbody>
        </table>
        <h5>Proposal Document Remark</h5>
        <table class="table">
          <tbody>
            <tr style="background-color: lightgrey">
              <div>
                <th style="width: 40%">File Name</th>
                <th style="width: 1%"></th>
                <th>Remark</th>
              </div>
            </tr>
            <tr v-for="(item, index) in docRemark" :key="index">
              <div v-if="item.REQ_DOCU_TYPE == 1">
                <td style="width: 40%">{{ item.REQ_DOCU_NAME }}</td>
                <td style="width: 1%">:</td>
                <td>
                  {{ item.DOCU_REMARK }}
                </td>
              </div>
            </tr>
          </tbody>
        </table>

        <h5>Additional Required Document Remark</h5>
        <table class="table">
          <tbody>
            <tr style="background-color: lightgrey">
              <div>
                <th style="width: 40%">File Name</th>
                <th style="width: 1%"></th>
                <th>Remark</th>
              </div>
            </tr>
            <tr v-for="(item, index) in docRemark" :key="index">
              <div v-if="item.REQ_DOCU_TYPE == 2">
                <td style="width: 40%">{{ item.REQ_DOCU_NAME }}</td>
                <td style="width: 1%">:</td>
                <td>
                  {{ item.DOCU_REMARK }}
                </td>
              </div>
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
    <va-card
      class="strpied-tabled-with-hover"
      body-classes="table-full-width table-responsive"
    >
      <h4 slot="header" class="card-title">Details of Distributor</h4>

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
              <table class="table table-striped"></table>
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width: 20%">Distributor Name</td>
                    <td style="width: 1%">:</td>
                    <td>{{ this.distributorDetail.DIST_NAME }}</td>
                  </tr>
                  <tr>
                    <td>Registration Number</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.DIST_REGI_NUM1 }}</td>
                  </tr>
                  <tr>
                    <td style="width: 20%">Company Logo</td>
                    <td style="width: 2%">:</td>
                    <td>
                      <div v-for="(logo,index) in companyLogo" :key="index">
                         <span
                           v-b-tooltip.hover
                           v-on:click="readMore(logo.url)"
                           title="view"
                           class="badge mr-2"
                         >
                            <img :src="logo.url" width="150">
                          </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>New Registration Number</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.DIST_REGI_NUM2 }}</td>
                  </tr>
                  <tr>
                    <td>Date of Incorporation</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.DIST_DATE_INCORP }}</td>
                  </tr>
                  <tr>
                    <td>Type of Setup</td>
                    <td>:</td>
                    <td v-if="this.distributorDetail.DIST_TYPE_SETUP == 1">
                      PUBLIC LIMITED COMPANY / BERHAD
                    </td>
                    <td v-if="this.distributorDetail.DIST_TYPE_SETUP == 2">
                      PRIVATE LIMITED COMPANY / SENDIRIAN BERHAD
                    </td>
                  </tr>

                  <tr>
                    <td v-if="this.distributorDetail.DIST_TYPE_SETUP == 1">
                      SSM Form 8
                    </td>
                    <td v-if="this.distributorDetail.DIST_TYPE_SETUP == 2">
                      SSM Form 9
                    </td>
                    <td style="width: 2%">:</td>
                    <td v-if="this.distributorDetail.DIST_TYPE_SETUP == 2">
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
                          size: 'You selected a larger file!',
                        }"
                        :thumbnailSize="120"
                        :theme="'list'"
                        v-model="ssmForm9"
                      ></VueFileAgent>
                    </td>
                    <td v-if="this.distributorDetail.DIST_TYPE_SETUP == 1">
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
                          size: 'You selected a larger file!',
                        }"
                        :thumbnailSize="120"
                        :theme="'list'"
                        v-model="ssmForm8"
                      ></VueFileAgent>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" style="font-weight: bold">
                      Registered Address
                    </td>
                  </tr>

                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>
                      {{ this.distributorDetail.DIST_ADDR_1 }}
                      {{ this.distributorDetail.DIST_ADDR_2 }}
                      {{ this.distributorDetail.DIST_ADDR_3 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.SET_PARAM_COUNTRY }}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>:</td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'">
                      {{ this.distributorDetail.SET_PARAM_STATE }}
                    </td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'">
                      {{ this.distributorDetail.DIST_STATE2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>:</td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'">
                      {{ this.distributorDetail.SET_CITY_NAME }}
                    </td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'">
                      {{ this.distributorDetail.DIST_CITY2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Postal</td>
                    <td>:</td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'">
                      {{ this.distributorDetail.POSTCODE_NO }}
                    </td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'">
                      {{ this.distributorDetail.DIST_POSTAL2 }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" style="font-weight: bold">
                      Business Address
                    </td>
                  </tr>

                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>
                      {{ this.distributorDetail.DIST_BIZ_ADDR_1 }}
                      {{ this.distributorDetail.DIST_BIZ_ADDR_2 }}
                      {{ this.distributorDetail.DIST_BIZ_ADDR_3 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.SET_PARAM_COUNTRY }}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>:</td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'">
                      {{ this.distributorDetail.SET_PARAM_STATE }}
                    </td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'">
                      {{ this.distributorDetail.DIST_STATE2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>:</td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'">
                      {{ this.distributorDetail.SET_CITY_NAME }}
                    </td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'">
                      {{ this.distributorDetail.DIST_CITY2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>Postal</td>
                    <td>:</td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY == 'MY'">
                      {{ this.distributorDetail.POSTCODE_NO }}
                    </td>
                    <td v-if="this.distributorDetail.SET_CODE_COUNTRY != 'MY'">
                      {{ this.distributorDetail.DIST_POSTAL2 }}
                    </td>
                  </tr>
                  >
                  <tr>
                    <td>Office Phone Number</td>
                    <td>:</td>
                    <td
                      v-if="
                        this.distributorDetail.DIST_PHONE_NUMBER == null ||
                        this.distributorDetail.DIST_PHONE_NUMBER == '-'
                      "
                    >
                      -
                    </td>
                    <td v-if="this.distributorDetail.DIST_PHONE_NUMBER != '-'">
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
                    </td>
                  </tr>
                  <tr>
                    <td>Extension Number</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.DIST_PHONE_EXTENSION }}</td>
                  </tr>
                  <tr>
                    <td>Fax Number</td>
                    <td>:</td>
                    <td
                      v-if="
                        this.distributorDetail.DIST_FAX_NUMBER == null ||
                        this.distributorDetail.DIST_FAX_NUMBER == '-'
                      "
                    >
                      -
                    </td>
                    <td v-if="this.distributorDetail.DIST_FAX_NUMBER != '-'">
                      0{{
                        this.distributorDetail.DIST_FAX_NUMBER.substring(0, 1)
                      }}-{{
                        this.distributorDetail.DIST_FAX_NUMBER.substring(1, 10)
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile Phone Number</td>
                    <td>:</td>
                    <td
                      v-if="
                        this.distributorDetail.DIST_MOBILE_NUMBER == null ||
                        this.distributorDetail.DIST_MOBILE_NUMBER == '-'
                      "
                    >
                      -
                    </td>
                    <td v-if="this.distributorDetail.DIST_MOBILE_NUMBER != '-' && this.distributorDetail.DIST_MOBILE_NUMBER != null">
                      0{{
                        distributorDetail.DIST_MOBILE_NUMBER.substring(0, 2)
                      }}-{{
                        distributorDetail.DIST_MOBILE_NUMBER.substring(2, 10)
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Email Address</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.DIST_EMAIL }}</td>
                  </tr>
                  <tr>
                    <td>Company Website URL</td>
                    <td>:</td>
                    <td
                      v-if="this.distributorDetail.DIST_COMPANY_WEBSITE != NULL"
                    >
                      {{ this.distributorDetail.DIST_COMPANY_WEBSITE }}
                    </td>
                    <td
                      v-if="this.distributorDetail.DIST_COMPANY_WEBSITE == NULL"
                    >
                      -
                    </td>
                  </tr>
                  <tr>
                    <td>Application Type</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.DIST_TYPE_NAME }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="content">
              <h4 slot="header" class="card-title">Section Review</h4>
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
              <VueFileAgent
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
                  size: 'Files should not exceed 2MB in size',
                }"
                v-model="fileRemark"
                @select="filesSelected($event, 1)"
              ></VueFileAgent>
              <!-- </div> -->
            </div>
            <br />
          </div>
          <div v-if="currentTab === 'tab2'">
            <div>
              <br />
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width: 20%">
                      Financial Status (Total Paid-Up Capital (RM))
                    </td>
                    <td style="width: 1%">:</td>
                    <td>{{ this.distributorDetail.DIST_PAID_UP_CAPITAL }}</td>
                  </tr>
                  <tr>
                    <td>Type of Structure</td>
                    <td>:</td>
                    <td v-if="this.distributorDetail.DIST_TYPE_STRUCTURE == 1">
                      SINGLE-TIER
                    </td>
                    <td v-if="this.distributorDetail.DIST_TYPE_STRUCTURE == 2">
                      MULTI-TIER
                    </td>
                  </tr>
                  <tr>
                    <td>Marketing Approach</td>
                    <td>:</td>
                    <td
                      v-if="this.distributorDetail.DIST_MARKETING_APPROACH == 1"
                    >
                      DIRECT
                    </td>
                    <td
                      v-if="this.distributorDetail.DIST_MARKETING_APPROACH == 2"
                    >
                      NOMINEE
                    </td>
                  </tr>
                  <tr>
                    <td>Proposed No. of Distribution Point</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.DIST_NUM_DIST_POINT }}</td>
                  </tr>
                  <tr>
                    <td>Proposed Number of Consultant</td>
                    <td>:</td>
                    <td>{{ this.distributorDetail.DIST_NUM_CONSULTANT }}</td>
                  </tr>
                  <tr>
                    <td>Indemnity of Insurance</td>
                    <td>:</td>
                    <td
                      v-if="
                        this.distributorDetail.DIST_INSURANCE != null ||
                        this.distributorDetail.DIST_INSURANCE != '' ||
                        this.distributorDetail.DIST_INSURANCE != '-'
                      "
                    >
                      {{ this.distributorDetail.DIST_INSURANCE }}
                    </td>
                    <td v-if="this.distributorDetail.DIST_INSURANCE == '-'">
                      -
                    </td>
                  </tr>
                  <tr>
                    <td>Expiry Date For Indemnity of Insurance</td>
                    <td>:</td>

                    <td v-if="this.distributorDetail.DIST_DATE_INCORP == null">
                      -
                    </td>
                    <td v-if="this.distributorDetail.DIST_DATE_INCORP != null">
                      {{ this.distributorDetail.DIST_DATE_INCORP }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 slot="header" class="card-title">Section Review</h4>
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
            <div id="app">
              <VueFileAgent
                ref="vueFileAgent"
                :theme="'list'"
                :multiple="true"
                :deletable="true"
                :meta="true"
                :linkable="true"
                :accept="'.pdf,.doc,.docx,.ods'"
                :maxSize="'10MB'"
                :helpText="'Choose document'"
                :errorText="{
                  type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
                  size: 'Files should not exceed 10MB in size',
                }"
                @select="filesSelected($event, 2)"
                v-model="fileRemark2"
              ></VueFileAgent>
            </div>
            <br />
          </div>
          <div v-if="currentTab === 'tab3'">
            <br />
            <div>
              <button
                v-b-toggle.collapse-ceo1
                type="button"
                class="btn btn-warning btn-fill btn-md"
              >
                CEO Profile &nbsp;
                <i class="fa fa-caret-square-o-down" />
              </button>
              &nbsp;
              <button
                v-b-toggle.collapse-ceo2
                type="button"
                class="btn btn-warning btn-fill btn-md"
              >
                Director Details &nbsp;
                <i class="fa fa-caret-square-o-down" />
              </button>
              <br />
              <b-collapse id="collapse-ceo1" class="mt-2">
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
                        <td>
                          {{
                            item.REPR_NRIC.substring(0, 6) +
                            "-" +
                            item.REPR_NRIC.substring(6, 8) +
                            "-" +
                            item.REPR_NRIC.substring(8, 13)
                          }}
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
              </b-collapse>
              <b-collapse id="collapse-ceo2" class="mt-2">
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
                      <td style="width: 20%">{{ item.DIR_NRICthis }}</td>
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
            <h4 slot="header" class="card-title">Section Review</h4>
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
            <div id="app">
              <VueFileAgent
                ref="vueFileAgent"
                :theme="'list'"
                :multiple="true"
                :deletable="true"
                :meta="true"
                :linkable="true"
                :accept="'.pdf,.doc,.docx,.ods'"
                :maxSize="'10MB'"
                :helpText="'Choose document'"
                :errorText="{
                  type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
                  size: 'Files should not exceed 10MB in size',
                }"
                @select="filesSelected($event, 4)"
                v-model="fileRemark4"
              ></VueFileAgent>
            </div>
            <br />
          </div>
          <div v-if="currentTab === 'tab4'">
            <div>
              <br />
              <button
                v-b-toggle.collapse-1
                type="button"
                class="btn btn-warning btn-fill btn-md"
              >
                Authorised Representative &nbsp;
                <i class="fa fa-caret-square-o-down" />
              </button>
              &nbsp;
              <button
                v-b-toggle.collapse-2
                type="button"
                class="btn btn-warning btn-fill btn-md"
              >
                Alternate Authorised Representative &nbsp;
                <i class="fa fa-caret-square-o-down" />
              </button>
              <b-collapse id="collapse-1" class="mt-2">
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
                        <td
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
                        </td>
                      </tr>
                      <td v-if="item.REPR_NRIC == '-' || item.REPR_NRIC == ''">
                        -
                      </td>
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
                        <td v-if="item.REPR_MOBILE_NUMBER != '-'">
                          01{{ item.REPR_MOBILE_NUMBER.substring(0, 1) }}-{{
                            item.REPR_MOBILE_NUMBER.substring(1, 10)
                          }}
                        </td>
                        <td v-if="item.REPR_MOBILE_NUMBER == '-'">-</td>
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
                              type: 'Please select images, videos, pdf or zip files',
                              size: 'You selected a larger file!',
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
              </b-collapse>

              <b-collapse id="collapse-2" class="mt-2">
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
                        <td
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
                        </td>
                      </tr>
                      <td v-if="item.REPR_NRIC == '-' || item.REPR_NRIC == ''">
                        -
                      </td>
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
                        <td>Email</td>
                        <td>:</td>
                        <td>{{ item.REPR_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </b-collapse>
            </div>
            <div>
              <br />
              <h4 slot="header" class="card-title">Section Review</h4>
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
              <div id="app">
                <VueFileAgent
                  ref="vueFileAgent"
                  :theme="'list'"
                  :multiple="true"
                  :deletable="true"
                  :meta="true"
                  :linkable="true"
                  :accept="'.pdf,.doc,.docx,.ods'"
                  :maxSize="'2MB'"
                  :helpText="'Choose document'"
                  :errorText="{
                    type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
                    size: 'Files should not exceed 10MB in size',
                  }"
                  @select="filesSelected($event, 3)"
                  v-model="fileRemark3"
                ></VueFileAgent>
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

              <b-collapse id="collapse-financial" class="mt-2">
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
                        <td v-if="item.DIST_FINANCIAL_INSTITUTION == 1">Yes</td>
                        <td v-if="item.DIST_FINANCIAL_INSTITUTION == 2">No</td>

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
                        <td>
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
                        <td v-if="item.DIST_FP_CSMRL != null">
                          {{ item.DIST_FP_CSMRL }}
                        </td>
                        <td v-if="item.DIST_FP_CSMRL == null">-</td>
                      </tr>
                      <tr v-if="item.DIST_FP_CITIZEN == 1">
                        <td>NRIC No</td>
                        <td>:</td>
                        <td>
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
                        <td>{{ item.DIST_FP_PASS_NUM }}</td>
                      </tr>
                      <tr v-if="item.DIST_FP_CITIZEN == 2">
                        <td><b>Passport Expiry Date</b></td>
                        <td>:</td>
                        <td>{{ item.DIST_FP_PASS_EXPIRY }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </b-collapse>
              <b-collapse id="collapse-compl" class="mt-2">
                <br />
                <h4>Head of Department, Compliance Department</h4>
                <table class="table table-striped">
                  <tbody
                    v-for="(item, index) in this.distributorDetail.DATAFP"
                    :key="index"
                  >
                    <div
                      v-if="
                        item.ADD_TYPE == 'HOD_COMPL' || item.ADD_TYPE == '7'
                      "
                    >
                      <tr>
                        <td style="width: 20%">Name</td>
                        <td style="width: 1%">:</td>
                        <td>
                          {{ item.USER_SAL_NAME }}
                          {{ item.ADD_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <td v-if="item.ADD_TELEPHONE != '-'">
                          0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                            item.ADD_TELEPHONE.substring(1, 10)
                          }}
                        </td>
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
                        <td>
                          {{ item.ADD_PHONE_EXTENSION }}
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <td v-if="item.ADD_MOBILE_NUMBER != '-'">
                          0{{ item.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                            item.ADD_MOBILE_NUMBER.substring(2, 10)
                          }}
                        </td>
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
                        <td>{{ item.ADD_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </b-collapse>
              <b-collapse id="collapse-uts" class="mt-2">
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
                        <td>
                          {{ item.USER_SAL_NAME }}
                          {{ item.ADD_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <td v-if="item.ADD_TELEPHONE != '-'">
                          0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                            item.ADD_TELEPHONE.substring(1, 10)
                          }}
                        </td>
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
                        <td>
                          {{ item.ADD_PHONE_EXTENSION }}
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <td v-if="item.ADD_MOBILE_NUMBER != '-'">
                          0{{ item.ADD_MOBILE_NUMBER.substring(0, 1) }}-{{
                            item.ADD_MOBILE_NUMBER.substring(2, 10)
                          }}
                        </td>
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
                        <td>{{ item.ADD_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </b-collapse>
              <b-collapse id="collapse-prs" class="mt-2">
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
                        <td>
                          {{ item.USER_SAL_NAME }}
                          {{ item.ADD_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <td v-if="item.ADD_TELEPHONE != '-'">
                          0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                            item.ADD_TELEPHONE.substring(1, 10)
                          }}
                        </td>
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
                        <td>{{ item.ADD_PHONE_EXTENSION }}</td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <td v-if="item.ADD_MOBILE_NUMBER != '-'">
                          0{{ item.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                            item.ADD_MOBILE_NUMBER.substring(2, 10)
                          }}
                        </td>
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
                        <td>{{ item.ADD_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </b-collapse>

              <b-collapse id="collapse-train" class="mt-2">
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
                        <td>
                          {{ item.USER_SAL_NAME }}
                          {{ item.ADD_NAME }}
                        </td>
                      </tr>
                      <tr>
                        <td>Office Phone Number</td>
                        <td>:</td>
                        <td v-if="item.ADD_TELEPHONE != null">
                          0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                            item.ADD_TELEPHONE.substring(1, 10)
                          }}
                        </td>
                        <td v-if="item.ADD_TELEPHONE == null">-</td>
                      </tr>
                      <tr>
                        <td>Extension Number</td>
                        <td>:</td>
                        <td>{{ item.ADD_PHONE_EXTENSION }}</td>
                      </tr>
                      <tr>
                        <td>Mobile Phone Number</td>
                        <td>:</td>
                        <td v-if="item.ADD_MOBILE_NUMBER != '-'">
                          0{{ item.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                            item.ADD_MOBILE_NUMBER.substring(2, 10)
                          }}
                        </td>
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
                        <td>{{ item.ADD_EMAIL }}</td>
                      </tr>
                    </div>
                  </tbody>
                </table>
              </b-collapse>
            </div>
            <br />
            <h4 slot="header" class="card-title">Section Review</h4>
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
            <div id="app">
              <VueFileAgent
                ref="vueFileAgent"
                :theme="'list'"
                :multiple="true"
                :deletable="true"
                :meta="true"
                :linkable="true"
                :accept="'.pdf,.doc,.docx,.ods'"
                :maxSize="'10MB'"
                :helpText="'Choose document'"
                :errorText="{
                  type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
                  size: 'Files should not exceed 10MB in size',
                }"
                @select="filesSelected($event, 5)"
                v-model="fileRemark5"
              ></VueFileAgent>
            </div>
            <br />
          </div>
          <div v-if="currentTab === 'tab6'">
            <div>
              <br />
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width: 20%">Issuing Bank</td>
                    <td style="width: 1%">:</td>
                    <td>{{ this.distributorDetail.BANK_NAME }}</td>
                  </tr>
                  <tr>
                    <td style="width: 20%">Reference Number</td>
                    <td style="width: 1%">:</td>
                    <td>{{ this.distributorDetail.DIST_TRANS_REF }}</td>
                  </tr>
                  <tr>
                    <td style="width: 20%">Transaction Date</td>
                    <td style="width: 1%">:</td>
                    <td>{{ this.distributorDetail.DIST_TRANS_DATE }}</td>
                  </tr>
                  <tr>
                    <td style="width: 20%">Transaction Type</td>
                    <td style="width: 1%">:</td>
                    <td v-if="this.distributorDetail.DIST_TRANS_TYPE == 1">
                      ONLINE TRANSACTION
                    </td>
                    <td v-if="this.distributorDetail.DIST_TRANS_TYPE == 2">
                      CASH DEPOSIT
                    </td>
                    <td v-if="this.distributorDetail.DIST_TRANS_TYPE == 3">
                      CHEQUE DEPOSIT
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 20%">Amount</td>
                    <td style="width: 1%">:</td>
                    <td>{{ this.distributorDetail.DIST_ACC_AMOUNT }}</td>
                  </tr>
                  <tr>
                    <td style="width: 20%">Receipt</td>
                    <td style="width: 1%">:</td>
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
                          type: 'Please select images, videos, pdf or zip files',
                          size: 'You selected a larger file!',
                        }"
                        :thumbnailSize="120"
                        :theme="'list'"
                        v-model="receipt"
                      ></VueFileAgent>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <h4 slot="header" class="card-title">Section Review</h4>
            <br />
            <div>
              <vue-form-generator
                :model="model"
                :schema="remarkPaymentschema"
                :options="formOptions"
                @model-updated="onModelUpdated"
                ref="statusForm"
              >
              </vue-form-generator>
            </div>
            <br />
            <div id="app">
              <VueFileAgent
                ref="vueFileAgent"
                :theme="'list'"
                :multiple="true"
                :deletable="true"
                :meta="true"
                :linkable="true"
                :accept="'.pdf,.doc,.docx,.ods'"
                :maxSize="'10MB'"
                :helpText="'Choose document'"
                :errorText="{
                  type: 'Invalid file type. Only pdf or doc, docx or ods Allowed',
                  size: 'Files should not exceed 10MB in size',
                }"
                @select="filesSelected($event, 6)"
                v-model="fileRemark6"
              ></VueFileAgent>
            </div>
            <br />
          </div>
          <div v-if="currentTab === 'tab7'">
            <div>
              <div v-for="(item, index) in this.proposalList" :key="index">
                <h4 class="card-title">
                  {{ item.REQ_DOCU_SECTION }}
                </h4>
                <va-data-table
                  :showPagination="false"
                  :fields="fieldsFile1"
                  :data="item.list"
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>
                  <template slot="actions" slot-scope="row">
                    <div id="app">
                      <VueFileAgent
                        :uploadUrl="'https://example.com'"
                        :uploadHeaders="{}"
                        :downloadable="false"
                        :multiple="false"
                        :deletable="false"
                        :readonly="true"
                        :editable="false"
                        :linkable="true"
                        :accept="'.pdf'"
                        :maxSize="'2MB'"
                        :maxFiles="8"
                        :helpText="'Select files'"
                        :errorText="{
                          type: 'Please select images, videos, pdf or zip files',
                          size: 'You selected a larger file!',
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
              </div>
            </div>
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
                      size: 'You selected a larger file!',
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
                  size: 'You selected a larger file!',
                }"
                :thumbnailSize="120"
                :theme="'list'"
                v-model="fileRecords"
              ></VueFileAgent>
            </div>
            <br />
          </div>
        </div>
      </div>
      <template>
        <div>
          <div class="flex xs12 md12 xl8">
            <button
              @click="back"
              type="submit"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-step-backward" /> &nbsp; Previous
            </button>
          </div>
          <div
            class="float-right"
            v-if="this.approvalDetail.TS_PARAM === 'PENDING'"
          >
            <button
              @click="saveAsDraft"
              type="button"
              class="mr-2 btn btn-info btn-fill btn-md"
            >
              <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
            </button>
            <button
              type="submit"
              class="mr-2 btn btn-warning btn-fill btn-md"
              @click="submit(9)"
            >
              <i class="fa fa-reply" /> &nbsp; Return
            </button>
            <button
              @click="submit(3)"
              type="button"
              class="mr-2 btn btn-success btn-fill btn-md"
            >
              <i class="fa fa-paper-plane" /> &nbsp; Approve
            </button>
          </div>
        </div>
      </template>
      <br /><br /><br />
      <template>
        <va-card>
          <div>
            <div class="float-left">
              <h5>
                Transaction/audit log&nbsp;
                <!-- <button
                  @click="download"
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-download"></i>
                </button> -->
                <downloadExcel
                  :json_data="distributorDetail.APPRLOG"
                  :excelname="excelname"
                  :sheetname="sheetname"
                  :column="column"
                ></downloadExcel>
              </h5>
            </div>
            <div class="alignright">
              <div class="flex xs12 md3 right">
                <va-input
                  :value="term"
                  :placeholder="$t('Search')"
                  @input="search"
                  removable
                >
                  <va-icon name="fa fa-search" slot="prepend" />
                </va-input>
              </div>
            </div>

            <va-data-table
              :fields="fields"
              :data="filteredData"
              :per-page="parseInt(perPage)"
              :datacount="distributorDetail.APPRLOG.length"
            >
              <!-- A virtual column -->
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>
              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                  <span
                    v-b-tooltip.hover
                    title="detail"
                    v-on:click="details(props.rowData)"
                    class="badge badge-success mr-2"
                  >
                    <i class="fa fa-eye"></i>
                  </span>
                </h4>
              </template>
            </va-data-table>
          </div>
        </va-card>
      </template>
    </va-card>
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
import Vudal from "vudal";
const TABS = [
  {
    title: "Distributor Profile",
    value: "tab1",
  },
  {
    title: "Details Information",
    value: "tab2",
  },
  {
    title: "CEO & Director",
    value: "tab3",
  },
  {
    title: "AR and AAR",
    value: "tab4",
  },
  {
    title: "Additional Information",
    value: "tab5",
  },
  {
    title: "Payment Information",
    value: "tab6",
  },
  {
    title: "Proposal",
    value: "tab7",
  },

  {
    title: "Uploaded Document",
    value: "tab8",
  },
];
const TABS2 = [
  {
    title: "Respond And Justification",
    value: "tab1",
  },
  {
    title: "Suspension Details",
    value: "tab2",
  },
];
export default {
  computed: {
    fieldsFile1() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
          width: "30px",
          // width: "30px"
          // height: "45px"
          // dataClass: "text-center"
        },
        {
          name: "REQ_DOCU_NAME", //"REQ_DOCU_NAME",
          title: "Name",
          width: "30%",
        },
        {
          name: "__slot:actions",
          title: "Document",
          // dataClass: "float-right"
        },
        {
          name: "__slot:remark",
          title: "Remark",
        },
      ];
    },

    fields() {
      return [
        {
          name: "__slot:marker",
          width: "30px",
          dataClass: "text-center",
        },
        {
          name: "__slot:no",
          title: "No",
        },
        {
          name: "APPROVAL_DATE",
          title: "Approval Date",
        },
        {
          name: "DPMT_NAME",
          title: "Department",
        },
        {
          name: "USER_NAME",
          title: "Creation By",
        },
        {
          name: "GROUP_NAME",
          title: "Group",
        },
        {
          name: "TS_PARAM",
          title: "Status",
        },
        {
          name: "__slot:actions",
          title: "Remark/Comment",
          width: "30px",
          dataClass: "justify-content-center",
        },
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.distributorDetail.APPRLOG;
      }

      return this.distributorDetail.APPRLOG.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.APPROVAL_DATE.toLowerCase().includes(v) ||
              item.DPMT_NAME.toLowerCase().includes(v) ||
              item.GROUP_NAME.toLowerCase().includes(v) ||
              item.TS_PARAM.toLowerCase().includes(v)
          );
      });
    },
  },
  props: {
    dist_id: String,
  },
  components: {
    Tabs,
    Vudal,
  },

  mounted() {
    var data = localStorage.getItem("distributor-SubmissionList-boardApproval");
    this.approvalDetail = JSON.parse(data);
    this.getDistributorById(
      this.approvalDetail.DISTRIBUTOR_ID,
      this.approvalDetail.APPR_GROUP_ID
    );
  },

  data() {
    return {
      docFileRemark: "",
      docRemark: "",
      remarkDocProfile: [],
      remarkDocAddtInfo: [],
      remarkDocARnAAR: [],
      remarkDocCEOnDIR: [],
      remarkDocDetInfo: [],
      remarkDocPayment: [],

      column: ["FirstName", "Last Name"],
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
      tabs: TABS,
      currentTab: "tab1",

      tabs2: TABS2,
      currentTab2: "tab1",
      proposalList: [],
      proposalRemarkList: [],
      fileRecords: [],
      companyLogo: [],
      ssmForm8: [],
      ssmForm9: [],
      receipt: [],
      BODApprove: [],
      fileRemark: [],
      fileRemark2: [],
      fileRemark3: [],
      fileRemark4: [],
      fileRemark5: [],
      fileRemark6: [],
      model: {
        logoUrl:null,
        remark: "",
        remark1: "",
        remark2: "",
        remark3: "",
        remark4: "",
        remark5: "",
      },
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
              },
            ],
          },
        ],
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
                // styleClasses: "col-md-11"
              },
            ],
          },
        ],
      },
      remarkARnAARschema: {
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
                // styleClasses: "col-md-11"
              },
            ],
          },
        ],
      },
      remarkCEOnDIRschema: {
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
                // styleClasses: "col-md-11"
              },
            ],
          },
        ],
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
                // styleClasses: "col-md-11"
              },
            ],
          },
        ],
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
                // styleClasses: "col-md-11"
              },
            ],
          },
        ],
      },

      formOptions: {
        //validateAfterLoad: false,
        validateAfterChanged: true,
        //validateAsync: true,
      },
    };
  },

  methods: {
    async back() {
      this.$router.push("/fimm/distributor-SubmissionList-boardApproval");
    },
    async readMore(data) {
      this.$modals.readModal.$show();
      this.model.logoUrl = data;
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
      this.docFileRemark.forEach((element) => {
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
          url: window.URL.createObjectURL(element.DOCU_BLOB),
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
        } else if (element.DOCU_GROUP == 9) {
          this.ssmForm13 = element.DOCU_BLOB;
          this.model.ssmForm13.push(data);
        } else if (element.DOCU_GROUP == 10) {
          this.uploadCSMRL = element.DOCU_BLOB;
          this.model.uploadCSMRL.push(data);
        } else if (element.DOCU_GROUP == 11) {
          this.uploadCSMRLorMOFLicense = element.DOCU_BLOB;
          this.model.uploadCSMRLorMOFLicense.push(data);
        } else if (element.DOCU_GROUP == 12) {
          this.ssmForm49 = element.DOCU_BLOB;
          this.model.ssmForm49.push(data);
        } else if (element.DOCU_GROUP == 13) {
          this.complianceDeclaration = element.DOCU_BLOB;
          this.model.complianceDeclaration.push(data);
        } else if (element.DOCU_GROUP == 14) {
          this.ssmForm24 = element.DOCU_BLOB;
          this.model.ssmForm24.push(data);
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
    search: debounce(function (term) {
      this.term = term;
    }, 400),
    filesSelected: function (fileRecordsNewlySelected, status) {
      console.log("selected");
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
      console.log(fileRecordsNewlySelected);
      for (i = 0; i < this.fileRecordsForUpload.length; i++) {
        if (status == 1) {
          this.fileRemark = this.fileRecordsForUpload[i].file;
        } else if (status == 2) {
          this.fileRemark2 = this.fileRecordsForUpload[i].file;
        } else if (status == 3) {
          this.fileRemark3 = this.fileRecordsForUpload[i].file;
        } else if (status == 4) {
          this.fileRemark4 = this.fileRecordsForUpload[i].file;
        } else if (status == 5) {
          this.fileRemark5 = this.fileRecordsForUpload[i].file;
        } else if (status == 6) {
          this.fileRemark6 = this.fileRecordsForUpload[i].file;
        }
      }
    },
    onBeforeDelete: function (fileRecord, status) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
        if (status == 1) {
          this.fileRemark = [];
        } else if (status == 2) {
          this.fileRemark2 = [];
        } else if (status == 3) {
          this.fileRemark3 = [];
        } else if (status4 == 4) {
          this.fileRemark4 = [];
        } else if (status == 5) {
          this.fileRemark5 = [];
        } else if (status == 6) {
          this.fileRemark6 = [];
        }

        for (i = 0; i < this.fileRecordsForUpload.length; i++) {
          if (status == 1) {
            this.fileRemark = this.fileRecordsForUpload[i].file;
          } else if (status == 2) {
            this.fileRemark2 = this.fileRecordsForUpload[i].file;
          } else if (status == 3) {
            this.fileRemark3 = this.fileRecordsForUpload[i].file;
          } else if (status == 4) {
            this.fileRemark4 = this.fileRecordsForUpload[i].file;
          } else if (status == 5) {
            this.fileRemark5 = this.fileRecordsForUpload[i].file;
          } else if (status == 6) {
            this.fileRemark6 = this.fileRecordsForUpload[i].file;
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
    async submit(status) {
      // this.$modals.showConfirmModal.$show();
      const user = localStorage.getItem("user");
      const data = new FormData();
      const dataUpdate = new FormData();
      const dataEmail = new FormData();
      data.append("DIST_ID", this.approvalDetail.DISTRIBUTOR_ID);
      data.append("APPR_GROUP_ID", JSON.parse(user).USER_GROUP_ID);
      data.append("APPROVAL_LEVEL_ID", this.approvalDetail.APPROVAL_LEVEL_ID);
      data.append("APPROVAL_STATUS", status);
      data.append("APPROVAL_FIMM_USER", JSON.parse(user).user_id);
      data.append("APPROVAL_REMARK_PROFILE", this.model.remark);
      for (let i = 0; i < this.fileRemark.length; i++) {
        data.append("APPR_REMARK_DOCU_PROFILE[]", this.fileRemark[i]);
      }
      data.append("APPROVAL_REMARK_DETAILINFO", this.model.remark1);
      for (let i = 0; i < this.fileRemark2.length; i++) {
        data.append("APPR_REMARK_DOCU_DETAILINFO[]", this.fileRemark2[i]);
      }
      data.append("APPROVAL_REMARK_CEOnDIR", this.model.remark2);
      for (let i = 0; i < this.fileRemark3.length; i++) {
        data.append("APPR_REMARK_DOCU_CEOnDIR[]", this.fileRemark3[i]);
      }
      data.append("APPROVAL_REMARK_ARnAAR", this.model.remark3);
      for (let i = 0; i < this.fileRemark4.length; i++) {
        data.append("APPR_REMARK_DOCU_ARnAAR[]", this.fileRemark4[i]);
      }
      data.append("APPROVAL_REMARK_ADDTIONALINFO", this.model.remark4);
      for (let i = 0; i < this.fileRemark5.length; i++) {
        data.append("APPR_REMARK_DOCU_ADDITIONALINFO[]", this.fileRemark5[i]);
      }
      data.append("APPROVAL_REMARK_PAYMENT", this.model.remark5);
      for (let i = 0; i < this.fileRemark6.length; i++) {
        data.append("APPR_REMARK_DOCU_PAYMENT[]", this.fileRemark6[i]);
      }
      this.proposalList.forEach((item) => {
        item.list.forEach((element) => {
          if (element.DOCU_REMARK != null) {
            data.append("DOCU_REMARK_LIST[]", JSON.stringify(element));
          }
        });
      });
      this.additionalList.forEach((item) => {
        if (item.DOCU_REMARK != null) {
          data.append("DOCU_REMARK_LIST2[]", JSON.stringify(item));
        }
      });
      data.append("APPR_INDEX", this.approvalDetail.APPR_INDEX);

      if (status == 3) {
        data.append("NOTI_LOCATION_DIST", "distributor-profile");
        data.append(
          "NOTI_MESSAGE",
          "A DISTRIBUTOR HAS BEEN APPROVED."
        );
        data.append("NOTI_TYPE","DISTRIBUTOR");
        // alert(this.approvalDetail.APPR_INDEX + 1);
        const approvalLevel = await services06Module0.getApprovalLevel(
          1,
          this.approvalDetail.APPR_INDEX + 1
        );
        const user=JSON.parse(localStorage.getItem("user"));
        data.append('USER_GROUP_ID',user.USER_GROUP_ID);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        data.append("APPR_INDEX_CURRENT", this.approvalDetail.APPR_INDEX);
        data.append("APPROVAL_STATUS_NEXT", 15);
        if (confirm("Approve this application?")) {
          const response = await services06Module1.createDistributorReview(
            data
          );
          dataEmail.append("EMAIL", this.distributorDetail.DIST_EMAIL);
          dataEmail.append("DIST_NAME", this.distributorDetail.DIST_NAME);
          dataEmail.append("DIST_REMARK", "has been approved.");
          const sendEmailNotification =
            await services06Module1.sendEmailNotification(dataEmail);
          alert("Application has been approved.");
          this.$router.go(-1);
        } else {
          console.log("");
        }
        // this.$router.go("fimm/distributor-SubmissionList-rdApproval");
      } else if (status == 9) {
        const approvalLevel = await services06Module0.getApprovalLevel(1, 4);
        data.append("APPR_LIST", JSON.stringify(approvalLevel));
        data.append("APPR_INDEX_CURRENT", this.approvalDetail.APPR_INDEX);
        data.append("APPROVAL_STATUS_NEXT", 12);
        if (confirm("Return this application?")) {
          const response = await services06Module1.createDistributorReview(
            data
          );
          alert("Application has been returned.");
          this.$router.go(-1);
        } else {
          console.log("");
        }
      } else {
        console.log("cancel action");
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

      console.log(byteArrays);

      return new File(byteArrays, "pot", { type: contentType });
    },
    async getDocumentProposal() {
      const data = {
        REQ_DOCU_TYPE: 1,
        MANAGE_SUBMODULE_ID: 1,
        DISTRIBUTOR_ID: this.approvalDetail.DISTRIBUTOR_ID,
      };
      const response = await services06Module0.getDocumentDataReview(data);
      this.proposalList = response.dataProposal;
      console.log("this is document proposal:", this.proposalList);
      this.proposalList.forEach((item) => {
        item.list.forEach((element) => {
          // console.log(element.DOCU_BLOB);
          element.DOCU_BLOB = fileServices.b64toBlobPDF(
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
            url: window.URL.createObjectURL(element.DOCU_BLOB),
          };
          element.fileRecords.push(data);
        });
      });
      this.additionalList = response.dataAdditional;
      this.additionalList.forEach((element) => {
        element.DOCU_BLOB = fileServices.b64toBlobPDF(
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
          url: window.URL.createObjectURL(element.DOCU_BLOB),
        };
        element.fileRecords.push(data);
      });
    },
    async getDistributorById(dist_id, groupId) {
      const response = await services06Module1.getDistributorByIdAppr(
        dist_id,
        groupId
      );
      this.distributorDetail = response;
      // Create our number formatter.
      const formatter = currencyFormat.currencyFormat("ms", "MYR");
      // this.distributorDetail.DIST_PAID_UP_CAPITAL = formatter.format(
      //   this.distributorDetail.DIST_PAID_UP_CAPITAL
      // );
      // this.distributorDetail.DIST_ACC_AMOUNT = formatter.format(
      //   this.distributorDetail.DIST_ACC_AMOUNT
      // );
      this.getDocumentProposal();

      response.DATADOC.forEach((element) => {
        element.DOCU_BLOB = fileServices.b64toBlobPDF(
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
          url: window.URL.createObjectURL(element.DOCU_BLOB),
        };
        if (element.DOCU_GROUP == 8) {
          this.fileRecords.push(data);
        } else if (element.DOCU_GROUP == 3) {
          this.companyLogo.push(data);
        } else if (element.DOCU_GROUP == 5) {
          this.ssmForm8.push(data);
        } else if (element.DOCU_GROUP == 4) {
          this.ssmForm9.push(data);
        } else if (element.DOCU_GROUP == 7) {
          this.receipt.push(data);
        } else if (element.DOCU_GROUP == 6) {
          this.BODApprove.push(data);
        }
      });
    },
    saveAsDraft() {
      if (confirm("Are you sure you want to save as draft?")) {
        alert("This application review has been save as draft.");
      }
    },
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
    },
  },
};
</script>

<style lang="scss">
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
