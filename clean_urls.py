import re

with open('nature.html', 'r', encoding='utf-8') as f:
    content = f.read()

# find all living array urls and clean them up
def clean_url(match):
    full_match = match.group(0)
    url = match.group(1)
    
    # Clean up the URL by stripping everything after .jpg or .png or .webp if there is junk
    # Actually, let's just split by &quot;
    url = url.split('&quot;')[0]
    # some might have %2C instead of , but that's fine
    
    return f'"url": "{url}"'

content = re.sub(r'"url":\s*"([^"]+)"', clean_url, content)

with open('nature.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up nature.html URLs")
