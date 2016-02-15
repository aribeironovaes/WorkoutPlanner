# Playing with the app

The current deployed code is been deployed at:

https://intense-thicket-9526.herokuapp.com

# Installing dependencies

First of all install node js. Then install the following dependencies:


```
npm install -g typescript
npm install nodemailer
```

# Compiling and running

* Compile and run tests

```
build.sh
```

* Starting the node server

```
node ./server.js
```

* Pushing live

```
git push heroku master
```

# Known Bugs
* server should log status and error more cleanly. this includes emails as well

# Feature requests
* Add average speed as a profile entity
* Extract speed estimation (consider weight, altitude and drag coefficient)
* Refactor getMRCFile into a visitor
* Refactor ZwiftDataVisitor to move finalize() into the base
* Add training zones
* Fix running training zones

```
Z2 (77-87)
Z3 (88-94)
Z4 (95-101)

```
* Add free ride do zwift
        <FreeRide Duration="600" FlatRoad="1"/>
* Add react for generating emails


* D.ts files:
** https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/node/node.d.ts
