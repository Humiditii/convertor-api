import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthRouter from './routes/authRoute';
import ConvertRouter from './routes/convertRoute';
dotenv.config();

const app = express();

// Connection object which contains the constant for the port and the database
let connection_config = {
    port: process.env.PORT,
    database_url: process.env.MONGODB_URI
}

if( process.env.NODE_ENV == 'development'){
    connection_config.port = 3333;
    connection_config.database_url = process.env.DATABASE_URL
    
}

app.use(bodyParser.urlencoded({
    extended: false
}));

// application/json parsing json incoming request

app.use(bodyParser.json());

//allowing CORS
app.use(cors());

//Application routes
app.use('/api/v1', AuthRouter);
app.use('/api/v1', ConvertRouter);
//routes ends here
app.use('/', (req, res)=> {
    res.status(200).json({
        statusCode: 200,
        message: 'Welcome to the entry point to the api'
    })
} )

app.all( '*',(req, res, next)=> {
    return res.status(404).json({
        statusCode: 404,
        message: 'Not found, invalid route'
    });
})
//Handling errors 


app.use((error, req, res, next) => {
    //console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;

    res.status(status).json({
        message: message,
        statusCode: status
    });
});

mongoose.connect( connection_config.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then( connection => {
    app.listen(connection_config.port, () => {
        console.log('Server running at ' + connection_config.port);
    });
}).catch( err => {
    throw err;
})

