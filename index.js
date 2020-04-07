let express = require('express')
let app = express();
let path = require('path');

// Body parser
let bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware
// parse application/json
app.use(bodyParser.json()) // middleware

// Routing
let loginRoutes = require('./routes/login-routes');
let discussionsRoutes = require('./routes/discussions-routes');
let msgRoutes = require('./routes/msg-routes');
let homepageRoutes = require('./routes/homepage-routes');
// TODO: Add routes here like this
// let artistRoutes = require('./routes/artists');
// let loginRoutes = require('./routes/login');
// app.use(loginRoutes);
app.use('/msg', msgRoutes);
app.use(homepageRoutes)
// app.use(loginRoute);
//app.use(discussionsRoute);

// Database
let db = require('./util/database');

const session = require('express-session');
app.use(session({
  secret: 'secret token',
  resave: true,
  saveUninitialized: true,
}));

// Handlebars for view
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

app.use(express.static(path.join(__dirname, 'public')));

// Default path
app.get('/', function (req, res) {

  // TODO: USE EXPRESS SESSION HERE TO SAVE SESSION LIKE THIS
  //   let user = req.session.user;
  //   // user = null;
  //   console.log('index' + user);
  //   if (!user) {
  //     return res.render('login');
  //   }
  //   res.redirect(301, '/artists');

  //CHANGE THIS LINE TO TEST ROUTES / RENDERING
    res.redirect('/homepage');
    // OR
    // res.render();
});


app.listen(process.env.PORT || 4000, () => console.log('Server ready on environment variable port or 4000'))



