// REQUIRES

// SOCIAL MEDIA

var FB = require('fb');
var snoo = require('snoowrap');
var Twit = require('twit');

// NEWS

var NewsApi = require('newsapi'); 
var AylienNewsApi = require('aylien-news-api');

// BACKEND

var firebase = require('firebase');

// INSTANCING

// FACEBOOK

var fbj = new FB.Facebook({
    version: 'v2.9',
    appId: '145208632692199',
    appSecret: 'fe64251845a586f476735291a9ff3b90'
}),
    fbb = new FB.Facebook({
        version: 'v2.9',
        appId: '1902985699970256',
        appSecret: '4e0ceae88c689d34641c828a5c1b83d9'
});

// TWITTER

var T = new Twit({
  consumer_key:         '2ArRnIp1YfN6Y1yE4y6kFMpyI',
  consumer_secret:      'g9mu5W5mP19E82xNQr0NMD9dFcizJMMUwpflUIiT8ZZCYXPP7n',
  access_token:         '861509197325840385-EXmy20NessFi5EQpthKcQmtSaflkLnZ',
  access_token_secret:  '1PKttf8lQ4VYxTBKybabvyvZ9c6TZgYvLS3MNH6jM5bmx',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
});

// REDDIT

var redOpts = {
    access_token: 'DmFOqlN3taXa6D-zs-VKx-XtpTI',
    token_type: 'bearer',
    expires_in: 3600,
    refresh_token: '37892647-fMSYe0mardA9CZqtjF1NA7VtlgE',
    scope: 'edit flair identity read submit vote wikiread'       
};

var r = new snoo({
    userAgent: 'hermes v0.1, a bot for fetching and delivering the most important links by /u/wompt',
    access_token: 'DmFOqlN3taXa6D-zs-VKx-XtpTI',
    clientId: 'qyE09bTXBb68GQ', 
    clientSecret: 'c_LIN8OK9W1tng41SZS2NyzU8-M',
    refreshToken: '37892647-fMSYe0mardA9CZqtjF1NA7VtlgE'
});

// NEWS

// AYLIEN

var ayApi = new AylienNewsApi.DefaultApi();
var app_id = ayApi.apiClient.authentications['app_id'];
app_id.apiKey = "6907d21c";
var app_key = ayApi.apiClient.authentications['app_key'];
app_key.apiKey = "a7098f7a04d468596d94760c53ac7365";

// NEWSAPI.ORG

var news = new NewsApi('ca6e4c2cb1f641d485f6fa712969759d');

// BACKEND

// FIREBASE

var fireConfig = {
    apiKey: "AIzaSyCVx6QXtIYfqRLc-ukKxYNIllS5riukgXw",
    authDomain: "bomo-7ca4e.firebaseapp.com",
    databaseURL: "https://bomo-7ca4e.firebaseio.com",
    projectId: "bomo-7ca4e",
    storageBucket: "bomo-7ca4e.appspot.com",
    messagingSenderId: "601619083664"
};

var fire = firebase.initializeApp(fireConfig);







function AylienTwit(searchOpts){

    for(i=0; i<searchOpts.titles.length; i++){
        searchOpts.titles[i] = searchOpts.titles[i].replace(/\s/g, ' && ');
    }

    var titleSearch = '(' + searchOpts.titles.join(') || (') + ')';

    var opts = {
    'sortBy': 'hotness',
    'language': ['en'],
    'notLanguage': ['es', 'it'],
    'publishedAtStart': 'NOW-6HOURS',
    'publishedAtEnd': 'NOW',
    'entitiesBodyLinksDbpedia': [
        'http://dbpedia.org/resource/Net_Neutrality',
        'http://dbpedia.org/resource/Internet_Censorship',
        'http://dbpedia.org/resource/Federal_Communications_Commission',
        'http://dbpedia.org/resource/Censorship',
        'http://dbpedia.org/resource/Ajit_Pai_(FCC)'
    ]
    };

    // opts.title = titleSearch;

    var callback = function(error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log(`Fetching and posting ${opts.title} stories on twit`);
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
            T.post('statuses/update', { status: message }, function(err, data, response) {
                console.log('posted link: ' + data.text)
            });
            }
        }
    }
    };
    ayApi.listStories(opts, callback);

}


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

var body = 'My first post using facebook-node-sdk';
fbj.api('me/feed', 'post', { message: body }, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});

*/

/*
news.articles({
  source: 'associated-press', // required 
  sortBy: 'top' // optional 
}).then(articlesResponse => {
  console.log(articlesResponse);
});
*/

/*
r.search({query: 'net neutrality', time: 'hour', sort: 'top'}).slice(0, 9).map(post => post)
.then((post) => {
    for(i = 0; i < post.length; i++) {
        let message = `${post[i].title} ${post[i].url}`;
        console.log(message.length);
        if(message.length <= 140) {
            T.post('statuses/update', { status: message }, function(err, data, response) {
                console.log(data)
            });
            return;
        }
    }
    
});
*/

rQueryParams = ['FCC', 'net neutrality', 'ajit pai', 'internet freedom', 'free and open internet'];

/*
for( i=0; i < rQueryParams.length; i++){
    r.search({query: rQueryParams[i], time: 'hour', sort: 'top'}).slice(0,4).map(post => {
       return {title: post.title, score: (post.score / (Date.now() - post.created)) * 1000000000000 }
    })
    .then(console.log).catch(err => console.log(err))
};

*/

r.rateLimitRemaining;
AylienTwit({titles: rQueryParams});
// r.search({query: 'trump', time: 'week', sort: 'top'}).map(post => post.title).then(console.log)