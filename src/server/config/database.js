// config/database.js

/*< DB CONFIGURATION >*/
dbtype = "mongodb";
dbhost = "localhost";
dbport = 27017;
dbname = "timeforjob";

/* L'url del DB su cui effettuare le connection */
dburl = dbtype+"://"+dbhost+":"+dbport+"/"+dbname;
/* </ DB CONFIGURATION > */

module.exports = {

    'url' : dburl, // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    'PORT': 10000,
    'secret': 'BisterIsAwesome'
};