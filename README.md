# moistlywet
Documentation and configuration for a plant moisture control module and API.

## Running 
`npm start`

## Initial infrastructure thoughts

### API/Web-UI Stack
- Datastore: postgres RDS
- Server: lambda (using zappa/flask)
     - *Auth stuff:*
     - API: using custom API keys per module
     - Web: google-oauth
- Client: react/S3 (hand bombing rest API usage?)
