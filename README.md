# Smile Sales Frontend
This is the main website of the SMILE SALES e-commerce.

# .env file example
```shell
REACT_APP_BASE_URL_USERS=http://localhost:8000 # Base URL of the user microservice
REACT_APP_BASE_URL_PRODUCTS=http://localhost:8002 # Base URL of the product microservice (Public API)
REACT_APP_BASE_URL_ORDERS=http://localhost:8003 # Base URL of the order microservice
```

# Running the app locally
To run the app locally, enter the following command:
```shell
npm start
```
Go to http://localhost:3000

# Running the app in production
To run the app in production, firstly, you need to build the app:
```shell
npm run build
```

Then, run the following command:
```shell
firebase deploy
```


See how to [setup the firebase for react](https://www.freecodecamp.org/news/how-to-deploy-a-react-app-with-firebase)
