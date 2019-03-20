// Global configuration of the project


process.env.PORT = process.env.PORT || 3000;


//Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'DEV';

if (process.env.NODE_ENV === 'DEV') {

    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;