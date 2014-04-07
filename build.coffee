require('dirtyjs')
freebase= require('/Users/spencer/mountain/freebase')
fs = require("fs")
async= require("async")

#get your freebase key at https://code.google.com/apis/console/
key= "AIzaSyD5GmnQC7oW9GJIWPGsJUojspMMuPusAxI"


do_pos= (pos="Adverb", cb=console.log)->

  master_query= {
    "name":null,
    "type": "/base/wordnet/synset",
    "lexname": null,
    "syntactic_category": pos,
    "gloss": [],
    "word": [{
      "/base/wordnet/word_sense/word": {
        "/base/wordnet/word/word": null
      }
    }]
  }

  pos_query= {
    Noun: {
      "hypernym": [],
      "substance_holonym":[],
      "member_holonym": [],
      "part_holonym":[],
      "equivalent_topic": [{
        "optional": true,
        "mid": null,
        "key": [{
          "optional": true,
          "namespace": "/wikipedia/en_title",
          "value": null
        }]
      }],
      "instance": [{
        "optional": true,
        "name": null
      }]
    },

    Adjective:{
      "satellite":[],
      "cluster_head":[]
    }

    Verb:{
      "entailment":[],
      "causes":[],
    }

    Adverb:{

    }
  }

  q= JSON.parse(JSON.stringify(master_query))
  q= Object.merge(q, pos_query[pos])

  freebase.paginate [q], {max:999999, key:key}, (all)->
    all= all.map (r)->
      #validation
      r.word= r.word || []
      r.gloss= r.gloss[0] || ''
      r.gloss= r.gloss.split(/; /)
      if pos=="Noun"
        r.equivalent_topic[0]= r.equivalent_topic[0] || {key:{}}
        r.equivalent_topic[0].key[0]= r.equivalent_topic[0].key[0] || {}
        r.instance= r.instance || []

      obj= {
        id:r.name,
        lexname:r.lexname,
        syntactic_category:r.syntactic_category,
        description:r.gloss[0],
        words:r.word.map((w)-> w["/base/wordnet/word_sense/word"]["/base/wordnet/word/word"]),
      }

      if pos=="Noun"
        console.log "hiiiiiiiii"
        obj.relationships= {
          type_of:r.hypernym,
          made_with: r.substance_holonym,
          members: r.member_holonym,
          parts: r.part_holonym,
          instances:r.instance.map('name'),
        }
        obj.same_as= {
          freebase_topic: r.equivalent_topic[0].mid,
          wikipedia_page: r.equivalent_topic[0].key[0].value
        }

      if pos=="Adjective"
        obj.similar= r.satellite
        obj.cluster_head= r.cluster_head

      if pos=="Verb"
        obj.assumes= r.entailment
        obj.causes= r.causes

      return obj

    #write file
    fs.writeFileSync "./data/#{pos.toLowerCase()}.js", "exports.data= #{JSON.stringify(all, null, 2)}"

    cb(all)


all_pos= ["Adverb", "Adjective", "Verb", "Noun"]
do_pos all_pos[1], (r)->
  console.log r.length
