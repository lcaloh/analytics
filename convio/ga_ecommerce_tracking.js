<!-- Google Analytics e-commerce tracking  using cpTags for NPR DS Analytics system (modify to regular GA tag instead of cpTag as needed; put into reusable page element). Based on code by Sara Hoffman https://github.com/salsus/hoff-->
<script type="text/javascript">

	[[U0:analyticsTransComplete=false]]

	// if URL includes donation=completed
		[[?[[S8]]::donation=completed:: [[?neverdisplays::Comment:: Setting some local variables in case other analytics need them ::]]
			[[U0:analyticsTransComplete = true]]
			[[U0:analyticsOrderId=[[T6:[[S120:dc:trackingCode]]]]]]
			[[U0:analyticsAffiliation=[[T6:[[S120:dc:donationFormName]]]]]]
			[[U0:analyticsTransAmount=[[E130:"[[S120:dc:giftAmount]]" 1 "[[S120:dc:giftAmount]]" length substring "," "" replaceall]]]]  // corrects donation form $dollar amount and maps to transaction amount
		// my code to fire GA via NPR DS SAS
			cpTags.gaAll('require', 'ecommerce');
			cpTags.gaAll('ecommerce:addTransaction', {
				'id': '[[S80:analyticsOrderId]]',	// Transaction ID. Required.
				'affiliation': '[[S80:analyticsAffiliation]]',   // Affiliation or store name.
				'revenue': '[[S80:analyticsTransAmount]]',	// Grand Total.
				//  'shipping': '0',                  // Shipping.
				//  'tax': '0'                     // Tax.
			});
			cpTags.gaAll('ecommerce:addItem', {
				'id': '[[S80:analyticsOrderId]]',	// Transaction ID. Required.
				'name': '[[S120:dc:premiumName]]',    // Product name. Required.
				'sku': '[[S120:dc:premiumId]]',	// SKU/code.
				//	  'category': '[[S120:dc:---]]',         // Category or variation.
				'price': '[[S80:analyticsTransAmount]]',                 // Unit price.
				'quantity': '1'	// Quantity. Set default to 1 so all transactions get counted, including those without a premium.
			});
			cpTags.gaAll('ecommerce:send');
		// end my code
	::]]
// end if donation=completed

// if CONFIRMATION=true page
[[?x8x::x[[S4]]::[[?[[S8]]::CONFIRMATION=true:: [[?neverdisplays::Comment:: Reformatting the eCommerce transaction amount for use, and setting some local variables ::]]
	[[U0:unformattedAmount=[[E130:[[T1:[[S120:cart:PaymentNavContext]]]] dup dup "%2Cvalue%3D" indexof 11 + swap length substring dup "%2C" indexof 0 swap substring 100 /]]]]
	[[U0:analyticsTransComplete = true]]
	[[U0:analyticsOrderId=[[T6:[[E130:[[T1:[[S120:cart:PaymentInfo]]]] dup dup "User+Confirm+Code+%3D+" indexof 22 + swap length substring dup "%0ATitle+%3D+" indexof 0 swap substring]]]]]]
	[[U0:analyticsAffiliation=[[T6:[[S120:cart:name]]]]]]
	[[U0:analyticsTransAmount=[[S80:unformattedAmount]][[?[[S80:unformattedAmount]]::.::[[?[[S80:unformattedAmount]]x::.1x::0::]][[?[[S80:unformattedAmount]]x::.2x::0::]][[?[[S80:unformattedAmount]]x::.3x::0::]][[?[[S80:unformattedAmount]]x::.4x::0::]][[?[[S80:unformattedAmount]]x::.5x::0::]][[?[[S80:unformattedAmount]]x::.6x::0::]][[?[[S80:unformattedAmount]]x::.7x::0::]][[?[[S80:unformattedAmount]]x::.8x::0::]][[?[[S80:unformattedAmount]]x::.9x::0::]]::.00]]]]

	// my code to fire GA via NPR DS SAS
		cpTags.gaAll('require', 'ecommerce');
		cpTags.gaAll('ecommerce:addTransaction', {
			'id': '[[U0:analyticsOrderId]]',	// Transaction ID. Required.
			'affiliation': '[[U0:analyticsAffiliation]] eCommerce',   // Affiliation or store name.
			'revenue': '[[U0:analyticsTransAmount]]',	// Grand Total.
			//  'shipping': '0',                  // Shipping.
			//  'tax': '0'                     // Tax.
		});
		cpTags.gaAll('ecommerce:addItem', {
			'id': '[[U0:analyticsOrderId]]',	// Transaction ID. Required.
			'name': '[[S120:dc:premiumName]]',    // Product name. Required.
			'sku': '[[S120:dc:premiumId]]',	// SKU/code.
			//	  'category': '[[S120:dc:---]]',         // Category or variation.
			'price': '[[U0:analyticsTransAmount]]',                 // Unit price.
			'quantity': '1'	// Quantity. Default to 1 so all transactions get counted, incl w/o a premium.
		});
		cpTags.gaAll('ecommerce:send');
	// end my code
::]]::]]
</script>
<!-- end reus_ga_ecommerce_tracking -->
