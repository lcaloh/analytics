// How To display particular days of the week or month - Google Sheets
// Assuming you're referencing a date in A1...
// Start of the work week containing that date (assuming work week starts on Monday):
=A1-WEEKDAY(A1;3)

// End of the work week:
=A1-WEEKDAY(A1;3)+6

// Start of the month:
=EOMONTH(A1;-1)+1

// End of the month:
=EOMONTH(A1;0)

// RELATIVE TO TODAY:
// Last day of previous month:
=EOMONTH(NOW(),-1)

// First day of previous month:
=DATE(YEAR(TODAY()),MONTH(EDATE(TODAY(),-1)),"1")

// Last full month:
=DATE(YEAR(NOW()),MONTH(EOMONTH(NOW(),-1)),1)

// Convert Week Number to Date:
=DATE(A1,1,1)-WEEKDAY(DATE(A1,1,1),3)+7*(WEEKDAY(DATE(A1,1,1),3)>3)+7*(A1-1)
