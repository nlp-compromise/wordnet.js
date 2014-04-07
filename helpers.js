//business logic for loading, unzipping the data
exports.load_or_unzip = function(callback) {

	var load_data = function() {
		return {
			noun: require("./data/Noun").data,
			adjective: require("./data/Adjective").data,
			verb: require("./data/Verb").data,
			adverb: require("./data/Adverb").data,
		}
	}

	var unzip_data = function(cb) {
		console.log("unzipping wordnet, may take a moment..")
		var exec = require('child_process').exec;
		var command = "unzip ./data.zip"
		exec(command, {
			env: {
				"PATH": "/usr/local/bin:/usr/bin:/bin" //is this cross-platform?
			}
		}, function(error, stdout, stderr) {
			console.log(stdout);
			cb()
		})
	}

	if (require('fs').existsSync(__dirname + "/data/Adjective.js")) {
		var o = load_data()
		callback(o)
	} else {
		unzip_data(function() {
			var o = load_data()
			callback(o)
		})
	}

}