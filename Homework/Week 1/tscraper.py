#!/usr/bin/env python
# Name:
# Student number:
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv

print 'HELLO EVERY0'
import os, sys; sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from pattern.web import URL, DOM, plaintext
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

TARGET_URL = URL("http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series")
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

print 'HELLO EVERY1'
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
    print 'HELLO EVERY2'
    dom = DOM(TARGET_URL.download(cached=True))
    # Get top 50 results
    for e in dom.by_tag("td.title"):
        # get title
        for a in e.by_tag("a.a")[:1]:
            print plaintext(a.content)
            print a.attrs["href"]
            print

        # get rank
        for td in e.by_tag("td.number")[:1]:
            print plaintext(td.content)
            print td.attrs["href"]
            print

        # get genre
        for span in e.by_tag("span.genre")[:1]:
            print plaintext(span.content)
            print span.attrs["href"]
            print

        # get actors/actresses
        for span in e.by_tag("span.credit")[:1]:
            print plaintext(span.content)
            print span.attrs["href"]
            print

        # get runtime (number)
        for span in e.by_tag("span.runtime")[:1]:
            print plaintext(span.content)
            print span.attrs["href"]
            print


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])

    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE TV-SERIES TO DISK

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
