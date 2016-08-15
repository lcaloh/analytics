# Search & Replace Filters:
_Assumes that there's a filter making all URIs lowercase first_
## 1. Exclude sessions with donation form previews:  
_(for admin users that aren't already excluded via IP address, ie vendors)_

**Exclude:**

  Filter Field: Request URI

  Filter Pattern:

    (donation2preview)|(\?df_preview=)

## 2. Clean up and consolidate donation completed URL:
  **Search:**

    donation=completed(&.*)$

  **Replace:**

    donation=completed/

  **(&.*)$** - Looks for an ampersand plus any characters to the end of the URL ($)

## 3. Remove session ID:
  **Search & Replace with nothing:**

    (\&|\?)idb=(\d{7,}|\[\[s76:idb\]\])

## 4. Remove session ID in ecommerce:  
  **Search:**

    (E|e)commercecheckout/\d{6,}\?

  **Replace:**

    ecommercecheckout/

  Replaces a numeric string of 6+ characters between ecommercecheckout/ and whatever follows it

## 5. Remove Paypal string
  **Search & Replace with nothing: **

    \&extproc=paypal(.+)$

  This captures everything from _&extproc=paypal_ to the end of the URL
