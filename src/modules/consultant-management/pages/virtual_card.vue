<template>
    <div class="virtual-card">
        <div class="virtual-card-header">
                <div class="profile-photo">
                    <div v-for="photo in model.PROFILE_PHOTO" :key="photo.docID">
                        <img :src="photo.url" width="130" height="115">
                    </div>
                </div>

                <div class="fimm-info">
                    <div class="fimm-logo">
                        <img :src="fimm_logo" class="fimm-logo">
                    </div>

                    <div class="fimm-details">
                        <h6 class="mb-1 mt-0 header-infos text-center">
                            <b>
                            {{consultantData.CONSULTANT_NAME}}
                            </b>
                        </h6>

                        <h6 class="mb-1 mt-0 header-infos"><b>FIMM NO.: {{consultantData.CONSULTANT_FIMM_NO}}</b></h6>
                        <h6 class="mb-1 mt-0 header-infos"><b>EXPIRY DATE : {{ defaultEndDate }}</b></h6>
                    </div>
                </div>
        </div>

        <div class="virtual-card-body text-center" v-for="(consultant_license, index) in distinctLicenses" :key="consultant_license.CONSULTANT_TYPE_ID">
            <p class="details mb-1">
                <span v-if="consultant_license.CONSULTANT_TYPE_ID==1">UNIT TRUST SCHEME</span>
                <span v-else>PRIVATE RETIREMENT SCHEME</span>
            </p>

            <h6 class="mb-1 mt-0 section-title">{{consultant_license.DIST_NAME}}</h6>
        </div>

        <div class="virtual-card-body text-center" v-if="distinctLicenses.length<2">
            <div v-for="consultant_license in distinctLicenses" :key="consultant_license.CONSULTANT_TYPE_ID">
                <p class="details mb-1">
                    <span v-if="consultant_license.CONSULTANT_TYPE_ID==1">PRIVATE RETIREMENT SCHEME</span>
                    <span v-else>UNIT TRUST SCHEME</span>
                </p>

                <h6 class="mb-1 mt-0 section-title">NOT REGISTERED</h6>
            </div>
        </div>

        <div class="virtual-card-footer text-center">
            <div class="fimm-qr">
                <img :src="fimm_qr" class="fimm-qr-logo">
            </div>

            <small>Last Verification : {{last_verification}}</small>
        </div>
    </div>
</template>

<script>
    import * as services02module2 from "@/app/module2/services02";
    import Vue from "vue";
    import moment from "moment";

    export default {
        props: {
            consultantData: Object,
            consultantApprovalData: Object,
        },

        data(){
            return{
                fimm_logo: require('@/assets/logo/FIMM Logo.png'),
                fimm_qr: require('@/assets/logo/fimm-qr.png'),
                consultantLicenses: [], //storing API Data
                distinctLicenses: [],
                
                model: {
                    PROFILE_PHOTO: [],
                },

                defaultEndDate: moment(new Date(new Date().getFullYear(), 11 + 1, 0)).format("DD MMMM YYYY"), //11 = December
            }
        },

        created(){
            //this.getConsultanData(this.$route.params.id);
            if(this.consultantData){
                this.getProfilePhoto();
                this.getActiveLicenses();
            }
        },

        computed: {
            last_verification() {
                return moment(this.consultantApprovalData.FIMM_LATEST_UPDATE).format("DD MMMM YYYY, h:mm A");
            }
        },

        mounted(){
            //this.getProfilePhoto();
        },

        methods: {
            getConsultanData(id){
                services02module2.getConsultantByID(id)
                .then((response) => {
                    this.consultantData = response;
                });
                // services02module2.findConsultantByUserId(id).then((response) => {
                //     this.consultantData = response;
                // });
            },

            async getActiveLicenses() {
                try {
                const res_distributor = await services02module2.getActiveLicenses(this.consultantData.USER_ID);
                    this.consultantLicenses = res_distributor;

                    const ids = [...new Set(this.consultantLicenses.map(x => x.CONSULTANT_TYPE_ID))];
       
                    const distinctLicenses = ids.map(id => this.consultantLicenses.find(x => x.CONSULTANT_TYPE_ID === id));
                    this.distinctLicenses = distinctLicenses;
                } catch (error) {
                console.log(error);
                }
            },

            getProfilePhoto: async function() {
                const response = await services02module2.getConsultantDocuments(this.consultantData.CONSULTANT_ID, 'CONSULTANT_PROFILE_PHOTO');

                if(response && response.length>=1){
                    response.forEach(el => {
                        el.DOC_BLOB = this.b64toBlobPDF(el.DOC_BLOB, el.DOC_MIMETYPE);

                        el.DOC_BLOB = new File(
                            [el.DOC_BLOB],
                            el.DOC_ORIGINAL_NAME,
                            {
                                type: el.DOC_BLOB.type
                            }
                        );

                        const data = {
                            docID: el.CA_DOCUMENT_ID,
                            name: el.DOC_ORIGINAL_NAME,
                            size: el.DOC_FILESIZE,
                            type: el.DOC_FILETYPE,
                            ext: "exe",
                            url: window.URL.createObjectURL(el.DOC_BLOB)
                        };

                        if(el.TABLE_NAME=='CONSULTANT_PROFILE_PHOTO'){
                            this.model.PROFILE_PHOTO.push(data);
                        }
                    });
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

                return new File(byteArrays, "pot", { type: contentType });
            }
        }
    }
</script>

<style>
    .virtual-card{
        background-color: #fff;
        box-shadow: 0 0 3px;
        height: 472px;
        width: 360px;
        margin: auto;
        padding: 5px; 
    }
    .virtual-card .details{
        font-size: 0.9rem;
        line-height: 16px;
    }
    .virtual-card .section-title{
        font-size: 0.9rem;
    }
    .virtual-card-header{
        border: 1px solid #000;
        padding: 5px;
        background: #f2f2f2;
        height: 226px;
        display: flex;
        align-items: center;
    }
    .virtual-card-header .fimm-info .header-infos{
        font-size: 0.85rem;
        line-height: 20px;
    }
    .virtual-card-body{
        padding: 5px;
        border-bottom: 1px dashed #000;
    }
    .virtual-card-footer {
        padding: 5px;
    }
    .fimm-logo{
        display: block;
        margin: auto;
        width: 125px;
        padding-bottom: 5px;
    }
    .profile-photo{
        width: 130px;
        height: 115px;
        border: 1px solid #000;
        background: #fff;
        margin-right: 10px;
    }
    .fimm-qr-logo{
        width: 94px;
        height: 94px;
    }
    .text-center{
        text-align: center;
    }
    .mb-1{
        margin-bottom: 0.25rem;
    }
    .mb-2{
        margin-bottom: 0.5rem;
    }
</style>