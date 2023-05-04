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
  const result = await connection.query("SELECT * FROM `poder ejecutivo`");
  console.log(result);
  res.json(result);

};


const createRegistro = (req, res) => {

  try{

  const workbook = xlsx.readFile(path.join(__dirname, '../files/' + req.file.filename));
  const sheet_name_list = workbook.SheetNames;
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  const CONSUMO = data.CONSUMO
  const IMPORTE = data.IMPORTETOTAL
  const RPU = data.RPU
  
  data.forEach(async (row) => {

    const {RPU, CONSUMO, IMPORTETOTAL} = row;
    const sql = `UPDATE general SET Consumo =?, Importe =?, WHERE RPU= ?`;
    const values = [CONSUMO, IMPORTETOTAL, RPU];
  
  const connection = await getConnection();
   connection.query(sql, values, (error, results) => {
   if (error) throw error;
   // if(error) return res.status(500).send('server error');
         console.log(values, results);
   
    });
  
});
} catch(error){
  const result = {
    status: "fail",
    filename: req.file.originalname,
    message: "Upload Error! message = " + error.message
}
res.json(result);
}


};

//const file = fs.readFileSync(path.join(__dirname, '../files/' + req.file.filename))
//const data = await file.arrayBuffer(file);
//const excelfile = xlsx.read(data);
//const excelSheet = excelfile.Sheets[excelfile.SheetNames[0]];
//const exceljson = xlsx.utils.sheet_to_json(excelSheet);

//const RPU = xlsx.utils.decode_col('0');
//const CONSUMO = xlsx.utils.decode_col('8');
//const IMPORTE = xlsx.utils.decode_col('16');



/* Insertar los valores en la tabla de MySQL
const query = `UPDATE general SET Consumo = '${CONSUMO}', Importe = '${IMPORTE}' WHERE RPU = '${RPU}'`;
connection.query(query, (error, results, fields) => {
  if (error) throw error;
  console.log(exceljson);
});
}*/
/*
const connection= await getConnection();
const result=await connection.query(`UPDATE general SET Consumo = '${CONSUMO}', Importe = '${IMPORTETOTAL}' WHERE RPU = '${RPU}'`, [req.files.file]);
  console.log(result);
  res.json(result);
 
*/


const uploadRegistro = async (req, res) => {
  const connection = await getConnection();

  const data = (__dirname, '../files' + req.file.filename)

  readXlsxFile(data).then(rows => {

    console.log(rows);
    const regs = [];
    let length = rows.length;

    for (let i = 0; i < length; i++) {
      let reg = {
        RPU: rows[i][0],
        CONSUMO: rows[i][8],
        IMPORTETOTAL: rows[i][16],
      }

      regs.push(reg)
    }




  })

  const result = await connection.query('INSERT INTO image set ?', [{ type, name, data }], (err, rows) => {
    if (err) return res.status(500).send('server error')
/*("UPDATE general SET ? WHERE RPU = ?", [req.body, req.params.RPU])*/;
    console.log(result);
    res.json(result);

  })
};

const formatRegistros = async (req, res) => {
  const connection = await getConnection();
   const result = await connection.query("UPDATE general SET ? Consumo = '', Importe = ''");
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





export const methods = {
    /* uploadExcel,*/ uploadRegistro, formatRegistros, getRegistros, createRegistro, getSector1, getSector, getLanguages, getLanguage, createLanguage, updateLanguage, deleteLanguage
};