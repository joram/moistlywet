- install pyenv `curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash`
- install python
    ```
    pyenv install 3.6.6
    pyenv virtualenv 3.6.6 moistlywet
    pyenv activate moistlywet
    pip install -r requirements.txt
    ```
- create the file `scripts/.env` and inside it add:
```

```

- create the file `~/.aws/credentials` and inside it add:
```
[moistlywet]
aws_access_key_id=...
aws_secret_access_key=...
```

- create the file `~/.aws/config` and inside it add:
```
[moistlywet]
region=us-west-2
output=json
```

then run `aws configure`