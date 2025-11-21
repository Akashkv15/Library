import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import BooksData from './Models/booksdata.js'


const app=express()

app.use(cors({origin:'*'}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Mylibrary")
.then(()=>{console.log("mongoose connected successfully");
})
.catch((error)=>{
    console.log("MongooDB connection error",error);
    
})

app.listen(8000,()=>{
    console.log("serever running sucessfully");
    
})

app.post('/addnewbook',async(req,res)=>{
    const{title,author, category,publishedyear,language,count}=req.body;
    try{
        const exist=await BooksData.findOne({title})
        if(exist)
        {
            return res.status(401).json({message:"same name exist"})
        }
        else{
            const newbook= new BooksData({
                title,author, category,publishedyear,language,count
            })
            await newbook.save()
            return res.status(200).json({message:'created successfully'})


        }
    }
    catch(error){
        console.log(error,"internal error");
        return res.status(500).json({message:'server error'})
    }
})
app.get('/viewbooks',async(req,res)=>{
    try{
        const book=await BooksData.find()
        res.status(200).json({books:book})
    }
    catch{
        console.log("fetching data from database failed");
        
    }
})
app.delete('/deletebook/:id',async(req,res)=>{
    const {id}=req.params
    console.log(id);
    try{
        const deleted = await BooksData.findByIdAndDelete(id);
        if(!deleted)
        {
            return res.status(404).json({message:'book not found'})
        }
        return res.json({message:'book deleted successfully'})
    }
    catch(error){
        return res.status(500).json({message:'server error'})
    }
})


// app.put('/updatebook/:id',async(req,res)=>{
//   try{
//       const {id}=req.params
//   }
//   catch{}
    
// })
app.get('/viewbook/:id',async (req,res)=>{
    try{
        const book=await BooksData.findById(req.params.id)
        if(!book){
            return res.status(404).json({message:'book not found'})
        }
        res.status(200).json(book);
    }
    catch(error){
        console.log(error);
        
    }
})


app.put('/update/:id',async(req,res)=>{
    const {id}=req.params
    const{title,author,publishedyear,category,Count,language}=req.body;
    try{
        const abc=await BooksData.findByIdAndUpdate(id,{title,author,
            category,
            language,
            publishedyear,
            count:Count,
        })
        if(!abc){
            return res.status(404).json({message:'same name exist'})
            

        }
        return res.status(200).json({message:'updated sucessfully'})
    }
    catch(error){

    }
})

app.put('/changecount/:id',async (req,res)=>{
    try{
        const changecount=await BooksData.findById(req.params.id)
        console.log(changecount);
        
        if(!changecount){
            return res.status(404).json("book is not awailable")
        }
         if (changecount.count <= 0) {
        return res.status(400).json({ message: "No stock available" });
         }
        changecount.count = changecount.count - 1; // simple decrement
    await changecount.save();

    return res.status(200).json({
      message: "Count updated successfully",
      updatedBook: changecount
    });
    }
    catch{

    }
})