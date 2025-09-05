const express=require('express');
const app= express();
const port= 3000;

const path= require('path');

// app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname +"index");

});

 
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
});