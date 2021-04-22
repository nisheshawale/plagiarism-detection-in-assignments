# This repository contains the code of our major project.

1. The code for plagiarism detection in text based assignment submissions is in Text Similarity/text_alignment folder. It contains the code after merging the source retrieval and text alignment task.
2. The Xgboost folder contains all the code related to plagiarism detection in source code plagiarism detection.
3. The server folder contains the backend code of node.js which accepts the request from frontend, run the plagiarism detection code and then return the response.
4. The frontend folder contains all the necessary code for frontend.
5. The compiler_backend folder contains all the necessary code for hosting the compiler backend api.

#### To run the server, you have to follow the following steps.

1. First, install all the dependencies from requirements.txt and package.json.
2. Then, you have to install Cppcheck, a static code analyzer for C/C++. Cppcheck can be installed on ubuntu using the following command.
   ```
   sudo apt-get install -y cppcheck
   ```
3. After that, you can run the server using the following command.
   ```
   node /server/src/index.js`
   ```

#### To run the Frontend and Compiler backend

1. Navigate to **_compiler_backend_** directory
2. Run the following command to start the compiler backend

   ```
   node index.js
   ```

3. Now navigate to **_frontend_** directory
4. Run the following code to install all the dependencies

   ```
   yarn
   ```

5. To run the React App, run the following code

   ```
   yarn start
   ```

# List of compiler endpoints

| EndPoint        | Description                                                   | Method | Sample Body                                                                     |
| --------------- | ------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| /api/file/:lang | Returns a template for the language code provided.            | GET    | -                                                                               |
| /api/run        | Return the console output for the code and language provided. | POST   | <pre lang="json">{<br> "lang": "lang_code", <br>"code": "full_code",<br>}</pre> |

<img width="846" alt="Screen Shot 2021-04-22 at 10 16 30 AM" src="https://user-images.githubusercontent.com/29589003/115655875-da005500-a353-11eb-90db-1dd0cfe567a7.png">
