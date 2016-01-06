import csv
import json

inputfile = open("population.csv", "r")
fields = ["country_code", "country", "population"]

reader = csv.reader(inputfile, dialect=csv.excel_tab)

output = {}

for row in reader:

    data = {}
    population = each["population"]
    data["population"] = population
    output[each["country_code"]] = data

with open("population.json", "w") as outfile:
    json.dump(output, outfile, sort_keys = True, indent = 4, ensure_ascii = False)
