#!/bin/bash
#WARNING: First to deploy be sure you have pushed your git project with gulp build task executed succesfully 
ssh <YOUR_USER>@<YOUR_IP_SERVER> "<PROJECT-FOLDER-NAME>.git/hooks/post-update"

# NOTE folder <PROJECT-FOLDER-NAME> should be inside <YOUR_USER> home
# in my case "mortgage.git" is my name. Inside it you should create hooks folder and put post-update script but
# first of all mortgage.git content must be a clone from your github project

# We launch our node express server using forever package. Install it globally "npm install -g forever" . Forever is always
# aware our server is running if it fails it restart again
# We need to execute forever as a sudo without password interactive asking. We can do it editing  /etc/sudoers and adding
# user ALL=(ALL:ALL) NOPASSWD:/usr/local/bin/forever
# this is mandatory because in linux systems whatever process  trying to use a network port under 1024 should be root
# If we use upper ports we can miss this step

# The post-update script in production server is:

# #!/bin/bash
# forever stopall
# unset 'GIT_DIR'
# cd ~/<PROJECT-FOLDER-NAME>.git && git fetch origin && git pull origin master && npm install && sudo PORT=80 NODE_ENV=build forever start src/server/app.js
# exec git update-server-info