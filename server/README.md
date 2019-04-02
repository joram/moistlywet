- install pyenv `curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash`
- install python
    ```
    pyenv install 3.6.6
    pyenv virtualenv 3.6.6 mw
    pyenv activate mw
    pip install -r requirements.txt
    ```
- create the file `scripts/.env` and inside it add:
