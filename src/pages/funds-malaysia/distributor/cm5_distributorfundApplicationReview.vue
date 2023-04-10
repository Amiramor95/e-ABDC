/* eslint-disable eqeqeq */
<template>
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
        <br />
        <div class="col-12">
          <va-card>
            <br />
            <div>
              <h4 slot="header" class="card-title">
                Fund Deletion/Suspension/Closure Application Details
              </h4>
              <br />
              <br />
              <div>
                <table class="table table-responsive table-borderless">
                  <tbody>
                    <tr>
                      <td style="width: 10%">
                        <b>Application Type</b>
                      </td>
                      <td style="width: 1%">
                        :
                      </td>
                      <td>{{ FUNDPROFILE.APPL_TYPE }}</td>
                    </tr>
                    <tr v-if="FUNDPROFILE.APPL_TYPE != 'SUSPENSION'">
                      <td style="width: 10%">
                        <b>Effective Date</b>
                      </td>
                      <td style="width: 1%">
                        :
                      </td>
                      <td>{{ FUNDPROFILE.APP_EFFEC_DATE }}</td>
                    </tr>

                    <tr v-if="FUNDPROFILE.APPL_TYPE == 'SUSPENSION'">
                      <td style="width: 10%">
                        <b>Start Date</b>
                      </td>
                      <td style="width: 1%">
                        :
                      </td>
                      <td>{{ FUNDPROFILE.DATE_START }}</td>
                    </tr>

                    <tr v-if="FUNDPROFILE.APPL_TYPE == 'SUSPENSION'">
                      <td style="width: 10%">
                        <b>End Date</b>
                      </td>
                      <td style="width: 1%">
                        :
                      </td>
                      <td>{{ FUNDPROFILE.DATE_END }}</td>
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
                    <tr v-if="FUNDPROFILE.APPL_TYPE != 'SUSPENSION'">
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
                <div v-if="FUNDPROFILE.APPL_TYPE != 'DELETION'">
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
              <br />
              <br />
              <div v-if="FUNDPROFILE.TS_ID_FM == 15 || FUNDPROFILE.TS_ID_FM == null ">
                <vue-form-generator
                  :model="model"
                  :schema="applicationtypeschema"
                  :options="formOptions"
                  @model-updated="onModelUpdated"
                  ref="statusForm"
                >
                </vue-form-generator>
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
            <div class="float-right" v-if="FUNDPROFILE.TS_ID_FM == 15 || FUNDPROFILE.TS_ID_FM == null">
              <button
                type="submit"
                class="mr-2 btn btn-warning btn-fill btn-md"
                @click.once="rtrn"
              >
                <i class="fa fa-reply" /> &nbsp; Return
              </button>
              <button
                @click.once="reject"
                type="button"
                class="mr-2 btn btn-danger btn-fill btn-md"
              >
                <i class="fa fa-ban" /> &nbsp; Reject
              </button>
              <button
                @click.once="approval"
                type="button"
                class="ml-1 btn btn-success btn-fill btn-md"
              >
                <i class="fa fa-paper-plane" /> &nbsp; Approve
              </button>
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "vue-form-generator/dist/vfg.css";
import * as services06Module0 from "../../../app/module0/services06";
import * as servicesModule5 from "../../../app/module5/services03";
import moment from "moment";
export default {
  props: {
    FUNDPROFILE: {}
  },

  mounted() {
    var data = localStorage.getItem("fund_ApplicationFMReview");
    this.FUNDPROFILE = JSON.parse(data);
    console.log('my data',this.FUNDPROFILE);
    this.getFundProfile();
    this.getSuppDoc();
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
    gethAllFundProfile: async function() {
      const response = await servicesModule5.getAllFundProfile();
      this.getAllFundProfile = response;
    },
    getFundProfile: async function () {
      const FPData = localStorage.getItem("fund_ApplicationFMReview");
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
      const FPData = localStorage.getItem("fund_ApplicationFMReview");
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
        this.SUPP_DOC = element.DOCU_BLOB;
        this.model.SUPP_DOC.push(data);
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

    handleClick(newTab) {
      this.currentTab = newTab;
    }, // end tab
    saveAsDraft() {},
    validatestatusForm() {
      return this.$refs.ReviewRemark.validate();
    },

    validateEntryForm() {
      return this.$refs.ReviewRemark.validate();
    },
    onModelUpdated(newVal, schema) {
      console.log(newVal);
      // eslint-disable-next-line eqeqeq
      if (schema == "status" && newVal == "1") {
        this.visibleMergewith = true;
        this.visibleStartDate = false;
        this.visibleEndDate = false;
        this.visibleEffectiveDate = true;
        // eslint-disable-next-line eqeqeq
      } else if (schema == "status" && newVal == "2") {
        this.visibleMergewith = false;
        this.visibleStartDate = true;
        this.visibleEndDate = true;
        this.visibleEffectiveDate = false;
        // eslint-disable-next-line eqeqeq
      } else if (schema == "status" && newVal == "3") {
        this.visibleMergewith = false;
        this.visibleStartDate = false;
        this.visibleEndDate = false;
        this.visibleEffectiveDate = true;
      }
    },
    reject: async function() {
      const data = new FormData();
      const user = localStorage.getItem("user");
      const FPData = localStorage.getItem("fund_ApplicationFMReview");
      data.append("FUND_APPL_ID", JSON.parse(FPData).FUND_APPL_ID);
      data.append("FUND_PROFILE_ID", JSON.parse(FPData).FUND_PROFILE_ID);
      data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);

      data.append("APPL_TYPE", JSON.parse(FPData).APPL_TYPE);

      data.append("APPR_REMARK", this.model.REMARKS_COMMENTS);
      data.append("APPR_PUBLISH_STATUS", "1");
      data.append("TS_ID", "5");
      data.append("CREATE_BY", JSON.parse(user).user_id);
      const approvalLevel = await services06Module0.getApprovalLevel(6, 1);
      data.append("APPR_LIST", JSON.stringify(approvalLevel));
      try {
        if (confirm("Are you sure to reject this application?")) {
          const response = await servicesModule5.updateApprovalFundApplication(
            data
          );
          alert("Data has been submitted successfully");
          this.$router.push("/distributor/fund_ApplicationFMList");
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    },
    rtrn: async function() {
      const data = new FormData();
      const user = localStorage.getItem("user");
      const FPData = localStorage.getItem("fund_ApplicationFMReview");
      data.append("FUND_APPL_ID", JSON.parse(FPData).FUND_APPL_ID);
      data.append("FUND_PROFILE_ID", JSON.parse(FPData).FUND_PROFILE_ID);
      data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);

      data.append("APPL_TYPE", JSON.parse(FPData).APPL_TYPE);

      data.append("APPR_REMARK", this.model.REMARKS_COMMENTS);
      data.append("APPR_PUBLISH_STATUS", "1");
      data.append("TS_ID", "9");
      data.append("CREATE_BY", JSON.parse(user).user_id);
      const approvalLevel = await services06Module0.getApprovalLevel(6, 1);
      data.append("APPR_LIST", JSON.stringify(approvalLevel));
      try {
        if (confirm("Are you sure to return this application?")) {
          const response = await servicesModule5.updateApprovalFundApplication(
            data
          );
          alert("Data has been submitted successfully");
          this.$router.push("/distributor/fund_ApplicationFMList");
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    },
    approval: async function() {
      const data = new FormData();
      const user = localStorage.getItem("user");
      const FPData = localStorage.getItem("fund_ApplicationFMReview");
      data.append("FUND_APPL_ID", JSON.parse(FPData).FUND_APPL_ID);
      data.append("FUND_PROFILE_ID", JSON.parse(FPData).FUND_PROFILE_ID);
      data.append("DIST_ID", JSON.parse(user).USER_DIST_ID);

      data.append("APPL_TYPE", JSON.parse(FPData).APPL_TYPE);

      data.append("APPR_REMARK", this.model.REMARKS_COMMENTS);
      data.append("APPR_PUBLISH_STATUS", "1");
      data.append("TS_ID", "3");
      data.append("CREATE_BY", JSON.parse(user).user_id);
      const approvalLevel = await services06Module0.getApprovalLevel(6, 1);
      data.append("APPR_LIST", JSON.stringify(approvalLevel));
      try {
        if (confirm("Are you sure to approve this application?")) {
          const response = await servicesModule5.updateApprovalFundApplication(
            data
          );
          alert("Data has been submitted successfully");
          this.$router.push("/distributor/fund_ApplicationFMList");
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  computed: {},

  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      getDataFundProfile: "",
      FUNDPROFILE: "",
      selected: true,
      unselected: false,
      visibleMergewith: false,
      visibleStartDate: false,
      visibleEndDate: false,
      visibleEffectiveDate: false,
      fileRecords: [],
      SUPP_DOC: "",
      model: {
        status: "",
        mergewith: "",
        startdate: "",
        enddate: "",
        effectivedate: "",
        REMARKS_COMMENTS: "",
        SUPP_DOC: [],
        documentName: ""
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
      fundlist: ["Areca Strategic Income 7.0", "Areca Progressive Income 7.0"],
      fileUploadSchema: {
        groups: [
          {
            styleClasses: "row",
            fields: [
              {
                labels: "Uploaded Document",
                accept: ".PNG,.PDF,.XLSX,.XLS,.JPG,.JPEG,.CSV,.DOC,.DOCX",
                multiple: true,
                deletable: false,
                downloadable: false,
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
                type: "textArea",
                required: true,
                rows: 8,
                max: 1000,
                hint: "Maximum characters of 1000",
                label: "Remarks / Comments",
                model: "REMARKS_COMMENTS",
                placeholder: "Enter Remarks or Comments",
                styleClasses: "col-md-12"
              }
            ]
          }
        ]
      },
      formOptions: {
        validateAfterChanged: true
      }
    };
  }
};
</script>
<style lang="scss">
.content i {
  font-style: normal;
}
</style>
