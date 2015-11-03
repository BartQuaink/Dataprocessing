#!/usr/bin/env python
# Name:
# Student number:
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv

import os, sys; sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from pattern.web import URL, DOM, plaintext
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

TARGET_URL = URL("http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series")
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

showlist = dict()

def extract_tvseries(dom):
    '''
    Extract a list of highest ranking TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Ranking
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RANKING TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.
    dom = DOM(TARGET_URL.download(cached=True))
    # Get top 50 results
    for e in dom.by_tag("td.title"):
        # get title
        for a in e.by_tag("a")[:1]:
            title = plaintext(a.content)
            print title
            print

        # get ranking
        for td in e.by_tag("span.value")[:1]:
            ranking = plaintext(td.content)
            print ranking
            print

        # get genre
        for span in e.by_tag("span.genre")[:1]:
            genre = plaintext(span.content)
            print genre
            print

        # get actors/actresses
        for span in e.by_tag("span.credit")[:1]:
            actors = plaintext(span.content)
            print actors
            print

        # get runtime (number)
        for span in e.by_tag("span.runtime")[:1]:
            runtime = plaintext(span.content)
            print runtime
            print

        # create a dictionary of all the retrieved info
        showlist[e] = {title, ranking, genre, actors, runtime}

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])

    # write every title, ranking, genre, actors and runtime in a new row
    for series in tvseries:
        writer.writerow([tvseries[series][0], series, tvseries[series][1], tvseries[series][2], tvseries[series][3], tvseries[series][4]])

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
