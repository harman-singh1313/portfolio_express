const{MongoClient}=require('mongodb')
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
  const {name,email,subject,message} =req.body
  const data= req.body;

  client.connect();
  client.db('portfolioDB').command({ping:1});
  console.log('mongodb connected succesfuly')

  const database= client.db('portfolioDB');
  const myCollection= database.collection("contactUsData");
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
