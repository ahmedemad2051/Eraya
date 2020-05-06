const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const express_handlebars_sections = require('express-handlebars-sections');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const fileUpload = require('express-fileupload');
const paginateHelper = require('express-handlebars-paginate');


// const expressValidator = require('express-validator');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
// app.use(expressValidator({
//     customValidators: {
//         isImage: function (value, filename) {
//
//             let extension = (path.extname(filename)).toLowerCase();
//             switch (extension) {
//                 case '.jpg':
//                     return '.jpg';
//                 case '.jpeg':
//                     return '.jpeg';
//                 case  '.png':
//                     return '.png';
//                 default:
//                     return false;
//             }
//         }
//     }
// }));

const {
    SESS_NAME = 'sid',
    SESS_LIFETIME = 1000 * 60 * 60 * 2
} = process.env


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    name: SESS_NAME,
    cookie: {
        maxAge: SESS_LIFETIME,
        secure: false,
    }
}));


app.use(flash());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024},
}));

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        "counter": (index) => {
            return index + 1;
        },
        'equal': require("handlebars-helper-equal"),
        'select': function (value, options) {
            return options.fn(this)
                .split('\n')
                .map(function (v) {
                    var t = 'value="' + value + '"'
                    return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
                })
                .join('\n')
        },
        'paginateHelper': paginateHelper.createPagination
    },
    partialsDir: [
        'views/admin/partials/',
        'views/front/partials/',
    ]
});
express_handlebars_sections(hbs);

// view engine setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.enable('view cache');


app.all('/*', function (req, res, next) {
    req.app.locals.layout = 'main'; // set your layout here
    next(); // pass control to the next handler
});

app.all('/admin/*', function (req, res, next) {
    req.app.locals.layout = 'dashboard'; // set your layout here
    next(); // pass control to the next handler
});


app.use('/admin/assets', express.static('./node_modules/admin-lte'));

// admin routes
const dashboardRouter = require('./routes/admin/dashboard');

app.use('/admin', dashboardRouter);

// front routes
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

mongoose.connect('mongodb://localhost:27017/eraya', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log('mongodb started.');
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        });
    }).catch(() => {
    console.log('Mongodb connection failed.');
})
