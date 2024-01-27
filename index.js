import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { v4 as uuidv4 } from 'uuid';

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database: "todo_app",
    password: "yogesh password",
    port: 5432,
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async (req,res)=>{
   
    const result = await db.query("SELECT id, task_name FROM task ORDER BY date_time;");
    const task = result.rows;
    res.render("home.ejs",{task:task});
});


app.post("/new",async (req,res)=>{
    let task_name= req.body.newTask;
    if(task_name.length>0)
    {
        let id = uuidv4();
        let date_time = new Date()
        date_time=date_time.toISOString().split('T');
        date_time=date_time[0] + " "+date_time[1].slice(0,-5);
        const result = await db.query("INSERT INTO task VALUES($1,$2,$3);",[id,task_name,date_time]);
    }
    res.redirect("/");
});

app.post("/update",async (req,res)=>{
    let id = req.body.id;
    let updatedTask = req.body.updatedTask;
    if(updatedTask.length>0)
    {
        const result = await db.query("UPDATE task SET task_name=$1 where id=$2",[updatedTask,id]);
    }
    res.redirect("/");
});

app.post("/delete",async(req,res)=>{
    const id = req.body.id;
    const result = await db.query("DELETE FROM task WHERE id=$1;",[id]);
    res.redirect("/");
});


app.listen(port, ()=>{
    console.log(`Listening to the port: ${port}`);
});


