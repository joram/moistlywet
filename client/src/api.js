let api_base_url = "https://api.moistlywet.com";
if(window.location.hostname==="localhost") {
  api_base_url = "http://localhost:5000";
}

let token = null;

function post(path, data){
  return _fetch(path, data, "POST")
}

function get(path, data){
  return _fetch(path, data, "GET")
}

function _fetch(path, data, method){
  return fetch(`${api_base_url}${path}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'MOISTLY-WET-TOKEN': token,
    },
    body: JSON.stringify(data)
  }).then(response => {
    return response.json()
  })
}


module.exports = {

  auth: function(userData) {
    return post("/api/v1/auth", userData).then( resp => {
      if(resp.success){
        token = resp.token;
        return true
      }
      return false
    });
  },

  list_plants: function(){
    return get("/api/v1/plants")
  },

  list_api_keys: function(){
    return get("/api/v1/api_keys")
  },

  list_plant_moisture: function(plant_pub_id){
    return get(`/api/v1/plant/${plant_pub_id}/moisture`)
  },

  edit_plant: function(plant_pub_id, data){
    return post(`/api/v1/plant/${plant_pub_id}`, data)
  },

};
