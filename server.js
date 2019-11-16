const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();
const productsRoutes = require('./src/routes/products');
const providersRoutes = require('./src/routes/providers');
const categoriesRoutes = require('./src/routes/categories');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'database_supermarket'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// Routes
app.get('/', function (req, res){
    res.render('index');
});
app.use('/products', productsRoutes);
app.post('/add', productsRoutes);
app.get('/delete/:id', productsRoutes);
app.get('/update/:id', productsRoutes);
app.post('/update-product/:id', productsRoutes);

app.get('/providers', providersRoutes);
app.post('/add-provider', providersRoutes);
app.get('/delete-provider/:id', providersRoutes);
app.get('/update-provider-panel/:id', providersRoutes);
app.post('/update-provider/:id', providersRoutes);

app.get('/categories', categoriesRoutes);
app.post('/add-category', categoriesRoutes);
app.get('/delete-category/:id', categoriesRoutes);
app.get('/update-category-panel/:id', categoriesRoutes);
app.post('/update-category/:id', categoriesRoutes);

// Static files
app.use('/public', express.static(path.join(__dirname + '/public')));

// Start
app.listen(app.get('port'), () =>{
    console.log("Server on port 3000");
});