//This is modified code originally developed by Rasmus Andersson (https://github.com/rsms) 

//determines if logos need loaded.
//TODO: fix this to a proper way when you have time.
var reloadImages = 1;
var exitedAlert = 'no';
var countryCode = 'null';
//gets country code of user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        $.getJSON('http://ws.geonames.org/countryCode', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            type: 'JSON'
        }, function(result) {
            countryCode = result.countryCode;
            spotifyMDQuery.regionCode = countryCode;
        });
    });
}	

// should we persist search query and region in local storage?
// removed feature.
//var HAS_LOCAL_STORAGE = (typeof localStorage === 'object');

// tracks changes to form inputs in real time
function InputChangeTracker($input, validatorFilter, handler, persistKey, paused) {

  this.$input = $input;
  var old_value = 0;
  $input.change(function() {
	
    //if (persistKey) localStorage[persistKey] = this.value;
    var current_value = $.trim(this.value);
    if (validatorFilter) validatorFilter(current_value);
    if (old_value && current_value && current_value != old_value) {
      handler.replacedValid(old_value, current_value);
    } else if (!old_value && current_value) {
      handler.becameValid(old_value, current_value);
    } else if (old_value && !current_value) {
      handler.resignedValid(old_value, current_value);
    }
    old_value = current_value;
  });
  // record value
  this._input = $input[0];
  this._value = $.trim(this._input.value);
  // resume unless paused
  if (!paused)
    this.resume();
  // load persisted value
  
  if (persistKey && HAS_LOCAL_STORAGE && String($input[0].value).length == 0) {
    var value = localStorage[persistKey];
    if (value) $input[0].value = value;
  } else persistKey = null;
  
}

InputChangeTracker.prototype.resume = function(frequency) {
  clearInterval(this.timer);
  frequency = parseInt(frequency);
  var self = this;
  this.timer = setInterval(function() {
    if (self._value != (self._value = $.trim(self._input.value))) {
      self.$input.change();
    }
  }, (frequency > 0 && !isNaN(frequency)) ? frequency : 200);
};

InputChangeTracker.prototype.pause = function() {
  clearInterval(this.timer);
  this.timer = null;
};


var spotifyMDQuery = {
  $view: null, $input: null,
  
  enable: function() {
    var self = this;
    this.$view.animate({opacity:1.0}, 100, function(){
      $(this).removeClass('disabled');
      self.$input[0].disabled = false;
      self.changeTracker.resume();
    });
    this.searchResults.$view = this.$view.find('.results');
    // setup region
    if (!this._hasSetupRegion) {
      // set region from stored data, if any
      var region_code_re = /^[A-Z]{2}$/;
      var regionCode = 'US';
      if (countryCode != 'null') {
      	regionCode = countryCode;
      }
      this.regionCode = regionCode;
      //var regionCode = HAS_LOCAL_STORAGE ? localStorage['region-code'] : null;
      //if (!regionCode) regionCode = 'US';
      // register change handler
      this.$region.change(function() {
        self.regionCode = this.value.match(region_code_re) ? this.value : null;
        localStorage['region-code'] = self.regionCode;
        self.searchResults.update();
      });
      this._hasSetupRegion = true;
    }
  },
  
  disable: function() {
    this.$view.addClass('disabled').animate({opacity:0.15}, 200);
    this.$input[0].disabled = true;
    this.changeTracker.pause();
  },
  
  searchResults: {
    $view: null,
    update: function (data) {
      if (data) this.data = data;
      else data = this.data;
      if (!data) return;
      var $count = this.$view.find('.count');
      var $list = this.$view.find('.list');
      $count.text(data.info.num_results);
      $list.empty();
      var A = function(href, text, styleClass) {
        var a = document.createElement('a');
        a.setAttribute('href', href);
        if (styleClass)
          a.setAttribute('class', styleClass);
        if (text) a.appendChild(document.createTextNode(text));
        return a
      }
      var i, L, li, $li, a, x, artist, track, limit = 6;
      if (data.tracks.length <=0)
      {
      	var tempAvailability = "No Results Found.";
      	$list.append(tempAvailability);
      }
      else
      {
      	var maxResults=6;
      	var curResults=0; //how many results are currently displayed.
      	if (countryCode == 'null' && exitedAlert != 'yes')
      	{
      		$list.append('<div class="alert alert-info" id="alertMessage"><a class="close" data-dismiss="alert">×</a><strong>Share location to display playable Spotify tracks in your country. <a href="#myModal" role="button" data-toggle="modal">Learn More</a></strong></div>');
			maxResults= maxResults-1;
		}
		  var totLength = data.tracks.length;
		  
	      for (i=0; i<totLength; i++) 
	      {
	        track = data.tracks[i];
	        
	        // check region
	        if (track.album && track.album.availability && spotifyMDQuery.regionCode) {
	          if (track.album.availability.territories.indexOf(spotifyMDQuery.regionCode) === -1) {
	            // not available
	            continue;
	          }
	        }
	        
	        //handles creation of artist and track text and links
	        var trackLinkandTitle = '';

	        for (x=0; x<track.artists.length; ++x) {
	          artist = track.artists[x];
	          //$list.append(A(artist.href, artist.name, 'artist'));
	          //$list.append('<a href="' + artist.href + '">' + artist.name + '</a>');
	          trackLinkandTitle = trackLinkandTitle + '<a href="' + artist.href + '">' + artist.name + '</a>';
	          if (x === track.artists.length-2)
	            trackLinkandTitle = trackLinkandTitle + ' & ';
	          else if (x < track.artists.length-2)
	            trackLinkandTitle = trackLinkandTitle + ', ';
	        }
	        trackLinkandTitle = trackLinkandTitle + ' - ';
	        trackLinkandTitle = trackLinkandTitle + '<a href="' + track.href + '">' + track.name + '</a>';      
	        
	        $list.append('<table class="table table-condensed"><tr><td rowspan="2" width="19"><button type="button" title="Play" class="btn-play" onclick="playSpotify(\'' + track.href + '\')"></button></td><td>' + trackLinkandTitle + '<tr><td id="spotifyShareArea">Share: <a href="http://twitter.com/share?text=Now%20Playing:%20' + track.name + '%20via&url=http://www.tunecrawl.com"><img src="img/twitterIcon.png" alt="Twitter" width="19" height="19"></a> <a href="http://www.facebook.com/sharer.php?u=http://www.tunecrawl.com"><img src="img/facebookIcon.png" alt="Facebook" width="19" height="19"></a> &nbsp&nbsp Buy: <a target="_blank" href="http://www.amazon.com/gp/search?ie=UTF8&camp=1789&creative=9325&index=digital-music&keywords=' + track.name + '&linkCode=ur2&tag=tune014-20"><img src="img/amazonIcon.png" alt="via Amazon" width="19" height="19"/></a> <a href="https://play.google.com/store/search?q=' + track.name + '&c=music"><img src="img/google-play-logo.png" alt="via Google Play" width="19" height="19"/></a><img src="http://www.assoc-amazon.com/e/ir?t=tune014-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr></table>');        
	        
	        curResults = curResults+1;
	        if (curResults >= maxResults) 
	        	break;
	        
	        if( i >= totLength)
	        	break; 
	      }
      }
      
    },
    
    clear: function () {
      this.$view.find('.list').empty();
    }
  },
  
  sendQuery: function (query) {
    var self = this;
    if (self._activeQueryXHR)
      self._activeQueryXHR.abort();
    $.ajax({
      url: 'http://ws.spotify.com/search/1/track.json',
      dataType: 'json',
      data: {q: query},
      timeout: 30000,
      
      beforeSend: function (xhr) {
        self._activeQueryXHR = xhr;
      },
      complete: function (xhr, textStatus) {
        if (self._activeQueryXHR === xhr)
          self._activeQueryXHR = null;
      },
      success: function (data, textStatus, xhr) {
        //console.log('results: ', data, textStatus, xhr);
        self.searchResults.update(data);
      }
    });
  },
  
  //has latency info for searches.
  //spotify
  dispatchSendQuery: function (query) {
    if (!this._sendQueryLatency) {
      // no latency first time
      this.sendQuery(query);
      this._sendQueryLatency = 100;
      return;
    } 
    else 
    {
      this._sendQueryLatency = Math.min(this._sendQueryLatency + 100, 200);    
    }
    if (this._sendQueryTimer) clearInterval(this._sendQueryTimer);
    var self = this;
    this._sendQueryTimer = setTimeout(function(){
      self._sendQueryTimer = null;
      self._sendQueryLatency = 200;
      self.sendQuery(query);
    }, this._sendQueryLatency);
  },
  
  // --- change handlers ---
  
  //TODO: calls to functions when time...
  
  // still valid but id changed
  //value is the final search 
  replacedValid: function (oldValue, value) {
    //console.log('query changed: still valid but id changed', oldValue, '-->', value)
    this.dispatchSendQuery(value);
    
    searchYoutube(value);
    
    document.getElementById("soundcloud_results").innerHTML = '<div id="youtube_header"><img src="img/ajax-loader.gif" alt="Loading..."></div>';
    soundcloud(value);
    
  },
  
  // changed from invalid to valid
  becameValid: function (oldValue, value) {
    //console.log('query changed: became valid id', value)
    this.searchResults.$view.fadeIn(200);
    this.dispatchSendQuery(value);
    
    searchYoutube(value);
     
    soundcloud(value);
    
    if (reloadImages>=1)
    {
    	document.getElementById("soundcloud_header").innerHTML = '<a href="http://soundcloud.com" border="0"><img src="img/soundcloudlogo.png" alt="Soundcloud"></a><br/><br/>';
    	document.getElementById("youtube_header").innerHTML = '<a href="http://www.youtube.com" border="0"><img src="img/youtubelogo.png" alt="Youtube"></a><br/><br/>';
    	document.getElementById("spotify_header").innerHTML = '<a href="http://www.spotify.com" border="0"><img src="img/spotifylogo.png" alt="Spotify"></a><br/><br/>';
    	reloadImages=0;
    }
  },
  
  // changed from valid to invalid
  resignedValid: function (oldValue, value) {
    //console.log('query changed: resigned valid id (was '+oldValue+')')
    var searchResults = this.searchResults;
    searchResults.$view.fadeOut(200, function() {
      searchResults.clear();
    });
  }
};

$(function(){
  // is the host browser capable of CORS?
  if (typeof XMLHttpRequest === 'undefined' ||
      (new XMLHttpRequest).withCredentials === undefined ) {
    $('#footer').empty();
    $('#spotifyMDQuery').empty().html('' +
      '<div id="logo"><a href="home.html"><img src="img/TuneCrawlLogo.png" alt="TuneCrawl logo" width="175" height="175"/></a><br/><p>'+
      'Unfortunately, the browser you are using does not properly support some technology on this website.' +
      ' We suggest you download a more modern browser such as <a href="http://www.mozilla.org/firefox">Firefox</a> ' +
      ' or <a href="http://www.google.com/chrome">Chrome</a>.</p><br/></div>');
    return;
  }
	
  // setup and enable our "spotifyMDQuery" object
  spotifyMDQuery.$view = $('#spotifyMDQuery');
  spotifyMDQuery.$input = spotifyMDQuery.$view.find('input[type=text]');
  spotifyMDQuery.changeTracker = new InputChangeTracker(spotifyMDQuery.$input,
      null, spotifyMDQuery, 'spotifyMDQuery');
  spotifyMDQuery.$region = spotifyMDQuery.$view.find('select.region');
  spotifyMDQuery.enable();
  spotifyMDQuery.$input.focus();
  
});

function playSpotify(var1) {

	var html_code ="<iframe src='https://embed.spotify.com/?uri=" + var1 + "' width='300' height='80' frameborder='0' allowtransparency='true'></iframe>";				
	$("#musicPlayer").empty().append(html_code);
}

function searchButton() {
	var inputText = document.getElementById("search").value;
	
	spotifyMDQuery.becameValid(null, inputText);
}
