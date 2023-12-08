# summerproject

## Developer: Nickolas Ramirez

## Run your own copy of this website
*There are two main folders in this directory--one for the back-end and one for the front-end.*
### Running the back-end
1. Set up your database entitled 'classprep' on mongodb with two groups--group1 and group2.
2. An example of the database schemas are at the end of this document
3. Set up a .env file within your own copy of the dbconnect/src folder. Within the file, set DB_URI to equal your mongodb connection url.
4. From within the command console run **node index.js** within the dbconnect/src folder
### Running the front-end
1. from within the command console run **npm start** within the classprep folder

## DB Schemas
 
#### group1 (the class data)
 {
 "_id":{"$oid":"64ca1707ef65f48283bb6438"},
  
 "title":"class1",
  
 "type":"class",
  
 "desc":"Programming Fundamentals: Explore the fundamental principles of programming, including variables, data types, and basic control structures like loops and conditionals.",
  
 "prereq":"none",
  
 "year":{"$numberInt":"1"},
  
 "quarter":{"$numberInt":"1"},
  
 "resources":[
  
 {"title":"demo article",
   
 "desc":"article that covers [subject]",
   
 "type":"article","link":"www.[link]"},
   
 {"title":"\"Mastering Python: From Beginner to Pro\"",
   
 "desc":"brief video covering [subject]","type":"video","link":"www.[link]"}
   
 ]
 }

#### group2 (the user data)
 {
 
 "_id":{"$oid":"651529dafb478359707246aa"},
 
 "username":"USERNAME",
 
 "password":"PASSWORD",
 
 "classes":["class1","blass1","alass1","John Cena"]
 
 }
