# Admin Filters:

* _Admin filters to clean up the madness that is Convio URLs._
* _Assumes that there's also a filter (listed before these) making all URIs lowercase first_

## 1. Exclude sessions with donation form previews:  
_(to exclude donation form previews from admin users that aren't already excluded via IP address, ie vendors)_

### Exclude:

  * Filter Field: Request URI

  * Filter Pattern:

        (donation2preview)|(\?df_preview=)

## 2. Clean up and consolidate donation completed URL:
  ### Search & Replace:

  * Search:

        donation=completed(&.*)$

  * Replace:

        donation=completed/

  **(&.*)$** - Looks for an ampersand plus any characters to the end of the URL ($)

## 3. Remove session ID:
### Search & Replace:

* Search:

      (\&|\?)idb=(\d{7,}|\[\[s76:idb\]\])

* Replace:

      [leave empty]

## 4. Remove session ID in ecommerce:  
### Search & Replace:

* Search:

      (E|e)commercecheckout/\d{6,}\?

* Replace:

      ecommercecheckout/

  Replaces a numeric string of 6+ characters between ecommercecheckout/ and whatever follows it

## 5. Remove Paypal string
### Search & Replace:

* Search:

      \&extproc=paypal(.+)$

* Replace:

      [leave empty]

  This captures everything from _&extproc=paypal_ to the end of the URL
<<<<<<< HEAD

## 6. Remove session ID from ecommerce checkout pages, and rewrite to be consistent with ecommercecheckout: 

* Search:

      /donation/(\d*)\?dpage=

* Replace:

      /ecommercecheckout/

* Examples:

  /kpbs/site/donation/930330988?dpage=donate  ➙   /kpbs/site/ecommercecheckout/donate
  /kpbs/site/donation/930330988?dpage=confirm  ➙ /kpbs/site/ecommercecheckout/confirm

* Note: changed to /kpbs/site/ecommercecheckout/ in order to maintain the funnel in content drilldown.
=======
>>>>>>> parent of 931d3df... added another session ID URL pattern
