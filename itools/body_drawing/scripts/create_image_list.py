# create_image_list.py
# This script is used to find all of the files in the images directory for
# the body drawing tool. The output of this script is the file list input
# for the body drawing tool.
import os
import sys

PATH_DIFFERENCE = ".."

DIRECTORY = os.path.join(PATH_DIFFERENCE, "assets", "images", sys.argv[1])
OUTPUT_FILENAME = os.path.join(PATH_DIFFERENCE, "assets", "information.js")

def blacklist(pathname):
    return (".JPG" in pathname or ".jpg" in pathname or "background" in pathname or "cover" in
            pathname)

def add_entry(pathname):
    if not blacklist(pathname):
        entries.append(pathname[len(PATH_DIFFERENCE) + 1:])

def crawl(directory, entries):
    for entry in os.listdir(directory):
        full_entry = os.path.join(directory, entry)
        if os.path.isdir(full_entry):
            crawl(full_entry, entries)
        else:
            add_entry(full_entry)

entries = []
crawl(DIRECTORY, entries)
entries.sort()

output =  "imageList = %s;" % str(entries)
output_file = open(OUTPUT_FILENAME, 'w')
output_file.write(output)
output_file.close()
