Original segment definition:
  ((donation2(.*)(donation=complete)|completed(.*))|(ecommercecheckout/(.*)((confirmation=true)|(completed))))
  AND
  ((id=(3482|3483|3564|3282|2881|2920|2900|1722|1140|2301))|(sustainers)|(one-time)|((ecommerce/)((membership campaign)|((.*)store_id=1181))))

Added new donation forms Wed., 08-17-16:
((donation2.*((3682|3662|3482|3483|3564|3282|2881|2920|2900|1722|1140|2301|(.*(sustainers|one-time).*))+((\.donation=(complete)|completed))))|(ecommercecheckout/(.*)((confirmation=true)|(completed))))+
