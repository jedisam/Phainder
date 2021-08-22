# Phainder
## Pharmacy finder and manager api


### Navigation
- [Phainder](#phainder)
  - [Pharmacy finder and manager api](#pharmacy-finder-and-manager-api)
    - [Navigation](#navigation)
    - [About](#about)
    - [Objective](#objective)
  - [Getting Started](#getting-started)
    - [<b>Docker</b>](#bdockerb)
    - [<b>Machine Setup</b>](#bmachine-setupb)
    - [Testing](#testing)
  - [Author](#author)
    

 



### About
<p>A Pharmacy finder api for any user which tracks pharmacies by available drugs and locates them to the user by their respective distance to the user. </p>
**version 1.0.0**

### Objective
The project aims to help any signedup user to eaisly access nearby pharmacies as well manage his prescriptions. 

## Getting Started
- These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### <b>Docker</b>
  
  This is the easiest way to get it up and runing.

  It is containerized application with docker image put on docker hub.A docker image is available with all pre-requisites installed. Here is how you use it

<b>Pull docker image</b>

 ```bash
docker pull jedisam/phainder:latest
```
<b>Run the docker Image</b>
 ```bash
docker run --rm -it -p 8000:8000/tcp jedisam/phainder:latest
```

### <b>Machine Setup</b>
  First, you need to have <b>NodeJS</b> installed on your system.
  
  <b>Clone the project into your local machine </b>

 ```bash
git clone https://github.com/jedisam/Phainder.git
```

  <b>Install the packages</b>

 ```bash
 cd Phainder && yarn install
```

  <b>Start the server</b>

 ```bash
npm start
```

### Testing
<p> Mocha and Chai were used to test the REST API.</p> Test files are in test directory.

<b>To RUN the tests</b>

```bash
 npm test
```


## Author

- **Yididya Samuel** [Website](https://jedisam.github.io/)





