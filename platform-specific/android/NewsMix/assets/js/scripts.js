var feedsList = new Array(
{
        title: 'Guardian Newspapers',
        description: 'IN the search of truth?',
        website: 'http://www.ngrguardiannews.com',
        feed_url: 'http://www.ngrguardiannews.com/index.php?format=feed&type=rss'
},
{
        title: 'Linda Ikeji',
        description: 'News, Events, Entertainment, Lifestyle, Fashion, Beauty, Inspiration and yes... Gossip! *Wink*',
        website: 'http://lindaikeji.blogspot.com',
        feed_url: 'http://feeds.feedburner.com/blogspot/OqshX'
},
{
        title: 'Vanguard Newspapers',
        description: 'Vanguard Newspapers',
        website: 'http://www.vanguardngr.com/',
        feed_url: 'http://www.vanguardngr.com/feed/'
},
{
        title: 'All Africa News',
        description: 'All Africa News',
        website: 'http://allafrica.com/',
        feed_url: 'http://allafrica.com/tools/headlines/rdf/nigeria/headlines.rdf'
},
{
        title: 'The Nation Online',
        description: 'The Nation',
        website: 'http://www.thenationonlineng.net',
        feed_url: 'http://www.thenationonlineng.net/2011/index.php/feed/index.rss'
},

{
        title: 'Punch Newspapers',
        description: 'Putting the Punch back on the web or in your day',
        website: 'http://www.punchng.com',
        feed_url: 'http://www.punchng.com/feed/'
}
);




/**
 * Displays the list of feeds
 * @returns {undefined}
 */
function showFeeds() {

        var totalFeeds = feedsList.length;
        var htmlContent = new Array();

        htmlContent.push('<ul class="feeds">');
        for (i = 0; i < totalFeeds; i++) {
                currentFeed = feedsList[i];
                htmlContent.push('<li>');
                htmlContent.push('<a href="view.html#f=' + i + '">');
                htmlContent.push(currentFeed.title);
                htmlContent.push('</a>');
                htmlContent.push('</li>');

        }
        htmlContent.push('</ul>');

        htmlContent = htmlContent.join("\n");
        $('#mainContent').html(htmlContent);
}

/**
 * Parses the URL for the currently selected feed
 * @returns {undefined}
 */
function loadFeed() {
       if(typeof(google)=='undefined'){
                showMessage("Connection Error Detected. Please ensure you have  a working internet connection");
                goHome();
                return;
        }

        if (location.href.indexOf("#") == -1) {

                showMessage('Unable to identify selected feed (Err 1)')
                goHome();
                return;

        }

        try {
                var hash = window.location.hash.substring(1);
                feedId = hash.split('f=')[1];
                if (feedId.length == 0) {
                        showMessage('Unable to identify selected feed (Err 2)')
                        goHome();
                        return;
                }

                pullFeed(feedId);

        } catch (e) {
                showMessage('Unable to identify selected feed (Err 3)')
                goHome();
                return;
        }

}

/**
 * Displays a message to user
 * @param {type} msg
 */
function showMessage(msg) {
        //alert ?
        $('#mainContent').html(msg);

}
/**
 * Goes to the home page/dashboard
 * @returns {undefined}
 */

function goHome() {

        window.setTimeout(function(){
                location.href = 'index.html';
        },1000);

}
/**
 * Load the feed using the URL of the feed
 * @param {type} feedId
 */
function pullFeed(feedId) {

        try {
                var selectedFeed = feedsList[feedId];
        } catch (e) {
                showMessage("We were unable to find the selected feed");
                goHome();
                return;
        }
        
        if(typeof(selectedFeed)=='undefined'){
                showMessage("We were unable to find the selected feed");
                goHome();
        }
        try {
                var htmlContent = new Array();
                htmlContent.push('<a href="index.html" id="homeBtn"><img src="img/home.png" /></a>');

                htmlContent.push('<h1>');
                htmlContent.push(selectedFeed.title);
                htmlContent.push('</h1>');
                htmlContent.push('<span class="feedDesc">');
                htmlContent.push(selectedFeed.description);
                htmlContent.push('</span>');
                $('#feedHeader').html(htmlContent.join("\n"));
                feedUrl = selectedFeed.feed_url;
                
                if(typeof(google)=='undefined'){
                        showMessage("Unable to connect. Please check that you have a working connection.<a href='index.html' class='btn'>Try Again</a>")
                 return;       
                }
                var gFeed = new google.feeds.Feed(feedUrl);
                gFeed.setNumEntries(10);
                try{
                gFeed.load(function(result) {
                        if (!result.error) {
                                var htmlContent =new Array();
                                
                                htmlContent.push('<ul id="newsList">');
                                for (var i = 0; i < result.feed.entries.length; i++) {
                                        var entry = result.feed.entries[i];
                                        htmlContent.push('<li>');
                                        htmlContent.push('<span class="title">');
                                        htmlContent.push(entry.title);
                                        htmlContent.push('</span>');
                                        htmlContent.push('<div class="content">');
                                        htmlContent.push(formatAsSummary(entry.content));
                                        htmlContent.push('</div>');
                                        htmlContent.push('<a class="newsLink" href="'+entry.link+'"  target="_blank" rel="external">');
                                        htmlContent.push(entry.link);
                                        htmlContent.push('</a>');
                                        
                                        htmlContent.push('</li>');
                                }
                                htmlContent.push('</ul>');
                                 $('#mainContent').html(htmlContent.join("\n"));
                        }else{
                                showMessage("Error Parsing the Information from the Provider "+result.error );
                                goHome();
                        }
                });
                }catch(e){
                        
                          showMessage("It seems like we have a connection problem " +e.message );
                        goHome();
                }


        } catch (e) {
                showMessage("Unexpected error " + e.message);
//                goHome();
        }
}

function formatAsSummary(content){
        return content;
        content =  $(content).text();
        return content.substring(0,500)+'...';
        
        
}