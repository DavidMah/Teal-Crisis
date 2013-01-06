#!/usr/bin/python
# Usage: python gen_image_list.py <directory>

import os
import sys

if len(sys.argv) != 3:
    print "Usage: python gen_image_list.py <directory> <prepend>"
    sys.exit(1)

directory = sys.argv[1]
prepend   = sys.argv[2]

files = os.listdir(directory)
files.sort()
files = [os.path.join(prepend, file) for file in files]

print "images: %s" % str(files)

