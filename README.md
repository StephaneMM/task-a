# task-a

Assumption:
retailUnitCode = market in json file
activity = reason in json file
(1) > "handle events for multiple Customers." = publish to a topic for differente subscribers  
(2) > "a given period" = a year  
    > :customerId is present in the url but not used in the filtering as nothing said so in the pdf  


Npm run start

# (1)
(Send an event to the endpoint)
curl --location 'http://localhost:3000/FI/nzs7qmYPW4BFs2hhTOmdW' \  
--header 'Content-Type: application/json' \  
--data '{"id":"VbviTfCoGNA2dLp7SiEoe","time":1698923744084,"market":"FI","customerId":"fi.customer-01","reason":"PURCHASE","reasonTime":1697506692598,"businessUnit":"BU02","type":"INCREASED","value":1618}'  
+  
Connexion to GCP (Application Default Credentials  
+  
(Demo: Observe a message being send to balance-transactions Topic )  
![Screenshot 2024-02-05 154036](https://github.com/StephaneMM/task-a/assets/33634380/ac622f4c-e37c-4557-b3a4-3acd3edd1f66)  
+  
(Demo: Pull message to your Subscriber balance-transactions-sub > Messages > -Pull- )  
![Screenshot 2024-02-05 153339](https://github.com/StephaneMM/task-a/assets/33634380/a921c760-5425-4e80-bac2-28213539994e)  

  
# (2)
Using postman GET http://localhost:3000/IT/us.customer-01/PURCHASE/2023 
{
    "January": {
        "openingBalance": 0,
        "closingBalance": 0
    },
  {...}
    "September": {
        "openingBalance": 0,
        "closingBalance": 2325
    },
    "October": {
        "openingBalance": 2325,
        "closingBalance": 1913
    },
    "November": {
        "openingBalance": 1913,
        "closingBalance": 1761
    },
    "December": {
        "openingBalance": 1761,
        "closingBalance": 3600
    }
}
