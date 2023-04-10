<template>
<va-card>

    {{selected}}
    
    <va-data-table
        :fields="RecordFields"
        :data="RecordFilteredData"
        selectable
        itemKey="FUND_PROFILE_ID"
        value="selected"
        show-select
        clickable
      >
      <template slot="actions" slot-scope="props">
              <va-checkbox
                @change="checkBox"
                class="col-2"
                v-model="props.rowData.selected"
              />
            </template>
      </va-data-table>

</va-card>
  
</template>

<script>
  export default {

    data () {
      return {

    selected:[],

       RecordFilteredData :[{"FUND_PROFILE_ID":2408,"FUND_NAME":"PHILLIP MASTER EQUITY GROWTH","FUND_CODE_FIMM":"04301","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2410,"FUND_NAME":"PHILLIP MASTER MONEY MARKET","FUND_CODE_FIMM":"04302","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2413,"FUND_NAME":"PHILLIP MASTER ISLAMIC CASH","FUND_CODE_FIMM":"04304","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2414,"FUND_NAME":"PHILLIP PREMIER","FUND_CODE_FIMM":"04305","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2415,"FUND_NAME":"PHILLIP PEARL","FUND_CODE_FIMM":"04306","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2416,"FUND_NAME":"PHILLIP DANA AMAN","FUND_CODE_FIMM":"04307","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2417,"FUND_NAME":"PHILLIP RECOVERY","FUND_CODE_FIMM":"04308","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2418,"FUND_NAME":"PHILLIP INCOME","FUND_CODE_FIMM":"04309","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2419,"FUND_NAME":"PHILLIP DANA MURNI","FUND_CODE_FIMM":"04310","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2420,"FUND_NAME":"PHILLIP SELECT BALANCE","FUND_CODE_FIMM":"04311","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2421,"FUND_NAME":"PHILLIP SELECT INCOME","FUND_CODE_FIMM":"04312","FUND_ASEAN_CIS":"UTF"},
       {"FUND_PROFILE_ID":2422,"FUND_NAME":"PHILLIP DIVIDEND","FUND_CODE_FIMM":"04313","FUND_ASEAN_CIS":"UTF"}]
      }
    },

    methods:{

        checkBox() {
    //   alert("here");
      console.log(this.selected);
      if (document.getElementById("checkboxId_" + id).checked) {
        this.checkboxArray.push(screenId);
      } else {
        const indexToRemove = this.checkboxArray.indexOf(screenId);
        if (indexToRemove > -1) {
          this.checkboxArray.splice(indexToRemove, 1);
        }
      }
    },
        

    },

     computed: {
    RecordFields() {
      return [
        {
          name: "__checkbox",
          titleClass: "center aligned",
          dataClass: "center aligned",
        },   
        {
          name: "FUND_CODE_FIMM",
          title: "FIMM FUND CODE",
          sortField: "FUND_CODE_FIMM",
        },
        {
          name: "FUND_NAME",
          title: "FUND NAME",
          sortField: "FUND_NAME",
        },
        {
          name: "FUND_ASEAN_CIS",
          title: "CIS STRUCTURE",
          sortField: "FUND_ASEAN_CIS",
        },
      ];
    },}
  }
</script>