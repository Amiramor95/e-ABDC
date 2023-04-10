import * as ConsultantAPI from './api_client'

let API = ConsultantAPI.get_client();

/*
Personal Particular of Applicant
=======================================
GET	api/module2/consultant_record
GET	api/module2/applicants
GET	api/module2/applicants/{CONSULTANT_ID}
GET	api/module2/highest_qualifications
GET	api/module2/countries
GET	api/module2/states
GET	api/module2/cities
GET	api/module2/postcode
GET	api/module2/races
GET	api/module2/genders
GET	api/module2/citizenships
GET	api/module2/credit_languages
POST	api/module2/consultant
POST	api/module2/applicants
*/

export async function get_general_settings() {
  return API.get("/general")
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_consultant_record() {
  return API.get("/consultant_record")
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_highest_qualifications() {
  return API.get("/highest_qualifications")
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_countries() {
  return API.get("/countries")
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_states(country_id) {
  return API.get("/states",{
    params:{
      COUNTRY_ID: country_id
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_cities(state_id) {
  return API.get("/cities",{
    params:{
      STATE_ID: state_id
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_postcodes(city_id) {
  return API.get("/postcodes",{
    params:{
      CITY_ID: city_id
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_races() {
  return API.get("/races")
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_genders() {
  return API.get("/genders")
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_citizenships() {
  return API.get("/citizenships")
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_credit_languages() {
  return API.get("/credit_languages")
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

export async function get_file(id) {
  return API.get("/documents/" + id)
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    });
}

/*
Type of Consultant & Exam
=======================================
GET	api/module2/applicants/licenses
GET	api/module2/applicants/licenses/{CONSULTANT_LICENSE_ID}
GET	api/module2/applicants/license_types
GET	api/module2/applicants/acceptions
GET	api/module2/applicants/acceptions/distribution_points
GET	api/module2/exams
GET	api/module2/exams/sites
GET	api/module2/exams/preferences
GET	api/module2/applicants/licenses/confirm
POST	api/module2/applicants/licenses
POST	api/module2/exams
*/



/*
Other Documents
=======================================
GET	api/module2/other_documents/requires
GET	api/module2/other_documents/requires/{CONSULTANT_ID}
POST	api/module2/other_documents/upload
*/