const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const routes = require('./controllers');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/login', (req, res) => {
  res.render('main', { loginPage: true });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://localhost:3001/'));
});
