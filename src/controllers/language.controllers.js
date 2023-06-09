import { connection, getConnection } from "./../database/database";
import bodyparser from "body-parser";
import { response } from "express";
import * as xlsx from "xlsx";

const path = require('path')
const fs = require('fs')
const readXlsxFile = require('read-excel-file/node');
const XLSX = require('xlsx');


const getLanguages = async (req, res) => {
  const connection = await getConnection();
  // res.json("gngbvcssf");
  const result = await connection.query("SELECT Id_categoria, RPU, Dependencia, Men_Bim, TFA FROM general ORDER BY Id_categoria ASC");
  console.log(result);
  res.json(result);
};

const getLanguage = async (req, res) => {
  const connection = await getConnection();
  // res.json("gngbvcssf");
  const result = await connection.query("SELECT * FROM general WHERE RPU= ? ", [req.params.RPU]);
  console.log(result);
  res.json(result[0]);

};


const createLanguage = async (req, res) => {

  const { Id_Categoria, RPU, DEPENDENCIA, MEN_BIM, TFA, Consumo, Importe } = req.body;
  const connection = await getConnection();
  const result = await connection.query('INSERT INTO general (Id_categoria, RPU, Dependencia, Men_Bim, TFA, Consumo, Importe) VALUES (?, ?, ?, ?, ?, "", "")', [Id_Categoria, RPU, DEPENDENCIA, MEN_BIM, TFA]);
  console.log(result);
  res.json(result);

};


const updateLanguage = async (req, res) => {

  const connection = await getConnection();
  const result = await connection.query("UPDATE general SET ? WHERE RPU = ?", [req.body, req.params.RPU]);
  console.log(result);
  res.json(result);

};

const deleteLanguage = async (req, res) => {

  const connection = await getConnection();
  // res.json("gngbvcssf");
  const result = await connection.query("DELETE FROM general WHERE RPU= ?", [req.params.RPU]);
  console.log(result);
  res.json(result);

};

const getSector = async (req, res) => {

  const connection = await getConnection();
  // res.json("gngbvcssf");
  const result = await connection.query("SELECT * FROM categorias");
  console.log(result);
  res.json(result);

};

const getSector1 = async (req, res) => {

  const connection = await getConnection();
  const result = await connection.query("SELECT * FROM general WHERE Id_categoria=?", [req.params.Id_Categoria]);
  console.log(result);
  res.json(result);

};


const createRegistro = (req, res) => {


  const workbook = xlsx.readFile(path.join(__dirname, '../files/' + req.file.filename));
  const sheet_name_list = workbook.SheetNames;
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

   data.forEach(async (row) => {

    const {RPU, CONSUMO, IMPORTETOTAL} = row;
    const sql = `UPDATE general SET Consumo = Consumo + '${CONSUMO}', Importe = Importe + '${IMPORTETOTAL}' WHERE RPU ='${RPU}'`;
    const values = [CONSUMO, IMPORTETOTAL, RPU];
  
  const connection = await getConnection();
   connection.query(sql, (error, results) => {
   if (error) throw error;
   // if(error) return res.status(500).send('server error');
         console.log(values, results);
   
    });
       
});

  fs.unlinkSync(path.join(__dirname, '../files/' + req.file.filename))

};


 const formatRegistros = async (req, res) => {
  const connection = await getConnection();
   const result = await connection.query("UPDATE general SET Consumo ='', Importe =''");
  console.log(result);  
  res.json(result);

};

const getRegistros = async (req, res) => {
  const connection = await getConnection();
  // res.json("gngbvcssf");
  const result = await connection.query("SELECT * FROM general ORDER BY Id_categoria ASC");
  console.log(result);
  res.json(result);
};

const searchRegistro = async (req, res) => {
  const connection = await getConnection();
  const search = req.body
  const result = await connection.query(`SELECT * FROM general WHERE Id_categoria LIKE '${search}' OR RPU LIKE '${search}' OR Dependencia LIKE '${search}' OR Men_Bim LIKE '${search}' OR TFA LIKE '${search}' OR Consumo LIKE '${search}' OR Importe LIKE '${search}'`, [search]);
  console.log(result);
  res.json(result);

};



export const methods = {
    searchRegistro, formatRegistros, getRegistros, createRegistro, getSector1, getSector, getLanguages, getLanguage, createLanguage, updateLanguage, deleteLanguage
};

