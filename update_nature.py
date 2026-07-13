import requests
from bs4 import BeautifulSoup
import json
import re

headers = {'User-Agent': 'Mozilla/5.0'}

def get_historical():
    r = requests.get('https://www.bucketlisttravels.com/round-up/worlds-greatest-historic-building', headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    imgs = []
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        if src and ('jpg' in src or 'jpeg' in src) and 'http' in src:
            alt = img.get('alt', 'Historical Place')
            imgs.append({'url': src, 'location': alt.strip()})
    
    unique_imgs = []
    seen = set()
    for img in imgs:
        if img['url'] not in seen:
            seen.add(img['url'])
            unique_imgs.append(img)
    return unique_imgs[:15]

def get_cities():
    r = requests.get('https://www.cntraveler.com/galleries/2016-01-08/the-50-most-beautiful-cities-in-the-world', headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    imgs = []
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        if src and ('jpg' in src or 'jpeg' in src or 'webp' in src) and 'http' in src:
            alt = img.get('alt', 'Beautiful City')
            if 'w_1000' in src or 'w_1280' in src: # cntraveler has multiple sizes
                imgs.append({'url': src, 'location': alt.strip()})
    unique_imgs = []
    seen = set()
    for img in imgs:
        if img['url'] not in seen:
            seen.add(img['url'])
            unique_imgs.append(img)
    return unique_imgs[:15]

def get_forest():
    r = requests.get('https://www.nathab.com/blog/rain-forest-ecotourism-adventures', headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    imgs = []
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        if src and ('jpg' in src or 'jpeg' in src) and 'http' in src:
            alt = img.get('alt', 'Rain forest adventure')
            if '150x150' not in src:
                imgs.append({'url': src, 'location': alt.strip()})
    unique_imgs = []
    seen = set()
    for img in imgs:
        if img['url'] not in seen:
            seen.add(img['url'])
            unique_imgs.append(img)
    return unique_imgs[:15]

hist = get_historical()
cities = get_cities()
forest = get_forest()

print(f"Got {len(hist)} historical, {len(cities)} cities, {len(forest)} forest.")

with open('nature.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace forest
forest_str = "forest: [\n"
for idx, img in enumerate(forest):
    forest_str += f'                {{"url": "{img["url"]}", "location": "{img["location"].replace("\"", "")}"}}'
    if idx < len(forest) - 1:
        forest_str += ",\n"
    else:
        forest_str += "\n"
forest_str += "            ]"

content = re.sub(r'forest:\s*\[.*?\]', forest_str, content, flags=re.DOTALL)

# Replace historical
hist_str = "historical: [\n"
for idx, img in enumerate(hist):
    hist_str += f'                {{"url": "{img["url"]}", "location": "{img["location"].replace("\"", "")}"}}'
    if idx < len(hist) - 1:
        hist_str += ",\n"
    else:
        hist_str += "\n"
hist_str += "            ]"

content = re.sub(r'historical:\s*\[.*?\]', hist_str, content, flags=re.DOTALL)

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

print("nature.html updated.")
