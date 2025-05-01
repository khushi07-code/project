import {faker} from '@faker-js/faker';
import mysql from 'mysql2';
import express from "express";
import path from "path";
const app=express();
import methodOverride from "method-override";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename);

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//connection with mysql database
const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:"#₹00t@:-)"
  });


//for data to insert in database
// let getRandomUser =()=> {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(), // before version 9.1.0, use userName()
//     faker.internet.email(),
//     faker.internet.password()
//   ];
// }
// let data=[]
// for(let i=0;i<10;i++){
//   data.push(getRandomUser());
// }

// let q="insert into  temp(id ,username,email,password) values ?";
// try{
//     connection.query(q,[data],(err,result,fields)=>{
//         if(err) throw err;
//         console.log(result);
//       })
// }catch(err){ 
//     console.log(err);
// }

//home route
app.get("/",(req,res)=>{
  let q=`SELECT COUNT(*) FROM TEMP`;
  try{
      connection.query(q,(err,result,fields)=>{
          if(err) throw err;
           let count=result[0]['COUNT(*)'];
           res.render("index.ejs",{count});
        })
    }catch(err){ 
        console.log(err);
        res.send(err);
    }

})

//show route
app.get("/user",(req,res)=>{
  let q=`SELECT * FROM TEMP`;
  try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let users=result;
        res.render("show.ejs",{users});
      })
  }catch(err){ 
      console.log(err);
      res.send(err);
  }

});
//edit form request qoute
app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`select * from temp where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=result[0];
         res.render("edit.ejs",{user});
      })
  }catch(err){ 
      console.log(err);
      res.send(err);
  }
});
//edit update route
app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let { username ,email,password }=req.body;
  let q=`select * from temp where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=result[0];
        if(user.password!=password){
          res.send("password is incorrect");
        }
        else{
          let q=`UPDATE TEMP SET USERNAME='${username}',EMAIL='${email}' WHERE ID='${id}'`;
          try{
              connection.query(q,(err,result)=>{
                if(err) throw err;
                res.redirect("/user");
            })
          }catch(err){
            res.send(err);

          }
        }
      })
  }catch(err){ 
      res.send(err);
  }

});

//add form route
app.get("/user/add",(req,res)=>{
    res.render("add.ejs");
});

//add user route
app.post("/user",(req,res)=>{
  let {username,email,password}=req.body;
  let id= uuidv4();
  let q=`insert into temp(id,username,email,password) value('${id}','${username}','${email}','${password}')`;
  try{
    connection.query(q,[user],(err,result)=>{
      res.redirect("/user");
      if(err) throw err;
    })
  }catch(err){
    console.log(err);
  }

});

//delete user route
app.delete("/user/:id",(req,res)=>{
  let {id}=req.params;
  console.log(id);
  let q=`delete from temp where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        console.log("deleted.....");
        res.redirect("/user");
      })
  }catch(err){ 
      res.send(err);
  }
})

app.listen("8080",()=>{
    console.log("listening................");
});


