/* chrome.devtools.network.onRequestFinished.addListener(function(req) {

    req.getContent(function(content) {
        document.getElementById('place').innerHTML = content;
        // document.getElementById('place').innerHTML = document.getElementById('place').innerHTML + '<ol><li>html data</li></ol>';
    });
    // Displayed sample TCP connection time here
    console.log(req.timings.connect);

}); */

var links = new Set();
var fileNames = new Set();

// request is of type entries from http://www.softwareishard.com/blog/har-12-spec/#entries
function handleRequestFinished(request) {


    if (request.request.url.includes("?cursor")) {
        // console.log("Server IP: ", request.serverIPAddress);

        // console.log("request: ", request.request);
        // console.log("response: ", request.response);
        /* for item in thread["items"]:
            if item.item_type == "media_share":
                item.media_share = {}
                    for c in carousel_media[]
                    video_versions[0]["url"]
                    image_versions2["candidates"][0]["url"] */

        request.getContent(function(content, mimeType) {
            var responseJSON = JSON.parse(content);
            var thread = responseJSON["thread"];
            var threadItems = thread["items"];
            threadItems.forEach(function(item, index) { // for each message in the thread
                if (item["item_type"] == "media_share") {
                    var mediaShareItem = item["media_share"];
                    var media_type = mediaShareItem["media_type"];
                    if (media_type == 8) { // carousel
                        mediaShareItem["carousel_media"].forEach(function(media_item, index) {
                            if (media_item["media_type"] == 1) { // image in carousel
                                var url = media_item["image_versions2"]["candidates"][0]["url"];
                                addURL(url);
                            } else if (media_item["media_type"] == 2) { // video in carousel
                                var url = media_item["video_versions"][0]["url"];
                                addURL(url);
                            }
                        });
                    } else if (media_type == 1) { // image
                        var url = mediaShareItem["image_versions2"]["candidates"][0]["url"];
                        addURL(url);
                    } else if (media_type == 2) { // video
                        var url = mediaShareItem["video_versions"][0]["url"];
                        addURL(url);
                    }
                }
            });
            /* console.log("Content: ", content);
            document.getElementById('place').innerHTML = document.getElementById('place').innerHTML + content;
            console.log("MIME type: ", mimeType); */
        });
    }

}

chrome.devtools.network.onRequestFinished.addListener(handleRequestFinished);

/* request.getContent().then(([content, mimeType]) => {
    console.log("Content: ", content);
    console.log("MIME type: ", mimeType);
}); */

function addURL(url) {
    if (!(links.has(url))) {
        links.add(url);
        document.getElementById('place').innerHTML = document.getElementById('place').innerHTML + '<a href="' + url + '">' + url + '</a>';
        // remember to add "permissions": ["downloads"] to manifest.json
        // this snippet is inside a onMessage() listener function
        chrome.downloads.download({ url: url }, function(downloadId) {
            console.log("download begin, the downId is:" + downloadId);
        });
    } else {
        console.log("already has that link bruh");
    }
}