const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prasenjit'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Prasenjit'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Prasenjit',
        email: 'prasenjitsingharoy17@gmail.com',
        phone: '+91 9307883053'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address',
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if(error){
            return res.send({
                    error
                });
        }
    
        forecast(latitude, longitude, (error, { temperature, feelsLike } = {}) => {
            if(error){
                return res.send({ error });
            }
            
            res.send({
                temperature: temperature,
                location: place
            })

            //console.log('Place:', place);
            //console.log(`It is currently ${temperature} degrees out. Feels like ${feelsLike}.`);
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page',
        name: 'Prasenjit',
        errorMessage: 'Help article not found',
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Help Page',
        name: 'Prasenjit',
        errorMessage: '404 not found'
    })
})

app.listen(3000, () => {
    console.log('Server is Running ...');
})