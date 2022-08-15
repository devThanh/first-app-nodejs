const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;



const route = require('./routes')

const db = require('./config/db')

//connect to MongoDB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

//app.use(morgan('combined'));

app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
      sum: (a, b) =>  a + b,
  }
}));
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'resources','views'));


var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})