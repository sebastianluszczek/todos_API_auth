FROM mongo:4.4

COPY init.json /init.json
CMD mongoimport --uri mongodb://mongo-auth:27017/users --collection users --type json --file /init.json --jsonArray
