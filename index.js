const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// app.enable('view cache');


// routes
const mainRouter = require('./routes/main');

app.use('/', mainRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    // set locals, only providing error in development
    res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page

    res.render('error');


});


mongoose.connect('mongodb://localhost:27017/eraya',{ useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('mongodb started.');
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        });
    }).catch(() => {
    console.log('Mongodb connection failed.');
})
