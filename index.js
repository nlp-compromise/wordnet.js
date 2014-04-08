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
				return [data[k][i]]
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
		var types = ["adverb", "adjective", "verb", "noun"]
		var all = []
		for (var i = 0; i < types.length; i++) {
			all = all.concat(fast_search(str, types[i]))
		}
		return all
	}


	//
	//begin API now
	exports.lookup = lookup
	exports.data = data

	//main methods
	exports.adverb = function(s) {
		return lookup(s, "adverb")
	}
	exports.adjective = function(s) {
		return lookup(s, "adjective")
	}
	exports.verb = function(s) {
		return lookup(s, "verb")
	}
	exports.noun = function(s) {
		return lookup(s, "noun")
	}

	exports.synonyms = function(s) {
		return lookup(s, "adjective").map(function(syn) {
			var loose = syn.similar.map(function(id) {
				return lookup(id, "adjective")[0].words
			})
			return {
				synset: syn.id,
				close: syn.words.filter(function(w) {
					return w != s
				}),
				far: helpers.flatten(loose).filter(function(w) {
					return w != s
				})
			}
		})
	}

	exports.antonyms = function(s) {
		var ants = lookup(s, "adjective").map(function(syn) {
			return syn.antonym
		})
		ants = helpers.unique(helpers.flatten(ants))
		var all = ants.map(function(id) {
			return lookup(id, "adjective")[0]
		})
		console.log(all)
	}
	exports.pos = function(s) {
		return helpers.unique(lookup(s).map(function(syn) {
			return syn.syntactic_category
		}))
	}

	// testit()
	// good_tests()

})




	function testit() {
		// console.log(exports.antonyms("good"))
		console.log(exports.synonyms("fresh"))
	}


	function good_tests() {
		console.log(exports.adverbs.lookup("quickly").length == 3)
		console.log(exports.lookup('warrant').length == 6)
		console.log(exports.lookup('homosexual.adjective.01')[0].syntactic_category == "Adjective")
		console.log(exports.adjectives.lookup('gay').length == 6)
		console.log(exports.verbs.lookup('woo').length == 2)
		console.log(exports.data.adjective.length == 18156)
		console.log(exports.pos("warrant").length == 2)

	}