<template>
<div class="content">
    <div class="container-fluid">
      <va-card>
        <h4 slot="header" class="card-title">Buttons</h4><br />
                <div>

                <button v-if="" @click="" type="button" class="btn btn-primary btn-fill btn-md">
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                </button>
                &nbsp;&nbsp;&nbsp;
                <button @click="" type="button" class="mr-2 btn btn-info btn-fill btn-md">
                  <i class="fa fa-pencil-square-o" /> &nbsp; Save as draft
                </button>
                &nbsp;
                <button @click="" type="button" class="mr-2 btn btn-warning btn-fill btn-md">
                  <i class="fa fa-reply" /> &nbsp; Return
                </button>
                <button @click="" type="button" class="ml-2 btn btn-danger btn-fill btn-md">
                  <i class="fa fa-ban" /> &nbsp; Reject
                </button>
                <button @click="" type="button" class="ml-2 btn btn-primary btn-fill btn-md">
                      <i class="fa fa-paper-plane" /> &nbsp; Approve
                </button>
                <button @click="" type="button" class="ml-1 btn btn-success btn-fill btn-md">
                  <i class="fa fa-paper-plane" /> &nbsp; Submit
                </button>
                &nbsp;
                <button type="button" class="btn-fill btn-md">
                  <i class="fa fa-edit"></i>
                </button>
                </div>
                <br />
                <div>
                  <button @click="" type="button" class="btn btn-warning btn-fill btn-md">
                    <i class="fa fa-plus" /> &nbsp; Add Parameter
                  </button>
                  <button type="button" class="cancel vudal-btn mr-2 btn btn-danger btn-fill btn-md">
                    <i class="fa fa-times" /> &nbsp; Close
                  </button>
                  <button @click="" type="button" class="cancel vudal-btn mr-2 btn btn-primary btn-fill btn-md">
                              <i class="fa fa-edit" /> &nbsp; Update
                  </button>
                  <b-button @click="" type="button" class="btn btn-primary btn-fill btn-md">
                            <i class="fa fa-paper-plane" /> &nbsp; Publish
                  </b-button>
                  <button type="button" @click="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                        <i class="fa fa-save" /> &nbsp; Save
                  </button>
                </div>

      </va-card>
<br/><br/><br/><br/>
      <va-card>
        <h4 slot="header" class="card-title">Table</h4><br />
        <va-data-table>

        </va-data-table>
      </va-card>
    </div>
</div>

</template>

<style lang="scss" scoped>
ul.va-unordered > li:before, .content ul > li:before {
    content: "" !important;
    width: 0rem !important;
    height: 0rem !important;
    border-radius: 0% !important;
    position: absolute !important;
    left: 0;
    top: 0 !important;
    margin-top: 0rem !important;
    background-color: #0000 !important;
}
</style>
