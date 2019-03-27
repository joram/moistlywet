let api_base_url = "https://api.moistlywet.com";
api_base_url = "http://localhost:5000";

function post(path, data){
  return fetch(`${api_base_url}${path}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => {
    return response.json()
  })
}

module.exports = {

  auth: function(userData) {
    console.log(userData)
    return post("/api/v1/auth", userData).then( resp => {
      return true
    });
  },

};
