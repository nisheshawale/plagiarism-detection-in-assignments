# This repository contains the backend code deployed on AWS of our major project.

1. The code for plagiarism detection in text based assignment submissions is in Text Similarity/text_alignment folder. It contains the code after merging the source retrieval and text alignment task.
2. The Xgboost folder contains all the code related to plagiarism detection in source code plagiarism detection. 
3. The server folder contains the backend code of node.js which accepts the request from frontend, run the plagiarism detection code and then return the response.

#### To run the server, you have to follow the following steps.
1. First, install all the dependencies from requirements.txt and package.json.
2. Then, you have to run the following command
   `node /server/src/index.js`
