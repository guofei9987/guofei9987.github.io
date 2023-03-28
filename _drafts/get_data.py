import requests
import json

r = requests.get('https://www.guofei.site/data4blog/achievement.json').text

print(r)
with open('_data/achievement.json', 'w') as f:
    json.dump(json.loads(r), f, ensure_ascii=False, indent=0)
