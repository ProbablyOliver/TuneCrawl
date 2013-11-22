function soundcloud(var1) {
	//console.log("reached soundcloud function");
	SC.initialize({
	  client_id: 'ENTER SOUNDCLOUD KEY HERE'
	});
	SC.get('/tracks', { q: var1 }, function(tracks) {
	document.getElementById("soundcloud_results").innerHTML = '<div id="youtube_header"><img src="img/ajax-loader.gif" alt="Loading..."></div>';
		var total = "";
		$("#soundcloud_results").empty();
		if (tracks.length <= 0)
		{
			total = "No Results Found.";
		}
		else
		{
			for (var i=0; i<6; i++) {
		  		//console.log(tracks[i].permalink_url);
		  		if (tracks[i].permalink_url != null)
		  		{
			  		var track_url = "" + tracks[i].permalink_url;
			  		var title = tracks[i].title;

					var html_code = '<div id="resultsListDiv"><table class="table table-condensed"><tr><td rowspan="2" width="19" id="playButtonTD"><button type="button" title="Play" class="btn-play" onclick="playSoundcloud(\'' + track_url + '\')"></button></td>' +
    				'<td><a href="' + track_url + '">' + title + '</a></td></tr>' + 
    				'<tr><td>Share: <a href="http://twitter.com/share?text=Now%20Playing:%20' + title + '%20via&url=http://www.tunecrawl.com"><img src="img/twitterIcon.png" alt="Twitter" width="19" height="19"></a> <a href="http://www.facebook.com/sharer.php?u=http://www.tunecrawl.com"><img src="img/facebookIcon.png" alt="Facebook" width="19" height="19"></a> &nbsp&nbsp Buy: <a target="_blank" href="http://www.amazon.com/gp/search?ie=UTF8&camp=1789&creative=9325&index=digital-music&keywords=' + title + '&linkCode=ur2&tag=tune014-20"><img src="img/amazonIcon.png" alt="via Amazon" width="19" height="19"/></a> <a href="https://play.google.com/store/search?q=' + title + '&c=music"><img src="img/google-play-logo.png" alt="via Google Play" width="19" height="19"/></a><img src="http://www.assoc-amazon.com/e/ir?t=tune014-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr></table></div>';		
		
			  		total = total + html_code;
			  	}
		  	}
	  	}
	  	$("#soundcloud_results").empty().append(total);
	});
}

function playSoundcloud(var1) {

	var1 = var1.substr(7, var1.length); 

	var html_code ='' +
      '<iframe id="soundcloud_widget"' +
      'src="http://w.soundcloud.com/player/?url=http://api.' + var1 + '&show_comments=false&auto_play=true&amp;color=45abc9"' +
      'width="100%"' +
      'height="170"' +
      'frameborder="no"></iframe>';
          
	$("#musicPlayer").empty().append(html_code);
	
}
