# SilkTours

## FrontEnd
To initialize the repo:
```
npm install
```
To build the react/js code:
```
npm run webpack
```
To rebuild whenever code changes (this needs fixed):
```
npm run webpack-watch
```
To start the static webserver
```
npm start
```

## BackEnd
Before the python server can be run, you must have
- python 2.7
- pip
- Flask (run "pip install Flask")
- MySQL (not required for stubbed server)
- MySQLdb (not required for stubbed server)

To run the stubbed out server methods:
```
python runStubs.py
```
This will start a python webservice on localhost:5000

To run the full version of the server:
```
python run.py
```
