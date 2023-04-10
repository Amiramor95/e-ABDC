<template>
    <div class="exam-certificate">
        <div class="paper-size-a4">
            <div class="certificate-header-section">
                <div class="certificate-border-top">
                    <img :src="border_top" class="img-fluid">
                </div>

                <div class="fimm-logo text-center">
                    <img :src="fimm_logo" class="img-fluid">
                </div>

                <div class="certificate-border-bottom">
                    <img :src="border_bottom" class="img-fluid">
                </div>
            </div>

            <div class="certificate-body-section text-center">
                <h1 class="mb-5 mt-3">CERTIFICATE OF EXAMINATION</h1>

                <h5>This is to certify that</h5>
                <h3>AHMAD BIN IBRAHIM</h3>
                <h4 class="mb-5">NRIC: 850709145433</h4>

                <h5>has sat and successfully passed the</h5>
                <h3 class="mb-5">COMPUTERISED UNIT TRUST EXAMINATION <span class="d-block"></span></h3>

                <h5>on</h5>
                <h4 class="mb-3">6 June 2021</h4>

                <h5 class="text-danger"><u>Serial No: 2020-e-XXXXX</u></h5>
            </div>

            <div class="certificate-footer-section">
                <div class="d-flex justify-content-around align-items-end">
                    <div class="circle">
                        <p class="company-name">
                            <b>
                            FEDERATION OF 
                            INVESTMENT MANAGERS 
                            MALAYSIA
                            [199301017839 (272577-P)]
                            </b>
                        </p>
                    </div>

                    <div class="ceo-name">
                        <p class="mb-0"><b>KALEON LEONG</b></p>
                        <p><b>CHIEF EXECUTIVE OFFICER</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                fimm_logo: require('@/assets/logo/FIMM Logo.png'),
                border_top:  require('@/assets/logo/certificate_border_top.png'),
                border_bottom:  require('@/assets/logo/certificate_border_bottom.png'),
            }
        }
    }
</script>

<style lang="scss" scoped>
    .exam-certificate{
        display: flex;
        justify-content: center;

        .paper-size-a4{
            width: 8.3in;
            height: 11.7in;
            position: relative;
            background: #fff;

            .certificate-header-section{  
                margin: 75px 0 50px;

                .certificate-border-top{
                    position: absolute;
                    top: 1%;
                    left: 1%;

                    img{
                        width: 350px;
                    }
                }

                .certificate-border-bottom{
                    position: absolute;
                    bottom: 3%;
                    right: 3%;

                    img{
                        width: 350px;
                    }
                }

                .fimm-logo{
                    img{
                        width: 225px;
                    }
                }
            }

            .certificate-body-section{
                margin-bottom: 100px;
            }

            .certificate-footer-section{
                .circle{
                    width: 225px;
                    height: 225px;
                    background-color: red;
                    text-align: center;
                    border-radius: 100%;
                    position: relative;

                    .company-name{
                        font-size: 13px;
                        line-height: 22px;
                        position: absolute;
                        top: 35%;
                    }
                }
            }
        }
    }
</style>