import sqlite3
import sys

import requests

conn = sqlite3.connect("index.sqlite3")
cursor = conn.cursor()

# get all url, timestamp pairs from db not tagged as "bad"
query = """
SELECT s.url, s.timestamp
FROM core_snapshot s
WHERE s.id NOT IN (
    SELECT st.snapshot_id
    FROM core_snapshot_tags st
    JOIN core_tag t ON st.tag_id = t.id
    WHERE t.name = 'bad'
)
"""

cursor.execute(query)
db_query_results = [row for row in cursor.fetchall()]

conn.close()

# build map from db url to db timestamp
link_to_timestamp = {}
for link, timestamp in db_query_results:
    assert link not in link_to_timestamp
    link_to_timestamp[link] = timestamp

email = sys.argv[1]
password = sys.argv[2]

PB_URL = "https://pocketbase.scfvi.com/api"

# authenticate
res = requests.post(
    f"{PB_URL}/collections/_superusers/auth-with-password",
    data={"identity": email, "password": password},
)
data = res.json()
token = data["token"]

# get all id, link pairs from pocketbase
# NOTE: this assumes there are <500 entries
res = requests.get(f"{PB_URL}/collections/entries/records", params={"perPage": 500})
data = res.json()

pb_query_results = [(entry["id"], entry["link"]) for entry in data["items"]]

# update archivebox_id fields
for id, link in pb_query_results:
    if link not in link_to_timestamp:
        continue

    timestamp = link_to_timestamp[link]

    res = requests.get(
        f"{PB_URL}/collections/entries/records/{id}",
        headers={"Authorization": token},
        data={"archivebox_id": timestamp},
    )

    if res.status_code != 200:
        print(f"ERROR for link {link}", res.text)

    print(f"{link} backfilled with archivebox_id {timestamp}")

print("done")
