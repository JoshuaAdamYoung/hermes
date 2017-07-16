// REQUIRES

// CONFIG

var globalConfig = require('./config.json');
var util = require('./lib/util');
var lastRun = require('./test.json');

// SOCIAL MEDIA

var FB = require('fb');
var snoo = require('snoowrap');
var Twit = require('twit');

// NEWS

var NewsApi = require('newsapi'); 
var AylienNewsApi = require('aylien-news-api');

// BACKEND

var fs = require('fs');
var firebase = require('firebase');


var lastRunD = new Date(lastRun.date);
var dateString = util.toDateString(lastRunD);

console.log("Last run on " + dateString);

// INSTANCING

// FACEBOOK

var fbj = new FB.Facebook(globalConfig.fb.fb1);
/*
fbb = new FB.Facebook(globalConfig.fb.fb2);
*/
// TWITTER

var T = new Twit(globalConfig.twit.altfcc);

// REDDIT

var r = new snoo(globalConfig.reddit.r1a);

// NEWS

// AYLIEN

var ayApi = new AylienNewsApi.DefaultApi();
var app_id = ayApi.apiClient.authentications['app_id'];
app_id.apiKey = globalConfig.aylien.appId;
var app_key = ayApi.apiClient.authentications['app_key'];
app_key.apiKey = globalConfig.aylien.appKey;

// NEWSAPI.ORG

var news = new NewsApi(globalConfig.newsApi.apiKey);

// BACKEND

var newsQueue = [];

// FIREBASE

var fire = firebase.initializeApp(globalConfig.firebase.bomo);


// FUNCTIONS

function AylienTwit(opts){

    var callback = function(error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('========================================');
        for (var i = 0; i < data.stories.length; i++){
            let message = `${data.stories[i].title}`;
            let finished = false;
            let k = 0;
            while(finished == false) {
                
                let addmsg = message + ' ' + data.stories[i].hashtags[k];
                if(addmsg.length <= 116){
                    message = addmsg;
                } else {
                    finished = true;
                }
                k++;
            }
            if(message.length <= 116){
            message = `${message} ${data.stories[i].links.permalink}`;
            newsQueue.push(message);
            }
        }
    }
    };
    ayApi.listStories(opts, callback);

}

function searchRetweet(searchOpts){
    T.get('search/tweets', searchOpts, function(err, data, response) {
        for(i=0; i<data.statuses.length; i++){
            T.post('statuses/retweet/:id', { id: data.statuses[i].id_str }, function (err, data, response) {
                console.log("RETWEETED: " + data.text)
            })
        }
    });
};

function tweetReddit(searchOpts){
    r.search(searchOpts).slice(0, 39).map(post => post)
    .then((post) => {
        for(i = 0; i < post.length; i++) {
            let message = `${post[i].title} ${post[i].url}`;
            if(post[i].title.length <= 116) {
                newsQueue.push(message);
            }
        }
    
    });
};

// SEARCH OPTS

var fccOpts = {
    aylien: {
        entities: [
            'Net Neutrality', 
            'Internet Censorship', 
            'Federal Communications Commission', 
            'Censorship', 
            'Ajit Pai (FCC)'
        ],
    },
    twitter: {
        retweet: {
            q: `"net neutrality" since:${lastRun.date}`, 
            count: 40, 
            result_type: 'popular' 
        }
    },
    reddit: {
        search: {
            query: 'net neutrality', 
            after: lastRun.date,
            sort: 'top'
        }
    }
}

var nowObj = {date: Date.now()};


// RUN FUNCTIONS

AylienTwit(util.buildAyQuery('hotness', 50, fccOpts.aylien.entities));

//searchRetweet(fccOpts.twitter.retweet);

// tweetReddit(fccOpts.reddit.search);

// WORKING ON IT

/*

fbj.api('oauth/access_token', {
    client_id: '145208632692199',
    client_secret: 'fe64251845a586f476735291a9ff3b90',
    redirect_uri: 'http://localhost:3000',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    fbj.setAccessToken(res.access_token);
    console.log('access token: ' + res.access_token)
});


FB.setAccessToken('access_token');

fbj.api('/me', {fields: 'last_name'}, function(response) {
  console.log(response);
});

 
var body = 'My first post using facebook-node-sdk';
fbj.api('me/feed', 'post', { message: body }, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});


news.articles({
  source: 'associated-press', // required 
  sortBy: 'top' // optional 
}).then(articlesResponse => {
  console.log(articlesResponse);
});
*/









/*
for( i=0; i < rQueryParams.length; i++){
    r.search({query: rQueryParams[i], time: 'hour', sort: 'top'}).slice(0,4).map(post => {
       return {title: post.title, score: (post.score / (Date.now() - post.created)) * 1000000000000 }
    })
    .then(console.log).catch(err => console.log(err))
};

*/


// r.search({query: 'trump', time: 'week', sort: 'top'}).map(post => post.title).then(console.log)

var json = JSON.stringify(nowObj)
fs.writeFile('test.json', json, (err) => {
    if(err){console.log(err)}
    console.log('Scrape completed on: ', new Date());
});

var queuePointer = 0;
function tweet(){
    if(newsQueue[queuePointer]){
        T.post('statuses/update', { status: newsQueue[queuePointer] }, function(err, data, response) {
            console.log("Posted " + newsQueue[queuePointer]);
        });
        queuePointer++;
    } else {
        clearInterval(postQueue);
    }

}
var postQueue = setInterval(tweet, 15000);

   