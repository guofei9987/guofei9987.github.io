# 统计一下提交代码量

import os
import subprocess
import pandas as pd
os.chdir('../')

# %%
start_dt = '2019-05-01'
end_dt = '2019-06-20'

commits = subprocess.check_output(
    "git log --after={start_dt} --before={end_dt} --format='%s%cr'".
        format(start_dt=start_dt, end_dt=end_dt),
    shell=True)

commits = commits.decode('utf-8')

print(commits)

print('提交了' + str(len(commits.split('\n'))) + '次')


# %%
detail = subprocess.check_output(
    "git log --after={start_dt} --before={end_dt} --pretty=tformat: --numstat".
        format(start_dt=start_dt, end_dt=end_dt),
    shell=True)


detail_str=eval(str(detail).replace('\\\\','\\')).decode('utf-8')
detail_formated=[line.split('\t') for line in detail_str.split('\n') if len(line)>0]
detail_pd=pd.DataFrame(detail_formated)
print(detail_pd)