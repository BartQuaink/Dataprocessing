import csv
import json

# load data from text file
input_file = open('population.json', 'r')

# create output file
output_file = open('populationnew.json', 'w')

# select data from each row
reader = csv.reader(input_file)

# create list for all data
data = []

# iterate over each row
for row in reader:
    row[0].replace('{', '[')
    data.append(row)

# write file
json.dump(data, output_file, indent = 4)
output_file.write('\n')
