import requests
import json

r = requests.get('https://api.github.com/users/guofei9987').text

data_github = dict()

data_github['followers'] = json.loads(r)['followers']

# %%
total_star, total_fork = 0, 0

github_id = 'guofei9987'
url = 'https://api.github.com/users/{github_id}/repos?page={page_id}'
repo_list = []
page_id = 1
while True:
    r = requests.get(url.format(github_id=github_id, page_id=page_id))
    repo_array = json.loads(r.content.decode('utf-8'))
    if len(repo_array) == 0:
        break

    for repo in repo_array:
        repo_list.append({
            'name': repo['name'], 'url': repo['html_url'], 'is_fork': repo['fork']
            , 'star_cnt': repo['stargazers_count'], 'fork_cnt': repo['forks_count']
            , 'language': repo['language'], 'description': repo['description']
            , 'open_issues_count': repo['open_issues_count']
        })
    page_id += 1

# sort by number of stars
repo_list = sorted(repo_list, key=lambda x: x['star_cnt'], reverse=True)

# %%

total_star = sum(i['star_cnt'] for i in repo_list)
total_fork = sum(i['fork_cnt'] for i in repo_list)

data_github['star_cnt'] = total_star
data_github['fork_cnt'] = total_fork
data_github['star_cnt_str'] = str(round(total_star / 1000, 1)) + 'k'
data_github['fork_cnt_str'] = str(round(total_fork / 1000, 1)) + 'k'

data_github['repo_list'] = repo_list

# %%
print(data_github)

with open('_data/data_github.json', 'w') as f:
    json.dump(data_github, f, ensure_ascii=False, indent=0)
