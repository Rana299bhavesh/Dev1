const express = require('express');
const{createTodo} = require("./types");
const{todo} = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json()); //is like having an assistant who helps you understand and work with JSON data sent in requests to your server. It takes care of translating the JSON into a format you can work with, and it makes that translated data available for you to use in your server code.
app.use(cors());









app.post("/todo", async function(req,res){
    const createpayLoad = req.body;
    const parsedPayload = createTodo.safeParse(createpayLoad);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent wrong inputs"
        })
        return;
    }

    await todo.create({
        title: createpayLoad.title,
        description:  createpayLoad.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })

})

app.get("/todos", async function(req,res){

    const todos = await todo.find({});
    res.json({
        todos
    })
    
})

app.put("/completed", async function(req,res){
    const createpayLoad = req.body;
    const parsedPayload = createTodo.safeParse(createpayLoad);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent wrong inputs"
        })
        return;
    }
    const updatedTodo = await todo.findOneAndUpdate(
        { _id: req.body.id },
        { completed: true },
        { new: true }
    )
    
    res.json({
        msg:"todo marked as completed"
    })
    
})

app.listen(4000);