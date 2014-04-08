

loving build of [wordnet](http://wordnet.princeton.edu/) in JSON.

no memory pointers, no python, no DSL, no guff. no crazy-framework stuff at all.

the data is zipped for github, but it automatically unzips when you first use it.

    npm install wordnetjs

if you just want the JSON, unzip ./data.zip
then you can just do your random shit.
it's 6mb -> 32mb

it's the cutest way to use wordnet by a pretty wide margin.

#API
````javascript
wn= require("wordnet")
wn.lookup('warrant')
//6 results

wn.verb.lookup('warrant')
//1 result
````


# Liberties taken

## Symmetric-relations
if the holonym of 'sausage' is 'sausage meat', the reverse (called a 'meronym') is almost always true.

As the beautiful George Miller [explains](http://books.google.ca/books?id=Rehu8OOzMIMC), the meronym-holonym relations, and the hypernym-hyponym relations are symmetric with few exceptions. Ignoring these exceptions reduces the filesize by half, so I did it.

To go from 'sausage meat' to 'sausage', just query the opposite direction.

## Antonyms on synsets
Adjective synsets in wordnet have no antonyms, but rather each individual word-sense has an antonym. This makes wordnet's antonym data really specific, but for most purposes, that's probably overdoing it. delete.

## Kill 'Coordinate-terms'
Given wordnet is a graph, this is just redundant data. delete.

## Reformatted glosses
Use only 1 gloss (description) per synset, and split it by semicolon-seperators.

## Same-As links
Most Nouns include freebase ids and wikipedia titles. There were reconciled in a mostly-manual process by freebase in 2010.



# Contents

117,657 synsets in total

##82,113 Noun Synsets
````javascript
{
  id: "candy cane.noun.01",
  lexname: "noun.food",
  syntactic_category: "Noun",
  description: "a hard candy in the shape of a rod (usually with stripes)",
  words: ["candy cane"],
  relationships: {
    type_of: ["candy.noun.01"],
    made_with: [],
    members: [],
    parts: [],
    instances: []
  },
  same_as: {
    freebase_topic: "/m/01hrm7",
    wikipedia_page: "Candy_cane"
  }
}
````

##13,767 Verb Synsets
````javascript
{
  id: "lean back.verb.01",
  lexname: "verb.motion",
  syntactic_category: "Verb",
  description: "move the upper body backwards and down",
  words: ["lean back", "recline"],
  assumes: [],
  causes: []
}
````
hypernym: the verb Y is a hypernym of the verb X if the activity X is a (kind of) Y (to perceive is an hypernym of to listen)
troponym: the verb Y is a troponym of the verb X if the activity Y is doing X in some manner (to lisp is a troponym of to talk)
entailment: the verb Y is entailed by X if by doing X you must be doing Y (to sleep is entailed by to snore)

##18,156 Adjective Synsets
````javascript
{
  id: "phantasmagoric.adjective.01",
  lexname: "adj.all",
  syntactic_category: "Adjective",
  description: "characterized by fantastic imagery and incongruous juxtapositions",
  words: ["phantasmagoric", "surreal", "phantasmagorical", "surrealistic"],
  similar: ["unrealistic.adjective.01"]
},
````
related nouns
similar to
participle of verb


##3,621 Adverb Synsets
````javascript
{
  id: "refreshingly.adverb.01",
  lexname: "adv.all",
  syntactic_category: "Adverb",
  description: "in a manner that relieves fatigue and restores vitality",
  words: ["refreshingly", "refreshfully"]
}
````


# roll your own build
to build your own, get a [freebase key](https://code.google.com/apis/console/?pli=1) and put it in ./build/build.js
run 'npm install'
then 'node ./build.js'