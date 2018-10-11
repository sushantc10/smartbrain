const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'gtalcvcs12',
    database : 'smart-brain'
  }
});

postgres.select('*').from('users').then(data=>{
	//console.log(data);
});

app.use(bodyParser.json());
app.use(cors());



app.get('/',(req,res)=>{
	//res.send(database.users);
});


app.post('/signin',signin.handleSignin(postgres,bcrypt))
app.post('/register',(req,res) => {register.handleRegister(req,res,postgres,bcrypt)})

app.get('/profile/:id/',(req,res)=>{profile.handleProfileGet(req,res,postgres)})


app.put('/image',(req,res)=>{image.handleImage(req,res,postgres)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res,postgres)})


/*
bcrypt.compare("bacon",hash,function(err,res){
	///res == true
})

bcrypt.compare("veggies",hash,function(err,res){
	///res == false
})*/

app.listen(3000,()=>{
	console.log('app is running on port 3000');
})



/*
/ --> res =  this is working
/signin -->POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT
*/