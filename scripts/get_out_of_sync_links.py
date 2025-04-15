import sqlite3

import requests

# get all url, timestamp pairs from db not tagged as "bad"
conn = sqlite3.connect("index.sqlite3")
cursor = conn.cursor()

query = "SELECT url, timestamp FROM core_snapshot"

cursor.execute(query)
db_query_results = [row for row in cursor.fetchall()]

conn.close()

# get entries from pocketbase
PB_URL = "https://pocketbase.scfvi.com/api"
res = requests.get(f"{PB_URL}/collections/entries/records", params={"perPage": 500})
data = res.json()

pb_query_results = data["items"]

db_query_links = [result[0] for result in db_query_results]
pb_query_links = [result["link"] for result in pb_query_results]

printed = False

print("duplicate links in archivebox...")
db_link_set = set()
for link in db_query_links:
    if link in db_link_set:
        printed = True
        print(link)

    db_link_set.add(link)

if not printed:
    print("NONE")

print()

printed = False

print("duplicate links in pocketbase...")
pb_link_set = set()
for link in pb_query_links:
    if link in pb_link_set:
        printed = True
        print(link)

    pb_link_set.add(link)

if not printed:
    print("NONE")

print()

printed = False

print("links in archivebox but not pocketbase...")
for link in db_query_links:
    if link not in pb_link_set:
        printed = True
        print(link)

if not printed:
    print("NONE")

print()

printed = False

print("links in pocketbase but not archivebox...")
for link in pb_query_links:
    if link not in db_link_set:
        printed = True
        print(link)

if not printed:
    print("NONE")

print()

printed = False

print("out of sync archivebox_id fields...")
db_link_timestamp_map = {link: timestamp for link, timestamp in db_query_results}
for result in pb_query_results:
    link = result["link"]
    if link not in db_link_timestamp_map:
        continue

    pb_aid = result["archivebox_id"]
    if not pb_aid:
        continue

    db_aid = db_link_timestamp_map[link]
    if pb_aid != db_aid:
        printed = True
        print(f"{link} ({pb_aid}) should be {db_aid}")

if not printed:
    print("NONE")
