import re
import json

with open(r'C:\Users\Asus\.gemini\antigravity-ide\brain\d66bdebd-be41-4708-b8e3-45ae6d3be180\.system_generated\steps\20\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# find all urls
urls = re.findall(r'https://[^"\'\)\s]+\.jpg[^\s"\'\)]*', text)
# clean them
urls = [u.replace('\\u0026', '&').replace('&amp;', '&') for u in urls]
# unique
urls = list(set(urls))

mountains = urls[:15]
beaches = urls[15:30]

print("mountains:")
for u in mountains:
    print(f"                '{u}',")

print("\nbeaches:")
for u in beaches:
    print(f"                '{u}',")
