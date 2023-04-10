<template>
        <b-row class="justify-content-md-center">
          <b-col cols="8" align-v="stretch">
                <va-card>
                <va-data-table
                  clickable
                  no-data-label="No data found"
                  :fields="navList"
                  :data="navListFilteredData"
                  :per-page="parseInt(perPage)"
                  :datacount="navListRecordCount"
                  :dataperpage="parseInt(perPage)"
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>
                </va-data-table>
              </va-card>
          </b-col>
          <b-col cols="4" align-v="baseline">
                <va-card>
                  Fund Status Check
                  <!-- <vue-form-generator
                    :model="model"
                    :schema="Schema"
                    ref="Form"
                  >
                  </vue-form-generator> -->
                </va-card>
          </b-col>
        </b-row>
</template>
