 // This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.info('Please log ' + 'into this app.');
        // document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
        FB.login(function(){}, {scope: 'user_games_activity,user_likes,publish_actions'});
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.info('Please log ' + 'into Facebook.');
        // document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '241989366004874',
        frictionlessRequests: true,
        status: true,
        // cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8'
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    });
};

var social = {
    reachStage: function(stage) {
        var levelReached = {
          'id': stage,
          // "url": "http://samples.ogp.me/269279073275903",
          'url': 'http://apps.facebook.com/gravity-world',
          // 'url': 'http://labs.luiscoms.com.br/gravity-world',
          'type': 'gravity-world:level',
          'title': 'Stage ' + stage,
          'scrape': true
        };
        var privacy = {'value': 'EVERYONE'};//EVERYONE, ALL_FRIENDS, FRIENDS_OF_FRIENDS, SELF, CUSTOM
        console.log(levelReached);
        FB.api('me/gravity-world:reach',
                'post',
                {
                    // object: {
                    //     type: 'gravity-world:level',
                    //     title: 'Custom Level',
                    //     // url: 'http://labs.lusicoms.com.br/gravity-world'
                    //     url: 'http://samples.ogp.me/269279073275903',
                    // },
                    level: levelReached,
                    privacy: privacy,
                },
                function(response) {
                    console.log(response);
                    if (!response) {
                        console.error('Error occurred.');
                    } else if (response.error) {
                        console.error('Error: ' + response.error.message);
                    } else {
                        console.log('Story created. ID is', response.id, 'Shared: '+privacy['value'], 'https://www.facebook.com/me/activity/' + response.id);
                    }
                }
        );
    }
};
