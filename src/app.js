//restart command nodemon .\src\app.js -e js,hbs


const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);
// console.log(path);
console.log(path.join(__dirname, '../public/index.html'));

const app = express();

const port = process.env.PORT || 3000;

//Defined parths for express config
const publiDirectpryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handle bars engine and views template
//Set values for given express setting -- this is for handle bars -- view engine
app.set('view engine', 'hbs');

//To set views path
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // to setup partial path

//Set up application directory path
app.use(express.static(publiDirectpryPath));

//For Handle bars
app.get('', (req, res) => {
    // res.send()
    res.render('index', {
        title: 'Weather App',
        name: 'Dhaval'
    });
})

app.get('/about', (req, res) => {
    // res.send()
    res.render('about', {
        title: 'About Me',
        name: 'Dhaval'
    });
})

app.get('/help', (req, res) => {
    // res.send()
    res.render('help', {
        title: 'Help',
        name: 'Dhaval',
        message: 'Message for help'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Page not found",
        errorMessage: "Help artovle not found",
        name: "Dhaval"
    });
})


app.get("/weather", (req, res) => {
    // res.send("hello express weather !");
    
    console.log(req.query);
    console.log(req.query.address);

    if(!req.query.address) {
        return res.send({
            error: "You must provide the address param"
        });
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            });
            // return console.log("Error", error);
        }
        // console.log("data", data)
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                // return res.send({
                //     error: error
                // });

                // SUe shorthand instead
                return res.send({ error });
                // return console.log("Error", error);
            }

            res.send({
                forecast: forecastData,
                location: location,
                params: req.path,
                address: req.query.address
            })
            // console.log('Data', forecastData)
            // console.log(location)
            // console.log('Data', data)
        })
    });
})

app.get("/products", (req, res) => {
    // res.send("hello express weather !");
    console.log(req.query);
    console.log(req.query.search);

    if(!req.query.search) {
        return res.send({
            error: "You must provide the search param"
        });
    }

    res.send({
        products: {}
    })
})

//Matching the incoming request and if doesnt find then render widlcard
app.get('*', (req, res) => {
    res.render('404', {
        title: "Page not found",
        errorMessage: "Page not found",
        name: "Dhaval"
    });
})

// app.get("", (req, res) => {
//     // res.send("hello express");
//     // res.send('<h1>Weather</h1>');
//     // res.send("/index.html");
// })

// app.get("/help", (req, res) => {
//     // res.send("hello express help !");
//     res.send([{
//         name: "Dhaval",
//         age: 30
//     },{
//         name: "Something",
//         age: 30
//     }]);

//     // res.send(/index.html);

// })

// app.get("/about", (req, res) => {
//     res.send("<h1>About !</h1>");

//     // res.send("hello express about !");
// })


//Start up the server and listen at specific port

app.listen(port, () => {
    console.log('Server is up on port' + port);
});

//template engine ---- handle bar   -- render dynamic content use and reuse markup