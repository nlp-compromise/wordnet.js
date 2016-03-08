'use strict'
//business logic for loading, unzipping the data
exports.load_or_unzip = function(callback) {

  let load_data = function() {
    return {
      noun: require("./data/Noun").data,
      adjective: require("./data/Adjective").data,
      verb: require("./data/Verb").data,
      adverb: require("./data/Adverb").data,
    }
  }

  let unzip_data = function(cb) {
    console.log("unzipping wordnet, may take a moment..")
    let exec = require('child_process').exec;
    let command = "unzip ./data.zip"
    exec(command, {
      env: {
        "PATH": "/usr/local/bin:/usr/bin:/bin" //is this cross-platform?
      }
    }, function(error, stdout) {
      console.log(stdout);
      cb()
    })
  }

  if (require('fs').existsSync(__dirname + "/data/Adjective.js")) {
    let o = load_data()
    callback(o)
  } else {
    unzip_data(function() {
      let o = load_data()
      callback(o)
    })
  }

}

exports.unique = function(a) {
  return a.reduce(function(p, c) {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
};

exports.flatten = function(arr) {
  arr = arr || []
  return arr.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}
