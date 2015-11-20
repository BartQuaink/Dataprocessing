import csv
import numpy as np

# load data from text file
input_file = np.genfromtxt(r'KNMI.csv', delimiter = ',', names = True, dtype = None)

# create output file
output_file = open('KNMINEW.csv', 'w')

# call up writer
writer = csv.writer(output_file)

i = 0

# iterate over each row
for rows in b:
    # get year and split and concatenate into correct format
    date = b['YYYYMMDD'][i]
    date = str(date)
    year = date[:4]
    month = date[4:6]
    day = date[6:8]
    realdate = year+'/'+month+'/'+day

    # get temperature
    temperature = b['TX'][i]

    # write into a new file
    writer.writerow([realdate, temperature])
    i += 1
