function searchYoutube(var1)
  {
  document.getElementById("youtube_results").innerHTML = '<div id="youtube_header"><img src="img/ajax-loader.gif" alt="Loading..."></div>';

    var script = document.createElement('script');
    script.setAttribute('id', 'jsonScript');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://gdata.youtube.com/feeds/' + 
           'videos?vq=' + var1 + '&max-results=6&' + 
           'alt=json-in-script&callback=showMyVideos&' + 
           'orderby=relevance&sortorder=descending&category=Music&format=5&fmt=18');

    document.documentElement.firstChild.appendChild(script);
  }
  
function showMyVideos(data)
{
	console.log(data);
	var feed = data.feed;
    var entries = feed.entry || [];
    var total = "";
    //var html = ['<ul>'];        
        $("#youtube_results").empty();
        if (entries.length <=0)
        {
        	total = 'No Results Found.';
        }
		for (var i = 0; i < entries.length; i++)
		{		
  			var entry = entries[i];
    		//var playCount = entry.yt$statistics.viewCount.valueOf() + ' views';
    		var title = entry.title.$t;

	  		//var html_code = '<button type="button" title="Play" class="btn-play" onclick="playYoutube(\'' + entry.link[0].href.substring(31,42) + '\')"></button><a href = \"' + entry.link[0].href + '\">' + title + '</a><br/>';
    		var html_code = '<div id="resultsListDiv"><table class="table table-condensed"><tr><td rowspan="2" width="19" id="playButtonTD"><button type="button" title="Play" class="btn-play" onclick="playYoutube(\'' + entry.link[0].href.substring(31,42) + '\')"></button></td>' +
    		'<td><a href = \"' + entry.link[0].href + '\">' + title + '</a></td></tr>' + 
    		'<tr><td>Share: <a href="http://twitter.com/share?text=Now%20Playing:%20' + title + '%20via&url=http://www.tunecrawl.com"><img src="img/twitterIcon.png" alt="Twitter" width="19" height="19"></a> <a href="http://www.facebook.com/sharer.php?u=http://www.tunecrawl.com"><img src="img/facebookIcon.png" alt="Facebook" width="19" height="19"></a> &nbsp&nbsp Buy: <a target="_blank" href="http://www.amazon.com/gp/search?ie=UTF8&camp=1789&creative=9325&index=digital-music&keywords=' + title + '&linkCode=ur2&tag=tune014-20"><img src="img/amazonIcon.png" alt="via Amazon" width="19" height="19"/></a> <a href="https://play.google.com/store/search?q=' + title + '&c=music"><img src="img/google-play-logo.png" alt="via Google Play" width="19" height="19"/></a><img src="http://www.assoc-amazon.com/e/ir?t=tune014-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr></table></div>';
    		    
	  		total = total + html_code;
	  	}
	  	$("#youtube_results").empty().append(total);
}

function playYoutube(var1) {	
	$("#musicPlayer").empty();
	var html_code = '<iframe id="ytplayer" class="youtube-player" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/' + var1 + '?autoplay=1" frameborder="0"/>';
	$("#musicPlayer").empty().append(html_code);
}
