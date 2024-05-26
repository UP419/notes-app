const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://usr2:usr123@cluster1.sdis6ve.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/notes', requireAuth, (req, res) => res.render('notes'));
app.use(authRoutes);