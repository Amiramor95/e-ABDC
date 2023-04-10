<template>
  <div class="card-body">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h4 slot="header">System Settings</h4>
      </div>
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5><i class="fa fa-lock"></i>&nbsp;&nbsp; <b>Login & Security</b></h5>
        <hr />

        <div class="ml-5">
          <div>
            <span>Login Attempt</span>
            <button
              v-if="visibleLogin == false"
              v-b-toggle.collapse-1
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleLogin == true"
              v-b-toggle.collapse-1
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse v-model="visibleLogin" class="mt-4" id="collapse-1">
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description"
                          >No. Of Invalid Sign-On Allowed</span
                        >
                        <input
                          type="number"
                          placeholder="0"
                          class=" float-right col-5 form-control form-control-md"
                        />
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div>
          <div>
            <span>System Block Duration</span>
            <button
              v-if="visibleBlockDuration == false"
              v-b-toggle.collapse-2
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleBlockDuration == true"
              v-b-toggle.collapse-2
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              class="mt-4"
              id="collapse-2"
              v-model="visibleBlockDuration"
            >
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description"
                          >Duration (days)</span
                        >
                        <input
                          type="number"
                          placeholder="0"
                          class=" float-right col-7 form-control form-control-md"
                        />
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div>
          <div>
            <span>Idle Session Timeout</span>
            <button
              v-if="visibleSessionTimeout == false"
              v-b-toggle.collapse-3
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleSessionTimeout == true"
              v-b-toggle.collapse-3
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-3"
              class="mt-4"
              v-model="visibleSessionTimeout"
            >
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description"
                          >Duration (minutes)</span
                        >
                        <input
                          type="number"
                          placeholder="0"
                          class=" float-right col-7 form-control form-control-md"
                        />
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>
      <!-- 2 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5><i class="fa fa-key"></i>&nbsp;&nbsp;<b> Password </b></h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>Password Characteristic</span>
            <button
              v-if="visiblePassCharacter == false"
              v-b-toggle.collapse-4
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visiblePassCharacter == true"
              v-b-toggle.collapse-4
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-4"
              class="mt-4"
              v-model="visiblePassCharacter"
            >
              <va-card>
                <br />
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="selectedMinLength"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Minimum Password Length</span
                          >
                          <input
                            :disabled="this.selectedMinLength == false"
                            v-model="passwordSetting.MIN_LENGTH"
                            type="number"
                            placeholder="0"
                            class="col-2 form-control form-control-md"
                          />
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="selectedMaxLength"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Maximum Password Length</span
                          >
                          <input
                            :disabled="this.selectedMaxLength == false"
                            v-model="passwordSetting.MAX_LENGTH"
                            type="number"
                            placeholder="0"
                            class="col-2 form-control form-control-md"
                          />
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="passwordSetting.UPPERCASE_LOWERCASE"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Uppercase and Lowercase Letters</span
                          >
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="passwordSetting.ALPHANUMERIC"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Alphanumeric</span
                          >
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="passwordSetting.SPECIAL_CHARACTERS"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Special Characters , e.g., ! @ # ? ]</span
                          >
                        </div>
                      </div>
                      <br />
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      @click="setPasswordSetting"
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </va-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <span>Password History</span>
            <button
              v-if="visiblePassHistory == false"
              v-b-toggle.collapse-5
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visiblePassHistory == true"
              v-b-toggle.collapse-5
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-5"
              class="mt-4"
              v-model="visiblePassHistory"
            >
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description">History Limit</span>
                        <input
                          type="number"
                          placeholder="0"
                          class=" float-right col-7 form-control form-control-md"
                        />
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <span>Default Password</span>
            <button
              v-if="visibleDefaultPass == false"
              v-b-toggle.collapse-6
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleDefaultPass == true"
              v-b-toggle.collapse-6
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-6"
              class="mt-4"
              v-model="visibleDefaultPass"
            >
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description"
                          >Set default password value</span
                        >
                        <input
                          type="number"
                          placeholder="0"
                          class=" float-right col-5 form-control form-control-md"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="ml-5 col-md-12">
                        <div class="row mb-1">
                          <base-checkbox class="col-1"></base-checkbox>
                          <span class="col mt-2 description"
                            >System Generate</span
                          >
                        </div>
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>

      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5><i class="fa fa-lock"></i>&nbsp;&nbsp; <b>User Id</b></h5>
        <hr />

        <div class="ml-5">
          <div>
            <span>User Id Characteristic</span>
            <button
              v-if="visibleUserId == false"
              v-b-toggle.collapse-29
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleUserId == true"
              v-b-toggle.collapse-29
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse v-model="visibleUserId" class="mt-4" id="collapse-29">
              <va-card>
                <br />
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="selectedMinLength"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Minimum User Id Length</span
                          >
                          <input
                            :disabled="this.selectedMinLength == false"
                            v-model="userIdSetting.MIN_LENGTH"
                            type="number"
                            placeholder="0"
                            class="col-2 form-control form-control-md"
                          />
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="selectedMaxLength"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Maximum User Id Length</span
                          >
                          <input
                            :disabled="this.selectedMaxLength == false"
                            v-model="userIdSetting.MAX_LENGTH"
                            type="number"
                            placeholder="0"
                            class="col-2 form-control form-control-md"
                          />
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="userIdSetting.UPPERCASE_LOWERCASE"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Uppercase and Lowercase Letters</span
                          >
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="userIdSetting.ALPHANUMERIC"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Alphanumeric</span
                          >
                        </div>
                        <div class="row mb-1">
                          <va-checkbox
                            class="col-2"
                            v-model="userIdSetting.SPECIAL_CHARACTERS"
                          ></va-checkbox>
                          <span class="col mt-2 description">
                            Required Special Characters , e.g., ! @ # ? ]</span
                          >
                        </div>
                      </div>
                      <br />
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      @click="setUserIdSetting"
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </va-card>
            </b-collapse>
            <hr />
          </div>
          <!-- <div>
            <span>System Block Duration</span>
            <button
              v-if="visibleBlockDuration == false"
              v-b-toggle.collapse-2
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleBlockDuration == true"
              v-b-toggle.collapse-2
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              class="mt-4"
              id="collapse-2"
              v-model="visibleBlockDuration"
            >
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description"
                          >Duration (days)</span
                        >
                        <input
                          type="number"
                          placeholder="0"
                          class=" float-right col-7 form-control form-control-md"
                        />
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div> -->
          <!-- <div>
            <span>Idle Session Timeout</span>
            <button
              v-if="visibleSessionTimeout == false"
              v-b-toggle.collapse-3
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleSessionTimeout == true"
              v-b-toggle.collapse-3
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-3"
              class="mt-4"
              v-model="visibleSessionTimeout"
            >
              <b-card>
                <tr>
                  <td colspan="2">
                    <div class="row">
                      <div class="ml-4 col-md-12">
                        <span class="col mt-1 description"
                          >Duration (minutes)</span
                        >
                        <input
                          type="number"
                          placeholder="0"
                          class=" float-right col-7 form-control form-control-md"
                        />
                      </div>
                      <br />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      type="submit"
                      class="ml-2 float-left btn btn-primary btn-fill btn-md"
                    >
                      <i class="fa fa-save" />&nbsp; save
                    </button>
                  </td>
                </tr>
              </b-card>
            </b-collapse>
            <hr />
          </div> -->
        </div>
      </va-card>
      <!-- 3 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-users"></i>&nbsp;&nbsp;
          <b>Screen Management & Access Control</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>Division, Department, Group and Authorization Level</span>

            <button
              @click="groupManagement"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>

            <hr />
          </div>
          <div>
            <span>Screen Management</span>
            <button
              v-if="visibleScreenMgmt == false"
              v-b-toggle.collapse-8
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleScreenMgmt == true"
              v-b-toggle.collapse-8
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-8"
              class="mt-4"
              v-model="visibleScreenMgmt"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <span> User Matrix</span>
            <button
              v-if="visibleRolesnMatrix == false"
              v-b-toggle.collapse-9
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleRolesnMatrix == true"
              v-b-toggle.collapse-9
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-9"
              class="mt-4"
              v-model="visibleRolesnMatrix"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <span>Approval Level</span>
            <button
              @click="approvalLevel"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
        </div>
      </va-card>
      <!-- 9 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-sitemap"></i>&nbsp;&nbsp;
          <b>Other Access Setup</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>Distributor Screen Management & Roles</span>
            <button
              v-if="visibleScreenMgmtnRole == false"
              v-b-toggle.collapse-12
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleScreenMgmtnRole == true"
              v-b-toggle.collapse-12
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-12"
              class="mt-4"
              v-model="visibleScreenMgmtnRole"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <span>Consultant Screen Management</span>
            <button
              v-if="visibleConsScreenMgmtnRole == false"
              v-b-toggle.collapse-13
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleConsScreenMgmtnRole == true"
              v-b-toggle.collapse-13
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-13"
              class="mt-4"
              v-model="visibleConsScreenMgmtnRole"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <span>3rd Party Screen Management & Roles</span>
            <button
              v-if="visible3rdPartyMgmtnRole == false"
              v-b-toggle.collapse-14
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visible3rdPartyMgmtnRole == true"
              v-b-toggle.collapse-14
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-14"
              class="mt-4"
              v-model="visible3rdPartyMgmtnRole"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <span>Training Provider Screen Management & Roles</span>
            <button
              v-if="visibleTraiProvMgmtnRole == false"
              v-b-toggle.collapse-15
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleTraiProvMgmtnRole == true"
              v-b-toggle.collapse-15
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-15"
              class="mt-4"
              v-model="visibleTraiProvMgmtnRole"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>
      <!-- 4 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5><i class="fa fa-exchange"></i>&nbsp;&nbsp; <b>Integration</b></h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>LDAP-Active Directory</span>
            <button
              @click.prevent="ldapConfiguration"
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleLdapActiveDir == true"
              v-b-toggle.collapse-16
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse
              id="collapse-16"
              class="mt-4"
              v-model="visibleLdapActiveDir"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <span>Email Notification</span>
            <button
              @click.prevent="emailNotification"
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>

          <div>
            <span>SMS Notification</span>
            <button
              v-if="visibleSMSNoty == false"
              v-b-toggle.collapse-18
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleSMSNoty == true"
              v-b-toggle.collapse-18
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse id="collapse-18" class="mt-4" v-model="visibleSMSNoty">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>
      <!-- 10 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-map-o"></i>&nbsp;&nbsp; <b>Address Management</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>Set up the address here</span>
            <button
              @click="addressManagement"
              type="button"
              class="float-right btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <hr />
          </div>
        </div>
      </va-card>
      <!-- 5 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-calendar"></i>&nbsp;&nbsp;
          <b>Calendar Management</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <span>Set your calendar here</span>
            <button
              v-if="visibleCalendar == false"
              v-b-toggle.collapse-20
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              v-if="visibleCalendar == true"
              v-b-toggle.collapse-20
              type="button"
              class="float-right  btn-fill btn-md"
            >
              <i class="fa fa-times"></i>
            </button>
            <b-collapse id="collapse-20" class="mt-4" v-model="visibleCalendar">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>
      <!-- 6 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-bullhorn"></i>&nbsp;&nbsp;
          <b>Announcement Management</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Registration Department</span>
              </div>
              <div class="col">
                <toggle-button
                  v-model="dataToggle"
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  @click="eventManagement"
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <!-- <button
                  v-b-toggle.collapse-21
                  type="button"
                  class="float-right btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button> -->
              </div>
            </div>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Legal & Regulatory Affairs</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleLegalnRegAffair == false"
                  v-b-toggle.collapse-22
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleLegalnRegAffair == true"
                  v-b-toggle.collapse-22
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-22"
              class="mt-4"
              v-model="visibleLegalnRegAffair"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>
          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Supervision</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleSupervision == false"
                  v-b-toggle.collapse-23
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleSupervision == true"
                  v-b-toggle.collapse-23
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-23"
              class="mt-4"
              v-model="visibleSupervision"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Industry Development</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleIndustriDev == false"
                  v-b-toggle.collapse-24
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleIndustriDev == true"
                  v-b-toggle.collapse-24
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-24"
              class="mt-4"
              v-model="visibleIndustriDev"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Professional Development</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleProfDev == false"
                  v-b-toggle.collapse-25
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleProfDev == true"
                  v-b-toggle.collapse-25
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse id="collapse-25" class="mt-4" v-model="visibleProfDev">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Research & Analytics</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleResearchnAnalytic == false"
                  v-b-toggle.collapse-26
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleResearchnAnalytic == true"
                  v-b-toggle.collapse-26
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-26"
              class="mt-4"
              v-model="visibleResearchnAnalytic"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>IT Project Management System & Method</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleITMgmt == false"
                  v-b-toggle.collapse-27
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleITMgmt == true"
                  v-b-toggle.collapse-27
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse id="collapse-27" class="mt-4" v-model="visibleITMgmt">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Finance</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleFinance == false"
                  v-b-toggle.collapse-28
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleFinance == true"
                  v-b-toggle.collapse-28
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse id="collapse-28" class="mt-4" v-model="visibleFinance">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>
      <!-- 7 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-bell-o"></i>&nbsp;&nbsp;
          <b>Circular Management</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Registration Department</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleRegDep == false"
                  v-b-toggle.collapse-21
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleRegDep == true"
                  v-b-toggle.collapse-21
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse id="collapse-21" class="mt-4" v-model="visibleRegDep">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Legal & Regulatory Affairs</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleLegalnRegAffair == false"
                  v-b-toggle.collapse-22
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleLegalnRegAffair == true"
                  v-b-toggle.collapse-22
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-22"
              class="mt-4"
              v-model="visibleLegalnRegAffair"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>
          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Supervision</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleSupervision == false"
                  v-b-toggle.collapse-23
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleSupervision == true"
                  v-b-toggle.collapse-23
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-23"
              class="mt-4"
              v-model="visibleSupervision"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Industry Development</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleIndustriDev == false"
                  v-b-toggle.collapse-24
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleIndustriDev == true"
                  v-b-toggle.collapse-24
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-24"
              class="mt-4"
              v-model="visibleIndustriDev"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Professional Development</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleProfDev == false"
                  v-b-toggle.collapse-25
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleProfDev == true"
                  v-b-toggle.collapse-25
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse id="collapse-25" class="mt-4" v-model="visibleProfDev">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Research & Analytics</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleResearchnAnalytic == false"
                  v-b-toggle.collapse-26
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleResearchnAnalytic == true"
                  v-b-toggle.collapse-26
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-26"
              class="mt-4"
              v-model="visibleResearchnAnalytic"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>IT Project Management System & Method</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleITMgmt == false"
                  v-b-toggle.collapse-27
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleITMgmt == true"
                  v-b-toggle.collapse-27
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse id="collapse-27" class="mt-4" v-model="visibleITMgmt">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Finance</span>
              </div>
              <div class="col">
                <toggle-button
                  :value="true"
                  :labels="{ checked: 'ON', uncheked: 'What now?' }"
                />
              </div>
              <div class="col">
                <button
                  v-if="visibleFinance == false"
                  v-b-toggle.collapse-28
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  v-if="visibleFinance == true"
                  v-b-toggle.collapse-28
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <b-collapse id="collapse-28" class="mt-4" v-model="visibleFinance">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>
      <!-- 8 -->
      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-file-o"></i>&nbsp;&nbsp;
          <b>Document & Form Template</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Upload your form template here</span>
              </div>
              <div class="col">
                <button
                  @click="uploadFormTemplate"
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-33"
              class="mt-4"
              v-model="visibleUploadFormTemp"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>

          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Set up your required document upload here</span>
              </div>
              <div class="col">
                <button
                  @click="addRequiredDoc"
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
              </div>
            </div>
            <b-collapse id="collapse-34" class="mt-4" v-model="visibleReqDoc">
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>

      <va-card class=" ml-4 col-lg-10 my-1 px-1">
        <h5>
          <i class="fa fa-cogs"></i>&nbsp;&nbsp;
          <b>Page Maintenance Management</b>
        </h5>
        <hr />
        <div class="ml-5">
          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Setup your page maintenance here</span>
              </div>

              <div class="col">
                <button
                  @click.prevent="settingPageMaintenance"
                  type="button"
                  class="float-right  btn-fill btn-md"
                >
                  <i class="fa fa-edit"></i>
                </button>
              </div>
            </div>
            <b-collapse
              id="collapse-33"
              class="mt-4"
              v-model="visibleUploadFormTemp"
            >
              <b-card> </b-card>
            </b-collapse>
            <hr />
          </div>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import "vue-form-generator/dist/vfg.css";
import Spacing from "../../components/ui/spacing/Spacing.vue";
import * as services06Module0 from "../../app/module0/services06";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Spacing },
  mounted() {
    this.getPasswordSetting();
    this.getUserIdSetting();
  },
  watch: {
    selectedMinLength: function(val) {
      if (val == false) {
        this.passwordSetting.MIN_LENGTH = 0;
      }
    },
    selectedMaxLength: function(val) {
      if (val == false) {
        this.passwordSetting.MAX_LENGTH = 0;
      }
    }
  },
  // DATA SCHEMA
  data() {
    return {
      passwordSetting: {
        SETTING_PASSWORD_ID: null,
        MIN_LENGTH: 0,
        MAX_LENGTH: 0,
        UPPERCASE_LOWERCASE: false,
        ALPHANUMERIC: false,
        SPECIAL_CHARACTERS: false,
        updatePasswordSetting: false
      },
      selectedMinLength: false,
      selectedMaxLength: false,

      userIdSetting: {
        SETTING_USERID_ID: null,
        MIN_LENGTH: 0,
        MAX_LENGTH: 0,
        UPPERCASE_LOWERCASE: false,
        ALPHANUMERIC: false,
        SPECIAL_CHARACTERS: false,
        updateUseridSetting: false
      },

      dataToggle: true,
      visibleLogin: false,
      visibleUserId: false,
      visibleBlockDuration: false,
      visibleSessionTimeout: false,
      visiblePassCharacter: false,
      visiblePassHistory: false,
      visibleDefaultPass: false,
      visibleDivDepPos: false,
      visibleScreenMgmt: false,
      visibleRolesnMatrix: false,
      visibleScreenMgmtnRole: false,
      visibleConsScreenMgmtnRole: false,
      visible3rdPartyMgmtnRole: false,
      visibleTraiProvMgmtnRole: false,
      visibleLdapActiveDir: false,
      visibleEmailNoty: false,
      visibleSMSNoty: false,
      visibleAddrHere: false,
      visibleCalendar: false,
      visibleRegDep: false,
      visibleLegalnRegAffair: false,
      visibleSupervision: false,
      visibleIndustriDev: false,
      visibleProfDev: false,
      visibleResearchnAnalytic: false,
      visiblelegalnRegAffairs: false,
      visibleUploadFormTemp: false,
      visibleReqDoc: false,
      visibleFinance: false,
      visibleITMgmt: false
    };
  },
  methods: {
    eventManagement() {
      this.$router.push("/fimm/event-list");
    },
    settingPageMaintenance() {
      this.$router.push("/fimm/setting-pageMaintenanceList");
    },
    addRequiredDoc() {
      this.$router.push("/fimm/setting-required-document");
    },
    uploadFormTemplate() {
      this.$router.push("/fimm/template-setting");
    },
    emaiNotification() {
      this.$router.push("/fimm/email-notification");
    },
    ldapConfiguration() {
      this.$router.push("/fimm/ldap-configuration");
    },
    groupManagement() {
      this.$router.push("/fimm/group-management");
    },
    approvalLevel() {
      this.$router.push("/fimm/approval-mainList");
    },
    addressManagement() {
      this.$router.push("/fimm/address-management");
    },
    async setPasswordSetting() {
      const data = new FormData();
      data.append(
        "SETTING_PASSWORD_ID",
        this.passwordSetting.SETTING_PASSWORD_ID
      );
      data.append("MIN_LENGTH", this.passwordSetting.MIN_LENGTH);
      data.append("MAX_LENGTH", this.passwordSetting.MAX_LENGTH);
      data.append(
        "UPPERCASE_LOWERCASE",
        this.passwordSetting.UPPERCASE_LOWERCASE
      );
      data.append("ALPHANUMERIC", this.passwordSetting.ALPHANUMERIC);
      data.append(
        "SPECIAL_CHARACTERS",
        this.passwordSetting.SPECIAL_CHARACTERS
      );

      if (this.passwordSetting.updatePasswordSetting == false) {
        const response = await services06Module0.setPasswordSetting(data);
      } else {
        data.append("_method", "PUT");
        const response = await services06Module0.updatePasswordSetting(data);
        this.$toasts.success("This is my favorite toasts plugin.", {
          // width: "400px",
          // position: "bottom-right",
          // padding: "1rem"
        });
      }
    },

    async setUserIdSetting() {
      const data = new FormData();
      data.append("SETTING_USERID_ID", this.userIdSetting.SETTING_USERID_ID);
      data.append("MIN_LENGTH", this.userIdSetting.MIN_LENGTH);
      data.append("MAX_LENGTH", this.userIdSetting.MAX_LENGTH);
      data.append(
        "UPPERCASE_LOWERCASE",
        this.userIdSetting.UPPERCASE_LOWERCASE
      );
      data.append("ALPHANUMERIC", this.userIdSetting.ALPHANUMERIC);
      data.append("SPECIAL_CHARACTERS", this.userIdSetting.SPECIAL_CHARACTERS);
      if (this.passwordSetting.updateUseridSetting == false) {
        const response = await services06Module0.setUserIdSetting(data);
      } else {
        data.append("_method", "PUT");
        const response = await services06Module0.updateUseridSetting(data);
        this.$toasts.success("This is my favorite toasts plugin.", {
          // width: "400px",
          // position: "bottom-right",
          // padding: "1rem"
        });
      }
    },

    async getUserIdSetting() {
      const response = await services06Module0.getUserIdSetting(1);
      if (response != null) {
        this.userIdSetting = response;
        // alert(JSON.stringify(this.userIdSetting));
        this.userIdSetting.updateUseridSetting = true;
        response.MIN_LENGTH != null
          ? (this.selectedMinLength = true)
          : (this.selectedMinLength = false);
        response.MAX_LENGTH != null
          ? (this.selectedMaxLength = true)
          : (this.selectedMaxLength = false);
      } else {
        this.passwordSetting.updateUseridSetting = false;
      }
    },

    async getPasswordSetting() {
      const response = await services06Module0.getPasswordSetting(1);
      if (response != null) {
        this.passwordSetting = response;
        this.passwordSetting.updatePasswordSetting = true;
        response.MIN_LENGTH != null
          ? (this.selectedMinLength = true)
          : (this.selectedMinLength = false);
        response.MAX_LENGTH != null
          ? (this.selectedMaxLength = true)
          : (this.selectedMaxLength = false);
      } else {
        this.passwordSetting.updatePasswordSetting = false;
      }
    }
  }
};
</script>

<style lang="scss">
.app-layout__main {
  background: #e8e8e8;
}
</style>
