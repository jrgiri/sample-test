# Requesting through postman

1. Clone the code
2. npm install
3. run the server "nodemon"

Post - http://localhost:8080/tasks

    1st scenario
    body - {
        "mykey":1000
    }

    2nd scenario
    body - {
        "mykey":1001,
        "timestamp": ""
    }


Get - http://localhost:8080/tasks/mykey 
### will return the value with only timestamp    

Get - http://localhost:8080/tasks/mykey?timestamp=1597699017
### will return the value with matching timestamp

Get - http://localhost:8080/tasks/mykey?timestamp=1597699010
### will return the without timestamp value with wrong timestamp

## Running test cases

1. Clone the code
2. npm install
3. npm run tests