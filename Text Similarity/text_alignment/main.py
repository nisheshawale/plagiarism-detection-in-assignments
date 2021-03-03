import os
import json
import sys

import source_main
import s_bert

path = os.path.dirname(os.path.abspath(__file__)) + '/files/'
total_files = os.listdir(path)
with open(os.path.dirname(os.path.abspath(__file__)) + "/files.txt", "r", encoding = "utf-8") as f:
    previous_files = f.read()
if set(total_files) == set(list(previous_files.split(" "))):
    sys.exit(0)

else:
    with open(os.path.dirname(os.path.abspath(__file__)) + "/files.txt", "w", encoding = "utf-8") as f:
        f.write(' '.join([str(elem) for elem in total_files]))

    # print('Hello world')

    compared = []
    output = {}
    count = 0
    threshold = 25
    source_dict = {}

    for file in total_files:
        retrieved_files = source_main.source_retrieval(file, threshold)
        print('###########################')
        print(retrieved_files)
        
        if retrieved_files:
            source_dict[file] = retrieved_files

        for r_file in retrieved_files:
            if ((file, r_file) in compared) or ((r_file, file) in compared):
                continue
            # print(file, r_file)
            features = s_bert.text_main(path, file, r_file)
            count += 1
            output[count] = {}
            output[count][file] = []
            output[count][r_file] = []

            if not features:
                print('Not plagiarised')
            else:
                for f in features:
                    output[count][file].extend([f[0][0], (f[0][1] - f[0][0])])
                    output[count][r_file].extend([f[1][0], (f[1][1] - f[1][0])])
            compared.append((file, r_file))

    result = json.dumps(output)
    source_result = json.dumps(source_dict)
    print(source_dict)

    # Writing to final_output.json 
    with open(os.path.dirname(os.path.abspath(__file__)) + "/final_output.json", "w") as outfile: 
        outfile.write(result) 

    with open(os.path.dirname(os.path.abspath(__file__)) + "/source_retrieval.json", "w") as outfile:
        outfile.write(source_result)

