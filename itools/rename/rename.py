#!/usr/bin/python
# Usage: python gen_image_list.py <directory>

import os
import sys

if len(sys.argv) != 2:
    print "Usage: python gen_image_list.py <directory>"
    sys.exit(1)

directory = sys.argv[1]

files = os.listdir(directory)
files.sort()
files = [os.path.join(directory, file) for file in files]

count = 1
for f in files:
    new_name = str(count).zfill(3) + ".jpg"
    # os.rename(f, os.path.join(directory, new_name))
    print "%s %s" % (f, os.path.join(directory, new_name))
    count += 1


