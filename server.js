const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require("./routes/places-routes");
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use(('/api/places'), placesRoutes); // => api/places ... 

//only runs if route is not found: some request that didnt get a response 
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

//this middleware will be called if any route infront of it causes an error
app.use((error, req, res, next) =>{
    //if a response has already been sent
    if(res.headerSent){
        return next(error);
    }
    //500 means something went wrong on the server
    res.status(error.code || 500);
    res.json({message:error.message || 'An unknown error occurred'});
});

app.listen(5000);