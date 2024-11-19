//const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

const employeesRoutes = require('./employee')
const authRoutes = require('./auth')

// server = http.createServer(function(req,res) {
//     res.writeHead(200,{'Content-type':'text/html'});
//     res.write("<h1 style='text-align:center; color:blue'>Hello</h1>");
//     res.end()
// })

// server.listen(3000,()=>{
//     console.log("Server is running on port: 3000")
// })
// app.use('/css',express.static(path.join(__dirname,"templates/css")))


// app.get('/',function(req,res) {
//     //res.send("<h1 style='text-align:center; color:yellow'>Hello</h1>");
//     res.sendFile(path.join(__dirname,'templates','index.html'));
// })

// app.get('/about',function(req,res) {
//       res.sendFile(path.join(__dirname,'templates','about.html'));
// })

app.use(express.static(path.join(__dirname,"templates")))
app.use('/api/employees',employeesRoutes)
app.use('/auth',authRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})
