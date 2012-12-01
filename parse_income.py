import csv

with open('/Applications/MAMP/htdocs/streetartmap/2009-2011_City_Survey_Database_income.csv', 'rU') as csvfile:
	
	city_income = csv.reader(csvfile, delimiter=',')
	
	item = []

	for row in city_income:
		#data = row[0].split(',')
		item.append(row);


	print(item[1][1])

