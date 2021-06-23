const mongoose = require('mongoose')

const ListSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = List = mongoose.model('Slist',ListSchema)