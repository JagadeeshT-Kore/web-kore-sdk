//for UI hosting html
//http://localhost:8081/chat/?API_KEY=1234
//https://qa-bots.kore.ai/websdk/chat/?API_KEY=1234

var API_KEY=getURLParameterByName('apiKey');
var styleURL='../UI/dist/kore-ai-sdk.min.css';
var scriptURL='../UI/dist/kore-ai-sdk.min.js';

//check for prod (non dev)
if(location.hostname!=='localhost'){
    //for embed generate js file here
    //https://bots.kore.ai/api/websdkjs?apiKey=1234'
    //by reading from /var/www/websdk/UI/dist/kore-ai-sdk.min.js
    //load script from API to inject window.JWT_OBJ
    scriptURL=location.hostname+'/api/websdkjs?apiKey='+API_KEY;
}else{
    //DEV ENV
    //FOLLOWING LINE ONLY FOR DEV TESTING
    window.JWT_OBJ = 'ewogICJqd3QiOiAiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBZWFFpT2pFMU9EVTRNVEEzTmpnNE5EUXNJbVY0Y0NJNk1UVTROVGc1TnpFMk9EZzBOQ3dpWVhWa0lqb2lhSFIwY0hNNkx5OXBaSEJ5YjNoNUxtdHZjbVV1WTI5dEwyRjFkR2h2Y21sNlpTSXNJbWx6Y3lJNkltTnpMVEZsT0RRMVlqQXdMVGd4WVdRdE5UYzFOeTFoTVdVM0xXUXdaalptWldFeU1qZGxPU0lzSW5OMVlpSTZJbkpoYW1GelpXdG9ZWEl1WW1Gc2JHRkFhMjl5WlM1amIyMGlMQ0pwYzBGdWIyNTViVzkxY3lJNkltWmhiSE5sSW4wLlJIUXBoRWw1ZjVJWURDNUdWOGtvYXpPajNNWWN1V2Vfd1ZqX2FramxzRjAiLAogICJib3RJbmZvIjogewogICAgIm5hbWUiOiAiU0RLQm90IiwKICAgICJfaWQiOiAic3QtYjk4ODljNDYtMjE4Yy01OGY3LTgzOGYtNzNhZTkyMDM0ODhjIgogIH0KfQ==';
}


function loadScript(scriptUrl, cb) {
    var el = document.createElement('script');
    el.language = 'javascript';
    el.async = 'true';
    el.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(el);
    el.src = scriptUrl;
    el.onload = function (script) {
        if (cb) {
            cb.call(this);
        }
    };
}
function loadStyle(url, cb) {
    var el = document.createElement('link');
    el.rel = 'stylesheet';
    document.getElementsByTagName("head")[0].appendChild(el);
    el.href = url;
    el.onload = function (script) {
        if (cb) {
            cb();
        }
    };
}
function getURLParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
loadStyle(styleURL);
loadScript(scriptURL,function OnLoadScript(){
    KoreSDK.chatConfig.minimizeMode=false;
    KoreSDK.show(KoreSDK.chatConfig);

});
