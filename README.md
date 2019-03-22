# moistlywet
Documentation and configuration for a plant moisture control module and API.

## Initial infrastructure thoughts

### API/Web-UI Stack
- Datastore: postgres RDS
- Server: lambda (using zappa/flask)
     - Auth stuff:
           - API: using custom API keys per module
           - Web: google-oauth
- Client: react (hand bombing rest API usage?)
