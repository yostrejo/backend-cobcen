import express from "express";
import morgan from "morgan";
import cors from "cors";
import myconn from "express-myconnection";
import {getConnection} from "./database/database.js";

//Importar rutas
import languageRoutes from "./routes/language.routes";

//import { fileUpload } from "./routes/file.routes";

//const myconn = require('express-myconnection');
//const mysql = require('mysql');
const app=express();
const reader= require('xlsx');
const loginRoutes = require('../src/routes/login')

//settings
app.set("port", 3030);

//midlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use("/", loginRoutes);
app.use("/api/languages", languageRoutes);
//app.use("api/document", fileUpload);
/* app.get("/readeexcelfile",(req, res) => {
 let fileName = req.query.fileName;
 let data = []
 try {
  const file = reader.readFile('publicfiles/' + fileName + ".xlsx");
  const sheetNames = file.SheetNames

  for (let i = 0; i < sheetNames.length; i++) {
    const arr = reader.utils.sheet_to_json(
      file.Sheets[sheetNames[i]])
      arr.forEach((res) => {
        data.push(res)
      })
  }
  res.send(data);
  } catch (err) {
    res.send(err);
  }
 })*/
//app.post('/transactions',(req, res) => {
  //  console.log('Me esta llegando algoooo')
//})


export default app;