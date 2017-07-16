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

export var fbj = new FB.Facebook({
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

export var T = new Twit({
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

export var r = new snoo({
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

export var ayApi;

// NEWSAPI.ORG

export var news = new NewsApi('ca6e4c2cb1f641d485f6fa712969759d');

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

export var fire = firebase.initializeApp(fireConfig);