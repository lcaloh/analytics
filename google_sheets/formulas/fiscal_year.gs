// Fiscal year display based on DATECELL.
// Assumes FY starts July.

// Based on date cell:
=IF(ISBLANK(DATECELL),"",CONCATENATE("FY",IF(MONTH(DATECELL)>6,RIGHT((YEAR(DATECELL)+1),2),RIGHT(YEAR(DATECELL),2))))

// FY Quarter - Display FYQ1, FYQ2, FYQ3, FYQ4 - assumes FY starts July.
=IF(ISBLANK(DATECELL),"",CONCATENATE("FY",IF(MONTH(DATECELL)>6,(RIGHT(YEAR(DATECELL),2)+1),RIGHT(YEAR(DATECELL),2))," ",IF(MONTH(DATECELL)<=3,"Q3",IF(MONTH(DATECELL)<=6,"Q4",IF(MONTH(DATECELL)<=9,"Q1",IF(MONTH(DATECELL)<=12,"Q2"))))))

// FY based on Google Analytics' yyyymm format:
=IF(ISBLANK(DATECELL),"",CONCATENATE("FY",IF(VALUE(RIGHT(yyyymm,2))>6,(MID(yyyymm,3,2)+1),MID(yyyymm,3,2))))
