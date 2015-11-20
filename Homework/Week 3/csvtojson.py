import csv
import json

# load data from text file
input_file = open('KNMINEW.csv', 'r')

# create output file
output_file = open('KNMINEW.json', 'w')

# select data from each row
reader = csv.reader(input_file, delimiter = ',')

# create list for all data
data = []

# iterate over each row
for row in reader:
    data.append(row)

# write file
json.dump(data, output_file, indent = 4)
output_file.write('\n')
