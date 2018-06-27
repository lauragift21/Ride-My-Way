# Ride-My-Way

[![travis badge](https://travis-ci.org/lauragift21/Ride-My-Way.svg?branch=ch-travis-setup-%23158419338) ![Coverage Status](https://coveralls.io/repos/github/lauragift21/Ride-My-Way/badge.svg?branch=develop)](https://coveralls.io/github/lauragift21/Ride-My-Way?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/80dd9e20a072d231b94b/maintainability)](https://codeclimate.com/github/lauragift21/Ride-My-Way/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/80dd9e20a072d231b94b/test_coverage)](https://codeclimate.com/github/lauragift21/Ride-My-Way/test_coverage)

Ride-My-Way is a carpooling application that provides drivers with the ability to create ride offers and passengers to join available ride offers.

## Required Features

- Users can create an account and log in.
- Drivers can add ride offers..
- Passengers can view all available ride offers.
- Passengers can see the details of a ride offer and request to join the ride. E.g What time
the ride leaves, where it is headed e.t.c
- Drivers can view the requests to the ride offer they created.
- Drivers can either accept or reject a ride request.

## Optional Features

- Users can only see and respond to ride offers from their friends on the application .
- Passengers get real time notifications when their request is accepted or rejected

## Technologies
- Nodejs
- Express
- Mocha, Chai, Babel, eslint

## API Endpoints
| Endpoint | Functionality |
|----------| ------------- |
| GET /rides | Fetch all rides |
| GET /rides/\<rideId> | Fetch a single ride offer |
| POST /rides | Create a Ride offer |
| POST /rides/\<rideId>/requests | Make a request to join a ride |

## Build Setup

```
clone repo and cd into directory

git clone https://github.com/lauragift21/Ride-My-Way.git
```
```
# install dependencies
yarn install # or npm install

#serve in development environment
yarn run dev

# build for production
yarn run build
```

## Testing

```
# Run test cases
yarn test
```

## AUTHOR

[EGWUENU GIFT](https://github.com/lauragift21)

## LICENSE

Ride My Way is [MIT licensed](https://github.com/lauragift21/Ride-My-Way/blob/develop/LICENSE)