var lastRun = require('../test.json');

module.exports.toDateString = function(date){
    var dateString =
    date.getUTCFullYear() + "-" +
    ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + date.getUTCDate()).slice(-2) + "T" +
    ("0" + date.getUTCHours()).slice(-2) + ":" +
    ("0" + date.getUTCMinutes()).slice(-2) + ":" +
    ("0" + date.getUTCSeconds()).slice(-2) + "Z";
    return dateString
}

var dateString = module.exports.toDateString(new Date(lastRun.date));

module.exports.fixTitle = function(titleArr){
    for(i=0; i<titleArr.length; i++){
        titleArr[i] = titleArr[i].replace(/\s/g, ' && ');
    }

    var titleSearch = '(' + titleArr.join(') || (') + ')';

    return titleSearch;
}

module.exports.fixEntities = function(entities){
    for(i=0; i < entities.length; i++){
        entities[i] = entities[i].replace(/\s/g, '_');
        entities[i] = 'http://dbpedia.org/resource/' + entities[i];
    }
    return entities;
}

module.exports.buildAyQuery = function(sort, numResults, entities, titles){
    var opts = {
        'perPage': numResults,
        'sortBy': sort,
        'language': ['en'],
        'notLanguage': ['es', 'it'],
        'publishedAtStart': 'NOW-12HOURS',
        'publishedAtEnd': 'NOW'
    };
    if(titles){
        opts.title = module.exports.fixTitle(titles);
    };
    if(entities){
        opts.entitiesBodyLinksDbpedia = module.exports.fixEntities(entities);
    };
    return opts;
}