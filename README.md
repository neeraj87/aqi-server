# aqi-server

> API/Backend for Air Quality Index (AQI)

## Project timeline
Time taken: 2 days
List of features built:
1. Database setup
2. Reading AQI data from the WebSocket and saving hourly AQI data in the database
3. API for sending AQI data for a given city within a date range
4. API for sending the city with poorest and best AQI for a given date range

## Project setup
```
npm install
```

### Environment Variables
1. Create .env file in your projects root folder
2. Add the following environment variables
```
API_TOKEN=api-token-to-secure-api-access
DB_USER=admin-username
DB_USER_PASSWORD=admin-password
DB_NAME=database-name
PORT=port
WSS=wss://city-ws.herokuapp.com
```