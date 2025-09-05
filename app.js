const path= require('path');
const port= 3200;
const express= require('express');
const app= express();
// const dotenv= require('dotenv');
// dotenv.config();


//=============== jo data form dey ata ha use samjne key liye en middleware ka use hota ha

app.use(express.urlencoded({extended:true}));  //Ye middleware HTML forms ke through bheje gaye data ko parse karta hai.
app.use(express.json());   // Ye middleware JSON formatted data ko parse karta hai.

//==== Es middleware sey sare static files uth jae ge jase hmare css,js or jo be file esmey pade ha

app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

const siteRouters= require('./routers/site.routes');
app.use('/',siteRouters);



app.listen(port,()=>{
    console.log(`server is running at http://127.0.0.1:${port}`);
});

