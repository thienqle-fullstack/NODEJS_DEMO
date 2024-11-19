const express = require('express');
const router = express.Router();

const data = [
    {"id": 1, "name":"AAA", "age": 40, "salary": 35000},
    {"id": 2, "name":"BB", "age": 50, "salary": 45000},
    {"id": 3, "name":"CCC", "age": 30, "salary": 35000}
]

router.get("/inmem",(req,res) => {
    res.json(data);
})

router.get("/inmem/:id",(req,res) => {
    let id = req.params.id;
    let read_object;
    for(let i=0;i<data.length;i++){
        if(data[i].id==id) {
            read_object = data[i];
        }
    }
    res.json(read_object)
})

router.post('/inmem',(req,res) =>{
    let created_object;
    console.log(req.body)
    if(req.body!==undefined) {
        created_object = req.body;
        data.push(created_object)
    }
    res.json(created_object);
})

router.delete("/inmem/:id",(req,res) => {
    let id = req.params.id;



    for(let i=0;i<data.length;i++){
        if(data[i].id==id) {
            data.splice(i,1);
            break;
        }
    }
    res.json({msg:"Data deleted sucessfully!"})
})



router.put("/inmem/:id",(req,res) => {
    let id = req.params.id;


    let created_object;
    if(req.body!==undefined) {
        created_object = req.body;
 
    }

    for(let i=0;i<data.length;i++){
        if(data[i].id==id) {
            data.splice(i,1,created_object);
            break;
        }
    }
    res.json(created_object)
})

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employees')
        .then(()=>console.log('You are now connected to database!'))
        .catch((err) => console.log(err))

const EmployeeSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    age: Number,
    salary: Number
})

Employee = mongoose.model('Employee',EmployeeSchema)


router.get("/",async (req,res,next) => {
   
    /* Old method to get data from mongoose 6.0
    Employee.find((err,data)=> {
        if(err) return next(err);
        res.json(data)
    })
    */
   let output = await Employee.find();
   res.json(output);
})

router.get("/:id",async (req,res) => {
    let id = req.params.id;
    let output = await Employee.findById(id);
    res.json(output)
})

router.delete("/:id",async (req,res) => {
    let id = req.params.id;
    let output = await Employee.deleteOne({_id:id});
    res.json({msg: 'Object is deleted sucessfully'})
})

router.post("/",async (req,res) => {
    let new_employee = req.body;
    let output = await Employee.create(new_employee);
    res.json(output)
})

router.put("/:id",async (req,res) => {
    let id = req.params.id;
    let updated_employee = req.body;
    let output = await Employee.updateOne({_id:id},updated_employee);
    res.json({msg: 'Object is updated sucessfully'})
})


module.exports = router;
