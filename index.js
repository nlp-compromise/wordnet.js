var helpers = require("./helpers")


helpers.load_or_unzip(function(data) {

	//
	//some helper methods

	var fast_search = function(str, k) {
		var founds = []
		var l = data[k].length;
		for (var i = 0; i < l; i++) {
			for (var o = 0; o < data[k][i].words.length; o++) {
				if (data[k][i].words[o] === str) {
					founds.push(data[k][i])
					break
				}
			}
		}
		return founds
	}

	var is_id = function(str) {
		return str.match(/[a-z]\.(adjective|verb|noun|adverb)\.[0-9]/i) != null
	}

	var id_lookup = function(id, k) {
		var l = data[k].length;
		for (var i = 0; i < l; i++) {
			if (data[k][i].id == id) {
				return data[k][i]
			}
		}
	}

	var lookup = function(str, k) {
		//given an id
		if (is_id(str)) {
			var type = str.match(/[a-z]\.(adjective|verb|noun|adverb)\.[0-9]/i)[1]
			return id_lookup(str, type)
		}
		//given a pos
		if (k) {
			if (str) {
				return fast_search(str, k)
			}
			return data[k]
		}
		//else, lookup in all types
		var types = ["adverb", "adjective", "verb"] //, "noun"]
		var all = []
		for (var i = 0; i < types.length; i++) {
			all = all.concat(fast_search(str, types[i]))
		}
		return all
	}


	//
	//begin API now
	exports.lookup = lookup

	exports.adverbs = {
		lookup: function(s) {
			return lookup(s, "adverb")
		}
	}


	testit()
	// good_tests()

})




	function testit() {
		console.log(exports.adverbs.lookup("quickly"))
	}


	function good_tests() {
		console.log(exports.adverbs.lookup("quickly").length == 3)
		console.log(exports.lookup('warrant').length == 6)
		console.log(exports.lookup('homosexual.adjective.01').syntactic_category == "Adjective")
		console.log(exports.adjectives.lookup('gay').length == 6)
		console.log(exports.verbs.lookup('woo').length == 2)

	}