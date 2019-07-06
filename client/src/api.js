let api_base_url = "https://api.moistlywet.com";
if(window.location.hostname==="localhost") {
  api_base_url = "http://localhost:5000";
}

let token = null;

function post_form(path, data){
  let json_headers = {
    'Accept': 'application/json',
    'MOISTLY-WET-TOKEN': token,
  }
  return _fetch(path, data, "POST", json_headers)
}

function post(path, data){
  let json_headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'MOISTLY-WET-TOKEN': token,
  }
  return _fetch(path, data, "POST", json_headers)
}

function get(path, data){
  let json_headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'MOISTLY-WET-TOKEN': token,
  }

  let response = _fetch(path, data, "GET", json_headers);
  response.then((result) => {
    console.log(path, data, result);
  });
  return response;
}

function _fetch(path, data, method, headers){
  return fetch(`${api_base_url}${path}`, {
    method: method,
    headers: headers,
    body: data
  }).then(response => {
    return response.json()
  })
}


module.exports = {

  auth: function(userData) {
    return post("/api/v1/auth", JSON.stringify(userData)).then( resp => {
      if(resp.success){
        token = resp.token;
        return true
      }
      return false
    });
  },

  get_plant: function(plant_id){
    return get(`/api/v1/plant/${plant_id}`)
  },

  list_plants: function(){
    return get("/api/v1/plants")
  },

  list_api_keys: function(){
    return get("/api/v1/api_keys")
  },

  list_plant_moisture: function(plant_pub_id, hours){
    return get(`/api/v1/plant/${plant_pub_id}/moisture?hours=${hours}`)
  },

  list_plant_temperature: function(plant_pub_id){
    return get(`/api/v1/plant/${plant_pub_id}/temperature`)
  },

  edit_plant: function(plant_pub_id, data, image){
    return post_form(`/api/v1/plant/${plant_pub_id}`, data)
  },

};
