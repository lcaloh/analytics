# Passport Viewing Report
For use in a Google Sheet. For instance, I have a standard report that pulls last month's Passport program viewing information. 

## Worksheets:
I usually have at least four different worksheets in my Google Sheet:

  1. *Data* - where the raw data from Google Analytics is imported.
    - In this example, I'm calling the worksheet `MonthDataSheet`

  - *Cleaned-up Data* - where I query the raw data, and run it through various formulas to clean up messiness and extract the program and episode names.
    - Example worksheet name: `MonthCleanedSheet`

  - *Programs* - where I use pivot tables to summarize total views of the programs.
    - Example worksheet name: `ProgramsPivotSheet`

  - *Episodes* - where I use pivot tables to summarize total views of the episodes by program.
    - Example worksheet name: `EpisodesPivotSheet`


## Instructions:
### 1. Data Worksheet: `MonthDataSheet`

1. **Add-Ons for data**
  - Pull in data using the free [Google Analytics Add-On for Google Sheets](https://chrome.google.com/webstore/detail/google-analytics/fefimfimnhjjkomigakinmjileehfopp?utm_source=permalink), or the [Supermetrics Add-On](https://chrome.google.com/webstore/detail/supermetrics/bnkdidgbiidpnohlnhmkehlimlnfhgce?utm_source=permalink), which offers a non-profit discount.

  - In this example, I assume you'll just set the date parameters in Google Analytics or Supermetrics; I don't go into breaking things out by month or week or year. I assume you'll just pull the data, for instance, for the past month.

- **Settings:**

  - Google Analytics Add-On:

    - Metrics: `ga:totalEvents`
    - Dimensions: `ga:eventLabel`
    - Sort: `-ga:totalEvents`
    - Filters: `ga:eventAction=~(MediaStart)`

  - Supermetrics:

    - Metrics: `Total events`
    - Split by (rows): `EventLabel`
    - Filters: `Event Category contains MVOD AND Event Action equals MediaStart`

- **Columns:**

  - In Column A, pull in the *Event Label*. This is the program and episode information. Here's an example:
    >The Great British Baking Show | Season 2, Episode 1: Cakes | 2365541690 | Episode

  - In Column B, pull in *Total Events*. This is equivalent to the number of times a Passport (MVOD) video was started.

- **Named Range:**

  - I like to name my data ranges to make them easier to reference in formulas.  

  - Select both columns in the `MonthDataSheet` worksheet, and go to *Menu: Data >  Named ranges...* and enter a name for the range: `MonthDataRange`

    - The cell reference for the range should read: `'MonthDataSheet'!A:B`
    - Note that if it says something like `'MonthDataSheet'!A1:B100`, with row number references, you could end up with an incomplete data set in a future run of the data, i.e. if a future run had 300 rows of data, but your range was only calling the first 100 rows.

### 2. Cleaned-up Data Worksheet: `MonthCleanedSheet`

1. **Cell A1: Query `MonthDataRange`**

  - Pull in the data by using the [query](https://support.google.com/docs/answer/3093343?hl=en) Google Sheets formula in cell A1:

    ```
    =QUERY(MonthDataRange)
    ```
  - This will essentially duplicate the data from your original sheet into this sheet. I like to keep the cleaned-up data separate from the original data: if you put the clean-up formulas on the same sheet as the raw data, future runs of the data can end up overwriting the formulas.  

- **Column C: Clean-up Formula**

  - Insert this formula into Cell C2:

    ```
    =IFERROR(REGEXREPLACE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(IF(REGEXMATCH(A1,"Episode \d+\s-\s"),A1,SUBSTITUTE(A1," - ","|")),"| Episode |","|")," | ", "|"),"&amp;","&"),"&#39;","'"),"Kramer&#39;s|Kramers","Kramer's"))
    ```

  - This formula will clean up the eventLabel text in A1, including fixing apostrophes.

  - The last item, `"Kramer&#39;s|Kramers","Kramer's"`, ensures that the name of our program "Ken Kramer's About San Diego" will display (and be aggregated) consistently, instead of as `Kramer&#39;s` or `Kramers`.

    - You can insert your own example instead of my Kramer's example, or you can use this version of the clean-up formula if you don't have anything like it:

      ```
        =IFERROR(REGEXREPLACE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(IF(REGEXMATCH(A1,"Episode \d+\s-\s"),A1,SUBSTITUTE(A1," - ","|")),"| Episode |","|")," | ", "|"),"&amp;","&"),"&#39;","'"))
      ```  
  - Copy and paste this formula down to the last row.

- **Columns D and E: Split Out Program Name and Episode Title**

  - Name Column D `Program` and Column E `Episode`. You may also want to name Column F `Episode 2`, as this is where some additional information about episodes may end up.

  - Insert this formula into Cell D2:

    ```
    =IFERROR(SPLIT(C2,"|"))
    ```

  - This extracts the Program Name and Episode Title via the [SPLIT](https://support.google.com/docs/answer/3094136?hl=en) function. Splits out Program Name and Episode Title into two or more columns.

### 3. Pivot Table: `ProgramsPivotSheet`

1. Select all your data in `MonthCleanedSheet`.

- Go to *Menu: Data > Pivot table...*

- Set up your pivot table:

  - Rows: Group by `Program`
    - Order: Descending
    - Sort by: SUM of Total Events
  - Values: Display `Total events`
    - Summarize by: SUM

- Name this sheet `ProgramsPivotSheet`

### 4. Pivot Table: `EpisodesPivotSheet`

1. Select all your data in `MonthCleanedSheet`.

- Go to *Menu: Data > Pivot table...*

- Set up your pivot table:

  - Rows:
    - Group by `Program`
      - Order: Descending
      - Sort by: SUM of Total Events
    - Group by `Episode`
      - Order: Descending
      - Sort by: SUM of Total Events
      - [check] Show totals
  - Values: Display `Total events`
    - Summarize by: SUM

- Name this sheet `EpisodesPivotSheet`
