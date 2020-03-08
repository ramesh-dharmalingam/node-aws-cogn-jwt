 
# how to run node on docker image
```
docker run -it --rm --name node -v "%CD%":/usr/src/app -w /usr/src/app node:slim node cogn-authentication.js {username} {password}
```