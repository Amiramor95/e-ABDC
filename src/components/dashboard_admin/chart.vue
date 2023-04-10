<template>
             <va-card style="min-height:480px;">
                    <div v-if="this.chartId == '1'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '1'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '1'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '1'">
                            <pie-chart   :data="piechartData" :options="piechartOptions"  class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '1'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '1'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                        <div v-else-if="this.chartType == 'TABLE' && this.chartId == '1'">
                        <table class="table table-totaluser">
                        <tr class="table_header ">
                        <th colspan="4">ACTIVE USER (ONLINE)</th>
                        </tr>
                        <tr class="text_center">
                        <td>FIMM</td>
                        <td>CONSULTANT</td>
                         <td>DISTRIBUTOR</td>
                          <td>OTHERS</td>
                        </tr>
                        <tr class="text_center">
                        <td>{{this.fimm_online}}</td>
                        <td>{{ this.consultant_online }}</td>
                        <td>{{ this.distributor_online }}</td>
                        <td>{{ this.other_online }}</td>
                        </tr>
                        </table>
                        <table class="table table-totaluser">
                          <tr class="table_header">
                          <th colspan="14">TOTAL USER (ONLINE)</th>
                          </tr>
                          <tr class="text_center">
                                <td>YEAR</td>
                                <td>USER GROUP</td>
                                <td>JAN</td>
                                <td>FEB</td>
                                <td>MAR</td>
                                <td>APR</td>
                                <td>MAY</td>
                                <td>JUN</td>
                                <td>JUL</td>
                                <td>AUG</td>
                                <td>SEP</td>
                                <td>OCT</td>
                                <td>NOV</td>
                                <td>DEC</td>
                          </tr>
                            <tr class="text_center"  v-for="(fimm_online, k5) in total_online_fimm" :key="k5">
                              <td class="column_title">{{fimm_online}}</td>
                              <td class="column_title">FIMM</td>
                                    <td>{{ month_total_online_fimm[fimm_online][1] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][2] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][3] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][4] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][5] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][6] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][7] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][8] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][9] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][10] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][11] }}</td>
                                    <td>{{ month_total_online_fimm[fimm_online][12] }}</td>
                          </tr>
                           <tr class="text_center"  v-for="(dist_total_online, k6) in total_online_distributor" :key="k6">
                              <td class="column_title">{{dist_total_online}}</td>
                              <td class="column_title">DISTRIBUTOR</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][1] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][2] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][3] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][4] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][5] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][6] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][7] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][8] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][9] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][10] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][11] }}</td>
                                    <td>{{ month_total_online_distributor[dist_total_online][12] }}</td>
                          </tr>
                           <tr class="text_center"  v-for="(con_total_online, k7) in total_online_consultant" :key="k7">
                              <td class="column_title">{{con_total_online}}</td>
                              <td class="column_title">CONSULTANT</td>
                                    <td>{{ month_total_online_consultant[con_total_online][1] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][2] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][3] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][4] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][5] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][6] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][7] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][8] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][9] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][10] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][11] }}</td>
                                    <td>{{ month_total_online_consultant[con_total_online][12] }}</td>
                          </tr>
                          <tr class="text_center"  v-for="(other_total_online, k7) in total_online_others" :key="k7">
                              <td class="column_title">{{other_total_online}}</td>
                              <td class="column_title">OTHERS</td>
                                    <td>{{ month_total_online_others[other_total_online][1] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][2] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][3] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][4] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][5] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][6] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][7] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][8] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][9] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][10] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][11] }}</td>
                                    <td>{{ month_total_online_others[other_total_online][12] }}</td>
                          </tr>
                        </table>
                          <table class="table table-totaluser table_register">
                          <tr class="table_header">
                          <th colspan="14">TOTAL REGISTERED USER</th>
                          </tr>
                          <tr class="text_center">
                                <td>YEAR</td>
                                <td>USER GROUP</td>
                                <td>JAN</td>
                                <td>FEB</td>
                                <td>MAR</td>
                                <td>APR</td>
                                <td>MAY</td>
                                <td>JUN</td>
                                <td>JUL</td>
                                <td>AUG</td>
                                <td>SEP</td>
                                <td>OCT</td>
                                <td>NOV</td>
                                <td>DEC</td>
                          </tr>
                            <tr class="text_center"  v-for="(fimm_reg, k1) in register_fimm" :key="k1">
                              <td class="column_title">{{fimm_reg}}</td>
                              <td class="column_title">FIMM</td>
                                    <td>{{ month_total_fimm[fimm_reg][1] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][2] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][3] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][4] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][5] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][6] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][7] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][8] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][9] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][10] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][11] }}</td>
                                    <td>{{ month_total_fimm[fimm_reg][12] }}</td>
                          </tr>
                           <tr class="text_center"  v-for="(dist_reg, k2) in register_distributor" :key="k2">
                              <td class="column_title">{{dist_reg}}</td>
                              <td class="column_title">DISTRIBUTOR</td>
                                    <td>{{ month_total_distributor[dist_reg][1] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][2] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][3] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][4] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][5] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][6] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][7] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][8] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][9] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][10] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][11] }}</td>
                                    <td>{{ month_total_distributor[dist_reg][12] }}</td>
                          </tr>
                           <tr class="text_center"  v-for="(con_reg, k3) in register_consultant" :key="k3">
                              <td class="column_title">{{con_reg}}</td>
                              <td class="column_title">CONSULTANT</td>
                                    <td>{{ month_total_consultant[con_reg][1] }}</td>
                                    <td>{{ month_total_consultant[con_reg][2] }}</td>
                                    <td>{{ month_total_consultant[con_reg][3] }}</td>
                                    <td>{{ month_total_consultant[con_reg][4] }}</td>
                                    <td>{{ month_total_consultant[con_reg][5] }}</td>
                                    <td>{{ month_total_consultant[con_reg][6] }}</td>
                                    <td>{{ month_total_consultant[con_reg][7] }}</td>
                                    <td>{{ month_total_consultant[con_reg][8] }}</td>
                                    <td>{{ month_total_consultant[con_reg][9] }}</td>
                                    <td>{{ month_total_consultant[con_reg][10] }}</td>
                                    <td>{{ month_total_consultant[con_reg][11] }}</td>
                                    <td>{{ month_total_consultant[con_reg][12] }}</td>
                          </tr>
                          <tr class="text_center"  v-for="(other_reg, k4) in register_other" :key="k4">
                              <td class="column_title">{{other_reg}}</td>
                              <td class="column_title">OTHERS</td>
                                    <td>{{ month_total_other[other_reg][1] }}</td>
                                    <td>{{ month_total_other[other_reg][2] }}</td>
                                    <td>{{ month_total_other[other_reg][3] }}</td>
                                    <td>{{ month_total_other[other_reg][4] }}</td>
                                    <td>{{ month_total_other[other_reg][5] }}</td>
                                    <td>{{ month_total_other[other_reg][6] }}</td>
                                    <td>{{ month_total_other[other_reg][7] }}</td>
                                    <td>{{ month_total_other[other_reg][8] }}</td>
                                    <td>{{ month_total_other[other_reg][9] }}</td>
                                    <td>{{ month_total_other[other_reg][10] }}</td>
                                    <td>{{ month_total_other[other_reg][11] }}</td>
                                    <td>{{ month_total_other[other_reg][12] }}</td>
                          </tr>
                        </table>
                        </div>
                       <div v-else>
                        </div>
                    </div>
                     <div v-else-if="this.chartId == '2'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '2'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '2'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '2'">
                              <pie-chart  :data="piechartData" :options="piechartOptions" class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '2'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '2'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '2'">
                         <div class="box_container" v-if="this.approvalstatus != ''">
                            <div v-for="(approvalcount, k) in approvalstatus" :key="k" :class="`single_box bgclr-${k}`">
                              <span >{{ approvalcount.total}}</span>
                               <label class="title">{{ approvalcount.TS_PARAM}}</label>
                            </div>
                        </div>
                        <div class="box_container"  v-else>
                          <div class="single_box bgclr-0">
                              <span>0</span>
                               <label class="title">NEW ENTRY</label>
                            </div>
                            <div class="single_box bgclr-1">
                              <span>0</span>
                               <label class="title">REJECTED</label>
                            </div>
                            <div class="single_box bgclr-2">
                              <span>0</span>
                               <label class="title">APPROVED</label>
                            </div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                      </div>
                       <div v-else-if="this.chartType == 'TABLE' && this.chartId == '2'">
                        <table class="table table-totaluser" v-if="this.systemInfo != ''">
                        <tr class="table_header">
                        <th colspan="4">System Uptime, Server Usage, Versioning, System Information</th>
                        </tr>
                        <tr  v-for="(sysinfo, k) in systemInfo" :key="k">
                        <td>{{sysinfo.SYSTEM_MAIN_LABEL }}</td>
                         <td>{{sysinfo.SYSTEM_SUB_LABEL }}</td>
                         <td>{{sysinfo.PARAM_VALUE }}</td>
                        </tr>
                        </table>
                        <table class="table table-totaluser" v-else>
                        <tr class="table_header">
                        <th colspan="4">System Uptime, Server Usage, Versioning, System Information</th>
                        </tr>
                        <tr >
                        <td>SERVER USAGE</td>
                        <td>CPU MEMORY</td>
                        <td>1024 MB</td>
                        </tr>
                        </table>
                         <!-- <div class="header-title">{{ this.chartName}}</div> -->
                       </div>

                       <div v-else>
                        </div>
                    </div>
                     <div v-else-if="this.chartId == '3'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '3'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '3'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '3'">
                             <pie-chart  :data="piechartData" :options="piechartOptions" class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '3'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '3'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '3'">
                        <div class="box_container" v-if="this.totalConsultant != ''">
                            <div v-for="(totalCon, index) in totalConsultant" :key="index" :class="`single_box bgclr-${index}`">
                              <span >{{ totalCon.total}}</span>
                               <label class="title">{{ totalCon.SET_CODE}}</label>
                            </div>
                        </div>
                        <div class="box_container"  v-else>
                          <div class="single_box bgclr-0">
                              <span>0</span>
                               <label class="title">NEW ENTRY</label>
                            </div>
                            <div class="single_box bgclr-1">
                              <span>0</span>
                               <label class="title">REJECTED</label>
                            </div>
                            <div class="single_box bgclr-2">
                              <span>0</span>
                               <label class="title">APPROVED</label>
                            </div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                      </div>
                       <div v-else-if="this.chartType == 'TABLE' && this.chartId == '3'">
                        <table class="table table-totaluser">
                        <tr class="table_header">
                        <th colspan="4">ALERT NOTIFICATION</th>
                        </tr>
                        <tr >
                        <td>In-Active User</td>
                        <td>30</td>
                        </tr>
                        </table>
                         <table class="table table-totaluser">
                          <tr class="table_header">
                          <th colspan="14">DISABLED USER</th>
                          </tr>
                          <tr class="text_center">
                                <td>YEAR</td>
                                <td>USER GROUP</td>
                                <td>JAN</td>
                                <td>FEB</td>
                                <td>MAR</td>
                                <td>APR</td>
                                <td>MAY</td>
                                <td>JUN</td>
                                <td>JUL</td>
                                <td>AUG</td>
                                <td>SEP</td>
                                <td>OCT</td>
                                <td>NOV</td>
                                <td>DEC</td>
                          </tr>
                          <tr class="text_center">
                              <td>2022</td>
                              <td>FIMM</td>
                              <td>1</td>
                              <td>2</td>
                              <td>7</td>
                              <td>4</td>
                              <td>8</td>
                              <td>5</td>
                              <td>1</td>
                              <td>6</td>
                              <td>2</td>
                              <td>4</td>
                              <td>7</td>
                              <td>0</td>
                          </tr>
                        </table>
                        <table class="table table-totaluser">
                              <tr class="table_header">
                              <th colspan="4">DATA TO BE PURGED</th>
                              </tr>
                              <tr >
                              <td>FIMM</td>
                              <td>30</td>
                              </tr>
                              <tr >
                              <td>DISTRIBUTOR</td>
                              <td>10</td>
                              </tr>
                               <tr >
                              <td>CONSULTANT</td>
                              <td>5</td>
                              </tr>
                               <tr >
                              <td>OTHERS</td>
                              <td>15</td>
                              </tr>
                              </table>
                                <table class="table table-totaluser">
                          <tr class="table_header">
                          <th colspan="14">ERROR LOG</th>
                          </tr>
                          <tr class="text_center">
                                <td>YEAR</td>
                                <td>USER GROUP</td>
                                <td>JAN</td>
                                <td>FEB</td>
                                <td>MAR</td>
                                <td>APR</td>
                                <td>MAY</td>
                                <td>JUN</td>
                                <td>JUL</td>
                                <td>AUG</td>
                                <td>SEP</td>
                                <td>OCT</td>
                                <td>NOV</td>
                                <td>DEC</td>
                          </tr>
                          <tr class="text_center">
                              <td>2022</td>
                              <td>FIMM</td>
                              <td>1</td>
                              <td>2</td>
                              <td>7</td>
                              <td>4</td>
                              <td>8</td>
                              <td>5</td>
                              <td>1</td>
                              <td>6</td>
                              <td>2</td>
                              <td>4</td>
                              <td>7</td>
                              <td>0</td>
                          </tr>
                        </table>
                         <!-- <div class="header-title">{{ this.chartName}}</div> -->
                         </div>
                       <div v-else>
                        </div>
                    </div>
                     <div v-else-if="this.chartId == '4'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '4'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '4'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '4'">
                             <pie-chart  :data="piechartData" :options="piechartOptions" class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '4'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '4'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                        <div v-else-if="this.chartType == 'TABLE' && this.chartId == '4'">
                         <table class="table table-totaluser">
                          <tr class="table_header">
                          <th colspan="4">AUTO-RENEWAL</th>
                          </tr>
                           <tr>
                          <td>DATE</td>
                           <td>COUNT</td>
                          </tr>
                          <tr >
                          <td >{{ this.renewal_start_date}}</td>
                           <td>{{ this.renewal_start_count }} Days</td>
                          </tr>
                           <tr>
                          <td>{{ this.renewal_end_date}}</td>
                           <td>{{ this.renewal_end_count }} Days</td>
                          </tr>
                        </table>
                        <table class="table table-totaluser">
                          <tr class="table_header">
                          <th colspan="4">ANNUAL FEE</th>
                          </tr>
                           <tr>
                          <td>DATE</td>
                           <td>COUNT</td>
                          </tr>
                          <tr >
                          <td >{{ this.annual_fee_start_date}}</td>
                           <td>{{ this.annual_fee_start_count }} Days</td>
                          </tr>
                           <tr>
                          <td>{{ this.annual_fee_end_date}}</td>
                           <td>{{ this.annual_fee_end_count }} Days</td>
                          </tr>
                        </table>
                         <table class="table table-totaluser">
                          <tr class="table_header">
                          <th colspan="4">SCHEDULE PREVENTIVE MAINTAINANCE</th>
                          </tr>
                           <tr>
                          <td>DATE</td>
                           <td>COUNT</td>
                          </tr>
                          <tr >
                          <td >{{ this.schedule_start_date}}</td>
                           <td>{{ this.schedule_start_count }} Days</td>
                          </tr>
                           <tr>
                          <td>{{ this.schedule_end_date}}</td>
                           <td>{{ this.schedule_end_count }} Days</td>
                          </tr>
                        </table>
                        <div class="header-title">{{ this.chartName}}</div>
                        </div>
                       <div v-else>
                        </div>
                    </div>
                      <div v-else-if="this.chartId == '5'">
                        <div v-if="this.chartType == 'LINE' && this.chartId == '5'">
                            <line-chart  :data="linechartData" :options="linechartOptions" class="chart_style"></line-chart>
                        </div>
                        <div v-else-if="this.chartType == 'DONUT' && this.chartId == '5'">
                            <donut-chart  :data="donutchartData" :options="donutchartOptions" class="chart_style"></donut-chart>
                        </div>
                        <div v-else-if="this.chartType == 'PIE' && this.chartId == '5'">
                             <pie-chart  :data="piechartData" :options="piechartOptions" class="chart_style"></pie-chart>
                        </div>
                        <div v-else-if="this.chartType == 'BAR' && this.chartId == '5'">
                            <bar-chart  :data="barchartData" :options="barchartOptions" class="chart_style"></bar-chart>
                              <bar-chart  :data="barchartDataBottom" :options="barchartOptions" class="chart_style"></bar-chart>
                        </div>
                        <div v-else-if="this.chartType == 'POLARAREA' && this.chartId == '5'">
                            <area-chart  :data="areachartData" :options="areachartOptions" class="chart_style"></area-chart>
                        </div>
                         <div v-else-if="this.chartType == 'Single-Value' && this.chartId == '5'">
                         <div class="box_container">
                            <div class="single_box bgclr1" v-if="this.pending_data">
                              <span>{{ this.pending_data }} </span>
                               <label class="title">PENDING</label>
                            </div>
                            <div class="single_box bgclr1" v-else>
                              <span>0</span>
                               <label class="title">PENDING</label>
                            </div>
                            <div class="single_box bgclr"  v-if="this.approve_data">
                              <span>{{ this.approve_data }}</span>
                               <label class="title">APPROVED</label>
                            </div>
                             <div class="single_box bgclr"  v-else>
                              <span>0</span>
                               <label class="title">APPROVED</label>
                            </div>
                            <div class="single_box bgclr4" v-if="this.rejected_data">
                              <span >{{this.rejected_data }}</span>
                               <label class="title">RETURN / REJECTED</label>
                            </div>
                             <div class="single_box bgclr4" v-else>
                              <span >0</span>
                               <label class="title">RETURN / REJECTED</label>
                            </div>
                            <div class="header-title">{{ this.chartName}}</div>
                        </div>
                      </div>
                       <div v-else-if="this.chartType == 'TABLE' && this.chartId == '5'">
                       <table class="table table-totaluser">
                          <tr class="table_header">
                          <th colspan="5">Total Number of Users</th>
                          </tr>
                           <tr>
                          <td>IP ADDRESS</td>
                           <td>USER GROUP</td>
                           <td>Total</td>
                          </tr>
                          <tr  v-for="(fmm_ip, k9) in fimm_ip" :key="k9">
                          <td>{{ fmm_ip.IP_ADDRESS}}</td>
                           <td>FIMM</td>
                           <td>{{ fmm_ip.total}}</td>
                          </tr>
                           <tr  v-for="(dist_ip, k10) in distributor_ip" :key="k10">
                          <td>{{ dist_ip.IP_ADDRESS}}</td>
                           <td>DISTRIBUTOR</td>
                           <td>{{ dist_ip.total}}</td>
                          </tr>
                           <tr  v-for="(con_ip, k11) in consultant_ip" :key="k11">
                          <td>{{ con_ip.IP_ADDRESS}}</td>
                           <td>CONSULTANT</td>
                           <td>{{ con_ip.total}}</td>
                          </tr>
                           <tr  v-for="(other_ip, k12) in others_ip" :key="k12">
                          <td>{{ other_ip.IP_ADDRESS}}</td>
                           <td>OTHERS</td>
                           <td>{{ other_ip.total}}</td>
                          </tr>
                        </table>
                       </div>
                       <div v-else>
                        </div>
                    </div>
                      <div v-else-if="this.chartId == '6'">

                    </div>

             </va-card>
</template>
 <script>
 import DonutChart from "./DonutChart.js";
 import PieChart from "./PieChart.js";
 import BarChart from "./BarChart.js";
 import LineChart from "./LineChart.js";
 import AreaChart from "./AreaChart.js";
 import RadarChart from "./RadarChart.js";
 import * as services06Module1 from "../../app/module1/services06";
 import * as servicesModule0 from "../../app/module0/services02";
 import moment from "moment";
 export default {
  name: 'fimm-chart',
   props: ["chartId", "chartName", "chartType","chartView","chartStyle"],
    components: {
         DonutChart,
         PieChart,
         BarChart,
         LineChart,
         AreaChart,
         RadarChart
    },
  mounted(){
    this.userdata = JSON.parse(localStorage.getItem("user"));
    this.getChartSetting();
  },
  data333(){

  },
  data () {
    return {
      chartnumber: 6,
      userdata: {},
      chartlist: [],
      piechartLabel: [],
      piechartDataset: [],
      systemInfo: [],
      totalConsultant: [],
      fimm_online :[],
      consultant_online: [],
      distributor_online: [],
      other_online: [],
      register_fimm: [],
      month_total_fimm: {},
      register_distributor: [],
      month_total_distributor: {},
      register_consultant: [],
      month_total_consultant: {},
      register_other: [],
      month_total_other: {},
      total_online_fimm: [],
      month_total_online_fimm: {},
      total_online_distributor: [],
      month_total_online_distributor:{},
      month_total_online_consultant: {},
      total_online_consultant: [],
      month_total_online_others: {},
      total_online_others:[],
      type_online: {},
      renewal_start_date: "dd-MM-yyyy",
      renewal_start_count: 0,
      renewal_end_date:"dd-MM-yyyy",
      renewal_end_count:0,
      annual_fee_start_date: "dd-MM-yyyy",
      annual_fee_start_count: 0,
      annual_fee_end_date:"dd-MM-yyyy",
      annual_fee_end_count:0,
      schedule_start_date: "dd-MM-yyyy",
      schedule_start_count: 0,
      schedule_end_date:"dd-MM-yyyy",
      schedule_end_count:0,
      fimm_ip: [],
      distributor_ip:[],
      consultant_ip:[],
      others_ip:[],
      //ctx:''
      chartOptions: {
            responsive: true,
            legend: {
            display: false,
            position: 'right',
            },
             title: {
            display: true,
            text: this.chartName,
            position: 'bottom',

        }
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["UTS", "WSF", "PRS", "ETF","WFS","TSE"],
        datasets: [{
            label: "Student A",
            backgroundColor: "rgba(200,0,0,0.2)",
            data: [65, 75, 70, 80, 60, 80]
            }, {
            label: "Student B",
            backgroundColor: "rgba(0,0,200,0.2)",
            data: [54, 65, 60, 70, 70, 75]
         }]
      },
       areachartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
            display: true,
            position: 'right',
            },
             title: {
            display: true,
            text: this.chartName,
            position: 'bottom',
           },
            animation: {
            animateRotate: true,
            animateScale: true
            }

      },
      areachartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["UTS", "WSF", "PRS", "ETF"],
        datasets: [
          {
            //label: "Data One",
            backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
            borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
            borderWidth: 1,
            data: [500,	50,	2424,	14040]
          }
        ]
      },
       linechartOptions: {
           responsive: true,
           maintainAspectRatio: false,
           legend: {
            display: true,
            position: 'bottom',
            },
             title: {
            display: true,
            text: this.chartName,
            position: 'bottom',

        },
        maintainAspectRatio: false,
        pieceLabel: {
       mode: 'percentage',
       // render: 'value',
        precision: 1,
        fontColor: '#fff',
        },

      },
      linechartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            //label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
       barchartOptions: {
            responsive: true,
            legend: {
            display: false,
            position: 'right',
            },
             title: {
            display: true,
            text: this.chartName,
            position: 'bottom',

        }

      },
      barchartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
         labels: ["UTS", "WSF", "PRS", "ETF"],
        datasets: [
          {
            //label: "Data One",
            backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
            data: [1, 10, 5,20]
          }
        ]
      },
       barchartDataBottom: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
         labels: ["UTS", "WSF", "PRS", "ETF"],
        datasets: [
          {
            //label: "Data One",
            backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
            data: [1, 10, 5,20]
          }
        ]
      },
    piechartOptions: {
       tooltips: {
     enabled: true
   },

   //allTooltipsOnce: true,
         responsive: true,
            legend: {
            display: true,
            position: 'right',
            },
            title: {
            display: true,
            text: this.chartName,
            position: 'bottom',
           },
      },
      piechartData: {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: ['Members','Training Providers'], //this.piechartLabel,
          datasets: [{
          label: "Data One",
          backgroundColor:['#1E9600', '#99C802'],
          data: [30,20],//this.piechartDataset
          }]},
      donutchartOptions: {
            tooltip: {
            enabled: false
            },
            responsive: true,
            legend: {
            display: true,
            position: 'right',
            },
            title: {
            display: true,
            text: this.chartName,
            position: 'bottom',
            },
            label:{
             display: true,
            },
            pieceLabel: {
            // mode: 'percentage',
            render: 'value',
            precision: 1,
            fontColor: '#fff',
            },
      },
      donutchartData: {  hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels:["UTMC", "IUTA", "CPRA"],
        datasets: [
          {
            label: "Data Two",
            backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)'],
            data: [50, 300, 100]
          }
        ]}
    }
  },
  methods: {
   getChartSetting: async function() {
        let settingArray = [];
        const userID=this.userdata.user_id;
        const userTYPE=this.userdata.user_type;
        console.log("Chart Data=",this.chartView);
        console.log("Chart Style=",this.chartStyle);
        if(this.chartView == 1){
            const response = await servicesModule0.getAdminChartSetting(userID,userTYPE,this.chartStyle);
            this.fimm_online =response.fimm_online;
            this.consultant_online =response.consultant_online;
            this.distributor_online =response.distributor_online;
            this.other_online =response.other_online;
            // Fimm Register 
             let newData = [];
            newData =  response.fimm_register
            .reduce(function (r, a) {
                r[a.YEAR] = r[a.YEAR] || [];
                r[a.YEAR].push(a);
                return r;
            }, Object.create(null));
            //  console.log("register_fimm=", newData);
            var tableDataStruct = {};

            Object.keys(newData).forEach((v) =>{
              var p = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
              newData[v].forEach((d)=>{
                  console.log(d);
                  p[d.MONTH] = d.total;
              });
              tableDataStruct[v] = p;
            });
           this.register_fimm = Object.keys(tableDataStruct).sort().reverse();
           this.month_total_fimm = tableDataStruct;
            //console.log('tableDataStruct =>', tableDataStruct);
              this.register_fimm.forEach(v =>{
              //console.log(v + ' : Sorted year :' ,tableDataStruct[v]);
            })

            // Distributor Register
            console.log("dist_register=",response.dist_register);
             let newDataDist = [];
            newDataDist =  response.dist_register
            .reduce(function (r1, a1) {
                r1[a1.YEAR] = r1[a1.YEAR] || [];
                r1[a1.YEAR].push(a1);
                return r1;
            }, Object.create(null));
            //  console.log("register_fimm=", newData);
            var tableDataStructDist = {};
            Object.keys(newDataDist).forEach((v1) =>{
              var p1 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
              newDataDist[v1].forEach((d1)=>{
                  p1[d1.MONTH] = d1.total;
              });
              tableDataStructDist[v1] = p1;
            });
           this.register_distributor = Object.keys(tableDataStructDist).sort().reverse();
           this.month_total_distributor = tableDataStructDist;
           // Consultant Register
             let newDataCon = [];
            newDataCon =  response.consultant_register
            .reduce(function (r2, a2) {
                r2[a2.YEAR] = r2[a2.YEAR] || [];
                r2[a2.YEAR].push(a2);
                return r2;
            }, Object.create(null));
            //  console.log("register_fimm=", newData);
            var tableDataStructCon = {};
            Object.keys(newDataCon).forEach((v2) =>{
              var p2 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
              newDataCon[v2].forEach((d2)=>{
                  p2[d2.MONTH] = d2.total;
              });
              tableDataStructCon[v2] = p2;
            });
           this.register_consultant = Object.keys(tableDataStructCon).sort().reverse();
           this.month_total_consultant = tableDataStructCon;
            // Other Register
             let newDataOther = [];
            newDataOther =  response.other_register
            .reduce(function (r3, a3) {
                r3[a3.YEAR] = r3[a3.YEAR] || [];
                r3[a3.YEAR].push(a3);
                return r3;
            }, Object.create(null));
            //  console.log("register_fimm=", newData);
            var tableDataStructOther = {};
            Object.keys(newDataOther).forEach((v3) =>{
              var p3 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
              newDataOther[v3].forEach((d3)=>{
                  p3[d3.MONTH] = d3.total;
              });
              tableDataStructOther[v3] = p3;
            });
           this.register_other = Object.keys(tableDataStructOther).sort().reverse();
           this.month_total_other = tableDataStructOther;

           // Fimm Online
             let newDataOnline = [];
            newDataOnline =  response.total_online_fimm
            .reduce(function (r4, a4) {
                r4[a4.YEAR] = r4[a4.YEAR] || [];
                r4[a4.YEAR].push(a4);
                return r4;
            }, Object.create(null));
            console.log("newDataOnline=", newDataOnline);
            var tableDataStructOnline = {};
            Object.keys(newDataOnline).forEach((v4) =>{
              var p4 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
              newDataOnline[v4].forEach((d4)=>{
                  p4[d4.MONTH] = d4.total;
                  //p4[d4.USER_TYPE] = d4.USER_TYPE;
              });
              tableDataStructOnline[v4] = p4;
            });
           this.total_online_fimm = Object.keys(tableDataStructOnline).sort().reverse();
           this.month_total_online_fimm = tableDataStructOnline;
           // Distributor Online
             let newDataOnlineDist = [];
            newDataOnlineDist =  response.total_online_dist
            .reduce(function (r5, a5) {
                r5[a5.YEAR] = r5[a5.YEAR] || [];
                r5[a5.YEAR].push(a5);
                return r5;
            }, Object.create(null));
            var tableDataStructOnlineDist = {};
            Object.keys(newDataOnlineDist).forEach((v5) =>{
              var p5 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
              newDataOnlineDist[v5].forEach((d5)=>{
                  p5[d5.MONTH] = d5.total;
                  //p4[d4.USER_TYPE] = d4.USER_TYPE;
              });
              tableDataStructOnlineDist[v5] = p5;
            });
           this.total_online_distributor = Object.keys(tableDataStructOnlineDist).sort().reverse();
           this.month_total_online_distributor = tableDataStructOnlineDist;

            // Consultant Online
             let newDataOnlineCon = [];
            newDataOnlineCon =  response.total_online_con
            .reduce(function (r6, a6) {
                r6[a6.YEAR] = r6[a6.YEAR] || [];
                r6[a6.YEAR].push(a6);
                return r6;
            }, Object.create(null));
            var tableDataStructOnlineCon = {};
            Object.keys(newDataOnlineCon).forEach((v6) =>{
              var p6 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
              newDataOnlineCon[v6].forEach((d6)=>{
                  p6[d6.MONTH] = d6.total;
                  //p4[d4.USER_TYPE] = d4.USER_TYPE;
              });
              tableDataStructOnlineCon[v6] = p6;
            });
           this.total_online_consultant = Object.keys(tableDataStructOnlineCon).sort().reverse();
           this.month_total_online_consultant = tableDataStructOnlineCon;
            // Others Online
             let newDataOnlineOther = [];
            newDataOnlineOther =  response.total_online_other
            .reduce(function (r7, a7) {
                r7[a7.YEAR] = r7[a7.YEAR] || [];
                r7[a7.YEAR].push(a7);
                return r7;
            }, Object.create(null));
            var tableDataStructOnlineOther = {};
            Object.keys(newDataOnlineOther).forEach((v7) =>{
              var p7 = {1:0 , 2:0, 3:0, 4: 0, 5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
              newDataOnlineOther[v7].forEach((d7)=>{
                  p7[d7.MONTH] = d7.total;
                  //p4[d4.USER_TYPE] = d4.USER_TYPE;
              });
              tableDataStructOnlineOther[v7] = p7;
            });
           this.total_online_others = Object.keys(tableDataStructOnlineOther).sort().reverse();
           this.month_total_online_others = tableDataStructOnlineOther;
         }
          if(this.chartView == 2){
            const response2 = await servicesModule0.getAdminChartSettingtwo(userID,userTYPE,this.chartStyle);
            this.systemInfo =response2;
         }
          if(this.chartView == 3){
            const response3 = await servicesModule0.getCasChartSettingthree(userID,userTYPE,this.chartStyle);
            this.totalConsultant = response3;
            let dstthree=[];
            let lblthree=[];
            lblthree = ['Distributor Submitted or Approved','Training Provider Submitted or Approved','Distributor Pending','Training Provider Pending'];
            dstthree.push(response3.distributor_submit_data);
            dstthree.push(response3.provide_submit_data);
            dstthree.push(response3.distributor_pending_data);
            dstthree.push(response3.provide_pending_data); //= [response.distributor_data, response.training_provider];
           // console.log("piechartDataset =",dstwo);
            if(this.chartType == 'PIE'){
              this.piechartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblthree, //this.piechartLabel,
                datasets: [{
                  label: "Data One",
                  backgroundColor:['#1E9600', '#99C802',"#6073D5","#EC307C"],
                  data: dstthree,//this.piechartDataset
                }]
              };
            }
            if(this.chartType == 'DONUT'){
              this.donutchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets: [
              {
              label: "Data Two",
              backgroundColor: [ 'rgb(255, 99, 132)','rgb(54, 162, 235)',"#6073D5","#EC307C"],
              data: dstthree
              }]
              };
            }
            if(this.chartType == 'LINE'){
              this.linechartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: "#f87979",
                data: dstthree
              }
              ]
              };
            }
            if(this.chartType == 'BAR'){
              dstthree.push(0);
              this.barchartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets: [
              {
              //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF","#6073D5","#EC307C"],
                data: dstthree
              }
              ]
              };
            }
            if(this.chartType == 'POLARAREA'){
              this.areachartData = {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: lblthree,
              datasets: [
              {
                //label: "Data One",
                backgroundColor: ["#0EDBB4", "#00D3FF", "#EC307C", "#6073D5"],
                borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
                borderWidth: 1,
                data: dstthree
              }
              ]
              };
            }
            if(this.chartType == 'RADAR'){
              this.chartData = {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: lblthree,
                datasets: [{
                label: "Distributor",
                backgroundColor: "rgba(200,0,0,0.2)",
                data: [response3.distributor_submit_data,response3.distributor_pending_data]
                },
                {
                label: "Training Provider",
                backgroundColor: "rgba(0,0,200,0.2)",
                data: [response3.provide_submit_data,response3.provide_pending_data]
                },
                ]
              };
            }
           // this.ctx = document.getElementById("pie-chart").getContext('2d');
            // console.log("ctx=",ctx);
       // this.chartlist = response;
         }
          if(this.chartView == 4){
            const response4 = await servicesModule0.getAdminChartSettingfour(userID,userTYPE,this.chartStyle);
            this.renewal_start_date = response4.renewal_start_date;
            this.renewal_start_count = response4.renewal_start_count;
            this.renewal_end_date = response4.renewal_end_date;
            this.renewal_end_count = response4.renewal_end_count;
            this.annual_fee_start_date = response4.annual_fee_start_date;
            this.annual_fee_start_count = response4.annual_fee_start_count;
            this.annual_fee_end_date = response4.annual_fee_end_date;
            this.annual_fee_end_count = response4.annual_fee_end_count;
            this.schedule_start_date = response4.schedule_start_date;
            this.schedule_start_count = response4.schedule_start_count;
            this.schedule_end_date = response4.schedule_end_date;
            this.schedule_end_count = response4.schedule_end_count;

         }
           if(this.chartView == 5){
             const response5 = await servicesModule0.getAdminChartSettingfive(userID,userTYPE,this.chartStyle);
             this.fimm_ip = response5.fimm_data;
             this.distributor_ip = response5.dist_data;
             this.consultant_ip = response5.con_data;
             this.others_ip = response5.other_data;
           }
    },
  },
 }
 </script>