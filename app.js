$(function () {
  //console.log('ready');  
  var streamers = ["reckful", "eleaguetv", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "mr_coding", "codingpro"];
  
  (function fetchUsersData (arr) {
    arr.forEach(function(streamer) {
      getData(streamer);
    });
  })(streamers);
  
  // getData("ESL_SC2");
  
 function getData(user, endpoint) {
   $.getJSON('https://api.twitch.tv/kraken/channels/' + user +'?callback=?', function(data) {
  
     $.getJSON('https://api.twitch.tv/kraken/streams/' + user +'?callback=?', function(data2) {
       //console.log("data",data);
  //console.log("data2",data2);  
       var isOnline = isStreaming(data2);
       displayUsers(data, isOnline);
       hasLogo(data);
       events();
     });
  }); 
 } 
  //quick check if user is offline  
  function isStreaming(data2) {
    var isOn = true;
    if (data2.stream === null || data2.stream === undefined) {
      isOn = false;
      //getData(, 'channels')
    }
    return isOn;
  }
  
  //extract user logo, if no logo use default
  function hasLogo(data) {
    var defaultLogo = "http://image.flaticon.com/icons/svg/148/148766.svg";
    var userLogo;
    return data.logo ? userLogo = data.logo : userLogo = defaultLogo;
  }



  
  function displayUsers(data, status) {
    var logo = hasLogo(data);
    var displayName = data.display_name;
    var url = data.url;
    var game = data.game;
    var userStatus;
    var currentStatus;
    var html;
    
    if (!status && displayName) {
      userStatus = "Currently Offline";
      currentStatus = "offline";
    } else if (status) {
      userStatus = data.game + ": " + data.status;
      currentStatus = "online";
    } else {
      userStatus = 'No longer active';
      currentStatus = "offline";
    }
    
    if (!displayName) {
      displayName = data.message.
      userStatus = data.message.split(" ").slice(1).join(" ");
    }
    
    html = '<div class="'+currentStatus+'"><div class="eachResult ' + currentStatus +'"><img src="'+
        logo +'" + "height="35" width="35" class="logo""><a href="'+url+'" target="_blank"><span class="displayName">'+ 
        displayName +'</span></a><div class="status">'+
        userStatus +'</div></div></div>'

    currentStatus === "online" ? $('.results').prepend(html) : $('.results').append(html);
    
  }

});

  function events() {
    var context;
    $('#online').on('click', function() {
      $(this).attr('id', 'onlineColor');
      context = this;
      $('.offline').hide();

    });

    $('#all').on('click', function() {
      $(context).attr('id', 'online'); 
      $('.offline').show();  
  });

  }


