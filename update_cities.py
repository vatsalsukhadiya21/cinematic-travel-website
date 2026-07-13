import requests
from bs4 import BeautifulSoup
import json
import re

headers = {'User-Agent': 'Mozilla/5.0'}

def get_cities():
    r = requests.get('https://www.cntraveler.com/galleries/2016-01-08/the-50-most-beautiful-cities-in-the-world', headers=headers)
    # The images in cntraveler are often in <script> tags as JSON, or as <picture> elements. Let's just use regex on the raw HTML
    urls = re.findall(r'https://media\.cntraveler\.com/photos/[^\s\"\'\)\<\]]+', r.text)
    
    unique_imgs = []
    seen = set()
    for u in urls:
        if 'w_1280' in u or 'w_1600' in u or 'w_1000' in u: # Filter for good sizes
            # remove trailing crap
            u = u.split('?')[0]
            if u not in seen:
                seen.add(u)
                unique_imgs.append({'url': u, 'location': 'Beautiful City'})
    return unique_imgs[:15]

cities = get_cities()
print(f"Got {len(cities)} cities.")

with open('nature.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace living (best city to live)
living_str = "living: [\n"
for idx, img in enumerate(cities):
    living_str += f'                {{"url": "{img["url"]}", "location": "{img["location"].replace("\"", "")}"}}'
    if idx < len(cities) - 1:
        living_str += ",\n"
    else:
        living_str += "\n"
living_str += "            ]"

content = re.sub(r'living:\s*\[.*?\]', living_str, content, flags=re.DOTALL)

with open('nature.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("nature.html updated with cities.")
