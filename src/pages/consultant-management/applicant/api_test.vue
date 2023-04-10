<template>
<div>
  <va-card>

    <div class="row">
     <h4 slot="header" class="card-title">Display Result</h4>
        <br/>
    </div>

  </va-card>
  <br/>
  <va-card>
<br/>
<h4 slot="header" class="card-title">cert download</h4>
<br/>
&nbsp;
<div>
<a
                                href="../applicant/src/Norah Ahmad Kasim.pdf"
                                target="_blank"
                                class="row"
                                download="Norah Ahmad Kasim.pdf"
                              >
    <button
                    @click="submit"
                    type="button"
                    class="ml-2 btn btn-primary btn-fill btn-md"
                  >
                    download
                  </button>
                  </a>

   </div>

  </va-card>
</div>

</template>
<script>
  import axios from "axios";

  export default{
    props: {

    },
    created() {
      this.fetchexamsite();
    },
    methods: {
      fetchexamsite() {
        const axios = require('axios');

        let config = {
            method: 'get',
            url: 'https://ems-stg.fimm.com.my/api/v1/registration/site/sites',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0NGtzcktEb2pzTFA3d1Axb2ZYUXRnR0tzRGJTUzZUWl9jbTZRMHI1RElVIn0.eyJleHAiOjE2MzAwNDc2MDIsImlhdCI6MTYyNzQ1NTYwMiwianRpIjoiNDE1NmUxYzQtMjMwYS00NmNhLTgwZGItNDZmNDRkYWY0MTdlIiwiaXNzIjoiaHR0cHM6Ly9sZmNzLXN0Zy5maW1tLmNvbS5teS9hdXRoL3JlYWxtcy9sZGFwLXJlYWxtIiwiYXVkIjpbImVtcy1jbGllbnQiLCJhY2NvdW50Il0sInN1YiI6IjIwMjFjZTA5LTczMjMtNDRhMC1iM2VmLTFiYWQ5NTJhOTMzNyIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlZy1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiMzE3ZTNlZDktZWUxMS00YzY4LWExMWEtYTgyYjJhN2Y5YTI4IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZW1zLWNsaWVudCI6eyJyb2xlcyI6WyJwZHNfdXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZmlyc3ROYW1lIjoiRUZfUERTX1VzZXIxIiwibGFzdE5hbWUiOiIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkVGX1BEU19Vc2VyMSIsImVtYWlsIjoiZWZfcGRzX3VzZXIxQGVmLmNvbSIsInVzZXJuYW1lIjoiZWZfcGRzX3VzZXIxIiwiZ3JvdXAiOltdfQ.aOJWG_u8MyA4rOqOOOyLJMVAOfyJT4Tc2ezBHSzvxkgXpe6Iopb3fHcWmNqBjcOJ11-dUWt_77u4mb8-A9jPORDe10yxItaRHyzJW5QjnDIwwnyc_T2les9LjFCX2nT8z2jUWDGwbPOABfwB5_pc0ZoYKwhL3LaUjFUTPEI_oD1jDLKkklPNhcBM--zaL8VPTKoxe3yNlrjGpkbrCn6nVZzoL5d-Ruahapg8y6sxcY7H-xiUgcvTXpgyvnBV0AwseC3DTDdNN6IxwDURofPRLpSixnctg4alAe5CAzyLBCJgjK_zbTj1Rn8obpyNgMMim5pD9ViJTNRdE8weoQWTow',
                // 'Cookie': 'webems=websrvxms'
            }
        };

        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
        // const headers = {
        //   "Authorization":"Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0NGtzcktEb2pzTFA3d1Axb2ZYUXRnR0tzRGJTUzZUWl9jbTZRMHI1RElVIn0.eyJleHAiOjE2MzAwNTI4MTQsImlhdCI6MTYyNzQ2MDgxNCwianRpIjoiZmE2MjdiY2EtMjdiOC00ZmVlLWIyNzctNDlhZTdkY2I0MjQwIiwiaXNzIjoiaHR0cHM6Ly9sZmNzLXN0Zy5maW1tLmNvbS5teS9hdXRoL3JlYWxtcy9sZGFwLXJlYWxtIiwiYXVkIjpbImVtcy1jbGllbnQiLCJhY2NvdW50Il0sInN1YiI6IjIwMjFjZTA5LTczMjMtNDRhMC1iM2VmLTFiYWQ5NTJhOTMzNyIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlZy1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiMTRkZTBhNzMtM2UwZC00ZDMzLTkwMmQtYzUyYTVjZDI5OTBiIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZW1zLWNsaWVudCI6eyJyb2xlcyI6WyJwZHNfdXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZmlyc3ROYW1lIjoiRUZfUERTX1VzZXIxIiwibGFzdE5hbWUiOiIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkVGX1BEU19Vc2VyMSIsImVtYWlsIjoiZWZfcGRzX3VzZXIxQGVmLmNvbSIsInVzZXJuYW1lIjoiZWZfcGRzX3VzZXIxIiwiZ3JvdXAiOltdfQ.Kc_EVzMPLn3GL_9OwlIyP6bw_dh2YgCj4qvMMRgGSNp94dyO1Fk-_RCs4LpBlpjtBB3q-lWmZKbE3NBUwU_KTV38JAjICADDzJ7lVLkFMH2uvXZWqGoz0tPEUoKTc6AdwSpAEeLWuPlEMMfj5bl41Papi0zsY7wLbonEZ8kjyT2HfQfw1PwKmMsdSr7Nnlp4q05a8a1mVXowsCKjyYkccgV7uubAbuftxs0x8BxpaIQZ_js8sYS71Sc46YhI6SOwePiQz4bbuT7h4zuM9wNGMatviFM_wOtMvq7vjnqoXkq-6WQnUkdf3MdmYwJeKJayqRxrwhCWBuVTlXDpR9JD4Q"
        // };
        // axios.get('https://ems-stg.fimm.com.my/api/v1/registration/site/sites',{headers}).then(response => {
        //   console.log(response);
        // }).catch((error) => {
        //   console.log(error);
        // });
      }
    }
  }
</script>
