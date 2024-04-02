const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require("./routes/places-routes")

const app = express();

app.use(bodyParser.json());

app.use(('/api/places'), placesRoutes); // => api/places ... 

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