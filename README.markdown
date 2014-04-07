

loving build of [wordnet](http://wordnet.princeton.edu/) in JSON.

so you don't have to install, like a virtual masheen.


# Liberties taken

## Symmetric-relations
if the holonym of 'sausage' is 'sausage meat', the reverse (called a 'meronym') is almost always true.

As the beautiful George Miller [explains](http://books.google.ca/books?id=Rehu8OOzMIMC), the meronym-holonym relations, and the hypernym-hyponym relations are symmetric with few exceptions. Ignoring these exceptions reduces the filesize by half, so I did it.

To go from 'sausage meat' to 'sausage', just query the opposite direction.

## Antonyms on synsets
Adjective synsets in wordnet have no antonyms, but rather each individual word-sense has an antonym. This makes wordnet's antonym data really specific, but for most purposes, that's probably overdoing it.

## Kill 'Coordinate-terms'
Given wordnet is a graph, this is just redundant data.

## Reformatted glosses
Use only 1 gloss (description) per synset, and split it by semicolon-seperators.

## Same-As links
Most Nouns include freebase ids and wikipedia titles



# Contents

117,657 synsets in total

##82,113 Noun Synsets
hypernyms: Y is a hypernym of X if every X is a (kind of) Y (canine is a hypernym of dog)
hyponyms: Y is a hyponym of X if every Y is a (kind of) X (dog is a hyponym of canine)
meronym: Y is a meronym of X if Y is a part of X (window is a meronym of building)
holonym: Y is a holonym of X if X is a part of Y (building is a holonym of window)

##13,767 Verb Synsets
hypernym: the verb Y is a hypernym of the verb X if the activity X is a (kind of) Y (to perceive is an hypernym of to listen)
troponym: the verb Y is a troponym of the verb X if the activity Y is doing X in some manner (to lisp is a troponym of to talk)
entailment: the verb Y is entailed by X if by doing X you must be doing Y (to sleep is entailed by to snore)

##18,156 Adjective Synsets
related nouns
similar to
participle of verb


##3,621 Adverb Synsets
root adjectives


# roll your own build
to build your own, get a [freebase key](https://code.google.com/apis/console/?pli=1)
run 'npm install'
then 'node ./coffeejs/build.js'