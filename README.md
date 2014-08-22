See README for municipal.

This app is meant to be run simultaneously with 'municipal', so run it on a
different port (since municipal by default runs on port 3000). 

Also, it needs to be connected to the same DB as municipal. TO achieve this,  
use the following command:

MONGO_URL=mongodb://localhost:27017/municipal-dev meteor --port 3001

Change the DB name (municipal-dev), Mongo port (27017) and meteor port (3001) 
to suit your requirements. Remember to also start your Mongo instance via the 
'mongod' command if needed.
