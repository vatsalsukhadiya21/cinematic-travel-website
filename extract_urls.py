import re
import json

def get_image_urls(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # match all urls
    urls = re.findall(r'https?://[^\s\"\'\)\<\]]+', content)
    # filter for images
    img_urls = []
    for u in urls:
        u_lower = u.lower()
        if '.jpg' in u_lower or '.jpeg' in u_lower or '.png' in u_lower or '.webp' in u_lower or 'image' in u_lower or 'photo' in u_lower:
            if 'w=0&k=20' not in u_lower: # filter out low res or specific gettys from existing? wait, getty images in nature.html have w=0&k=20, that's fine.
                pass
            img_urls.append(u)
    
    # Let's try to match URLs more loosely, sometimes they are in markdown like [text](url)
    md_links = re.findall(r'\]\((https?://[^\)]+)\)', content)
    for u in md_links:
        img_urls.append(u)
        
    # remove dupes but preserve order
    seen = set()
    unique_urls = []
    for u in img_urls:
        if u not in seen and ('jpg' in u.lower() or 'jpeg' in u.lower() or 'png' in u.lower() or 'webp' in u.lower()):
            seen.add(u)
            unique_urls.append(u)
    return unique_urls

h_urls = get_image_urls(r'C:\Users\Asus\.gemini\antigravity-ide\brain\eb49a0cd-f514-49f5-8eff-b87fc3fcd66b\.system_generated\steps\35\content.md')
c_urls = get_image_urls(r'C:\Users\Asus\.gemini\antigravity-ide\brain\eb49a0cd-f514-49f5-8eff-b87fc3fcd66b\.system_generated\steps\36\content.md')
f_urls = get_image_urls(r'C:\Users\Asus\.gemini\antigravity-ide\brain\eb49a0cd-f514-49f5-8eff-b87fc3fcd66b\.system_generated\steps\37\content.md')

print("Historical:", len(h_urls))
print(h_urls[:5])

print("Cities:", len(c_urls))
print(c_urls[:5])

print("Forest:", len(f_urls))
print(f_urls[:5])
