import mongoose, {Schema} from "mongoose";


const BooksSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    count:{
        type:Number,
        default:1
    },
   
    category:{
        type:String
    },
    publishedyear:{
        type:Number
    },
    language:{
        type:String
    }
})
const BooksData=mongoose.model('Booksdata',BooksSchema)
export default BooksData