const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://l2gs:334631@cadastro.zo2rrp4.mongodb.net/cadastro")

const DBSchema1 = new mongoose.Schema({
    nome:{
        type:String,
    },
    endereco:{
        type:String,
    },
    bairro:{
        type:String,
    },
    cidade:{
        type:String,
    },
    cep:{
        type:Number,
    },
    telefone:{
        type:Number,
    },
    celular:{
        type:Number,
    },
    datanascimento:{
        type:Number,
    },
    estadocivil:{
        type:String,
    },
    email:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    github:{
        type:String,
    },
    rg:{
        type:Number,
    },
    cpf:{
        type:Number,
    },
    genero:{
        type:String,
    },
    login:{
        type:String,
    },
    senha:{
        type:String,
    }
})

module.exports = mongoose.model("adm",DBSchema1)