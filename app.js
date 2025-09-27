const path= require('path');
const port= 3200;
const express= require('express');
const app= express();

// Middleware
app.use(express.urlencoded({extended:true}));  
app.use(express.json());  

//static files
app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// Routes
const siteRouters= require('./routers/site.routes');
app.use('/',siteRouters);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server

app.listen(port,()=>{
    console.log(`server is running at http://127.0.0.1:${port}`);
});

