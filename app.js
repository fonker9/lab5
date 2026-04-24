const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');

// важно
app.use(expressLayouts);
app.set('layout', 'layout');

app.set('views', './views');

// статика
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    res.render('index', { layout: 'layout' });
});

app.get('/services', (req, res) => {
    res.render('services', { layout: 'layout' });
});

app.get('/use-cases', (req, res) => {
    res.render('use-cases', { layout: 'layout' });
});

app.listen(3000, () => {
    console.log('Server started: http://localhost:3000');
});