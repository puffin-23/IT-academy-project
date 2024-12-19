const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');



const PORT = 8580;

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static(path.join(__dirname, 'public/static')));


app.get('/', (req, res) => {
   res.render('menu', {
      layout: 'site_layout'
   });
});

app.get('/login', (req, res) => {
   res.render('login', {
      layout: 'site_layout'
   });
});



app.listen(PORT, () => {
   console.log('Сервер запущен на порту ' + PORT);
});