/* eslint-disable no-unused-expressions */
<template>
  <va-card>
      <vudal name="simpleModalEditColor" class="widthModal">
      <div class="header">Edit Colour Codes<i class="close icon">&times;</i></div>
      <div class="content">
             <div class="row status-row">
            <span class="label-field"><label>Theme Name : <span class="star">*</span></label></span>
              <input type="text" class="form-control color-input-theme" v-model="model.THEME_NAME"  required  />
          </div>
          <div class="input-group color-picker row" ref="colorpickerEdit">
            <div class="color-input-div">
              <span class="label-field"><label>Theme Active Color : <span class="star">*</span></label>&nbsp;&nbsp;&nbsp;</span>
              <input type="text" class="form-control color-input" v-model="model.THEME_ACTIVE_COLOR" @focus="showPickerEdit()" @input="updateFromInputEdit" required  readonly/>

              <span class="input-group-addon color-picker-container">
              <span class="current-color" :style="'background-color: ' + model.THEME_ACTIVE_COLOR" @click="togglePickerEdit()"></span>
              <chrome-picker :value="colorsEdit" @input="updateFromPickerEdit" v-if="displayPickerEdit" />
              </span>
            </div>
          </div>
           <div class="input-group color-picker row" ref="colorpickerPassiveEdit">
            <div class="color-input-div">
              <span class="label-field"><label>Theme Passive Color : <span class="star">*</span></label></span>
              <input type="text" class="form-control color-input" v-model="model.THEME_PASSIVE_COLOR" @focus="showPickerPassiveEdit()" @input="updateFromInputPassiveEdit" required  readonly/>

              <span class="input-group-addon color-picker-container">
              <span class="current-color" :style="'background-color: ' + model.THEME_PASSIVE_COLOR" @click="togglePickerPassiveEdit()"></span>
              <chrome-picker :value="colorsPassiveEdit" @input="updateFromPickerPassiveEdit" v-if="displayPickerPassiveEdit" />
              </span>
            </div>
          </div>
           <div class="input-group color-picker row" ref="colorpickerTextEdit">
            <div class="color-input-div">
              <span class="label-field"><label>Theme Text Color : <span class="star">*</span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input type="text" class="form-control color-input" v-model="model.THEME_TEXT_COLOR" @focus="showPickerTextEdit()" @input="updateFromInputTextEdit" required  readonly/>

              <span class="input-group-addon color-picker-container">
              <span class="current-color" :style="'background-color: ' + model.THEME_TEXT_COLOR" @click="togglePickerTextEdit()"></span>
              <chrome-picker :value="colorsTextEdit" @input="updateFromPickerTextEdit" v-if="displayPickerTextEdit" />
              </span>
            </div>
          </div>

          <div class="row status-row">
            <span class="label-field"><label>Status: <span class="star">*</span></label></span>
              <select name="csourse" v-model="model.COLORSTATUS" id="COLORSTATUS" class="form-control color-input-status" required>
              <option value="ACTIVE" selected>Active</option>
              <option value="INACTIVE">In-Active</option>
              </select>
          </div>
      </div>
      <div class="actions">
        <button
          type="button"
          value="PUT"
          class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md"
        >
          <i class="fa fa-times" /> &nbsp; Close
        </button>
        <button
          type="button"
            @click="updateColurAPI()"
          class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md"
        >
          <i class="fa fa-edit" /> &nbsp; Update
        </button>
      </div>
    </vudal>
    <h4 slot="header" class="card-title"> <i class="fa fa-cog"></i>&nbsp;&nbsp;COLOUR TEMPLATE SETTINGS</h4>
    <br />
    <div>
      <!-- <div class="content"> -->
      <div>
        <div class="ml-5">
          <br />
          <form @submit.prevent="submitColour">
             <div class="row status-row">
            <span class="label-field"><label>Theme Name : <span class="star">*</span></label></span>
              <input type="text" class="form-control color-input-theme" v-model="THEME_NAME"  required  />
          </div>
          <div class="input-group color-picker row" ref="colorpicker">
            <div class="color-input-div">
              <span class="label-field"><label>Theme Active Color : <span class="star">*</span></label>&nbsp;&nbsp;&nbsp;</span>
              <input type="text" class="form-control color-input" v-model="THEME_ACTIVE_COLOR" @focus="showPicker()" @input="updateFromInput" required  readonly/>

              <span class="input-group-addon color-picker-container">
              <span class="current-color" :style="'background-color: ' + THEME_ACTIVE_COLOR" @click="togglePicker()"></span>
              <chrome-picker :value="colors" @input="updateFromPicker" v-if="displayPicker" />
              </span>
            </div>
          </div>
           <div class="input-group color-picker row" ref="colorpickerPassive">
            <div class="color-input-div">
              <span class="label-field"><label>Theme Passive Color : <span class="star">*</span></label></span>
              <input type="text" class="form-control color-input" v-model="THEME_PASSIVE_COLOR" @focus="showPickerPassive()" @input="updateFromInputPassive" required  readonly/>

              <span class="input-group-addon color-picker-container">
              <span class="current-color" :style="'background-color: ' + THEME_PASSIVE_COLOR" @click="togglePickerPassive()"></span>
              <chrome-picker :value="colorsPassive" @input="updateFromPickerPassive" v-if="displayPickerPassive" />
              </span>
            </div>
          </div>
           <div class="input-group color-picker row" ref="colorpickerText">
            <div class="color-input-div">
              <span class="label-field"><label>Theme Text Color : <span class="star">*</span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input type="text" class="form-control color-input" v-model="THEME_TEXT_COLOR" @focus="showPickerText()" @input="updateFromInputText" required  readonly/>

              <span class="input-group-addon color-picker-container">
              <span class="current-color" :style="'background-color: ' + THEME_TEXT_COLOR" @click="togglePickerText()"></span>
              <chrome-picker :value="colorsText" @input="updateFromPickerText" v-if="displayPickerText" />
              </span>
            </div>
          </div>

          <div class="row status-row">
            <span class="label-field"><label>Status: <span class="star">*</span></label></span>
              <select name="csourse" v-model="COLORSTATUS" id="COLORSTATUS" class="form-control color-input-status" required>
              <option value="ACTIVE" selected>Active</option>
              <option value="INACTIVE">In-Active</option>
              </select>
          </div>


       <!--  <photoshop-picker v-model="colors" /> -->
        <!--  <vue-form-generator
            :model="model"
            :schema="Tab1Schema"
            :options="formOptions"
            ref="Tab1Form"
          >
          </vue-form-generator> -->
          <br />
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-warning btn-fill btn-md"
            >
              <i class="fa fa-plus" /> &nbsp; SAVE
            </button>
          </div>
          <br />
          </form>
          <br />
          <h4>LIST OF COLOUR TEMPLATE SETTINGS</h4>
          <!-- list -->
            <div class="float-right">
              <va-input
              :value="term"
              :placeholder="$t('Search')"
              @input="searchColor"
              removable
              >
              <va-icon name="fa fa-search" slot="prepend" />
              </va-input>
              </div>
        <br>
        <br>
        <br>
          <va-card class="mt-2">
            <va-data-table
              :fields="Colourfields"
              :data="filteredDataColour"
              :per-page="parseInt(perPage)"
              :datacount="colourCount"
              :dataperpage="parseInt(perPage)"
            clickable>
              <template slot="no" slot-scope="row">
                {{ row.rowIndex + 1 }}
              </template>

              <template slot="actions" slot-scope="props">
                <h4 class="mt-2">
                  <span class="badge badge-primary mr-1" title="Set Default Theme" v-on:click="setDefaultColourCode(props.rowData)">
                    <i class="fa fa-cog"></i></span>
                    <span
                    class="badge badge-primary mr-1"
                    v-on:click="editColourCode(props.rowData)"
                  >
                    <i class="fa fa-edit"></i
                  ></span>
                    
                  <span class="badge badge-danger mr-1" title="Delete" v-on:click="deleteColourCode(props.rowData)">
                    <i class="fa fa-trash"></i></span>
                </h4>
              </template>
            </va-data-table>
            <br />
            <!-- <div class="float-left">
              <button
                type="button"
                class="btn btn-primary btn-fill btn-md"
              >
                <i class="fa fa-upload" /> &nbsp; Bulk Upload
              </button>
            </div> -->
          </va-card>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </va-card>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-form-generator/dist/vfg.css'
import Vudal from 'vudal'
import * as servicesModule0 from "../../../app/module0/services02"
import Tabs from 'vue-tabs-with-active-line'
import { debounce } from "lodash";
import { Photoshop,Chrome } from 'vue-color'


export default {

  mounted() {
    this.getAllColorSetting()
    //  this.color = this.defaultColor;
     // this.selectedColor = this.color;
     // this.canvas = document.getElementById("canvas");
    // this.setColor(this.color || '#000000');
    this.setColor(this.color || '#000000');
    this.setColorPassive(this.color || '#000000');
    this.setColorText(this.color || '#000000');

  },
  watch: {
		THEME_ACTIVE_COLOR(val) {
			if(val) {
				this.updateColors(val);
				this.$emit('input', val);
				//document.body.style.background = val;
			}
		},
  	THEME_PASSIVE_COLOR(val) {
			if(val) {
				this.updateColorsPassive(val);
				this.$emit('input', val);
				//document.body.style.background = val;
			}
		},
    	THEME_TEXT_COLOR(val) {
			if(val) {
				this.updateColorsText(val);
				this.$emit('input', val);
				//document.body.style.background = val;
			}
		}
	},
  components: {
    Tabs,
    Vudal,
     'photoshop-picker': Photoshop,
     'chrome-picker': Chrome,
  },

  computed: {
    Colourfields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:no',
          title: 'No',
        },
        {
          name: 'THEME_NAME',
          title: 'THEME NAME',
        },
         {
          name: 'THEME_ACTIVE_COLOR',
          title: 'THEME ACTIVE COLOR',
        },
         {
          name: 'THEME_PASSIVE_COLOR',
          title: 'THEME PASSIVE COLOR',
        },
        {
          name: 'THEME_TEXT_COLOR',
          title: 'THEME TEXT COLOR',
        },
        {
          name: 'SET_DEFAULT',
          title: 'DEFAULT THEME',
        },
        {
          name: '__slot:actions',
          title: 'Action',
          dataClass: 'justify-content-center',
          width: '15%',
        },
      ]
    },
    filteredDataColour() {
      if (!this.term || this.term.length < 1) {
        return this.colurList
      }

      return this.colurList.filter((item) => {
        return this.term
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.THEME_NAME.toLowerCase().includes(v)
          );
      });
    },
  },

  data () {
    return {
      term: null,
      perPage: '10',
      colurList: [],
      colourCount: null,
      count: 1,
        colors: {
				hex: '#000000',
			},
       colorsEdit: {
				hex: '',
			},
       colorsPassive: {
				hex: '#000000',
			},
       colorsPassiveEdit: {
				hex: '',
			},
       colorsText: {
				hex: '#000000',
			},
       colorsTextEdit: {
				hex: '',
			},
      THEME_NAME: '',
			THEME_ACTIVE_COLOR: '',
      THEME_PASSIVE_COLOR: '',
      THEME_TEXT_COLOR: '',
      COLOUR_SETTING_ID: '',
      COLORSTATUS: 'ACTIVE',
			displayPicker: false,
      displayPickerEdit: false,
      displayPickerPassive: false,
      displayPickerText: false,
      displayPickerPassiveEdit: false,
      displayPickerTextEdit: false,

      model: {
        // TAB 1
      THEME_NAME: '',
      THEME_ACTIVE_COLOR: '',
      THEME_PASSIVE_COLOR: '',
      THEME_TEXT_COLOR: '',
      COLOUR_SETTING_ID: '',
      COLORSTATUS: '',
      },

      formOptions: {
        validateAfterChanged: true,
      },
    }
  },

  methods: {
    handleClick (newTab) { this.currentTab = newTab }, // end tab
    setColor(color) {
			this.updateColors(color);
			this.THEME_ACTIVE_COLOR = color;
		},
    
     setColorPassive(color) {
			this.updateColorsPassive(color);
			this.THEME_PASSIVE_COLOR = color;
		},
     setColorText(color) {
			this.updateColorsText(color);
			this.THEME_TEXT_COLOR = color;
		},
		updateColors(color) {
			if(color.slice(0, 1) == '#') {
				this.colors = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colors = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
    	updateColorsEdit(color) {
			if(color.slice(0, 1) == '#') {
				this.colorsEdit = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colorsEdit = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
    	updateColorsPassive(color) {
			if(color.slice(0, 1) == '#') {
				this.colorsPassive = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colorsPassive = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
    updateColorsPassiveEdit(color) {
			if(color.slice(0, 1) == '#') {
				this.colorsPassiveEdit = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colorsPassiveEdit = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
    updateColorsText(color) {
			if(color.slice(0, 1) == '#') {
				this.colorsText = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colorsText = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
     updateColorsTextEdit(color) {
			if(color.slice(0, 1) == '#') {
				this.colorsTextEdit = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colorsTextEdit = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
		showPicker() {
			document.addEventListener('click', this.documentClick);
			this.displayPicker = true;
		},
    showPickerEdit() {
			document.addEventListener('click', this.documentClickEdit);
			this.displayPickerEdit = true;
		},
    showPickerPassive() {
			document.addEventListener('click', this.documentClickPassive);
			this.displayPickerPassive = true;
		},
     showPickerPassiveEdit() {
			document.addEventListener('click', this.documentClickPassiveEdit);
			this.displayPickerPassiveEdit = true;
		},
    showPickerText() {
			document.addEventListener('click', this.documentClickText);
			this.displayPickerText = true;
		},
    showPickerTextEdit() {
			document.addEventListener('click', this.documentClickTextEdit);
			this.displayPickerTextEdit = true;
		},
		hidePicker() {
			document.removeEventListener('click', this.documentClick);
			this.displayPicker = false;
		},
    hidePickerEdit() {
			document.removeEventListener('click', this.documentClickEdit);
			this.displayPickerEdit = false;
		},
    hidePickerPassive() {
			document.removeEventListener('click', this.documentClickPassive);
			this.displayPickerPassive = false;
		},
     hidePickerPassiveEdit() {
			document.removeEventListener('click', this.documentClickPassiveEdit);
			this.displayPickerPassiveEdit = false;
		},
     hidePickerText() {
			document.removeEventListener('click', this.documentClickText);
			this.displayPickerText = false;
		},
     hidePickerTextEdit() {
			document.removeEventListener('click', this.documentClickTextEdit);
			this.displayPickerTextEdit = false;
		},
		togglePicker() {
			this.displayPicker ? this.hidePicker() : this.showPicker();
		},
    togglePickerEdit() {
			this.displayPickerEdit ? this.hidePickerEdit() : this.showPickerEdit();
		},
    togglePickerPassive() {
			this.displayPickerPassive ? this.hidePickerPassive() : this.showPickerPassive();
		},
    togglePickerPassiveEdit() {
			this.displayPickerPassiveEdit ? this.hidePickerPassiveEdit() : this.showPickerPassiveEdit();
		},
    togglePickerText() {
			this.displayPickerText ? this.hidePickerText() : this.showPickerText();
		},
     togglePickerTextEdit() {
			this.displayPickerTextEdit ? this.hidePickerTextEdit() : this.showPickerTextEdit();
		},
		updateFromInput() {
			this.updateColors(this.THEME_ACTIVE_COLOR);
		},
    	updateFromInputEdit() {
			this.updateColorsEdit(this.model.THEME_ACTIVE_COLOR);
		},
    updateFromInputPassive() {
			this.updateColorsPassive(this.THEME_PASSIVE_COLOR);
		},
     updateFromInputPassiveEdit() {
			this.updateColorsPassiveEdit(this.model.THEME_PASSIVE_COLOR);
		},
    updateFromInputText() {
			this.updateColorsText(this.THEME_TEXT_COLOR);
		},
     updateFromInputTextEdit() {
			this.updateColorsTextEdit(this.model.THEME_TEXT_COLOR);
		},
		updateFromPicker(color) {
			this.colors = color;
			if(color.rgba.a == 1) {
				this.THEME_ACTIVE_COLOR = color.hex;
			}
			else {
				this.THEME_ACTIVE_COLOR = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
    updateFromPickerEdit(color) {
			this.colorsEdit = color;
			if(color.rgba.a == 1) {
				this.model.THEME_ACTIVE_COLOR = color.hex;
			}
			else {
				this.model.THEME_ACTIVE_COLOR = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
    updateFromPickerPassive(color) {
			this.colorsPassive = color;
			if(color.rgba.a == 1) {
				this.THEME_PASSIVE_COLOR = color.hex;
			}
			else {
				this.THEME_PASSIVE_COLOR = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
     updateFromPickerPassiveEdit(color) {
			this.colorsPassiveEdit = color;
			if(color.rgba.a == 1) {
				this.model.THEME_PASSIVE_COLOR = color.hex;
			}
			else {
				this.model.THEME_PASSIVE_COLOR = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
     updateFromPickerText(color) {
			this.colorsText = color;
			if(color.rgba.a == 1) {
				this.THEME_TEXT_COLOR = color.hex;
			}
			else {
				this.THEME_TEXT_COLOR = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
     updateFromPickerTextEdit(color) {
			this.colorsTextEdit = color;
			if(color.rgba.a == 1) {
				this.model.THEME_TEXT_COLOR = color.hex;
			}
			else {
				this.model.THEME_TEXT_COLOR = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
		documentClick(e) {
			var el = this.$refs.colorpicker,
				target = e.target;
			if(el !== target && !el.contains(target)) {
				this.hidePicker()
			}
		},
    	documentClickEdit(e) {
			var el = this.$refs.colorpickerEdit,
				target = e.target;
			if(el !== target && !el.contains(target)) {
				this.hidePickerEdit()
			}
		},
    	documentClickPassive(e) {
			var el = this.$refs.colorpickerPassive,
				target = e.target;
			if(el !== target && !el.contains(target)) {
				this.hidePickerPassive()
			}
		},
    	documentClickPassiveEdit(e) {
			var el = this.$refs.colorpickerPassiveEdit,
				target = e.target;
			if(el !== target && !el.contains(target)) {
				this.hidePickerPassiveEdit()
			}
		},
    	documentClickText(e) {
			var el = this.$refs.colorpickerText,
				target = e.target;
			if(el !== target && !el.contains(target)) {
				this.hidePickerText()
			}
		},
    	documentClickTextEdit(e) {
			var el = this.$refs.colorpickerTextEdit,
				target = e.target;
			if(el !== target && !el.contains(target)) {
				this.hidePickerTextEdit()
			}
		},


    getAllColorSetting: async function() {
    const response = await servicesModule0.getAllColor();
    this.colurList = response;
    this.colourCount = this.colurList.length;
    },

    async submitColour() {
       // if (this.$refs.Tab1Form.validate()) {
            const data = new FormData()
            data.append('THEME_NAME', this.THEME_NAME)
            data.append('THEME_ACTIVE_COLOR', this.THEME_ACTIVE_COLOR)
            data.append('THEME_PASSIVE_COLOR', this.THEME_PASSIVE_COLOR)
            data.append('THEME_TEXT_COLOR', this.THEME_TEXT_COLOR)
            data.append('COLORSTATUS', this.COLORSTATUS)
            try {
              // eslint-disable-next-line no-unused-vars
              const response = await servicesModule0.createColorSetting(data)
              this.getAllColorSetting()
              this.THEME_NAME='';
              this.THEME_ACTIVE_COLOR='#000000';
              this.THEME_PASSIVE_COLOR='#000000';
              this.THEME_TEXT_COLOR='#000000';
            } catch (error) {
              console.log(error)
            }
       // }
    },

    async deleteColourCode(data) {
      if (confirm("Are you sure you want to delete?")) {
    // eslint-disable-next-line no-unused-vars
    const response = await servicesModule0.deleteColourCode(data.COLOUR_SETTING_ID)
    this.getAllColorSetting()
      }
    },
     async setDefaultColourCode(data) {
      if (confirm("Do you want to Set Default it?")) {
    // eslint-disable-next-line no-unused-vars
    const response = await servicesModule0.setDefaultColourCode(data.COLOUR_SETTING_ID)
    this.getAllColorSetting();
     location.reload();
      }
    },

    async editColourCode(data) {
    const response = await servicesModule0.getColourById(data.COLOUR_SETTING_ID)
    this.$modals.simpleModalEditColor.$show()
    this.COLOUR_SETTING_ID = response.COLOUR_SETTING_ID
    this.model = response
    },

    async updateColurAPI() {
       console.log("Update");
          const data = new FormData()
          data.append('COLOUR_SETTING_ID', this.COLOUR_SETTING_ID)
          data.append('THEME_NAME', this.model.THEME_NAME)
          data.append('THEME_ACTIVE_COLOR', this.model.THEME_ACTIVE_COLOR)
          data.append('THEME_PASSIVE_COLOR', this.model.THEME_PASSIVE_COLOR)
          data.append('THEME_TEXT_COLOR', this.model.THEME_TEXT_COLOR)
          data.append('COLORSTATUS', this.model.COLORSTATUS)
           try {
          const response = await servicesModule0.updateColourCode(data)
          this.getAllColorSetting()
        } catch (error) {
          console.log(error)
        }
    },
    searchColor: debounce(function (term) {
      this.term = term;
      console.log(this.term);
    }, 400),
}


}
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

.content {
  margin-top: 30px;
  font-size: 20px;
}

.inline {
  display: inline-flex;
  float: right;
}
.col-md-12 .field-wrap{
 display: inline-flex;
  float: right;
  width: 80%;
}
.vc-chrome {
	position: absolute;
//	top: 10px;
	left: 25%;
	z-index: 20;
}
.current-color {
	display: inline-block;
	width: 20px;
	height: 20px;
	background-color: #000;
	cursor: pointer;
  margin-left: 10px;
}
.color-input{
  width: 10%;
  display: inline !important;
  margin-left: 50px;
  margin-top: 20px !important;
}
.star{
  color: red;
}
.label-field{
  width: 15% !important;
}
.status-row{
  margin-top: 20px !important;
  margin-left: -5px;
}
.color-input-status{
  width: 10%;
 // display: inline !important;
  margin-left: -5px;
}
.color-input-theme{
  width: 20%;
  display: inline !important;
  margin-left: -5px;
}
.color-input-div .label-field{
   width: 15% !important;
}
.vudal{
width: 950px !important;
}
.vudal .label-field{
  width: 25% !important;
}
.vudal .status-row{
   margin-top: 5px !important;
  //margin-left: -5px;
}
.vudal .color-input-theme{
  width: 30%;
  display: inline !important;
  margin-left: -5px;
}
.vudal .color-input{
  width: 15%;
  display: inline !important;
  margin-left: 50px;
  margin-top: 20px !important;
}
.vudal .color-input-status{
  width: 15%;
 // display: inline !important;
  margin-left: -5px;
}
</style>


