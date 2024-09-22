const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    body : {
        type : String,
        required : true,
    },
    coverImgURL : {
        type : String,
        required : true,
    },
    createdBy : {
        type :String,
        ref : 'user',
    }

},
{ timestamps : true}
)



const Blog = mongoose.model('blog',blogSchema);

module.exports = Blog ;