// First clean up the eventLabel text, including fixing apostrophes and lack thereof in Kramer's: 

=IFERROR(REGEXREPLACE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(IF(REGEXMATCH(A2,"Episode \d+\s-\s"),A2,SUBSTITUTE(A2," - ","|")),"| Episode |","|")," | ", "|"),"&amp;","&"),"&#39;","'"),"Kramer&#39;s|Kramers","Kramer's"))

// Then extract the Program Name and Episode Title via the SPLIT function. Assumes the cleaned-up text is in D2. Splits out Program Name and Episode Title into two or more columns. 

=IFERROR(SPLIT(D2,"|"))
