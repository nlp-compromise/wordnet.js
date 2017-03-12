
console.time("load")
var wn = require("../src")
console.timeEnd("load")

t = "test wordnet data"
exports[t] = function(test) {
  console.time(t)
  test.strictEqual(wn.adverb("quickly").length, 3)
  test.strictEqual(wn.lookup('warrant').length, 6)
  test.strictEqual(wn.lookup('homosexual.adjective.01')[0].syntactic_category, "Adjective")
  test.strictEqual(wn.adjective('gay').length, 6)
  test.strictEqual(wn.verb('woo').length, 2)
  test.strictEqual(wn.data.adjective.length, 18156)
  test.strictEqual(wn.pos("warrant").length, 2)
  console.timeEnd(t)
  test.done()
}
