const{MongoClient}=require('mongodb')
require("dotenv").config();
const uri= process.env.MONGODB_URI;
//create new object
const client= new MongoClient(uri);
const nodemailer= require('nodemailer');


function renderPage(res, viewName, title) {
  return res.render(`pages/${viewName}`, { title, page: viewName });
}
exports.home =(req,res) => renderPage(res, 'index', 'home');
exports.about=(req,res) =>renderPage(res,'about','about');
exports.blog=(req,res)=>renderPage(res,'blog','blog');
exports.blog_details=(req,res) =>renderPage(res,'blog_details','blog_details');
exports.contact=(req,res)=>renderPage(res,'contact','contact');
exports.projects=(req, res)=> renderPage(res,'projects','projects');
exports.project_details=(req,res)=>renderPage(res,'project_details','project_details');

exports.submitContact= async(req,res,next)=>{
 try{
  const {First_name,Last_name,email,phone,password} =req.body
  // const main_data= req.body;
   var currentdate = new Date(); 
          var datetime = "Last Sync: " + currentdate.getDate() + "/"
                          + (currentdate.getMonth()+1)  + "/" 
                          + currentdate.getFullYear() + " @ "  
                          + currentdate.getHours() + ":"  
                          + currentdate.getMinutes() + ":" 
                          + currentdate.getSeconds();

   const data={First_name:First_name,Last_name:Last_name,email:email,phone:phone,password:password,addon:datetime}
  client.connect();
  client.db('portfolioDB').command({ping:1});
  console.log('mongodb connected succesfuly')

  const database= client.db('portfolioDB');
  const myCollection= database.collection("Users");
  const result= myCollection.insertOne(data);
    console.log(
            `A document was inserted with the _id: ${result.insertedId}`,
            );

  const transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
    user: process.env.SMTP_USER,
    pass:process.env.SMTP_PASS,
  },

  // to ignore self-signed  error
  tls: {
    rejectUnauthorized: false, // 👈 self-signed error ignore (dev only)
  },
});



  const send_Mail= {
    from:process.env.SMTP_USER,
    to:email,
    subject:'reaching using',
    text:'we will contect you soon'
  };

 await transporter.sendMail(send_Mail)


res.send('sendmail');
 
 }
  catch(error){
  return next(error.message)
 }};
