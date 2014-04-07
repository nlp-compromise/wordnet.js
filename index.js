function load_or_unzip_wordnet(callback) {
	try {
		var o = load_data()
		callback(o)
	} catch (er) {
		unzip_wordnet(function() {
			var o = load_data()
			callback(o)
		})
	}
}

function load_data() {
	return {
		// noun: require("./data/Noun").data,
		adjective: require("./data/Adjective").data,
		verb: require("./data/Verb").data,
		adverb: require("./data/Adverb").data,
	}
}


function unzip_wordnet(cb) {
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


load_or_unzip_wordnet(function(data) {
	console.log(data)
})