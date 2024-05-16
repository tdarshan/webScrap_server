The live API is served on : https://webscrap-server.onrender.com/

The home URL will server simple HTML Page (For testing purpose).


GET : '/test-api' : For testing purpose 

POST : '/getData' : 
    requires 'url' as payload in body
    returns test/words

POST : '/mediaLinks' :
    requires 'url' as payload in body
    returns image urls

POST : '/webLinks' : 
    requires 'url' as payload in body
    returns urls

POST : '/saveData' : 
    requires { domainName, wordCount, webLinks, mediaLinks } as payload in body
    saves data and returns data object

GET : '/getAllData' : 
    reutrns all the data saved in the database

PUT : '/addFavourite' : 
    requires 'id' in payload
    update specific tuple as favourite and returns updated data

PUT : 'removeFavourite' :
    requires 'id' in payload
    update specific tuple as non-favourite and returns updated data

delete : '/removeData' :
    requires 'id' in payload
    deletes specific record

GET : '/getOne' :
    requires 'id' in payload
    returns specific record with given id