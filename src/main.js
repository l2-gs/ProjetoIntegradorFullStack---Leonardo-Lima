const express = require('express')

const path = require('path')

const app = express()
app.use(express.json()) 

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs')


const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://l2gs:334631@cadastro.zo2rrp4.mongodb.net/cadastro")

const rota = require('../src/rotas/rotas')

app.use(express.static(__dirname + '/public'));
app.use('/api',rota)


rota.get('/user',async(req,res)=>{
	res.render('loginUser')
	})

rota.get('/adm',async(req,res)=>{
	res.render('loginAdm')
	})
	
app.listen(3000,()=>{
    console.log('Funcionando')
})

