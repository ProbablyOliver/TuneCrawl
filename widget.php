<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <!-- Developed by Oliver Peat
     oliver.peat@gmail.com -->
    <meta name="description" content="A new user decision based way to embed the music you love.">
	<meta name="keywords" content="tunecrawl, music, service, widget, embed, embed music, html, snippet">
	<meta name="author" content="Oliver Peat">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>TuneCrawl Widget - A new user decision based way to embed the music 
	in your webpage.</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link href="http://fonts.googleapis.com/css?family=Ubuntu:bold" rel="stylesheet" type="text/css">
	<link href="http://fonts.googleapis.com/css?family=Vollkorn" rel="stylesheet" type="text/css">
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />  
    <link href="css/bootstrap-responsive.css" rel="stylesheet">

    
    <link href="img/favicon.ico" rel="icon" type="image/x-icon" />
    
    <script type="text/javascript" src="js/soundcloud.player.api.js"></script>
    <script type="text/javascript" src="js/jquery-1.8.2.js"></script>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    
    <script type="text/javascript" src="js/mailing-list.js"></script>
    
    <script type="text/javascript">var switchTo5x=true;</script>
	<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
	<script type="text/javascript">stLight.options({publisher: "ENTER PUBLISHER ID HERE", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
        	
	<style type="text/css" media="screen">
	#topNavBar{
		text-align:center;
	}
	#logo {
		text-align:center;
		border:0;
	}
	#testV {
		vertical-align: top;
	}
	#playButtonTD {
		text-align:center;
	}
	#logoImage {
		max-height:175px;
		max-width:175px;
		text-align:center;
	}
	#Revision3Logo {
		max-height:125px;
		max-width:125px;
	}
	#LifehackerLogo {
		max-height:125px;
		max-width:125px;
	}
	#MakeUseOfLogo {
		max-height:125px;
		max-width:125px;
	}
	#OneThingWellLogo {
		max-height:125px;
		max-width:125px;
	}
	#tunecrawlWidgetLogo {
		text-align:center;
	}
	#center {
	text-align:center;
}
	h1 {
	    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
	    font-size: 50px;
	    line-height: 65px;
	   	color:#0a84ff;
	   	text-shadow: 1px 1px 1px #ccc;
	   	text-align:center;
	}	
	h4 {
	    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
	    font-size: 17.5px;
	    line-height: 17.5px;
	   	color:#0a84ff;
	   	text-shadow: 1px 1px 1px #ccc;
	}	 
	h3 {
	    font-family: 'Vollkorn', Georgia, Times, serif;
	    font-size: 12px;
	    line-height: 25px;
	}	 
	p {
	    font-family: 'Vollkorn', Georgia, Times, serif;
	    font-size: 18px;
	    line-height: 25px;
	    text-align:center;
	}	
	footer {
		text-align:center;
	}
	.Absolute-Center {
	  margin: auto;
	  position: absolute;
	  top: 0; left: 0; bottom: 0; right: 0;
	}
	.Absolute-Center.is-Responsive {
	  width: 90%; 
	  height: 100%;
	  min-width: 400px;
	  max-width: 2000px;
	  padding: 40px;
	}
	.Absolute-Center.is-Resizable {
	  min-width: 50%;
	  max-width: 100%;
	  min-height: 20%;
	  max-height: 80%;
	  resize: both;
	  overflow: auto;
	  margin: auto;
	  position: absolute;
	  top: 0; left: 0; bottom: 0; right: 0;
	}
	</style>
</head>
<body>
<script src="http://connect.soundcloud.com/sdk.js"></script>
<script src="js/api.js"></script>
<script src="js/soundcloud.js"></script>
<script src="js/youtube.js"></script>
<!--<script src="js/spotify.js"></script>-->

	<div class="row-fluid">
		<div class="span12">
			<div class="row-fluid">
				<div class="span4 offset4" id="tunecrawlWidgetLogo">
					<a href="home.html"><img src="img/TuneCrawlLogo.png" alt="TuneCrawl logo" width="175" height="175" id="logoImage"/></a><br/><br/>
				</div>
			</div>
			<div class="row-fluid" style="background-color:#f7f7f7">
				<div class="span8 offset2" id="center">
					<h1>Coming Soon</h1>
					<p>A new way to embed music in your webpage.<br/>
					Not all users use the same music service. Now you can give 
					them a choice.</p><br/>
				
					<form id="signup" action="<?=$_SERVER['PHP_SELF']; ?>" method="get">
					  <fieldset>						  
						  <label for="email" id="address-label">
							<span id="response">
								<? require_once('inc/store-address.php'); if($_GET['submit']){ echo storeAddress(); } ?>
							  </span>
						  </label>
						  <div class="input-append">
							  <input type="text" name="email" id="email" placeholder="Email address"/>
							  <input type="submit" name="submit" value="Get Updates" class="btn btn-custom btn-info" alt="Get Updates" />
						  </div>
						
						  <div id="no-spam" style="margin:0; padding:0; font:12px Vollkorn,Georgia,sans-serif; border:0;">
							  We'll never spam or give this address away.</div>

					  </fieldset>
					</form> 
					<script type="text/javascript" src="js/prototype.js"></script>
					<script type="text/javascript" src="js/mailing-list.js"></script>
				</div>
			</div>
			<div class="navbar navbar-fixed-bottom">
				
				<div id="musicPlayer"></div>
			</div>
		</div>
	</div>
<footer>
<div class="row-fluid">
	<div class="span10 offset1">
		<div class="span3">
			<br/>
			<h4>Featured Music:</h4>
			<div id="resultsListDiv"><table class="table table-condensed"><tr><td rowspan="2" width="19" id="playButtonTD"><button type="button" title="Play" class="btn-play" onclick="playSoundcloud('http://soundcloud.com/anna-lunoe/breathe')"></button></td>
    		<td><a href="http://soundcloud.com/anna-lunoe/breathe">Anna Lunoe - Breathe</a></td></tr>
    		<tr><td>Share: <a href="http://twitter.com/share?text=Now Playing: Anna Lunoe - Breathe%20via&url=http://www.tunecrawl.com"><img src="img/twitterIcon.png" alt="Twitter" width="19" height="19"></a> <a href="http://www.facebook.com/sharer.php?u=http://www.tunecrawl.com"><img src="img/facebookIcon.png" alt="Facebook" width="19" height="19"></a> &nbsp&nbsp Buy: <a target="_blank" href="http://www.amazon.com/gp/search?ie=UTF8&camp=1789&creative=9325&index=digital-music&keywords=anna lunoe breathe&linkCode=ur2&tag=tune014-20"><img src="img/amazonIcon.png" alt="via Amazon" width="19" height="19"/></a> <a href="https://play.google.com/store/search?q=anna%20lunoe%20breathe&c=music"><img src="img/google-play-logo.png" alt="via Google Play" width="19" height="19"/></a><a href="http://www.beatport.com/track/breathe-extended/4684122"><img src="img/beatport.jpg" alt="Beatport" width="19" height="19"></a><img src="http://www.assoc-amazon.com/e/ir?t=tune014-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></td></tr></table></div>		
		</div>
		<div class="span6">
		<br/>
			<div id="footer">
			<div class="span4">
				<br/>
				<a href="getfeatured.html">Get Featured</a><br/>
				<a href="PrivacyPolicy.html">Privacy Policy</a><br/>
				<a href="ToS.html">Terms of Service</a><br/>
				<a href="widget.php">HTML Embed / Widget</a>
			</div>
			<div class="span4"><br/>
				
				<span class='st_facebook'></span>
				<span class='st_twitter'></span>
				<span class='st_googleplus'></span>
				<span class='st_email'></span>
				<span class='st_sharethis'></span>
				<br/><br/>
				
				<iframe src="http://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FTunecrawl&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;font=arial&amp;colorscheme=light&amp;action=like&amp;height=21&amp;appId=132554916798691" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe>
				<a href="https://twitter.com/TuneCrawl" class="twitter-follow-button" data-show-count="false" data-show-screen-name="false">Follow @TuneCrawl</a>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
				<br/>
			</div>
			<div class="span4">
				<br/>
				<a href="http://tunecrawl.totemapp.com/company">Press</a><br/>
				<a href="http://www.surveymonkey.com/s/5V5PCTJ">Feedback</a><br/>
				<a href="mailto:admin@tunecrawl.com">admin@tunecrawl.com</a>
			</div>
			</div>
		</div>
		<div class="span3">
			<br/>
			<h4>As Seen On:</h4>
			<a href="http://lifehacker.com/5993740/tunecrawl-instantly-finds-songs-on-spotify-youtube-and-soundcloud-so-you-can-listen-right-away"><img src="img/lifehacker_logo.png" alt="Lifehacker logo" width="100" height="100" id="LifehackerLogo"></a>
			<a href="http://www.makeuseof.com/dir/tunecrawl-quickly-find-stream-music-from-spotify-youtube-soundcloud/"><img src="img/makeuseof_logo.png" alt="Make Use Of logo" width="125" height="125" id="MakeUseOfLogo"></a><br/>
			<a href="http://onethingwell.org/post/47112301637/tunecrawl"><img src="img/onethingwell_logo.png" alt="One Thing Well logo" width="125" height="125" id="OneThingWellLogo"></a>
			<a href="http://tv.revision3.com/tzdaily/tunecrawl-music-search"><img src="img/revision3_logo.png" alt="Revision3 logo" width="125" height="125" id="Revision3Logo"></a>
		</div>
	</div>
</div>
</footer>
</body>
</html>
