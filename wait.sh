# !/bin/bash
# use wait.sh in Dockerfile always exit with 1, even though I force dockerfile CMD ["sleep","10000"] then log into docker and execute
# exact sme command either node app.js or npm start they both work, it just can't make it through script damn it
sleep 20
npm start