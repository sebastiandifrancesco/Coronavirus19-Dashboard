# Coronavirus19-Dashboard

The purpose of this project was to investigate how the number of new cases of covid-19 each month was affected by the rollout of the vaccines in early 2021. I decided to look at the countries that were in the top five of most deaths from covid because I wanted to see how impactful the vaccine rollout would be in the top five "most dangerous" countries.  To find this information initially I visited https://www.worldometers.info/coronavirus/countries-where-coronavirus-has-spread/. This website showed that these countries were the "most dangerous": US, UK, Brazil, Mexico, and India. Then I went to https://console.cloud.google.com/bigquery?project=my-project-75222-gt and pulled from Google's Big Query (covid19_open_data) the covid data I wanted using SQL:

SELECT date, sum(new_confirmed) as tot_new_confirmed
FROM `bigquery-public-data.covid19_open_data.covid19_open_data`
WHERE country_name = '<COUNTRY_NAME>'
GROUP BY date
ORDER BY date desc
LIMIT 16000

After pulling the data from each of the five countries I performed the steps below to clean the data:
1) Check for missing data and fill with mean value
2) Reverse data frames to get earliest dates first
3) Change date column to month_year column instead of the full date
4) Rename the tot_new_confirmed for each data frame
5) Concat the data frames together and remove duplicate columns
6) Change month_year column into format that is acceptable in D3.js
7) Export to CSV

After cleaning the data in a jupyter notebook a .html file was created that included a javascript script. Inside the script an interactive dashboard was created that allows users to toggle between the countries and output their corresponding line charts. The pictures are below

![Image description](https://github.com/sebastiandifrancesco/Coronavirus-Dashboard/blob/main/Brazil.PNG)

![Image description](https://github.com/sebastiandifrancesco/Coronavirus-Dashboard/blob/main/India.PNG)

![Image description](https://github.com/sebastiandifrancesco/Coronavirus-Dashboard/blob/main/Mexico.PNG)

![Image description](https://github.com/sebastiandifrancesco/Coronavirus-Dashboard/blob/main/UK.PNG)

![Image description](https://github.com/sebastiandifrancesco/Coronavirus-Dashboard/blob/main/US.PNG)

From the line charts you can see that for the US and the UK around January 2021 was when the new covid cases for each month began to drop steadily. For Brazil this occurred around March 2021 and for Mexico this occurred around January 2021. Mexico notably had fewer cases than all the other four countries, but this could be due to the country not keeping a great record of the new cases. India had the most interesting line chart. In September 2020, the county’s new cases started to fall but in February 2021 the country’s new cases began to rise again. This is strange considering the vaccine was rolled out worldwide in 2021. This could suggest that there is a new variant outbreak in India that the vaccines are not protective against. 

Interactive map is now added. You can hover over the circles to view the area the pins encompass and also if you click on the circles then the map will expand into that region.
