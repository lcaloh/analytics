# Google Sheets Script to Get Facebook Engagement Total

1. You'll need to get a [Facebook App ID](https://developers.facebook.com/docs/apps/register) and Facebook App Secret in order to authenticate your API requests. Otherwise, Facebook will likely throw an error indicating the request limit has been met. Associate your Facebook App with your website to maximize your Facebook Insights opportunities. Once it's set up, you'll be able to find your App ID and App Secret after you select your app at https://developers.facebook.com/apps/ -- look under Settings > Basic. Replace `ENTER-YOUR-APP-ID-HERE` and `ENTER-YOUR-APP-SECRET-HERE` in the script below, with your actual ID and Secret.

2. Create a Google Script with this code. ([Google documentation](https://developers.google.com/apps-script/overview))

  ```javascript
  function getFacebookTotal(url) {
    var appID = "ENTER-YOUR-APP-ID-HERE"
    var appSecret = "ENTER-YOUR-APP-SECRET-HERE"
    var jsondata = UrlFetchApp.fetch("https://graph.facebook.com/?id="+encodeURI(url)+"&fields=og_object%7Bengagement%7D&access_token="+appID+"%7C"+appSecret);
    var object = Utilities.jsonParse(jsondata.getContentText());
    return object.og_object.engagement.count;
  }
  ```

3. Assuming the URL is in Cell A2, insert this formula into a cell:

  `=getFacebookTotal(A2)`

This script works as of August 2016, using [Facebook Open Graph API v2.7](https://developers.facebook.com/docs/graph-api/reference/v2.7/url)
