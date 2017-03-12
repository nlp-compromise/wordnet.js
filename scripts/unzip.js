let exec = require('child_process').exec;
console.log("unzipping wordnet, may take a few minutes..")

let command = "unzip ./data.zip"
exec(command, {
  env: {
    "PATH": "/usr/local/bin:/usr/bin:/bin" //is this cross-platform?
  }
}, function(error, stdout) {
  console.log(error);
  console.log(stdout);
})
