module.exports = {

  choose: function(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

};