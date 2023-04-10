/* eslint-disable eqeqeq */
<template>
  <va-inner-loading :loading="statusLoad">
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="flex xs12 md12 xl12">
            <va-card
              class="striped-tabled-with-hover"
              body-classes="table-full-width table-responsive"
            >
              <br />
              <h4 slot="header" class="card-title">
                Fund Details
              </h4>

              <br />
      <div>
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%"><b>Management Company</b></td>
              <td style="width: 1%">:</td>
              <td>{{ getDataFundProfile.DIST_NAME }}</td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Company Type</b></td>
              <td style="width: 1%">:</td>
              <td>{{ getDataFundProfile.DIST_TYPE_NAME }}</td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Umbrella Fund</b></td>
              <td style="width: 1%">:</td>
              <td>{{ getDataFundProfile.UMBRELLA_FUND_NAME }}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width: 15%"><b>FIMM Fund Code</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                {{ getDataFundProfile.FUND_CODE_FIMM }}
              </td>

              <td style="width: 15%"><b>Fund Status</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">{{ getDataFundProfile.TS_PARAM }}</td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Member Fund Code</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                {{ getDataFundProfile.FUND_CODE_MEMBER }}
              </td>
              <td style="width: 15%"><b>Lipper Fund Code</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                LP{{ getDataFundProfile.FUND_LIPPER_CODE }}
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>ISIN</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_ISIN != null || getDataFundProfile.FUND_ISIN !=''">
                  {{ getDataFundProfile.FUND_ISIN }}
                </div>
                <div v-else-if="getDataFundProfile.FUND_ISIN == null || getDataFundProfile.FUND_ISIN == ''">
                  -
                </div>
              </td>
              <td style="width: 15%"><b>SC Fund Code</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_SC_CODE != null || getDataFundProfile.FUND_SC_CODE !=''">
                {{ getDataFundProfile.FUND_SC_CODE }}
                </div>
                <div v-else-if="getDataFundProfile.FUND_SC_CODE == null || getDataFundProfile.FUND_SC_CODE == ''">
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Fund Chinese Name (Traditional)</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="
                    getDataFundProfile.FUND_NAME_CHINESE != null &&
                    getDataFundProfile.FUND_NAME_CHINESE != '' &&
                    getDataFundProfile.FUND_NAME_CHINESE != 'null'
                  "
                  >
              {{ getDataFundProfile.FUND_NAME_CHINESE }}
              </div>
              <div v-if="
                    getDataFundProfile.FUND_NAME_CHINESE == null ||
                    getDataFundProfile.FUND_NAME_CHINESE == '' ||
                    getDataFundProfile.FUND_NAME_CHINESE == 'null'
                  "
                  >
              -
              </div>
              </td>

              <td style="width: 15%"><b>Fund Name</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">{{ getDataFundProfile.FUND_NAME }}</td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Fund Short Name</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                {{ getDataFundProfile.FUND_NAME_SHORT }}
              </td>

              <td style="width: 15%"><b>Annual Management Fee</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_ANNUAL_MGMT != null &&
                    getDataFundProfile.FUND_ANNUAL_MGMT != ''
                  "
                >
                  {{ getDataFundProfile.FUND_ANNUAL_MGMT.substring(0,1) }}.{{ getDataFundProfile.FUND_ANNUAL_MGMT.substring(1,4) }}%
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_ANNUAL_MGMT == null ||
                    getDataFundProfile.FUND_ANNUAL_MGMT == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FiMM Fund Type</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_TYPE_FULLNAME != null && getDataFundProfile.FUND_TYPE_FULLNAME != ''
                  "
                >
                  {{ getDataFundProfile.FUND_TYPE_FULLNAME }}
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_TYPE_FULLNAME == null || getDataFundProfile.FUND_TYPE_FULLNAME == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Performance Fee</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_FEE_PERFORMANCE != null &&
                    getDataFundProfile.FUND_FEE_PERFORMANCE != ''
                  "
                >
                  {{ getDataFundProfile.FUND_FEE_PERFORMANCE.substring(0,1) }}.{{ getDataFundProfile.FUND_FEE_PERFORMANCE.substring(1,4) }}%
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_FEE_PERFORMANCE == null ||
                    getDataFundProfile.FUND_FEE_PERFORMANCE == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FiMM Fund Category</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.GROUP_ASSET != null &&
                    getDataFundProfile.GROUP_ASSET != ''
                  "
                >
                  {{ getDataFundProfile.GROUP_ASSET }}
                </div>
                <div
                  v-if="
                    getDataFundProfile.GROUP_ASSET == null ||
                    getDataFundProfile.GROUP_ASSET == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Ratio</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">

                <div
                  v-if="
                    getDataFundProfile.FUND_RATIO > 1
                  "
                >
                  {{ getDataFundProfile.FUND_RATIO.substring(0,2) }}:{{ getDataFundProfile.FUND_RATIO.substring(2,4) }}
                </div>
                <div
                  v-else
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FiMM Domicile</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_DOMICILE != null &&
                    getDataFundProfile.FUND_DOMICILE != ''
                  "
                >
                  {{ getDataFundProfile.FUND_DOMICILE_NAME }}
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_DOMICILE == null ||
                    getDataFundProfile.FUND_DOMICILE == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Hurdle Rate</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_HURDLE != null &&
                    getDataFundProfile.FUND_HURDLE != '' &&
                    getDataFundProfile.FUND_HURDLE != '-'
                  "
                >
                  {{ getDataFundProfile.FUND_HURDLE.substring(0,1) }}.{{ getDataFundProfile.FUND_HURDLE.substring(1,4) }}%
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_HURDLE == null ||
                    getDataFundProfile.FUND_HURDLE == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FiMM Currency Denomination</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.CURR_DENOMINATION != null &&
                    getDataFundProfile.CURR_DENOMINATION != ''
                  "
                >
                  {{ getDataFundProfile.CURR_DENOMINATION }}
                </div>
                <div
                  v-if="
                    getDataFundProfile.CURR_DENOMINATION == null ||
                    getDataFundProfile.CURR_DENOMINATION == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Launch Price per unit</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_PRICE_PERUNIT != null &&
                    getDataFundProfile.FUND_PRICE_PERUNIT != ''
                  "
                >
                  {{ getDataFundProfile.FUND_PRICE_PERUNIT.substring(0,1)}}.{{ getDataFundProfile.FUND_PRICE_PERUNIT.substring(1,5)}}
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_PRICE_PERUNIT == null ||
                    getDataFundProfile.FUND_PRICE_PERUNIT == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Sub Manager Name</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_SUB_MANAGER != null &&
                    getDataFundProfile.FUND_SUB_MANAGER != ''
                  "
                >
                  {{ getDataFundProfile.FUND_SUB_MANAGER }}
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_SUB_MANAGER == null ||
                    getDataFundProfile.FUND_SUB_MANAGER == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Launch Date</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_DATE_LAUNCH != null &&
                    getDataFundProfile.FUND_DATE_LAUNCH != ''
                  "
                >
                  {{ getDataFundProfile.FUND_DATE_LAUNCH }}
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_DATE_LAUNCH == null ||
                    getDataFundProfile.FUND_DATE_LAUNCH == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Syariah Compliant</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_SYARIAH_COMP == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_SYARIAH_COMP == 2">No</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_SYARIAH_COMP == null ||
                    getDataFundProfile.FUND_SYARIAH_COMP == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Financial Year End</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if=" getDataFundProfile.FUND_YEAR_END != '0000-00-00' &&
                    getDataFundProfile.FUND_YEAR_END != null &&
                    getDataFundProfile.FUND_YEAR_END != ''
                  "
                >
                  {{ getDataFundProfile.FUND_YEAR_END }}
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_YEAR_END == null ||
                    getDataFundProfile.FUND_YEAR_END == '' || getDataFundProfile.FUND_YEAR_END == '0000-00-00'
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>EPF Status</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_STATUS_EPF == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_STATUS_EPF == 2">No</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_STATUS_EPF == null ||
                    getDataFundProfile.FUND_STATUS_EPF == ''
                  "
                >
                  -
                </div>
              </td>
              <td style="width: 15%"><b>Fund EPF Code</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_EPF_CODE != null && getDataFundProfile.FUND_EPF_CODE != '' ">
                  {{ getDataFundProfile.FUND_EPF_CODE }}
                  </div>
                <div v-if="getDataFundProfile.FUND_EPF_CODE == null && getDataFundProfile.FUND_EPF_CODE == '' ">
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>SRI/ESG Status</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_ASEAN_CIS_STATUS == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_ASEAN_CIS_STATUS == 2">No</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_ASEAN_CIS_STATUS == null ||
                    getDataFundProfile.FUND_ASEAN_CIS_STATUS == ''
                  "
                >
                  -
                </div>
              </td>
              <td style="width: 15%"><b>SRI/ESG Effective Date</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_DATE_SRI_ESG_EFFECTIVE_DATE != null && getDataFundProfile.FUND_DATE_SRI_ESG_EFFECTIVE_DATE != ''">{{getDataFundProfile.FUND_DATE_SRI_ESG_EFFECTIVE_DATE}}</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_DATE_SRI_ESG_EFFECTIVE_DATE == null ||
                    getDataFundProfile.FUND_DATE_SRI_ESG_EFFECTIVE_DATE == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>MER Status</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_STATUS_MER == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_STATUS_MER == 2">No</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_STATUS_MER == null ||
                    getDataFundProfile.FUND_STATUS_MER == ''
                  "
                >
                  -
                </div>
              </td>
              <td style="width: 15%"><b>MER</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_MER != null && getDataFundProfile.FUND_MER != '' ">
                  {{ getDataFundProfile.FUND_MER.substring(0,1) }}.{{ getDataFundProfile.FUND_MER.substring(1,5) }}%
                  </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_MER == null ||
                    getDataFundProfile.FUND_MER == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Annual Management Status</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_STATUS_ANNUAL_MGMT == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_STATUS_ANNUAL_MGMT == 2">No</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_STATUS_ANNUAL_MGMT == null ||
                    getDataFundProfile.FUND_STATUS_ANNUAL_MGMT == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Minimum Sales Charge</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_MINIMUM_SALE_CHARGE != NULL &&
                    getDataFundProfile.FUND_MINIMUM_SALE_CHARGE != '' &&
                    getDataFundProfile.FUND_MINIMUM_SALE_CHARGE != 'N/A'
                  "
                >
                  {{ getDataFundProfile.FUND_MINIMUM_SALE_CHARGE.substring(0,1) }}.{{ getDataFundProfile.FUND_MINIMUM_SALE_CHARGE.substring(1,4) }}%
                </div>
                <div
                  v-else-if="
                    getDataFundProfile.FUND_MINIMUM_SALE_CHARGE == 'N/A'
                  "
                >
                  {{ getDataFundProfile.FUND_MINIMUM_SALE_CHARGE}}
                </div>
                <div
                  v-else
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Declaration of Fund Performance</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_FUND_PERFORMANCE == 1">
                  Yes
                </div>
                <div v-if="getDataFundProfile.FUND_FUND_PERFORMANCE == 2">
                  No
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_FUND_PERFORMANCE == null ||
                    getDataFundProfile.FUND_FUND_PERFORMANCE == ''
                  "
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Maximum Sales Charge</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_MAXIMUM_SALE_CHARGE != NULL &&
                    getDataFundProfile.FUND_MAXIMUM_SALE_CHARGE != '' &&
                    getDataFundProfile.FUND_MAXIMUM_SALE_CHARGE != 'N/A'
                  "
                >
                  {{ getDataFundProfile.FUND_MAXIMUM_SALE_CHARGE.substring(0,1) }}.{{ getDataFundProfile.FUND_MAXIMUM_SALE_CHARGE.substring(1,4) }}%

                </div>
                <div
                  v-else-if="
                    getDataFundProfile.FUND_MAXIMUM_SALE_CHARGE == 'N/A'
                  "
                >
                  {{ getDataFundProfile.FUND_MAXIMUM_SALE_CHARGE }}
                </div>
                <div
                  v-else
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Effective Sale Charge</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_SALES_CHARGE != NULL &&
                    getDataFundProfile.FUND_SALES_CHARGE != '' &&
                    getDataFundProfile.FUND_SALES_CHARGE != 'N/A'
                  "
                >
                  {{ getDataFundProfile.FUND_SALES_CHARGE.substring(0,1) }}.{{ getDataFundProfile.FUND_SALES_CHARGE.substring(1,4) }}%

                </div>
                <div
                  v-else-if="
                    getDataFundProfile.FUND_SALES_CHARGE == 'N/A'
                  "
                >
                  {{ getDataFundProfile.FUND_SALES_CHARGE }}%
                </div>
                <div
                  v-else
                >
                  -
                </div>
              </td>

              <td style="width: 15%"><b>Scheme Structure</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_SCHEME != null &&
                    getDataFundProfile.FUND_SCHEME != ''
                  "
                >
                  {{ getDataFundProfile.FMS_SCHEME_NAME }}
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_SCHEME == null ||
                    getDataFundProfile.FUND_SCHEME == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%">
                <b>Disclosure of Daily NAV in the Newspaper</b>
              </td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_DAILY_NAV == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_DAILY_NAV == 2">No</div>
                <!-- <div v-if="FUNDPROFILE.FUND_DAILY_NAV == null || FUNDPROFILE.FUND_DAILY_NAV == ''">
                      -
                    </div> -->
              </td>

              <td style="width: 15%"><b>Foreign / Local Focused</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div
                  v-if="
                    getDataFundProfile.FUND_FOCUS != null &&
                    getDataFundProfile.FUND_FOCUS != ''
                  "
                >
                {{  getDataFundProfile.FUND_INVESTMENT_FOCUS_PARAM }}
                </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_FOCUS == null &&
                    getDataFundProfile.FUND_FOCUS == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Asean CIS</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_ASEAN_CIS_STATUS == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_ASEAN_CIS_STATUS == 2">No</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_ASEAN_CIS_STATUS == null &&
                    getDataFundProfile.FUND_ASEAN_CIS_STATUS == ''
                  "
                >
                  -
                </div>

              <td style="width: 15%"><b>Unit Structure</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_UNITS != NULL && getDataFundProfile.FUND_UNITS != ''">
                  {{ getDataFundProfile.FUND_UNITS_PARAM }}
                  </div>
                <div
                  v-if="
                    getDataFundProfile.FUND_UNITS == null &&
                    getDataFundProfile.FUND_UNITS == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>FOF</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_FOF_STATUS == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_FOF_STATUS == 2">No</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_FOF_STATUS == null ||
                    getDataFundProfile.FUND_FOF_STATUS == ''
                  "
                >
                  -
                </div>
              </td>
              <td style="width: 15%"><b>UCITS</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_UCITS_STATUS == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_UCITS_STATUS == 2">No</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_UCITS_STATUS == null ||
                    getDataFundProfile.FUND_UCITS_STATUS == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 15%"><b>Feeder Fund</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_FEEDER == 1">Yes</div>
                <div v-if="getDataFundProfile.FUND_FEEDER == 2">No</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_FEEDER == null ||
                    getDataFundProfile.FUND_FEEDER == ''
                  "
                >
                  -
                </div>
              </td>

            </tr>
            <tr>
              <td style="width: 15%"><b>Fund Notes</b></td>
              <td style="width: 1%">:</td>
              <td style="width: 34%">
                <div v-if="getDataFundProfile.FUND_UCITS_STATUS == 1">Yes</div>
                <div
                  v-if="
                    getDataFundProfile.FUND_UCITS_STATUS == null ||
                    getDataFundProfile.FUND_UCITS_STATUS == ''
                  "
                >
                  -
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
            </va-card>
          </div>
          <div class="col-12">
            <va-card>
              <br />
              <div>
                <h4 slot="header" class="card-title">
                  Fund Deletion/Suspension/Closure Application
                </h4>

                <br />
                <div
                  v-if="
                    FUNDPROFILE.TS_PARAM == 'PENDING' ||
                      FUNDPROFILE.TS_PARAM == 'NEW ENTRY' ||
                      FUNDPROFILE.TS_PARAM == 'APPROVED'
                  "
                >
                  <table class="table table-responsive table-borderless">
                    <tbody>
                      <tr >
                        <td style="width: 10%">
                          <b>Application Type</b>
                        </td>
                        <td style="width: 1%">
                          :
                        </td>
                        <td>{{ FUNDPROFILE.APPL_TYPE }}</td>
                      </tr>
                      <tr
                        v-if="
                          FUNDPROFILE.APPL_TYPE != 'SUSPENSION'
                        "
                      >
                        <td style="width: 10%">
                          <b>Effective Date</b>
                        </td>
                        <td style="width: 1%">
                          :
                        </td>
                        <td>{{ FUNDPROFILE.APP_EFFEC_DATE }}</td>
                      </tr>

                      <tr
                        v-if="
                          FUNDPROFILE.APPL_TYPE == 'SUSPENSION'
                        "
                      >
                        <td style="width: 10%">
                          <b>Start Date</b>
                        </td>
                        <td style="width: 1%">
                          :
                        </td>
                        <td>{{ FUNDPROFILE.APPL_DATE_START }}</td>
                      </tr>

                      <tr
                        v-if="
                          FUNDPROFILE.APPL_TYPE == 'SUSPENSION'
                           //&& FUNDPROFILE.FUND_STATUS_FUND != 'ACTIVE'
                        "
                      >
                        <td style="width: 10%">
                          <b>End Date</b>
                        </td>
                        <td style="width: 1%">
                          :
                        </td>
                        <td>{{ FUNDPROFILE.APPL_DATE_END }}</td>
                      </tr>
                      <tr>
                        <td style="width: 10%">
                          <b>Reason</b>
                        </td>
                        <td style="width: 1%">
                          :
                        </td>
                        <td>{{ FUNDPROFILE.APPL_REASON }}</td>
                      </tr>
                      <tr>
                        <td style="width: 10%">
                          <b>Remarks By Fund Manager</b>
                        </td>
                        <td style="width: 1%">
                          :
                        </td>
                        <td>{{ FUNDPROFILE.APPR_REMARK_FM }}</td>
                      </tr>
                      <tr
                        v-if="
                          FUNDPROFILE.APPL_TYPE != 'SUSPENSION'
                        "
                      >
                        <td style="width: 10%">
                          <b>Remarks By FiMM ID</b>
                        </td>
                        <td style="width: 1%">
                          :
                        </td>
                        <td>{{ FUNDPROFILE.APPR_REMARK_FIMM }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
                <div>
                  <div v-if="FUNDPROFILE.APPL_TYPE != 'DELETION' && FUNDPROFILE.TS_PARAM != 'DRAFT' && FUNDPROFILE.TS_PARAM != 'RETURNED' && FUNDPROFILE.TS_PARAM != 'RETURN'">
                    <div>
                      <span>
                        <vue-form-generator
                          :model="model"
                          :schema="fileUploadSchema"
                          :options="formOptions"
                          @model-updated="onModelUpdated"
                          ref="statusForm"
                        >
                        </vue-form-generator>
                      </span>
                    </div>
                  </div>
                </div>
                <div  v-if="
                      FUNDPROFILE.TS_PARAM == 'RETURNED'
                  ">
                  <table>
                    <tbody>
                      <tr>
                        <td style="width: 10%">
                          <b>Remarks By Fund Manager</b>
                        </td>
                        <td style="width: 1%">
                          :
                        </td>
                        <td>{{ FUNDPROFILE.APPR_REMARK_FM }}</td>
                      </tr>
                      <tr
                      >
                        <td style="width: 10%">
                          <b>Remarks By FiMM ID</b>
                        </td>
                        <td style="width: 1%">
                          :
                        </td>
                        <td>{{ FUNDPROFILE.APPR_REMARK_FIMM }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br/><br/><br/>
                <div
                  v-if="
                    FUNDPROFILE.TS_PARAM == '' ||
                      FUNDPROFILE.TS_PARAM == 'DRAFT' ||
                      FUNDPROFILE.TS_PARAM == null ||
                      FUNDPROFILE.TS_PARAM == 'RETURNED'
                  "
                >
                  <div v-if="FUNDPROFILE.FUND_STATUS_FUND == 'ACTIVE'">
                    <vue-form-generator
                      :model="model"
                      :schema="applicationtypeschema"
                      :options="formOptions"
                      @model-updated="onModelUpdated"
                      ref="statusForm"
                    >
                    </vue-form-generator>
                    <!-- <vue-form-generator
                      :model="model"
                      :schema="fileUploadSchema"
                      :options="formOptions"
                      @model-updated="onModelUpdated"
                      ref="statusForm"
                    >
                    </vue-form-generator> -->
                  </div>
                </div>
              </div>
              <br />
              <div class="float-left">
                <button
                  @click="back"
                  type="button"
                  class="btn btn-primary btn-fill float-left btn-md"
                >
                  <i class="fa fa-step-backward" /> &nbsp; Previous
                </button>
              </div>
              <div
                class="float-right"
                v-if="
                  FUNDPROFILE.TS_PARAM == '' ||
                    FUNDPROFILE.TS_PARAM == 'DRAFT' ||
                    FUNDPROFILE.TS_PARAM == null ||
                    FUNDPROFILE.TS_PARAM == 'RETURNED' ||
                    FUNDPROFILE.TS_PARAM == 'RETURN'
                "
              >
                <button
                  @click="saveAsDraft"
                  type="button"
                  class="mr-2 btn btn-info btn-fill btn-md"
                  v-if="FUNDPROFILE.FUND_STATUS_FUND == 'ACTIVE'"
                >
                  <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                </button>
                <button
                  @click="submit"
                  type="button"
                  class="ml-1 btn btn-success btn-fill btn-md"
                  v-if="FUNDPROFILE.FUND_STATUS_FUND == 'ACTIVE'"
                >
                  <i class="fa fa-paper-plane" /> &nbsp; Submit
                </button>
              </div>
              <br />
              <br />
            </va-card>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  </va-inner-loading>
</template>
<script>
import "vue-form-generator/dist/vfg.css";
import moment from "moment";
import * as servicesModule5 from "../../../app/module5/services03";
export default {
  props: {
    FUNDPROFILE: {}
  },

  mounted() {
    var data = localStorage.getItem("fundApplication");
    this.FUNDPROFILE = JSON.parse(data);
    // this.getAllFundProfile();
    this.getFundProfile();
    this.getFundAppDetails();
     this.getSuppDoc();
     this.statusLoad = false;
  },

  components: {},
  status: [
    {
      value: "1",
      name: "Deletion"
    },
    {
      value: "2",
      name: "Suspension"
    },
    {
      value: "3",
      name: "Closure"
    }
  ],

  methods: {
    getFundAppDetails: async function() {
      const FPData = localStorage.getItem("fundApplication");
      const data =  JSON.parse(FPData).FUND_PROFILE_ID;
      const response = await servicesModule5.getFundAppDetails(data);
      this.getFundAppDetails = response;
      if (this.getFundAppDetails.APPL_TYPE == 'DELETION') {
        console.log('deletion');
        this.model.status = "1";
        this.visibleMergewith = true;
        this.visibleStartDate = false;
        this.visibleEndDate = false;
        this.visibleEffectiveDate = true;
        this.visibleReasonClosure = false;
        this.visibleReasonSuspension = false;
        this.visibleSuppDoc = false;

        this.model.mergewith = response.APPL_REASON;
        this.model.effectivedate = response.APP_EFFEC_DATE;

      } else if (this.getFundAppDetails.APPL_TYPE == 'SUSPENSION') {
        console.log('suspension');
        this.model.status = "2";
        this.visibleMergewith = false;
        this.visibleStartDate = true;
        this.visibleEndDate = true;
        this.visibleEffectiveDate = false;
        this.visibleReasonClosure = false;
        this.visibleReasonSuspension = true;
        this.visibleSuppDoc = true;

        this.model.startdate = response.APPL_DATE_START ;
        this.model.enddate = response.APPL_DATE_END;
        this.model.APPL_REASON_SUSPENSION = response.APPL_REASON;
      } else if (this.getFundAppDetails.APPL_TYPE == 'CLOSURE') {
        console.log('closure');
        this.model.status = "3";
        this.visibleMergewith = false;
        this.visibleStartDate = false;
        this.visibleEndDate = false;
        this.visibleEffectiveDate = true;
        this.visibleReasonClosure = true;
        this.visibleReasonSuspension = false;
        this.visibleSuppDoc = true;
        this.model.APPL_REASON_CLOSURE = response.APPL_REASON;
        this.model.effectivedate = response.APP_EFFEC_DATE;
      }
    },
    getFundProfile: async function () {
      const FPData = localStorage.getItem("fundApplication");
      const data =  JSON.parse(FPData).FUND_PROFILE_ID;
      console.log(data);
      const response = await servicesModule5
        .getFundProfileReviewDetails(data)
        .then((res) => {
          this.getDataFundProfile = res;

          console.log(this.getDataFundProfile);
        });
      this.getAllFundProfile1 = JSON.stringify(response);
    },
    getSuppDoc: async function() {
      const FPData = localStorage.getItem("fundApplication");
      const response = await servicesModule5.getSuppDoc(
        JSON.parse(FPData).FUND_APPL_ID
      );
      response.forEach(element => {
        // console.log(element.DOCU_BLOB);
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
        console.log("data blob : " + data);
        this.applicationSuppDoc = element.DOCU_BLOB;
        this.model.applicationSuppDoc.push(data);
         this.SUPP_DOC = element.DOCU_BLOB;
        this.model.SUPP_DOC.push(data);
        if(this.model.SUPP_DOC.length>0){
        this.visibleSuppDoc=true;
        }
      });
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
    back() {
      this.$router.go(-1);
    }, // back button
    validatestatusForm() {
      return this.$refs.ReviewRemark.validate();
    },

    validateEntryForm() {
      return this.$refs.ReviewRemark.validate();
    },
    onModelUpdated(newVal, schema) {
      console.log(newVal);
      if (schema == "status" && newVal == "1") {
        this.visibleMergewith = true;
        this.visibleStartDate = false;
        this.visibleEndDate = false;
        this.visibleEffectiveDate = true;
        this.visibleReasonClosure = false;
        this.visibleReasonSuspension = false;
        this.visibleSuppDoc = false;
      } else if (schema == "status" && newVal == "2") {
        this.visibleMergewith = false;
        this.visibleStartDate = true;
        this.visibleEndDate = true;
        this.visibleEffectiveDate = false;
        this.visibleReasonClosure = false;
        this.visibleReasonSuspension = true;
        this.visibleSuppDoc = true;
      } else if (schema == "status" && newVal == "3") {
        this.visibleMergewith = false;
        this.visibleStartDate = false;
        this.visibleEndDate = false;
        this.visibleEffectiveDate = true;
        this.visibleReasonClosure = true;
        this.visibleReasonSuspension = false;
        this.visibleSuppDoc = true;
      }
    },
    saveAsDraft: async function() {
      const vm = this;
      const user = localStorage.getItem("user");
      const fundDetails = localStorage.getItem("fundApplication");
      const fundApplID = JSON.parse(fundDetails).FUND_APPL_ID;
      const data = new FormData();
      var statusAppl = null;
      if (JSON.parse(fundDetails).TS_PARAM != null){
        statusAppl = JSON.parse(fundDetails).TS_PARAM;
      }
      data.append("FUND_PROFILE_ID", JSON.parse(fundDetails).FUND_PROFILE_ID);
      if (fundApplID != null) {
      data.append("FUND_APPL_ID", fundApplID);
      } else {
      data.append("FUND_APPL_ID", null);
      }
      data.append("DIST_USER_ID", JSON.parse(user).USER_DIST_ID);
      data.append("DIST_USER_GROUP", JSON.parse(user).USER_GROUP_ID);
      data.append("IS_SUBMIT", "1");
      data.append("STATUS", statusAppl);

      if ((this.model.status == 1)) {
        console.log("Deletion");
        data.append(
          "APP_EFFEC_DATE",
          moment(this.model.effectivedate).format("YYYY-MM-DD") ?? ""
        );
        data.append("APPL_REASON", this.model.mergewith);
        data.append("APPL_TYPE", "DELETION");
        if (confirm("Are you sure to save as draft?")) {
          const response = await servicesModule5.createFundApplication(data);
          console.log(data);
          alert("Application Has Been Save As Draft.");
          this.back();
        } else {
        }
      } else if ((this.model.status == 2)) {
        console.log("Suspension");
        data.append(
          "APPL_DATE_START",
          moment(this.model.startdate).format("YYYY-MM-DD") ?? ""
        );
        data.append(
          "APPL_DATE_END",
          moment(this.model.enddate).format("YYYY-MM-DD") ?? ""
        );
        data.append("APPL_TYPE", "SUSPENSION");
        data.append("APPL_REASON", this.model.APPL_REASON_SUSPENSION);
        if (this.model.applicationSuppDoc.length != 0) {
          for (let i = 0; i < this.model.applicationSuppDoc.length; i++) {
            data.append("file0[]", this.model.applicationSuppDoc[i]);
          }
        }
        if (confirm("Are you sure to submit?")) {
          const response = await servicesModule5.createFundApplication(data);
          console.log(data);
          alert("Application Has Been Save As Draft.");
          this.back();
        } else {
        }
      } else if ((this.model.status == 3)) {
        console.log("Closure");
        data.append(
          "APP_EFFEC_DATE",
          moment(this.model.effectivedate).format("YYYY-MM-DD") ?? ""
        );
        data.append("APPL_TYPE", "CLOSURE");
        data.append("APPL_REASON", this.model.APPL_REASON_CLOSURE);
        if (this.model.applicationSuppDoc.length != 0) {
          for (let i = 0; i < this.model.applicationSuppDoc.length; i++) {
            data.append("file0[]", this.model.applicationSuppDoc[i]);
          }
          }
        if (confirm("Are you sure to submit?")) {
          const response = await servicesModule5.createFundApplication(data);
          console.log(data);
          alert("Application Has Been Save As Draft.");
          this.back();
        } else {
        }
      }

    },
    submit: async function() {
      const user = localStorage.getItem("user");
      const fundDetails = localStorage.getItem("fundApplication");
      const fundApplID = JSON.parse(fundDetails).FUND_APPL_ID;
      var statusAppl = null;
      if (JSON.parse(fundDetails).TS_PARAM != null){
        statusAppl = JSON.parse(fundDetails).TS_PARAM;
      }
      const data = new FormData();
      data.append("FUND_PROFILE_ID", JSON.parse(fundDetails).FUND_PROFILE_ID);
      if (fundApplID != null) {
      data.append("FUND_APPL_ID", fundApplID);
      } else {
      data.append("FUND_APPL_ID", null);
      }
      data.append("DIST_USER_ID", JSON.parse(user).USER_DIST_ID);
      data.append("DIST_USER_GROUP", JSON.parse(user).USER_GROUP_ID);
      data.append("IS_SUBMIT", "2");
      data.append("STATUS", statusAppl);


      if (this.model.status == 1) {
        console.log("Deletion");
        data.append(
          "APP_EFFEC_DATE",
          moment(this.model.effectivedate).format("YYYY-MM-DD") ?? ""
        );
        data.append("APPL_REASON", this.model.mergewith);
        data.append("APPL_TYPE", "DELETION");
        if (confirm("Are you sure to submit?")) {
          const response = await servicesModule5.createFundApplication(data);
          console.log(data);
          alert("Application Has Been Submitted Successfully.");
          this.back();
        } else {
        }
      } else if (this.model.status == 2) {
        console.log("Suspension");
        data.append(
          "APPL_DATE_START",
          moment(this.model.startdate).format("YYYY-MM-DD") ?? ""
        );
        data.append(
          "APPL_DATE_END",
          moment(this.model.enddate).format("YYYY-MM-DD") ?? ""
        );
        data.append("APPL_REASON", this.model.APPL_REASON_SUSPENSION);
        data.append("APPL_TYPE", "SUSPENSION");
        if (this.model.applicationSuppDoc.length != 0) {
          for (let i = 0; i < this.model.applicationSuppDoc.length; i++) {
            data.append("file0[]", this.model.applicationSuppDoc[i]);
          }
        }
        if (confirm("Are you sure to submit?")) {
          const response = await servicesModule5.createFundApplication(data);
          console.log(data);
          alert("Application Has Been Submitted Successfully.");
          this.back();
        } else {
        }
      } else if (this.model.status == 3) {
        console.log("Closure");
        data.append(
          "APP_EFFEC_DATE",
          moment(this.model.effectivedate).format("YYYY-MM-DD") ?? ""
        );
        data.append("APPL_REASON", this.model.APPL_REASON_CLOSURE);
        data.append("APPL_TYPE", "CLOSURE");
        if (this.model.applicationSuppDoc.length != 0) {
          for (let i = 0; i < this.model.applicationSuppDoc.length; i++) {
            data.append("file0[]", this.model.applicationSuppDoc[i]);
          }
        }
        if (confirm("Are you sure to submit?")) {
          const response = await servicesModule5.createFundApplication(data);
          console.log(data);
          alert("Application Has Been Submitted Successfully.");
          this.back();
        } else {
        }
      }
    }
  },

  computed: {},

  data() {
    return {
      getDataFundProfile: "",
      statusLoad: true,
      FUNDPROFILE: "",
      selected: true,
      unselected: false,
      visibleMergewith: false,
      visibleStartDate: false,
      visibleEndDate: false,
      visibleEffectiveDate: false,
      visibleReasonClosure: false,
      visibleReasonSuspension: false,
      visibleSuppDoc: false,
      APPL_REASON: "",
      applicationSuppDoc: "",
      fileRecords: [],
      SUPP_DOC: "",
      model: {
        status: "",
        mergewith: "",
        startdate: "",
        enddate: "",
        effectivedate: "",
        Remark: "",
        documentName: "",
        APPL_REASON: "",
        SUPP_DOC: [],
        applicationSuppDoc:[]
      },
      mergewith: ["Areca Strategic Income 7.0", "Areca Progressive Income 7.0"],
      status: [
        {
          value: "1",
          name: "Deletion"
        },
        {
          value: "2",
          name: "Suspension"
        },
        {
          value: "3",
          name: "Closure"
        }
      ],
      fundlist: ["Wrong Data", "Inaccurate Information"],
      suspensionReason: [
        "Fund Distribution",
        "Unit Split",
        "NAV Recalculate",
        "Fully Redeemed"
      ],
      closureReason: [
        "Fund Matured",
        "Fully Redeemed",
        "Fund Objective Achieved",
        "Restructed",
        "Fund Merger"
      ],
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Uploaded Document",
                accept: ".PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX",
                model: "SUPP_DOC",
                type: "vfg-custom-file-view",
                styleClasses: "col-md-12",
                required: false
              }
            ]
          }
        ]
      },
      applicationtypeschema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                type: "radios",
                label: "Application Type",
                model: "status",
                styleClasses: "ml-1 col-md-12 display-inline",

                values: () => {
                  return this.status;
                },
                required: true,
                validator: "string"
              },
              {
                labels: "Start Date",
                type: "vfg-functional-date",
                placeholder: "DD-MM-YYYY",
                model: "startdate",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                required: false,
                visible: (model, field, form) => {
                  return this.visibleStartDate;
                }
              },
              {
                labels: "End Date",
                type: "vfg-functional-date2",
                model: "enddate",
                placeholder: "DD-MM-YYYY",
                noLabel: true,
                noClearButton: true,
                format: "dd-MM-yyyy",
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEndDate;
                }
              },
              {
                labels: "Effective Date",
                type: "vfg-functional-date",
                model: "effectivedate",
                placeholder: "DD-MM-YYYY",
                format: "dd-MM-yyyy",
                noLabel: true,
                noClearButton: true,
                required: true,
                visible: (model, field, form) => {
                  return this.visibleEffectiveDate;
                }
              },
              {
                type: "vueMultiSelect",
                inputType: "text",
                label: "Reason: ",
                model: "mergewith",
                placeholder: "Select Reason",
                required: true,
                selectOptions: {
                  multiple: false,
                  // key: "name",
                  // label: "name",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.fundlist;
                },
                visible: (model, field, form) => {
                  return this.visibleMergewith;
                }
              },

              {
                type: "vueMultiSelect",
                inputType: "text",
                label: "Reason: ",
                model: "APPL_REASON_CLOSURE",
                placeholder: "Select Reason",
                required: true,
                selectOptions: {
                  multiple: false,
                  // key: "name",
                  // label: "name",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.closureReason;
                },
                visible: (model, field, form) => {
                  return this.visibleReasonClosure;
                }
              },
              {
                type: "vueMultiSelect",
                inputType: "text",
                label: "Reason: ",
                model: "APPL_REASON_SUSPENSION",
                placeholder: "Select Reason",
                required: true,
                selectOptions: {
                  multiple: false,
                  // key: "name",
                  // label: "name",
                  searchable: true
                },
                values: (model, schema) => {
                  return this.suspensionReason;
                },
                visible: (model, field, form) => {
                  return this.visibleReasonSuspension;
                }
              },
              {
                labels: "Supporting Document",
                accept: ".pdf,.doc,.docx",
                multiple: false,
                text: "Choose a File",
                model: "applicationSuppDoc",
                type: "vfg-custom-multiple-file-edit",
                styleClasses: "col-md-12",
                Required: true,
                visible: (model, field, form) => {
                  return this.visibleSuppDoc;
                }
              }
            ]
          }
        ]
      },
      formOptions: {
        validateAfterChanged: false
      }
    };
  }
};
</script>
