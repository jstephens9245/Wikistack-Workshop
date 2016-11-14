var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var models = require('./models');

var routes = require('./routes/routes.js');

// var db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });

var app = express();

console.log("entering app.js");

app.use(morgan('dev'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/',routes);




models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);