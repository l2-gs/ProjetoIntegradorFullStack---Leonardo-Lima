const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://l2gs:334631@cadastro.rgyb5kb.mongodb.net/cadastro", { useNewUrlParser: true })

const express = require('express');
const app = express()

const rota = express.Router()
const User = require('../database/db.js');
const adm = require('../database/dbadm.js');
const { update } = require('../database/db.js');

module.exports = rota;

//Post Method

rota.post('/registro/usuario', async(req, res)=>{

	const createUsuario = new User({
		nome: req.body.nome,
		endereco: req.body.endereco,
        bairro : req.body.bairo,
        cidade : req.body.cidade,
        cep : req.body.cep,
        telefone:req.body.telefone,
        celular : req.body.celular,
        datanascimento : req.body.datanascimento,
        estadocivil : req.body.estadocivil,
        email: req.body.email,
        linkedin: req.body.linkedin,
        github: req.body.github, 
        rg: req.body.rg, 
        cpf: req.body.cpf,
        genero : req.body.genero,
        login: req.body.login,
        senha: req.body.senha
	})
	await createUsuario.save()
	res.redirect('/api/registro/usuario')   
})

rota.post('/registro/adm', async(req, res)=>{

	const createAdm = new adm({
		nome: req.body.nome,
		endereco: req.body.endereco,
        bairro : req.body.bairo,
        cidade : req.body.cidade,
        cep : req.body.cep,
        telefone:req.body.telefone,
        celular : req.body.celular,
        datanascimento : req.body.datanascimento,
        estadocivil : req.body.estadocivil,
        email: req.body.email,
        linkedin: req.body.linkedin,
        github: req.body.github, 
        rg: req.body.rg, 
        cpf: req.body.cpf,
        genero : req.body.genero,
        login: req.body.login,
        senha: req.body.senha
	})
	await createAdm.save()
	res.redirect('/api/registro/adm')   
})

rota.post('/user', async(req,res)=>{

    try{
    const{login,senha} = req.body
    const userLogin = await User.findOne({ login:login, senha:senha})

    if(!login){
        return res.status(422).json({msg:'O login é obrigatorio!'})
    }
    if(!senha){
        return res.status(422).json({msg:'A senha é obrigatoria!'})
    }

    if(userLogin.login==login & userLogin.senha==senha)
    {
        return res.redirect(`/api/home/user/${userLogin._id}`)            
    }
        


    }
    catch(erro){
        return res.redirect('/user')
    }
})

rota.post('/adm', async(req,res)=>{

    try{
    const{login,senha} = req.body
    const admLogin = await adm.findOne({ login:login, senha:senha})

    if(!login){
        return res.status(422).json({msg:'O login é obrigatorio!'})
    }
    if(!senha){
        return res.status(422).json({msg:'A senha é obrigatoria!'})
    }
        
    else if(admLogin.login==login & admLogin.senha==senha)
    {
        return res.redirect(`/api/home/adm/${admLogin._id}`)            
    }


    }
    catch(erro){
        return res.redirect('/adm')
    }
})


rota.get('/registro/usuario',async(req,res)=>{
    res.render('registro')
})

rota.get('/registro/adm',async(req,res)=>{
    res.render('registroadm')
})

rota.get('/home/adm/:id',async(req,res)=>{
    const readAdmId = await adm.findById({_id: req.params.id})
    res.render('home',{readAdmId})
    

})

rota.get('/home/user/:id',async(req,res)=>{
    const readUserId = await User.findById({_id: req.params.id})
   res.render('homeusuario',{readUserId})
    

})

//Get all Method
rota.get('/read/usuario', async (req, res) => {
    try{
        const readUsuario = await User.find((err,docs) =>
        {;
        res.render('lista',{readUsuario:docs})}
        //res.json(readUsuario)
        )}
    catch(error){
    
    }
})

rota.get('/read/userusuario', async (req, res) => {
    try{
        const readUsuario = await User.find((err,docs) =>
        {;
        res.render('listauser',{readUsuario:docs})}
        //res.json(readUsuario)
        )}
    catch(error){
    
    }
})

rota.get('/read/adm', async (req, res) => {
    try{
        const readAdm = await adm.find((err,docs) =>
        {;
        res.render('listaadm',{readAdm:docs})}
        //res.json(readUsuario)
        )}
    catch(error){
    
    }
})

rota.get('/read/admuser', async (req, res) => {
    try{
        const readAdm = await adm.find((err,docs) =>
        {;
        res.render('listaadmuser',{readAdm:docs})}
        //res.json(readUsuario)
        )}
    catch(error){
    
    }
})

//Get by ID
rota.get('/read/usuario/:id',async(req,res)=>{
		const readUsuarioId = await User.findById({_id: req.params.id})
        res.render('expandir',{readUsuarioId})
		//res.json(readUsuarioId)

})

rota.get('/read/adm/:id',async(req,res)=>{
    const readAdmId = await adm.findById({_id: req.params.id})
    res.render('expandiradm',{readAdmId})
    //res.json(readUsuarioId)

})

//Update by ID Method
rota.patch('/update/usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUsuario = req.body;
        const options = { new: true };

     const result = await User.findByIdAndUpdate(
           id, updatedUsuario, options
    )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

rota.patch('/update/adm/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedAdm = req.body;
        const options = { new: true };

     const result = await adm.findByIdAndUpdate(
           id, updatedAdm, options
    )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Update Version 2

 rota.get('/update/usuario/:id',async(req,res,)=>{
    let updateUser = User
    updateUser.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,docs)=>{
        if(err){

        }
        else{
            res.render('update',{updateUser:docs})
        }
    })
})

    rota.post('/update/usuario/:id',async(req,res,)=>{
    let updateUser = User    
        try {
            const id = req.params.id;
            const updatedUsuario = ({nome:req.body.nome,
                endereco:req.body.endereco,
                bairro:req.body.bairro,
                cidade:req.body.cidade,
                cep:req.body.cep,
                telefone:req.body.telefone,
                celular:req.body.celular,
                datanascimento:req.body.datanascimento,
                estadocivil:req.body.estadocivil,
                email:req.body.email,
                linkedin:req.body.linkedin,
                github:req.body.github,
                rg:req.body.rg,
                cpf:req.body.cpf,
                genero:req.body.genero});
            const options = { new: true };
    
         const result = await updateUser.findByIdAndUpdate(
               id, updatedUsuario, options
        )
        res.redirect('/api/read/usuario')
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }})

    rota.get('/update/adm/:id',async(req,res,)=>{
        let updateAdm = adm
        updateAdm.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,docs)=>{
            if(err){
    
            }
            else{
                res.render('updateadm',{updateAdm:docs})
            }
        })
    })

    rota.post('/update/adm/:id',async(req,res,)=>{
        let updatedAdm_ = adm    
            try {
                const id = req.params.id;
                const updatedAdm = ({nome:req.body.nome,
                    endereco:req.body.endereco,
                    bairro:req.body.bairro,
                    cidade:req.body.cidade,
                    cep:req.body.cep,
                    telefone:req.body.telefone,
                    celular:req.body.celular,
                    datanascimento:req.body.datanascimento,
                    estadocivil:req.body.estadocivil,
                    email:req.body.email,
                    linkedin:req.body.linkedin,
                    github:req.body.github,
                    rg:req.body.rg,
                    cpf:req.body.cpf,
                    genero:req.body.genero,
                    });
                const options = { new: true };
        
             const resultadm = await updatedAdm_.findByIdAndUpdate(
                   id, updatedAdm, options
            )
            res.redirect('/api/read/adm')
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }})
    

        rota.get('/user/loginSenha/:id',async(req,res,)=>{
            let updateLoginSenha = User
            updateLoginSenha.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,docs)=>{
                if(err){
        
                }
                else{
                    res.render('LoginSenha',{updateLoginSenha:docs})
                }
            })
        })
        
            rota.post('/user/loginSenha/:id',async(req,res,)=>{
                const{login,senha} = req.body
                let updateLoginSenha = User

                try {
                    const id = req.params.id;
                    const updateData = ({login,senha});
                    const options = { new: true };
            
                 const result = await updateLoginSenha.findByIdAndUpdate(
                       id, updateData, options
                )
                res.redirect(`/api/user`)
            }
            catch (error) {
                res.status(400).json({ message: error.message })
            }})



            rota.get('/adm/loginSenha/:id',async(req,res,)=>{
                let updateLoginSenhaAdm = adm
                updateLoginSenhaAdm.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,docs)=>{
                    if(err){
            
                    }
                    else{
                        res.render('LoginSenhaAdm',{updateLoginSenhaAdm:docs})
                    }
                })
            })
            
                rota.post('/adm/loginSenha/:id',async(req,res,)=>{
                    const{login,senha} = req.body
                    let updateLoginSenhaAdm = adm
    
                    try {
                        const id = req.params.id;
                        const updateData = ({login,senha});
                        const options = { new: true };
                
                     const result = await updateLoginSenhaAdm.findByIdAndUpdate(
                           id, updateData, options
                    )
                    res.redirect(`/api/adm`)
                }
                catch (error) {
                    res.status(400).json({ message: error.message })
                }})
    
    


//Delete by ID Method

rota.get('/delete/usuario/:id',async(req,res)=>{
let deleteUser = User
    deleteUser.findByIdAndDelete(req.params.id,(err,doc)=>{
         if(err){

        }
        else{
            res.redirect('/api/read/usuario')
        }
    })
})

rota.get('/delete/adm/:id',async(req,res)=>{
    let deleteAdm = adm
    deleteAdm.findByIdAndDelete(req.params.id,(err,doc)=>{
             if(err){
    
            }
            else{
                res.redirect('/api/read/adm')
            }
        })
    })

rota.delete('/delete/usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUsuario = await deleteUser.findByIdAndDelete(id)
        res.send(`Document with ${deleteUsuario.nome} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}) 

rota.delete('/delete/adm/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteAdm = await deleteAdm.findByIdAndDelete(id)
        res.send(`Document with ${deleteAdm.nome} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}) 