import csv
import pprint

with open('/Applications/MAMP/htdocs/streetartmap/2009-2011_City_Survey_Database_income copy.csv', 'rU') as csvfile:
	
	city_income = csv.reader(csvfile, delimiter=',')
	
	item = []

	for row in city_income:
		item.append(row);

csvfile.close() 

store = []
i_count = 0
z_count = 0
z_store = []

for n in range(0, len(item)): 
	#first possible comparison fails/ store info in list 
	if n == 0:
		if item[n][1] == item[n+1][1]:
			if item[n][5] == item[n+1][5]:
				z_count += 1
				if item[n][4] == item[n+1][4]:
					i_count += 1
				else:
					i_count += 1
					store.append([item[n][1] , item[n][5], item[n][6], item[n][4], i_count])
					i_count = 0
			else :
				i_count += 1
				store.append([item[n][1] , item[n][5], item[n][6], item[n][4], 1])
				i_count = 0
				z_store.append([item[n][1], item[n][5] , z_count])
				z_count = 0
		else :
			i_count += 1
			store.append([item[n][1] , item[n][5], item[n][6], item[n][4], 1])
			i_count = 0
			z_store.append([item[n][1], item[n][5] , z_count])
			z_count = 0

	elif n == len(item) - 1:
		if item[n][1] == item[n-1][1]:	
			if item[n][5] == item[n-1][5]:
				z_count += 1
				if item[n][4] == item[n-1][4]:
					i_count += 1
					store.append([item[n][1] , item[n][5], item[n][6], item[n][4], i_count])
				else:
					i_count += 1
					store.append([item[n][1] , item[n][5], item[n][6], item[n][4], i_count])
					i_count = 0
			else :
				i_count += 1
				store.append([item[n][1] , item[n][5], item[n][6], item[n][4], 1])
				i_count = 0
				z_store.append([item[n][1], item[n][5] , z_count])
				z_count = 0
		else:
			i_count += 1
			store.append([item[n][1] , item[n][5], item[n][6], item[n][4], 1])
			i_count = 0
			z_store.append([item[n][1], item[n][5] , z_count])
			z_count = 0

	else:
		if item[n][1] == item[n+1][1]:
			if item[n][5] == item[n+1][5]:
				z_count += 1
				if item[n][4] == item[n+1][4]:
					i_count += 1
				else:
					i_count += 1
					store.append([item[n][1] , item[n][5], item[n][6], item[n][4], i_count])
					i_count = 0
			else :
				i_count += 1
				store.append([item[n][1] , item[n][5], item[n][6], item[n][4], i_count])
				i_count = 0
				z_store.append([item[n][1], item[n][5] , z_count])
				z_count = 0
		else:
			i_count += 1
			store.append([item[n][1] , item[n][5], item[n][6], item[n][4], 1])
			i_count = 0
			z_store.append([item[n][1], item[n][5] , z_count])
			z_count = 0

#income thresholds 
#1 less than 10,000
#2 10,000 to 24,999
#3 25,000 to 49,999
#4 50,000 to 99,999
#5 more than 100,000


#store [0 year, 1 zipcode, 2 district, 3 income threshold, 4 count]

result = []
index = 1
w_income = 0
for i in range(1, len(store)):

	if(index < len(z_store)):
		if z_store[index][0] == store[i][0] and z_store[index][1] == store[i][1]:
			if store[i][3] == '1':
				w_income += store[i][4]*1
			elif store[i][3] == '2':
				w_income += store[i][4]*10000
			elif store[i][3] == '3':
				w_income += store[i][4]*25000
			elif store[i][3] == '4':
				w_income += store[i][4]*50000
			elif store[i][3] == '5':
				w_income += store[i][4]*100000
			else:
				w_income += 0
		else:
			result.append([store[i][0], store[i][1], w_income/z_store[index][2]])
			index += 1
			w_income = 0


with open('2009-11_sfWeightedIncomebyZipcode.csv', 'w') as csvfile:
	write_data = csv.writer(csvfile, delimiter= ',', quotechar='|', quoting=csv.QUOTE_MINIMAL)

	for i in range(0, len(result)):
		write_data.writerow(result[i])

	csvfile.close()
"""
with open(result[0][0] + '_sfWeightedIncomebyZipcode.csv', 'w') as csvfile:
	write_data = csv.writer(csvfile, delimiter= ',', quotechar='|', quoting=csv.QUOTE_MINIMAL)

	for i in range(0, len(result)):
		if i == 0:
			if result[i][0] == result[i+1][0]:
				write_data.writerow(result[i])
			else:
				csvfile.close()
				with open(result[i][0] + '_sfWeightedIncomebyZipcode.csv', 'w') as csvfile:
					write_data = csv.writer(csvfile, delimiter= ',', quotechar='|', quoting=csv.QUOTE_MINIMAL)

		elif i == len(result) -1:
			if result[i][0] == result[i+1][0]:
				write_data.writerow(result[i])
			else:
				csvfile.close()
	
		else:
			if result[i][0] == result[i+1][0]:
				write_data.writerow(result[i])
			else:
				csvfile.close()
				with open(result[i][0] + '_sfWeightedIncomebyZipcode.csv', 'w') as csvfile:
					write_data = csv.writer(csvfile, delimiter= ',', quotechar='|', quoting=csv.QUOTE_MINIMAL)

                        

"""

pprint.pprint(store)
pprint.pprint(z_store)
pprint.pprint(result)



#Sample row: entry id, year of survey, mode, language, income, zipcode, district, region
#['200912331', '2009', '1', '1', '4', '88888', '1', '4']