const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const app = express();

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user')

app.set('view engine', 'ejs');
app.set('views', 'views');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("61ca3d88b303f4ecd1c0ab3a")
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404)


mongoConnect(() => {
    app.listen(3000);
})



