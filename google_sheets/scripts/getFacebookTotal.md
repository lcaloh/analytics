# Google Sheets Script to Get Facebook Engagement Total

1. Create a Google Script with this code. ([Google documentation](https://developers.google.com/apps-script/overview))

  ```javascript
  function getFacebookTotal(url) {
    var jsondata = UrlFetchApp.fetch("https://graph.facebook.com/?id="+encodeURI(url)+"&fields=og_object%7Bengagement%7D");
    var object = Utilities.jsonParse(jsondata.getContentText());
    return object.og_object.engagement.count;
  }
  ```

2. Assuming the URL is in Cell A2, insert this formula into a cell:

  `=getFacebookTotal(A2)`

This script works as of August 2016, using [Facebook Open Graph API v2.7](https://developers.facebook.com/docs/graph-api/reference/v2.7/url)
