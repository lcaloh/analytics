// Returns first empty row - Google Sheets function

=ArrayFormula(iferror(if(A16="","",(LARGE(if(A17:A<>"",row(A17:A)),1)+1))))
