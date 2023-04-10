<template>
  <div class="flex xs12 md12 xl12">
    <va-inner-loading :loading="isLoad">
      <va-card
        class="strip ed-tabled-with-hover"
        body-classes="table-full-width table-responsive"
      >
        <h4 slot="header" class="card-title">Details of Distributor</h4>

        <div>
          <div class="float-right flex xs12 md12 xl8">
            <button
              @click.once="updateProfileList"
              type="submit"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-list" />
            </button>
            &nbsp;
            <button
              @click="updateProfile"
              type="submit"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-edit" /> &nbsp; Update Profile
            </button>
          </div>
        </div>
        <br />

        <br />
        <va-collapse withBackground>
          <span slot="header"> Distributor Profile </span>
          <div slot="body">
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
                      <tbody>
                        <tr>
                          <td style="width: 20%">Distributor Name</td>
                          <td style="width: 1%">:</td>
                          <td>{{ this.modelData.DIST_NAME }}</td>
                        </tr>
                        <tr>
                          <td>Registration Number</td>
                          <td>:</td>
                          <td>{{ this.modelData.DIST_REGI_NUM1 }}</td>
                        </tr>
                        <tr>
                          <td>New Registration Number</td>
                          <td>:</td>
                          <td>{{ this.modelData.DIST_REGI_NUM2 }}</td>
                        </tr>
                        <tr>
                          <td>Date of Incorporation</td>
                          <td>:</td>
                          <td>{{ this.modelData.DIST_DATE_INCORP }}</td>
                        </tr>
                        <tr>
                          <td>Type of Setup</td>
                          <td>:</td>
                          <td v-if="this.modelData.DIST_TYPE_SETUP == 1">
                            PUBLIC LIMITED COMPANY / BERHAD
                          </td>
                          <td v-if="this.modelData.DIST_TYPE_SETUP == 2">
                            PRIVATE LIMITED COMPANY / SENDIRIAN BERHAD
                          </td>
                        </tr>
                        <tr>
                          <td v-if="this.modelData.DIST_TYPE_SETUP == 1">
                            SSM Form 8
                          </td>
                          <td v-if="this.modelData.DIST_TYPE_SETUP == 2">
                            SSM Form 9
                          </td>
                          <td style="width: 2%">:</td>
                          <td v-if="this.modelData.DIST_TYPE_SETUP == 2">
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
                          <td v-if="this.modelData.DIST_TYPE_SETUP == 1">
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
                          <td></td>
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
                            {{ this.modelData.DIST_ADDR_1 }}
                            {{ this.modelData.DIST_ADDR_2 }}
                            {{ this.modelData.DIST_ADDR_3 }}
                          </td>
                        </tr>
                        <tr>
                          <td>Country</td>
                          <td>:</td>
                          <td>{{ this.modelData.SET_PARAM_COUNTRY }}</td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>:</td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY == 'MY'">
                            {{ this.modelData.SET_PARAM_STATE }}
                          </td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY != 'MY'">
                            {{ this.modelData.DIST_STATE2 }}
                          </td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>:</td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY == 'MY'">
                            {{ this.modelData.SET_CITY_NAME }}
                          </td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY != 'MY'">
                            {{ this.modelData.DIST_CITY2 }}
                          </td>
                        </tr>
                        <tr>
                          <td>Postal</td>
                          <td>:</td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY == 'MY'">
                            {{ this.modelData.POSTCODE_NO }}
                          </td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY != 'MY'">
                            {{ this.modelData.DIST_POSTAL2 }}
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
                            {{ this.modelData.DIST_ADDR_1 }}
                            {{ this.modelData.DIST_ADDR_2 }}
                            {{ this.modelData.DIST_ADDR_3 }}
                          </td>
                        </tr>
                        <tr>
                          <td>Country</td>
                          <td>:</td>
                          <td>{{ this.modelData.SET_PARAM_COUNTRY }}</td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>:</td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY == 'MY'">
                            {{ this.modelData.SET_PARAM_STATE }}
                          </td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY != 'MY'">
                            {{ this.modelData.DIST_STATE2 }}
                          </td>
                        </tr>
                        <tr>
                          <td>City</td>
                          <td>:</td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY == 'MY'">
                            {{ this.modelData.SET_CITY_NAME }}
                          </td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY != 'MY'">
                            {{ this.modelData.DIST_CITY2 }}
                          </td>
                        </tr>
                        <tr>
                          <td>Postal</td>
                          <td>:</td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY == 'MY'">
                            {{ this.modelData.POSTCODE_NO }}
                          </td>
                          <td v-if="this.modelData.SET_CODE_COUNTRY != 'MY'">
                            {{ this.modelData.DIST_POSTAL2 }}
                          </td>
                        </tr>
                        <tr>
                          <td>Office Phone Number</td>
                          <td>:</td>
                          <td
                            class="type1"
                            v-if="
                              this.modelData.DIST_PHONE_NUMBER == null ||
                                this.modelData.DIST_PHONE_NUMBER == '-'
                            "
                          >
                            -
                          </td>
                          <td>
                            <span v-if="this.modelData.DIST_PHONE_NUMBER != '-' && this.modelData.DIST_PHONE_NUMBER !=null">
                              0{{
                                this.modelData.DIST_PHONE_NUMBER.substring(
                                  0,
                                  1
                                )
                              }}-{{
                                this.modelData.DIST_PHONE_NUMBER.substring(
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
                          <td>{{ this.modelData.DIST_PHONE_EXTENSION }}</td>
                        </tr>
                        <tr>
                          <td>Fax Number</td>
                          <td>:</td>

                          <td
                            v-if="
                              this.modelData.DIST_FAX_NUMBER == null ||
                                this.modelData.DIST_FAX_NUMBER == '-'
                            "
                          >
                            -
                          </td>
                          <td>
                            <span v-if="this.modelData.DIST_FAX_NUMBER != '-' && this.modelData.DIST_FAX_NUMBER != null">
                              0{{
                                this.modelData.DIST_FAX_NUMBER.substring(0, 1)
                              }}-{{
                                this.modelData.DIST_FAX_NUMBER.substring(1, 10)
                              }}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Mobile Phone Number</td>
                          <td>:</td>
                          <td
                            v-if="
                              this.modelData.DIST_MOBILE_NUMBER == null ||
                              this.modelData.DIST_MOBILE_NUMBER == '-'
                            "
                          >
                            -
                          </td>
                          <td v-if="this.modelData.DIST_MOBILE_NUMBER != '-' && this.modelData.DIST_MOBILE_NUMBER != null">
                            01{{
                              this.modelData.DIST_MOBILE_NUMBER.substring(0, 1)
                            }}-{{
                              this.modelData.DIST_MOBILE_NUMBER.substring(1, 10)
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td>Email Address</td>
                          <td>:</td>
                          <td>{{ this.modelData.DIST_EMAIL }}</td>
                        </tr>
                        <tr>
                          <td>Company Website URL</td>
                          <td>:</td>
                          <td
                            v-if="
                              this.distributorDetail.DIST_COMPANY_WEBSITE != null
                            "
                          >
                            {{ this.distributorDetail.DIST_COMPANY_WEBSITE }}
                          </td>
                          <td
                            v-if="
                              this.distributorDetail.DIST_COMPANY_WEBSITE == null
                            "
                          >
                            -
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                          <td>{{ this.modelData.DIST_PAID_UP_CAPITAL }}</td>
                        </tr>
                        <tr>
                          <td>Type of Structure</td>
                          <td>:</td>
                          <td v-if="this.modelData.DIST_TYPE_STRUCTURE == 1">
                            SINGLE-TIER
                          </td>
                          <td v-if="this.modelData.DIST_TYPE_STRUCTURE == 2">
                            MULTI-TIER
                          </td>
                        </tr>
                        <tr>
                          <td>Marketing Approach</td>
                          <td>:</td>
                          <td v-if="this.modelData.DIST_MARKETING_APPROACH == 1">
                            DIRECT
                          </td>
                          <td v-if="this.modelData.DIST_MARKETING_APPROACH == 2">
                            NOMINEE
                          </td>
                        </tr>
                        <tr>
                          <td>Proposed Number of Distribution Point</td>
                          <td>:</td>
                          <td>{{ this.modelData.DIST_NUM_DIST_POINT }}</td>
                        </tr>
                        <tr>
                          <td>Proposed Number of Consultant</td>
                          <td>:</td>
                          <td>{{ this.modelData.DIST_NUM_CONSULTANT }}</td>
                        </tr>
                        <tr>
                          <td>Indemnity of Insurance</td>
                          <td>:</td>
                          <td>{{ this.modelData.DIST_INSURANCE }}</td>
                        </tr>
                        <tr>
                          <td>Expiry Date For Indemnity of Insurance</td>
                          <td>:</td>
                          <td>{{ this.modelData.DIST_DATE_INCORP }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                    <b-collapse id="collapse-ceo" v-model="visibleCeoDetails" class="mt-2">
                      <br />
                      <h4>CEO Profile</h4>
                      <table class="table table-striped">
                        <tbody
                          v-for="(item, index) in this.modelData.DATAREPR"
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
                                <span v-if="item.REPR_NRIC != '-' && item.REPR_NRIC !=null">
                                  {{
                                    item.REPR_NRIC.substring(0, 6) +
                                      "-" +
                                      item.REPR_NRIC.substring(6, 8) +
                                      "-" +
                                      item.REPR_NRIC.substring(8, 13)
                                  }}
                                </span>
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
                              <td v-if="item.REPR_TELEPHONE != '-' && item.REPR_TELEPHONE != null">
                                <span>
                                  0{{ item.REPR_TELEPHONE.substring(0,1) }}-{{ item.REPR_TELEPHONE.substring(1,10) }}
                                </span>
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
                              <td
                                v-if="
                                  item.REPR_MOBILE_NUMBER == null ||
                                  item.REPR_MOBILE_NUMBER == '-'
                                "
                              >
                                -
                              </td>
                              <td v-if="item.REPR_MOBILE_NUMBER != '-' && item.REPR_MOBILE_NUMBER != null">
                                <span>
                                  0{{ item.REPR_MOBILE_NUMBER.substring(0,2) }}-{{ item.REPR_MOBILE_NUMBER.substring(2,10) }}
                                </span>
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
                            v-for="(item, index) in this.modelData.DATADIR"
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
                    </b-collapse>
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
                        <tbody
                          v-for="(item, index) in this.modelData.DATAREPR"
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
                                v-if="item.REPR_NRIC == '-' || item.REPR_NRIC == '' || item.REPR_NRIC == null"
                              >
                                -
                              </td>
                              <td
                                v-if="
                                  item.REPR_NRIC != '-' && item.REPR_NRIC != null &&
                                  item.REPR_NRIC != '' &&
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
                              <td v-if="item.REPR_TELEPHONE != null && item.REPR_TELEPHONE != '' && item.REPR_TELEPHONE != '-'">
                                0{{ item.REPR_TELEPHONE.substring(0, 1) }}-{{
                                  item.REPR_TELEPHONE.substring(1, 10)
                                }}
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
                              <td v-if="item.REPR_MOBILE_NUMBER != null && item.REPR_MOBILE_NUMBER != ''">
                                01{{ item.REPR_MOBILE_NUMBER.substring(0, 1) }}-{{
                                  item.REPR_MOBILE_NUMBER.substring(1, 10)
                                }}
                              </td>
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
                                Upload Board of Directors' Resolution approving
                                the appointment of the AR
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

                    <b-collapse id="collapse-AAR" class="mt-2">
                      <br />
                      <h4>Alternative Representative (AAR)</h4>
                      <table class="table table-striped">
                        <tbody
                          v-for="(item, index) in this.modelData.DATAREPR"
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
                                v-if="item.REPR_NRIC == '-' || item.REPR_NRIC == '' || item.REPR_NRIC == null"
                              >
                                -
                              </td>
                              <td
                                v-if="
                                  item.REPR_NRIC != '-' && item.REPR_NRIC != null &&
                                  item.REPR_NRIC != '' &&
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
                              <td v-if="item.REPR_TELEPHONE != null && item.REPR_TELEPHONE != '' && item.REPR_TELEPHONE != '-'">
                                0{{ item.REPR_TELEPHONE.substring(0, 1) }}-{{
                                  item.REPR_TELEPHONE.substring(1, 10)
                                }}
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
                              <td v-if="item.REPR_MOBILE_NUMBER != null && item.REPR_MOBILE_NUMBER != ''">
                                01{{ item.REPR_MOBILE_NUMBER.substring(0, 1) }}-{{
                                  item.REPR_MOBILE_NUMBER.substring(1, 10)
                                }}
                              </td>
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
                    </b-collapse>
                  </div>
                  <div>
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
                          v-for="(item, index) in this.modelData.DATAFP"
                          :key="index"
                        >
                          <div
                            v-if="
                              this.modelData.DIST_TYPE_NAME == '4' ||
                              this.modelData.DIST_TYPE_NAME == '5'
                            "
                          >
                            <tr>
                              <td style="width: 20%">Financial Institution</td>
                              <td style="width: 1%">:</td>
                              <td v-if="item.DIST_FINANCIAL_INSTITUTION == 1">
                                Yes
                              </td>
                              <td v-if="item.DIST_FINANCIAL_INSTITUTION == 2">
                                No
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
                          v-for="(item, index) in this.modelData.DATAFP"
                          :key="index"
                        >
                          <div
                            v-if="
                              this.modelData.DIST_TYPE_NAME == '4' ||
                              this.modelData.DIST_TYPE_NAME == '5'
                            "
                          >
                            <tr>
                              <td style="width: 20%">Name</td>
                              <td style="width: 1%">:</td>
                              <td>
                                {{ item.DIST_FP_SALUTATION }}
                                {{ item.DIST_FP_NAME }}
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
                              <td
                                v-if="item.DIST_FP_NRIC == '-' || item.DIST_FP_NRIC == '' || item.DIST_FP_NRIC == null"
                              >
                                -
                              </td>
                              <td
                                v-if="
                                  item.DIST_FP_NRIC != '-' && item.DIST_FP_NRIC != null &&
                                  item.DIST_FP_NRIC != '' "
                              >
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
                          v-for="(item, index) in this.modelData.DATAFP"
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
                              <td
                                v-if="
                                  item.ADD_TELEPHONE == null ||
                                  item.ADD_TELEPHONE == '-' ||
                                  item.ADD_TELEPHONE == ''
                                "
                              >
                                -
                              </td>
                              <td v-if="item.ADD_TELEPHONE != '-' && item.ADD_TELEPHONE != null && item.ADD_TELEPHONE != ''">
                                0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                                  item.ADD_TELEPHONE.substring(1, 10)
                                }}
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
                              <td
                                v-if="
                                  item.ADD_MOBILE_NUMBER == null ||
                                  item.ADD_MOBILE_NUMBER == '-' ||
                                  item.ADD_MOBILE_NUMBER == ''
                                "
                              >
                                -
                              </td>
                              <td v-if="item.ADD_MOBILE_NUMBER != '-' && item.ADD_MOBILE_NUMBER != null && item.ADD_MOBILE_NUMBER != ''">
                                0{{ item.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                                  item.ADD_MOBILE_NUMBER.substring(2, 10)
                                }}
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
                          v-for="(item, index) in this.modelData.DATAAI"
                          :key="index"
                        >
                          <div
                            v-if="
                              item.ADD_TYPE == 'HOD_UTS' || item.ADD_TYPE == '21'
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
                              <td
                                v-if="
                                  item.ADD_TELEPHONE == null ||
                                  item.ADD_TELEPHONE == '-' ||
                                  item.ADD_TELEPHONE == ''
                                "
                              >
                                -
                              </td>
                              <td v-if="item.ADD_TELEPHONE != '-' && item.ADD_TELEPHONE != null && item.ADD_TELEPHONE != ''">
                                0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                                  item.ADD_TELEPHONE.substring(1, 10)
                                }}
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
                              <td
                                v-if="
                                  item.ADD_MOBILE_NUMBER == null ||
                                  item.ADD_MOBILE_NUMBER == '-' ||
                                  item.ADD_MOBILE_NUMBER == ''
                                "
                              >
                                -
                              </td>
                              <td v-if="item.ADD_MOBILE_NUMBER != '-' && item.ADD_MOBILE_NUMBER != null && item.ADD_MOBILE_NUMBER != ''">
                                0{{ item.ADD_MOBILE_NUMBER.substring(0, 1) }}-{{
                                  item.ADD_MOBILE_NUMBER.substring(2, 10)
                                }}
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
                          v-for="(item, index) in this.modelData.DATAAI"
                          :key="index"
                        >
                          <div
                            v-if="
                              item.ADD_TYPE == 'HOD_PRS' || item.ADD_TYPE == '17'
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
                              <td
                                v-if="
                                  item.ADD_TELEPHONE == null ||
                                  item.ADD_TELEPHONE == '-' ||
                                  item.ADD_TELEPHONE == ''
                                "
                              >
                                -
                              </td>
                              <td v-if="item.ADD_TELEPHONE != '-' && item.ADD_TELEPHONE != null && item.ADD_TELEPHONE != ''">
                                0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                                  item.ADD_TELEPHONE.substring(1, 10)
                                }}
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
                              <td
                                v-if="
                                  item.ADD_MOBILE_NUMBER == null ||
                                  item.ADD_MOBILE_NUMBER == '-' ||
                                  item.ADD_MOBILE_NUMBER == ''
                                "
                              >
                                -
                              </td>
                              <td v-if="item.ADD_MOBILE_NUMBER != '-' && item.ADD_MOBILE_NUMBER != null && item.ADD_MOBILE_NUMBER != ''">
                                0{{ item.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                                  item.ADD_MOBILE_NUMBER.substring(2, 10)
                                }}
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
                          v-for="(item, index) in this.modelData.DATAAI"
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
                              <td v-if="item.ADD_TELEPHONE == null || item.ADD_TELEPHONE == '-' || item.ADD_TELEPHONE == ''">-</td>
                              <td v-if="item.ADD_TELEPHONE != '-' && item.ADD_TELEPHONE != null && item.ADD_TELEPHONE != ''">
                                0{{ item.ADD_TELEPHONE.substring(0, 1) }}-{{
                                  item.ADD_TELEPHONE.substring(1, 10)
                                }}
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
                              <td
                                v-if="
                                  item.ADD_MOBILE_NUMBER == null ||
                                  item.ADD_MOBILE_NUMBER == '-' ||
                                  item.ADD_MOBILE_NUMBER == ''
                                "
                              >
                                -
                              </td>
                              <td v-if="item.ADD_MOBILE_NUMBER != '-' && item.ADD_MOBILE_NUMBER != null && item.ADD_MOBILE_NUMBER != ''">
                                0{{ item.ADD_MOBILE_NUMBER.substring(0, 2) }}-{{
                                  item.ADD_MOBILE_NUMBER.substring(2, 10)
                                }}
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
                </div>

                <div v-if="currentTab === 'tab8'">
                  <br />
                  <table class="table table-striped">
                    <tr>
                      <td>
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
                                :linkable="true"
                                :editable="false"
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
                        </va-data-table>
                      </td>
                    </tr>
                    <tr>
                      <td>
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
                              size: 'You selected a larger file!',
                            }"
                            :thumbnailSize="120"
                            :theme="'list'"
                            @select="filesSelected2($event)"
                            v-model="fileRecords"
                          ></VueFileAgent>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <br />
                </div>
              </div>
              <br /><br />
              <br />
            </div>
          </div>
        </va-collapse>
      </va-card>

      <br /><br />

      <va-card>
        <h4 slot="header" class="card-title">
          Details Of Distributor License Type
        </h4>

        <div>
          <div class="float-right flex xs12 md12 xl8">
            <button
              @click="registerNewDistType"
              type="button"
              class="btn btn-primary btn-fill float-left btn-md"
            >
              <i class="fa fa-plus" />
            </button>
          </div>
        </div>
        <br />
        <br />
        <div class="flex xs12">
          <va-card>
            <!-- <li v-for="item in applicationTypeitems" :key="item.DIST_TYPE_ID">
              {{ item.DIST_TYPE_ID }}
            </li> -->
            <div v-for="item in distTypes">
              <va-accordion v-if="item.DIST_TYPE == 1">
                <va-collapse withBackground>
                  <span slot="header"> {{ item.DIST_TYPE_NAME }} </span>
                  <div slot="body">
                    <tabs
                      :tabs="tabsUTMC"
                      :currentTab="currentTabUTMC"
                      :wrapper-class="'default-tabs'"
                      :tab-class="'default-tabs__item'"
                      :tab-active-class="'default-tabs__item_active'"
                      :line-class="'default-tabs__active-line'"
                      @onClick="handleClickUTMC"
                    />
                    <div v-if="currentTabUTMC === 'tab1'">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                        <tr>
                          <td style="width: 20%">Application Type</td>
                          <td style="width: 1%">:</td>
                          <td>{{ item.DIST_TYPE_NAME }}</td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Scheme / Product</td>
                          <td style="width: 1%">:</td>
                          <td>UTS</td>
                        </tr>
                        </tbody>
                      </table>
                      <br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab2'">
                      <div>
                        <br />
                        <table class="table table-striped">
                          <tbody>
                          <tr>
                            <td style="width: 20%">Issuing Bank</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_ISSUEBANK }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Reference Number</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_TRANS_REF }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Date</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_TRANS_DATE }}
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Type</td>
                            <td style="width: 1%">:</td>
                            <td v-if="item.DIST_TRANS_TYPE == 1">
                              ONLINE TRANSACTION
                            </td>
                            <td v-if="item.DIST_TRANS_TYPE == 2">
                              CASH DEPOSIT
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Amount</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_ACC_AMOUNT }}
                            </td>
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
                        <br />
                      </div>
                      <br /><br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab3'">
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
                                @get-blob-data="
                                  getBlobFile(row.rowData.DOCU_BLOB)
                                "
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
                        <br />
                      </div>

                      <br /><br />
                    </div>
                    <div></div>
                    <br /><br /><br /><br /><br /><br />
                  </div>
                </va-collapse>
              </va-accordion>
              <va-accordion v-if="item.DIST_TYPE == 2">
                <va-collapse withBackground>
                  <span slot="header"> {{ item.DIST_TYPE_NAME }} </span>
                  <div slot="body">
                    <tabs
                      :tabs="tabsUTMC"
                      :currentTab="currentTabUTMC"
                      :wrapper-class="'default-tabs'"
                      :tab-class="'default-tabs__item'"
                      :tab-active-class="'default-tabs__item_active'"
                      :line-class="'default-tabs__active-line'"
                      @onClick="handleClickUTMC"
                    />
                    <div v-if="currentTabUTMC === 'tab1'">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                        <tr>
                          <td style="width: 20%">Application Type</td>
                          <td style="width: 1%">:</td>
                          <td>{{ item.DIST_TYPE_NAME }}</td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Scheme / Product</td>
                          <td style="width: 1%">:</td>
                          <td>UTS</td>
                        </tr>
                        </tbody>
                      </table>
                      <br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab2'">
                      <div>
                        <br />
                        <table class="table table-striped">
                          <tbody>
                          <tr>
                            <td style="width: 20%">Issuing Bank</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_ISSUEBANK }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Reference Number</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_TRANS_REF }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Date</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_TRANS_DATE }}
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Type</td>
                            <td style="width: 1%">:</td>
                            <td v-if="item.DIST_TRANS_TYPE == 1">
                              ONLINE TRANSACTION
                            </td>
                            <td v-if="item.DIST_TRANS_TYPE == 2">
                              CASH DEPOSIT
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Amount</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_ACC_AMOUNT }}
                            </td>
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
                        <br />
                      </div>
                      <br /><br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab3'">
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
                          <br />
                        </div>
                      </div>
                      <br /><br />
                    </div>
                    <div></div>
                    <br /><br /><br /><br /><br /><br />
                  </div>
                </va-collapse>
              </va-accordion>
              <va-accordion v-if="item.DIST_TYPE == 3">
                <va-collapse withBackground>
                  <span slot="header"> {{ item.DIST_TYPE_NAME }} </span>
                  <div slot="body">
                    <tabs
                      :tabs="tabsUTMC"
                      :currentTab="currentTabUTMC"
                      :wrapper-class="'default-tabs'"
                      :tab-class="'default-tabs__item'"
                      :tab-active-class="'default-tabs__item_active'"
                      :line-class="'default-tabs__active-line'"
                      @onClick="handleClickUTMC"
                    />
                    <div v-if="currentTabUTMC === 'tab1'">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                        <tr>
                          <td style="width: 20%">Application Type</td>
                          <td style="width: 1%">:</td>
                          <td>{{ item.DIST_TYPE_NAME }}</td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Scheme / Product</td>
                          <td style="width: 1%">:</td>
                          <td>UTS</td>
                        </tr>
                        </tbody>
                      </table>
                      <br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab2'">
                      <div>
                        <br />
                        <table class="table table-striped">
                          <tbody>
                          <tr>
                            <td style="width: 20%">Issuing Bank</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_ISSUEBANK }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Reference Number</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_TRANS_REF }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Date</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_TRANS_DATE }}
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Type</td>
                            <td style="width: 1%">:</td>
                            <td v-if="item.DIST_TRANS_TYPE == 1">
                              ONLINE TRANSACTION
                            </td>
                            <td v-if="item.DIST_TRANS_TYPE == 2">
                              CASH DEPOSIT
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Amount</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_ACC_AMOUNT }}
                            </td>
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
                        <br />
                      </div>
                      <br /><br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab3'">
                      <div>
                        <div
                          v-for="(item, index) in this.proposalList"
                          :key="index"
                        >
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
                          <br />
                        </div>
                      </div>
                      <br /><br />
                    </div>
                    <div></div>
                    <br /><br /><br /><br /><br /><br />
                  </div>
                </va-collapse>
              </va-accordion>
              <va-accordion v-if="item.DIST_TYPE == 4">
                <va-collapse withBackground>
                  <span slot="header"> {{ item.DIST_TYPE_NAME }} </span>
                  <div slot="body">
                    <tabs
                      :tabs="tabsUTMC"
                      :currentTab="currentTabUTMC"
                      :wrapper-class="'default-tabs'"
                      :tab-class="'default-tabs__item'"
                      :tab-active-class="'default-tabs__item_active'"
                      :line-class="'default-tabs__active-line'"
                      @onClick="handleClickUTMC"
                    />
                    <div v-if="currentTabUTMC === 'tab1'">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                        <tr>
                          <td style="width: 20%">Application Type</td>
                          <td style="width: 1%">:</td>
                          <td>{{ item.DIST_TYPE_NAME }}</td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Scheme / Product</td>
                          <td style="width: 1%">:</td>
                          <td>UTS</td>
                        </tr>
                        </tbody>
                      </table>
                      <br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab2'">
                      <div>
                        <br />
                        <table class="table table-striped">
                          <tbody>
                          <tr>
                            <td style="width: 20%">Issuing Bank</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_ISSUEBANK }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Reference Number</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_TRANS_REF }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Date</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_TRANS_DATE }}
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Type</td>
                            <td style="width: 1%">:</td>
                            <td v-if="item.DIST_TRANS_TYPE == 1">
                              ONLINE TRANSACTION
                            </td>
                            <td v-if="item.DIST_TRANS_TYPE == 2">
                              CASH DEPOSIT
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Amount</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_ACC_AMOUNT }}
                            </td>
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
                        <br />
                      </div>
                      <br /><br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab3'">
                      <div>
                        <div
                          v-for="(item, index) in this.proposalList"
                          :key="index"
                        >
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
                          <br />
                        </div>
                      </div>
                      <br /><br />
                    </div>
                    <div></div>
                    <br /><br /><br /><br /><br /><br />
                  </div>
                </va-collapse>
              </va-accordion>
              <va-accordion v-if="item.DIST_TYPE == 5">
                <va-collapse withBackground>
                  <span slot="header"> {{ item.DIST_TYPE_NAME }} </span>
                  <div slot="body">
                    <tabs
                      :tabs="tabsUTMC"
                      :currentTab="currentTabUTMC"
                      :wrapper-class="'default-tabs'"
                      :tab-class="'default-tabs__item'"
                      :tab-active-class="'default-tabs__item_active'"
                      :line-class="'default-tabs__active-line'"
                      @onClick="handleClickUTMC"
                    />
                    <div v-if="currentTabUTMC === 'tab1'">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                        <tr>
                          <td style="width: 20%">Application Type</td>
                          <td style="width: 1%">:</td>
                          <td>{{ item.DIST_TYPE_NAME }}</td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Scheme / Product</td>
                          <td style="width: 1%">:</td>
                          <td>UTS</td>
                        </tr>
                        </tbody>
                      </table>
                      <br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab2'">
                      <div>
                        <br />
                        <table class="table table-striped">
                          <tbody>
                          <tr>
                            <td style="width: 20%">Issuing Bank</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_ISSUEBANK }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Reference Number</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_TRANS_REF }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Date</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_TRANS_DATE }}
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Type</td>
                            <td style="width: 1%">:</td>
                            <td v-if="item.DIST_TRANS_TYPE == 1">
                              ONLINE TRANSACTION
                            </td>
                            <td v-if="item.DIST_TRANS_TYPE == 2">
                              CASH DEPOSIT
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Amount</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_ACC_AMOUNT }}
                            </td>
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
                        <br />
                      </div>
                      <br /><br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab3'">
                      <div>
                        <div
                          v-for="(item, index) in this.proposalList"
                          :key="index"
                        >
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
                          <br />
                        </div>
                      </div>
                      <br /><br />
                    </div>
                    <div></div>
                    <br /><br /><br /><br /><br /><br />
                  </div>
                </va-collapse>
              </va-accordion>
              <va-accordion v-if="item.DIST_TYPE == 6">
                <va-collapse withBackground>
                  <span slot="header"> {{ item.DIST_TYPE_NAME }} </span>
                  <div slot="body">
                    <tabs
                      :tabs="tabsUTMC"
                      :currentTab="currentTabUTMC"
                      :wrapper-class="'default-tabs'"
                      :tab-class="'default-tabs__item'"
                      :tab-active-class="'default-tabs__item_active'"
                      :line-class="'default-tabs__active-line'"
                      @onClick="handleClickUTMC"
                    />
                    <div v-if="currentTabUTMC === 'tab1'">
                      <br />
                      <table class="table table-striped">
                        <tbody>
                        <tr>
                          <td style="width: 20%">Application Type</td>
                          <td style="width: 1%">:</td>
                          <td>{{ item.DIST_TYPE_NAME }}</td>
                        </tr>
                        <tr>
                          <td style="width: 20%">Scheme / Product</td>
                          <td style="width: 1%">:</td>
                          <td>UTS</td>
                        </tr>
                        </tbody>
                      </table>
                      <br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab2'">
                      <div>
                        <br />
                        <table class="table table-striped">
                          <tbody>
                          <tr>
                            <td style="width: 20%">Issuing Bank</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_ISSUEBANK }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Reference Number</td>
                            <td style="width: 1%">:</td>
                            <td>{{ item.DIST_TRANS_REF }}</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Date</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_TRANS_DATE }}
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Transaction Type</td>
                            <td style="width: 1%">:</td>
                            <td v-if="item.DIST_TRANS_TYPE == 1">
                              ONLINE TRANSACTION
                            </td>
                            <td v-if="item.DIST_TRANS_TYPE == 2">
                              CASH DEPOSIT
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Amount</td>
                            <td style="width: 1%">:</td>
                            <td>
                              {{ item.DIST_ACC_AMOUNT }}
                            </td>
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
                        <br />
                      </div>
                      <br /><br />
                    </div>
                    <div v-if="currentTabUTMC === 'tab3'">
                      <div>
                        <div
                          v-for="(item, index) in this.proposalList"
                          :key="index"
                        >
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
                          <br />
                        </div>
                      </div>
                      <br /><br />
                    </div>
                    <div></div>
                    <br /><br /><br /><br /><br /><br />
                  </div>
                </va-collapse>
              </va-accordion>

            </div>

          </va-card>
        </div>
      </va-card>
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
import Vudal from "vudal";
import license from "./cm1_distributor_licenseType.vue";

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
const TABSUTMC = [
  {
    title: "Application Type",
    value: "tab1",
  },
  {
    title: "Payment Details",
    value: "tab2",
  },
  {
    title: "Proposal",
    value: "tab3",
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
          title: "File",
          // dataClass: "float-right"
        },
      ];
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
    this.getDistributorById();
    this.getDistType();
    this.getDistTypeByDistTypeId();
    this.getDocumentProposal();

    this.getDocumentRequired();
  },

  data() {
    return {
      isLoad: false,
      applicationTypeitems: {},
      docFileRemark: "",
      docRemark: "",
      remarkDocProfile: [],
      remarkDocAddtInfo: [],
      remarkDocARnAAR: [],
      remarkDocCEOnDIR: [],
      remarkDocDetInfo: [],
      remarkDocPayment: [],

      distTypes: [],

      modelData: {},
      distType: {},

      excelname: "download-file",
      sheetname: "download-sheet",

      APPROVAL_REMARK_PROFILE: null,
      APPROVAL_REMARK_ADDTIONALINFO: null,
      APPROVAL_REMARK_ARnAAR: null,
      APPROVAL_REMARK_CEOnDIR: null,
      APPROVAL_REMARK_DETAILINFO: null,
      APPROVAL_REMARK_PAYMENT: null,

      term: null,
      perPage: "6",
      fileRecordsForUpload: [],
      approvalDetail: "",
      additionalList: [],
      distributorDetail: {},
      tabs: TABS,
      currentTab: "tab1",

      tabs2: TABS2,
      tabsUTMC: TABSUTMC,
      currentTab2: "tab1",
      currentTabUTMC: "tab1",
      proposalList: [],
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
        remark: "",
        remark1: "",
        remark2: "",
        remark3: "",
        remark4: "",
        remark5: "",
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
    async updateProfile() {
      this.$router.push("/distributor/distributor-profile-update");
    },
    async updateProfileList() {
      this.$router.push("/distributor/distributor-profile-update-list");
    },
    async back() {
      this.$router.push("/distributor/dashboard");
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
    async registerNewDistType() {
      localStorage.setItem('active_dist_types',JSON.stringify(this.distTypes));
      this.$router.push("/distributor/distributor-register-new-license");
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
        var i;
        for (i = 0; i < this.fileRecordsForUpload.length; i++) {
          if (status == 1) {
            this.fileRemark.push(this.fileRecordsForUpload[i].file);
          } else if (status == 2) {
            this.fileRemark2.push(this.fileRecordsForUpload[i].file);
          } else if (status == 3) {
            this.fileRemark3.push(this.fileRecordsForUpload[i].file);
          } else if (status == 4) {
            this.fileRemark4.push(this.fileRecordsForUpload[i].file);
          } else if (status == 5) {
            this.fileRemark5.push(this.fileRecordsForUpload[i].file);
          } else if (status == 6) {
            this.fileRemark6.push(this.fileRecordsForUpload[i].file);
          }
        }
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },

    async getDistType() {
      const user = localStorage.getItem("user");
      const response = await services06Module1.getDistType(
        JSON.parse(user).USER_DIST_ID
      );
      console.log("This is data : ");
      console.log(JSON.stringify(response));
      this.distTypeList = response;
      this.distTypeList.forEach((item) => {
        console.log(item);
      });
    },

    async getDistTypeByDistTypeId() {
      const user = localStorage.getItem("user");
      const response = await services06Module1.getDistTypeByDistTypeId(
        JSON.parse(user).USER_DIST_ID
      );
      this.distType = JSON.stringify(response);
      // alert(this.distType);
    },

    async getDocumentRequired() {
      const user = localStorage.getItem("user");
      const data = {
        REQ_DOCU_TYPE: 2,
        MANAGE_SUBMODULE_ID: 1,
        DISTRIBUTOR_ID: JSON.parse(user).USER_DIST_ID,
      };
      const response = await services06Module0.getDocumentRequired(data);
      this.additionalList = response.dataAdditional;
      this.additionalList.forEach((element) => {
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
          url: window.URL.createObjectURL(element.DOCU_BLOB),
        };
        element.fileRecords.push(data);
      });
    },

    async getDocumentProposal() {
      const user = localStorage.getItem("user");
      const data = {
        REQ_DOCU_TYPE: 1,
        MANAGE_SUBMODULE_ID: 1,
        DISTRIBUTOR_ID: JSON.parse(user).USER_DIST_ID,
      };
      const response = await services06Module0.getDocumentProposalFile(data);
      this.proposalList = response.dataProposal;

      this.proposalList.forEach((item) => {
        if(item.list.length > 0) {

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
        }
      });
    },

    async getDistributorById() {
      this.isLoad = true;
      const user = localStorage.getItem("user")

      const userID=localStorage.getItem('USER_GROUP_ID');

      const response = await services06Module1.getDistributorById(
        userID !=null ? userID : JSON.parse(user).user_id
      );
      //console.log(response);
      this.modelData = response;
      this.distTypes=response.DIST_TYPES;
      this.isLoad = false;
      //console.log(this.modelData);
      // Create our number formatter.
      const responseCurrency = await services06Module0.getCurrencyFormat("MYR");
      const formatter = currencyFormat.currencyFormat(
        responseCurrency.SET_REMARK,
        responseCurrency.SET_PARAM
      );
      this.distributorDetail.DIST_PAID_UP_CAPITAL = formatter.format(
        this.distributorDetail.DIST_PAID_UP_CAPITAL
      );
      this.distributorDetail.DIST_ACC_AMOUNT = formatter.format(
        this.distributorDetail.DIST_ACC_AMOUNT
      );

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
    handleClickUTMC(newTab) {
      this.currentTabUTMC = newTab;
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
