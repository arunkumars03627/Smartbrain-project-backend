const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const port = process.env.PORT || 4000

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false}
    host: 'dpg-d6gks24r85hc7391g9v0-a',
    port: 5432,
    user: 'smartbrain_postgres_ozjf_user',
    password: 'HRY3Lm5lTp8dGPD2QilVoZ8cxd4iaeMf',
    database: 'smartbrain_postgres_ozjf'
  }
});

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(port, ()=> {
  console.log('app is running on port ${port}')
})