const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const app = express();

const errorController = require('./controllers/error');
const User = require('./models/user')

app.set('view engine', 'ejs');
app.set('views', 'views');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("61ca5749dcc0c0c37a16d234")
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404)


mongoose
.connect(
   // 'mongodb+srv://root:1234@cluster0.zgsem.mongodb.net/shop?retryWrites=true&w=majority'
   'mongodb+srv://root:1234@cluster0.zgsem.mongodb.net/shop?retryWrites=true&w=majority'
)
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Andres',
                email: 'test@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(process.env.PORT || 3000);
})
.catch(err => {
    console.log(err);
})



