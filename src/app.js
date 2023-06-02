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
app.set("port", process.env.PORT || PORT);

//midlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use("/", loginRoutes);
app.use("/api/languages", languageRoutes);



export default app;