import os
import re 
import sys 
import time
from tqdm import tqdm 

PATTERN = r'[(]\d+[)][\.].+$'
try:
    PATH = sys.argv[1]
except:
    print("PROVIDE PATH")
    exit()

file_list = os.listdir(PATH)
count = 0
start = time.time() 
for f in tqdm(file_list):
    if re.search(PATTERN, f):
        os.remove(os.path.join(PATH, f))
        count += 1

print()
print(f"Removed {count}", "file" if count == 1 else "files", f"in {time.time() - start :.02f} sec")
