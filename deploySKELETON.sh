#!/bin/bash
#WARNING: First to deploy be sure you have pushed your git project with gup build task executed succesfully 
ssh <YOUR_USER>@<YOUR_IP_SERVER> "<PROJECT-FOLDER-NAME>.git/hooks/post-update"

# NOTE folder <PROJECT-FOLDER-NAME> should be inside <YOUR_USER> home
# in my case "mortgage.git" is my name. Inside it you should create hooks folder and put post-update script but
# first of all mortgage.git content must be a clone from your github project   

# The post-update script in production server is:

# #!/bin/bash
# forever stopall
# unset 'GIT_DIR'
# cd ~/mortgage.git && git fetch origin && git pull origin master && npm install && PORT=8001 NODE_ENV=build forever start src/server/app.js
# exec git update-server-info