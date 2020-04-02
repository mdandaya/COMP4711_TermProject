let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./util/database');

const session = require('express-session');
app.use(session({
  secret: 'secret token',
  resave: true,
  saveUninitialized: true,
}));


const expressHbs = require('express-handlebars');
app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
  })
);
app.set('view engine', 'hbs');
app.set('views', 'views');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

// TODO: Add routes here like this
// let artistRoutes = require('./routes/artists');
// let loginRoutes = require('./routes/login');
// app.use(loginRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
// TODO: USE EXPRESS SESSION HERE TO SAVE SESSION LIKE THIS
//   let user = req.session.user;
//   // user = null;
//   console.log('index' + user);
//   if (!user) {
//     return res.render('login');
//   }
//   res.redirect(301, '/artists');
    res.render('homepage');
});


app.listen(process.env.PORT || 4000, () => console.log('Server ready on environment variable port or 4000'))



