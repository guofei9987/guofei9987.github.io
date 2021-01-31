
## Excel
```
[num,txt,raw,custom] = xlsread(filename,sheet,xlRange,'basic',processFcn)
```

'basic'   Does not support an xlRange input when reading XLS files. In this case, use '' in place of xlRange.

xlRange = 'B2:C3'



xlswrite(filename,A,sheet,xlRange)

```
filename = 'testdata.xlsx';
A = {'Time','Temperature'; 12,98; 13,99; 14,97};
sheet = 2;
xlRange = 'E1';
xlswrite(filename,A,sheet,xlRange)
```
