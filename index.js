var FB = require('fb');
var snoo = require('snoowrap');
var twit = require('twit');
var firebase = require('firebase');


var fireConfig = {
    apiKey: "AIzaSyCVx6QXtIYfqRLc-ukKxYNIllS5riukgXw",
    authDomain: "bomo-7ca4e.firebaseapp.com",
    databaseURL: "https://bomo-7ca4e.firebaseio.com",
    projectId: "bomo-7ca4e",
    storageBucket: "bomo-7ca4e.appspot.com",
    messagingSenderId: "601619083664"
};

var fire = firebase.initializeApp(fireConfig);

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


r.getHot().slice(0, 1).map(post => post).then(console.log);
rQueryParams = ['FCC', 'net neutrality', 'ajit'];
/*
for( i=0; i < rQueryParams.length; i++){
    r.search({query: rQueryParams[i], time: 'hour', sort: 'top'}).slice(0,4).map(post => {
       return {title: post.title, score: (post.score / (Date.now() - post.created)) * 1000000000000 }
    })
    .then(console.log).catch(err => console.log(err))
};
*/
r.rateLimitRemaining;
// r.search({query: 'trump', time: 'week', sort: 'top'}).map(post => post.title).then(console.log)