const express = require("express");
const path = require("path")
const {open} = require("sqlite")
const sqlite3 = require("sqlite3").verbose()
const app = express();
const dbPath = path.join(__dirname,"test.db")
const cors = require("cors")
app.use(cors())
let db = null;
let sql 

const app1 = require('http').createServer((req, res) => res.end('Ahoy!'));
const PORT = process.env.PORT || 3005;



//connect Db
//const db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE,(err) =>{if(err)
//return console.error(err.message)}
//)

const initializeDbServer = async()=>{
    try{
        db = await open({
            filename:dbPath,
            driver:sqlite3.Database,
        });
        app1.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
          });
    }
    catch(e){
        console.log(`DB Error : ${e.message}`)
        process.exit(1);
    }
}

initializeDbServer();

//create Table
//sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,user_name,password,email);`
//db.run(sql)

//Drop Table

//insert data in the table
//sql = `INSERT INTO users(first_name,last_name,user_name,password,email) VALUES (?,?,?,?,?);`
//db.all(sql,["Hannah","Pradeepthi","Hannah_2004","74qa+-*/","hannah@gmail.com"],["Ram","Kumar","Ram_2002","789877","ramErr@gmail.com"],(err)=> {  if(err) return console.error(err.message)
//})

//update the data 
//sql = `UPDATE users SET user_name = ? WHERE id = ?`
//db.run(sql,["SharonRaj_18",1],(err)=>{
//    if(err) return console.error(err.message)
//})

//delete the data
//sql = `DELETE FROM users WHERE id = ?`
//db.run(sql,[2],(err)=>{
//    if(err) return console.error(err.message)
//})

//query the DATA
//sql = `SELECT * FROM users`
//db.all(sql,[],(err,rows) =>{
//    if(err) return console.error(err.message)
//    rows.forEach(row => {
//        console.log(row)
//    });
//})

app.get("/detail/",async(request,response)=>{
    const detailsQuery = `
    SELECT * FROM users ORDER BY id;
    `;
    const booksArray = await db.all(detailsQuery);
    response.send(booksArray);
})