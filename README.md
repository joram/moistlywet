# moistlywet
Documentation and configuration for moistlywet.com, 
a plant moisture control device,
used to simulate the watering cycle of rain.


## Client 
A React app. Hosted out of an S3 bucket.

*running locally*: `./scripts/run`

*deploying*: `./scripts/deploy`


## Server
A flask app, deployed as lambda functions (using zappa).
Storing it's data in dynamodb.

*running locally*: `./scripts/run`

*deploying*: `./scripts/deploy`


## Device
an ESP8266, running the python env,
still figuring out the details there.
