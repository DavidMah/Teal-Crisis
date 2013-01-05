# This script transforms input from the body drawing tool into easy reading yaml
# This makes use of https://bitbucket.org/xi/pyyaml

import json
import yaml


INPUT_FILENAME = 'example_body_data.txt'

input_file = open(INPUT_FILENAME, 'r')
data = input_file.read()
data =  data.rstrip().split("\n")

constructed = []
for body in data:
    constructed.append(yaml.load(body))

print yaml.dump(constructed)
